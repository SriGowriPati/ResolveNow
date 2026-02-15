import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Alert,
  Form,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { complaintAPI, messageAPI } from "../services/api";
import "../styles/complaint.css";

const ComplaintDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState({ rating: 0, feedback: "" });

  useEffect(() => {
    fetchComplaintDetails();
    if (id) {
      fetchMessages();
    }
  }, [id]);

  const fetchComplaintDetails = async () => {
    try {
      const response = await complaintAPI.getComplaintById(id);
      setComplaint(response.data);
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
      // Mark messages as read
      await messageAPI.markAsRead(id);
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
        senderType: user?.userType,
      });
      setNewMessage("");
      fetchMessages();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message");
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      await complaintAPI.updateComplaint(id, {
        rating: feedback.rating,
        feedback: feedback.feedback,
      });
      alert("Feedback submitted successfully!");
      setFeedback({ rating: 0, feedback: "" });
      fetchComplaintDetails();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit feedback");
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
                    <strong>Complaint ID:</strong> {complaint._id}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
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
                  </p>
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
                </Col>
                <Col md={6}>
                  <p>
                    <strong>Created:</strong>{" "}
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Assigned Agent:</strong>{" "}
                    {complaint.assignedAgent?.fullName || "Not assigned yet"}
                  </p>
                  <p>
                    <strong>Name:</strong> {complaint.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {complaint.email}
                  </p>
                </Col>
              </Row>

              <Card className="bg-light">
                <Card.Header>Description</Card.Header>
                <Card.Body>{complaint.description}</Card.Body>
              </Card>

              {complaint.resolution && (
                <Card className="mt-3 bg-light">
                  <Card.Header>Resolution</Card.Header>
                  <Card.Body>{complaint.resolution}</Card.Body>
                </Card>
              )}
            </Card.Body>
          </Card>

          {/* Messages Section */}
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">
              <h5>Chat with Agent</h5>
            </Card.Header>
            <Card.Body>
              <div className="messages-container mb-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
                {messages.length === 0 ? (
                  <p className="text-muted">No messages yet</p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`message mb-2 ${
                        msg.userId == user?.userId ? "text-end" : ""
                      }`}
                    >
                      <small className="text-muted">
                        {msg.senderName} -{" "}
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </small>
                      <div
                        className={`p-2 rounded ${
                          msg.userId == user?.userId
                            ? "bg-primary text-white"
                            : "bg-light"
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {complaint.status !== "resolved" && complaint.status !== "closed" && (
                <Form onSubmit={handleSendMessage}>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                  >
                    Send Message
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>

          {/* Feedback Section */}
          {complaint.status === "resolved" && !complaint.rating && (
            <Card>
              <Card.Header className="bg-success text-white">
                <h5>Share Your Feedback</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmitFeedback}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select
                      value={feedback.rating}
                      onChange={(e) =>
                        setFeedback({ ...feedback, rating: e.target.value })
                      }
                      required
                    >
                      <option value="">Select Rating</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Feedback</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Please share your feedback..."
                      value={feedback.feedback}
                      onChange={(e) =>
                        setFeedback({ ...feedback, feedback: e.target.value })
                      }
                      required
                    />
                  </Form.Group>

                  <Button variant="success" type="submit" className="w-100">
                    Submit Feedback
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header className="bg-secondary text-white">
              <h5>Status Timeline</h5>
            </Card.Header>
            <Card.Body>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot">
                    <span className="badge bg-success">✓</span>
                  </div>
                  <p>
                    <small>Complaint Registered</small>
                    <br />
                    <tiny className="text-muted">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </tiny>
                  </p>
                </div>

                {complaint.assignedAgent && (
                  <div className="timeline-item">
                    <div className="timeline-dot">
                      <span className="badge bg-info">→</span>
                    </div>
                    <p>
                      <small>Assigned to Agent</small>
                      <br />
                      <tiny className="text-muted">
                        {complaint.assignedAgent.fullName}
                      </tiny>
                    </p>
                  </div>
                )}

                {complaint.status === "in-progress" && (
                  <div className="timeline-item">
                    <div className="timeline-dot">
                      <span className="badge bg-warning">⟳</span>
                    </div>
                    <p>
                      <small>In Progress</small>
                    </p>
                  </div>
                )}

                {complaint.status === "resolved" && (
                  <div className="timeline-item">
                    <div className="timeline-dot">
                      <span className="badge bg-success">✓</span>
                    </div>
                    <p>
                      <small>Resolved</small>
                      <br />
                      <tiny className="text-muted">
                        {new Date(complaint.resolvedAt).toLocaleDateString()}
                      </tiny>
                    </p>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ComplaintDetails;
