import { Container } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <Container className="text-center">
        <p className="mb-0">
          Star Wars API Explorer &copy; {new Date().getFullYear()} | 
          Data provided by <a href="https://swapi.tech/" target="_blank" rel="noopener noreferrer" className="text-warning">SWAPI</a>
        </p>
      </Container>
    </footer>
  );
};