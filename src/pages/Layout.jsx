import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { CustomNavbar } from "../components/Navbar"; // Usando el Navbar mejorado que creamos antes
import { Footer } from "../components/Footer";
import { Container } from "react-bootstrap";
import { useFavorites } from "../context/FavoritesContext";

/**
 * Componente Layout que define la estructura base de todas las páginas.
 * Incluye: Navbar, contenido principal (Outlet) y Footer.
 * También maneja el scroll al top y proporciona un contenedor consistente.
 */
export const Layout = () => {
  // Opcional: Si necesitas acceder a los favoritos en el layout
  const { favorites } = useFavorites();

  return (
    <ScrollToTop>
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar en la parte superior */}
        <CustomNavbar />
        
        {/* Contenido principal con margen para el footer */}
        <main className="flex-grow-1" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
          <Container className="mb-5">
            <Outlet /> {/* Aquí se renderizan las páginas */}
          </Container>
        </main>
        
        {/* Footer en la parte inferior */}
        <Footer />
      </div>
    </ScrollToTop>
  );
};