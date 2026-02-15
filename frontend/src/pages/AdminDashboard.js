import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { adminAPI, userAPI } from "../services/api";
import "../styles/dashboard.css";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAssign, setShowAssign] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, complaintsRes, agentsRes] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getAllComplaints(),
        userAPI.getUsersByType("agent"),
      ]);

      setStats(statsRes.data);
      setComplaints(complaintsRes.data.complaints || []);
      setAgents(Array.isArray(agentsRes.data) ? agentsRes.data : agentsRes.data.users || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setComplaints([]);
      setAgents([]);
      setLoading(false);
    }
  };

  const handleAssignComplaint = async () => {
    if (!selectedAgent) {
      alert("Please select an agent");
      return;
    }

    try {
      const agentName = agents.find((a) => a._id === selectedAgent)?.fullName;
      await adminAPI.reassignComplaint({
        complaintId: selectedComplaint._id,
        newAgentId: selectedAgent,
        agentName,
      });

      alert("Complaint assigned successfully!");
      setShowAssign(false);
      fetchDashboardData();
    } catch (err) {
      alert("Error assigning complaint");
    }
  };

  if (loading) return <Container className="text-center mt-5">Loading...</Container>;

  return (
    <Container fluid className="admin-dashboard mt-5 mb-5">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Stats Cards */}
      {stats && (
        <Row className="mb-4">
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <h5>Total Users</h5>
                <h3 className="text-primary">{stats.totalUsers}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <h5>Total Agents</h5>
                <h3 className="text-info">{stats.totalAgents}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <h5>Total Complaints</h5>
                <h3 className="text-warning">{stats.totalComplaints}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="stat-card">
              <Card.Body>
                <h5>Open Complaints</h5>
                <h3 className="text-danger">{stats.openComplaints}</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* All Complaints Table */}
      <Card>
        <Card.Header className="bg-primary text-white">
          <h5>All Complaints</h5>
        </Card.Header>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Category</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Assigned Agent</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>{complaint._id.slice(-6)}</td>
                  <td>{complaint.userId?.fullName}</td>
                  <td>{complaint.category}</td>
                  <td>
                    <Badge
                      bg={
                        complaint.status === "open"
                          ? "danger"
                          : complaint.status === "in-progress"
                          ? "warning"
                          : "success"
                      }
                    >
                      {complaint.status}
                    </Badge>
                  </td>
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
                  <td>{complaint.assignedAgent?.fullName || "Unassigned"}</td>
                  <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => {
                        setSelectedComplaint(complaint);
                        setSelectedAgent("");
                        setShowAssign(true);
                      }}
                      disabled={agents.length === 0}
                      title={agents.length === 0 ? "No agents available" : ""}
                    >
                      Assign
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Assign Modal */}
      <Modal show={showAssign} onHide={() => setShowAssign(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Complaint to Agent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {agents.length === 0 ? (
            <div className="alert alert-warning">
              No agents available. Please register agents first.
            </div>
          ) : (
            <Form.Group>
              <Form.Label>Select Agent</Form.Label>
              <Form.Select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
              >
                <option value="">Choose an agent...</option>
                {agents.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {agent.fullName} ({agent.email})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssign(false)}>
            Close
          </Button>
          <div></div>
          <Button 
            variant="primary" 
            onClick={handleAssignComplaint}
            disabled={agents.length === 0 || !selectedAgent}
          >
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  
  );
};

export default AdminDashboard;
