import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            Employee Manager
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={'/employees'}>Employees</Nav.Link>
            <Nav.Link as={Link} to={'/employees/new'}>Create New Employee</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;