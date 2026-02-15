import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { complaintAPI, messageAPI } from "../services/api";
import "../styles/complaint.css";

const AgentComplaintManager = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [complaint, setComplaint] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [formData, setFormData] = useState({
    status: "",
    resolution: "",
  });

  useEffect(() => {
    fetchComplaintDetails();
    fetchMessages();
  }, [id]);

  const fetchComplaintDetails = async () => {
    try {
      const response = await complaintAPI.getComplaintById(id);
      setComplaint(response.data);
      setFormData({
        status: response.data.status,
        resolution: response.data.resolution || "",
      });
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch complaint");
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await messageAPI.getMessages(id);
      setMessages(response.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await messageAPI.sendMessage({
        complaintId: id,
        message: newMessage,
        senderType: "agent",
      });
      setNewMessage("");
      fetchMessages();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message");
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      await complaintAPI.updateComplaint(id, {
        status: formData.status,
        resolution: formData.resolution,
      });
      alert("Complaint updated successfully!");
      fetchComplaintDetails();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update complaint");
    }
  };

  if (loading) return <Container className="text-center mt-5">Loading...</Container>;
  if (!complaint) return <Container className="text-center mt-5">Complaint not found</Container>;

  return (
    <Container className="complaint-details-container mt-5 mb-5">
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={8}>
          {/* Complaint Details */}
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">
              <h4>Complaint Details</h4>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={6}>
                  <p>
                    <strong>ID:</strong> {complaint._id}
                  </p>
                  <p>
                    <strong>Customer:</strong> {complaint.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {complaint.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {complaint.phone}
                  </p>
                </Col>
                <Col md={6}>
                  <p>
                    <strong>Category:</strong> {complaint.category}
                  </p>
                  <p>
                    <strong>Priority:</strong>{" "}
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
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>
                </Col>
              </Row>

              <Card className="bg-light">
                <Card.Header>Description</Card.Header>
                <Card.Body>{complaint.description}</Card.Body>
              </Card>
            </Card.Body>
          </Card>

          {/* Messages Section */}
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">
              <h5>Communication</h5>
            </Card.Header>
            <Card.Body>
              <div className="messages-container mb-3" style={{ maxHeight: "300px", overflowY: "auto" }}>
                {messages.map((msg) => (
                  <div key={msg._id} className="message mb-2">
                    <small className="text-muted">
                      {msg.senderName} -{" "}
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </small>
                    <div className="p-2 rounded bg-light">{msg.message}</div>
                  </div>
                ))}
              </div>

              <Form onSubmit={handleSendMessage}>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Send Message
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          {/* Status Update Form */}
          <Card>
            <Card.Header className="bg-info text-white">
              <h5>Update Status</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleUpdateStatus}>
                <Form.Group className="mb-3">
                  <Form.Label>Current Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="assigned">Assigned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Resolution Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="resolution"
                    value={formData.resolution}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        resolution: e.target.value,
                      })
                    }
                    placeholder="Describe the resolution..."
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100">
                  Update Complaint
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AgentComplaintManager;
