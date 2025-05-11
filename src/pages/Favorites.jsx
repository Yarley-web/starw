import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { Card, Button, Badge, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleViewDetails = (fav) => {
    // Extrae el ID de la URL si no tenemos uid directamente
    const id = fav.uid || fav.url.split('/').filter(Boolean).pop();
    
    if (!id) {
      console.error('No ID found for favorite:', fav);
      return;
    }

    navigate(`/${fav.type}/${id}`);
  };

  if (favorites.length === 0) {
    return (
      <Container className="text-center mt-5">
        <h2>Your Favorites</h2>
        <p className="mt-3">You don't have any favorites yet.</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Your Favorites</h2>
      <Row>
        {favorites.map((fav) => {
          // Asegurarnos de tener un ID válido
          const id = fav.uid || fav.url.split('/').filter(Boolean).pop();
          
          return (
            <Col key={fav.url} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>
                    {fav.name} <Badge bg="secondary">{fav.type}</Badge>
                  </Card.Title>
                  <div className="d-flex justify-content-between mt-3">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => handleViewDetails(fav)}
                      disabled={!id} // Deshabilitar si no hay ID
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => removeFavorite(fav.url)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};





