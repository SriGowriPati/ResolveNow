import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1>Empower Your Team,</h1>
              <p className="lead">
                Exceed Customer Expectations: Discover our Complaint Management Solution
              </p>
              <Link to="/signup" className="btn btn-primary btn-lg">
                Register your Complaint
              </Link>
            </Col>

          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <h2 className="text-center mb-5">Key Features</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="feature-card">
                <Card.Body>
                  <h5>Easy Registration</h5>
                  <p>
                    Simple complaint registration process with all necessary details captured.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="feature-card">
                <Card.Body>
                  <h5>Real-time Tracking</h5>
                  <p>
                    Track the progress of your complaints in real-time with instant updates.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="feature-card">
                <Card.Body>
                  <h5>Direct Communication</h5>
                  <p>
                    Chat directly with agents assigned to your complaint for quick resolution.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="feature-card">
                <Card.Body>
                  <h5>Smart Assignment</h5>
                  <p>
                    Intelligently assigns complaints to the right agents based on workload.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="feature-card">
                <Card.Body>
                  <h5>Secure & Private</h5>
                  <p>
                    Your data is encrypted and protected with industry-standard security.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="feature-card">
                <Card.Body>
                  <h5>Feedback System</h5>
                  <p>
                    Rate your experience and provide feedback to help us improve.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <Row>
            <Col className="text-center">
              <h2>Ready to Get Started?</h2>
              <p>Join thousands of satisfied customers using ResolveNow</p>
              <Link to="/signup" className="btn btn-primary btn-lg me-2">
                Sign Up Now
              </Link>
              <Link to="/login" className="btn btn-outline-primary btn-lg">
                Login
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
