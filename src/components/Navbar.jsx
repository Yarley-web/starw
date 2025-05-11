import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";

export const CustomNavbar = () => {
  const { favorites } = useFavorites();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Star Wars API Explorer
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/demo">Demo</Nav.Link>
          </Nav>
          
          <Nav>
            <Button 
              as={Link} 
              to="/favorites" 
              variant="outline-warning" 
              className="position-relative"
            >
              Favorites
              {favorites.length > 0 && (
                <Badge 
                  pill 
                  bg="light" 
                  text="dark" 
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {favorites.length}
                </Badge>
              )}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};