import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Card, Spinner, Container, Alert } from 'react-bootstrap';
import { useFavorites } from '../context/FavoritesContext';

export const Single = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const type = state?.type;
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!type || !id) {
          throw new Error('Missing type or ID');
        }

        const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
        
        if (!response.ok) {
          throw new Error(`${type} with ID ${id} not found`);
        }

        const data = await response.json();
        
        if (!data.result) {
          throw new Error('Invalid data structure from API');
        }

        setItem(data.result);
      } catch (err) {
        console.error('Error fetching item:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (type && id) {
      fetchItem();
    }
  }, [type, id]);

  const isFavorite = item?.properties?.url 
    ? favorites.some(fav => fav.url === item.properties.url) 
    : false;

  const handleToggleFavorite = () => {
    if (!item?.properties) return;
    
    const favItem = {
      name: item.properties.name,
      url: item.properties.url,
      type
    };

    if (isFavorite) {
      removeFavorite(item.properties.url);
    } else {
      addFavorite(favItem);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading {type || 'item'}...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">
          {error}
        </Alert>
        <Button 
          variant="primary" 
          onClick={() => navigate('/')}
          className="mt-3"
        >
          Go back to Home
        </Button>
      </Container>
    );
  }

  if (!item) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="warning">
          Item not found
        </Alert>
        <Button 
          variant="primary" 
          onClick={() => navigate('/')}
          className="mt-3"
        >
          Go back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4 mb-5">
      <Card>
        <Card.Body>
          <Card.Title className="mb-4">
            {item.properties?.name || 'Unknown Name'}
          </Card.Title>
          
          <div className="mb-4">
            {item.properties && Object.entries(item.properties).map(([key, value]) => (
              <div key={key} className="mb-2">
                <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
              </div>
            ))}
          </div>
          
          <div className="d-flex gap-2">
            <Button 
              variant={isFavorite ? 'danger' : 'primary'}
              onClick={handleToggleFavorite}
              disabled={!item.properties?.url}
            >
              {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};