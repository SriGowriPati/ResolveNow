import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar bg="dark" expand="lg" sticky="top" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          <i className="bi bi-chat-dots"></i> ResolveNow
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  SignUp
                </Nav.Link>
              </>
            ) : (
              <>
                {user?.userType === "customer" && (
                  <>
                    <Nav.Link as={Link} to="/dashboard">
                      Dashboard
                    </Nav.Link>
                  </>
                )}
                {user?.userType === "agent" && (
                  <>
                    <Nav.Link as={Link} to="/agent-dashboard">
                      Dashboard
                    </Nav.Link>
                    <Nav.Link as={Link} to="/agent-complaints">
                      Complaints
                    </Nav.Link>
                  </>
                )}
                {user?.userType === "admin" && (
                  <>
                    <Nav.Link as={Link} to="/admin-dashboard">
                      Dashboard
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin-complaints">
                      Complaints
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin-users">
                      Users
                    </Nav.Link>
                  </>
                )}
                <Nav.Link as={Link} to="/profile">
                  {user?.fullName}
                </Nav.Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleLogout}
                  className="ms-2"
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
