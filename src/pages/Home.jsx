import React, { useState, useEffect } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { 
  Card, 
  Button, 
  Container, 
  Row, 
  Col, 
  Tabs, 
  Tab,
  Spinner, 
  Badge 
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [people, setPeople] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('people');
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  // Función para hacer fetch a la API
  const fetchData = async (endpoint, setData) => {
    try {
      const response = await fetch(`https://www.swapi.tech/api/${endpoint}`);
      const data = await response.json();
      setData(data.results);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchData('people', setPeople),
        fetchData('vehicles', setVehicles),
        fetchData('planets', setPlanets)
      ]);
      setLoading(false);
    };
    loadAllData();
  }, []);

  //esta función es para verificar si un item es favorito
  const isFavorite = (url) => favorites.some(fav => fav.url === url);

  // esta función es para manejar el toggle de favoritos
  const toggleFavorite = (item, type) => {
    const favoriteItem = {
      uid: item.uid,
      name: item.name,
      url: item.url,
      type,
    };
    
    if (favorites.some(fav => fav.url === favoriteItem.url)) {
      removeFavorite(favoriteItem.url);
    } else {
      addFavorite(favoriteItem);
    }
  };

  // esto es para Renderizar cards
  const renderCards = (items, type) => {
    if (loading) return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading {type}...</p>
      </div>
    );
    
    if (!items.length) return (
      <div className="text-center my-5">
        <p>No {type} found</p>
      </div>
    );

    return (
      <Row>
        {items.map((item) => {
          let imageUrl;
          switch(type) {
            case 'people':
              imageUrl = 'https://loremflickr.com/300/200/stormtrooper';
              break;
            case 'vehicles':
              imageUrl = 'https://loremflickr.com/300/200/starwarsvehicle';
              break;
            case 'planets':
              imageUrl = 'https://loremflickr.com/300/200/starwarsplanet';
              break;
            default:
              imageUrl = 'https://loremflickr.com/300/200/stormtrooper';
          }
          
          return (
            <Col key={item.uid} sm={12} md={6} lg={4} className="mb-4">
              <Card style={{ height: '100%' }}>
                <Card.Img 
                  variant="top" 
                  src={imageUrl} 
                  alt={item.name}
                  style={{ 
                    height: '200px', 
                    objectFit: 'cover',
                    borderBottom: '1px solid rgba(0,0,0,0.1)'
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {type === 'people' && 'Character'}
                    {type === 'vehicles' && 'Vehicle'}
                    {type === 'planets' && 'Planet'}
                  </Card.Subtitle>
                  <Card.Text className="flex-grow-1">
                    Click on details to see more information about this {type.slice(0, -1)}.
                  </Card.Text>
                  <div className="d-flex justify-content-between mt-auto">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => navigate(`/type/${item.uid}`, { state: { type }})}
                    >
                      Details
                    </Button>
                    <Button 
                      variant={isFavorite(item.url) ? 'outline-danger' : 'outline-secondary'}
                      size="sm"
                      onClick={() => toggleFavorite(item, type)}
                    >
                      {isFavorite(item.url) ? '❤️ Remove' : '♡ Add'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Star Wars API Explorer</h1>
      
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="people" title="People">
          {renderCards(people, 'people')}
        </Tab>
        <Tab eventKey="vehicles" title="Vehicles">
          {renderCards(vehicles, 'vehicles')}
        </Tab>
        <Tab eventKey="planets" title="Planets">
          {renderCards(planets, 'planets')}
        </Tab>
      </Tabs>
    </Container>
  );
};