import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge, Table } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { complaintAPI } from "../services/api";
import "../styles/dashboard.css";

const CustomerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await complaintAPI.getUserComplaints();
      setComplaints(response.data);

      // Calculate stats
      setStats({
        total: response.data.length,
        open: response.data.filter((c) => c.status === "open").length,
        inProgress: response.data.filter((c) => c.status === "in-progress")
          .length,
        resolved: response.data.filter((c) => c.status === "resolved").length,
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      open: "danger",
      "in-progress": "warning",
      resolved: "success",
      closed: "secondary",
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
          <p className="text-muted">Track and manage your complaints here</p>
        </Col>
        <Col md={3}>
          <Link to="/create-complaint" className="btn btn-primary w-100">
            + Register a Complaint
          </Link>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <h5>Total Complaints</h5>
              <h3 className="text-primary">{stats.total}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <h5>Open</h5>
              <h3 className="text-danger">{stats.open}</h3>
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
          <h5>My Complaints</h5>
        </Card.Header>
        <Card.Body>
          {complaints.length === 0 ? (
            <p className="text-center text-muted">
              No complaints yet. <Link to="/create-complaint">Create one now</Link>
            </p>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>ID</th>
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
                    <td>{complaint.category}</td>
                    <td>{complaint.description.substring(0, 30)}...</td>
                    <td>{getStatusBadge(complaint.status)}</td>
                    <td>
                      <Badge bg={complaint.priority === "high" ? "danger" : complaint.priority === "medium" ? "warning" : "secondary"}>
                        {complaint.priority}
                      </Badge>
                    </td>
                    <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link
                        to={`/complaint/${complaint._id}`}
                        className="btn btn-sm btn-info"
                      >
                        View
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

export default CustomerDashboard;
