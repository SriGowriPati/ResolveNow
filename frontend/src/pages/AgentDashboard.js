import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { agentAPI, complaintAPI } from "../services/api";
import "../styles/dashboard.css";

const AgentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [workload, setWorkload] = useState(0);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    assigned: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    fetchAgentComplaints();
    fetchWorkload();
  }, []);

  const fetchAgentComplaints = async () => {
    try {
      const response = await agentAPI.getAssignedComplaints();
      const complaintDetails = await Promise.all(
        response.data.map((ac) =>
          complaintAPI.getComplaintById(ac.complaintId._id)
        )
      );

      setComplaints(complaintDetails.map((c) => c.data));

      // Calculate stats
      setStats({
        total: complaintDetails.length,
        assigned: complaintDetails.filter((c) => c.data.status === "assigned")
          .length,
        inProgress: complaintDetails.filter((c) => c.data.status === "in-progress")
          .length,
        resolved: complaintDetails.filter((c) => c.data.status === "resolved")
          .length,
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setLoading(false);
    }
  };

  const fetchWorkload = async () => {
    try {
      const response = await agentAPI.getWorkload();
      setWorkload(response.data.workload);
    } catch (err) {
      console.error("Error fetching workload:", err);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      assigned: "secondary",
      "in-progress": "warning",
      resolved: "success",
      closed: "dark",
    };
    return <Badge bg={variants[status] || "secondary"}>{status}</Badge>;
  };

  if (loading) return <Container className="text-center mt-5">Loading...</Container>;

  return (
    <Container className="dashboard-container mt-5 mb-5">
      {/* Welcome Section */}
      <Row className="mb-4">
        <Col>
          <h2>Welcome, {user?.fullName}!</h2>
          <p className="text-muted">Manage your assigned complaints</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <h5>Total Assigned</h5>
              <h3 className="text-primary">{stats.total}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <h5>New</h5>
              <h3 className="text-secondary">{stats.assigned}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <h5>In Progress</h5>
              <h3 className="text-warning">{stats.inProgress}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <h5>Resolved</h5>
              <h3 className="text-success">{stats.resolved}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Complaints Table */}
      <Card>
        <Card.Header className="bg-primary text-white">
          <h5>My Assigned Complaints</h5>
        </Card.Header>
        <Card.Body>
          {complaints.length === 0 ? (
            <p className="text-center text-muted">No complaints assigned yet.</p>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint._id}>
                    <td>{complaint._id.slice(-6)}</td>
                    <td>{complaint.userId?.fullName || complaint.name}</td>
                    <td>{complaint.category}</td>
                    <td>{complaint.description.substring(0, 20)}...</td>
                    <td>{getStatusBadge(complaint.status)}</td>
                    <td>
                      <Badge
                        bg={
                          complaint.priority === "high"
                            ? "danger"
                            : complaint.priority === "medium"
                            ? "warning"
                            : "secondary"
                        }
                      >
                        {complaint.priority}
                      </Badge>
                    </td>
                    <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link
                        to={`/agent/complaint/${complaint._id}`}
                        className="btn btn-sm btn-info"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AgentDashboard;
