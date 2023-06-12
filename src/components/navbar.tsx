import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

function CustomNavbar() {
  // navbar component
  return (
    <Navbar expand="lg" style={{backgroundColor:" #02D076"}}>
      <Container>
        <Navbar.Brand>
            <img
              src={require('../images/alveno-logo-dark.svg').default}
              width="150"
              className="d-inline-block align-top"
              alt="Alveno"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link> <Link to="/"> <a> Teams </a></Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;