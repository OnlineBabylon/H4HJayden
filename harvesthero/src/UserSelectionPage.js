import React, { useEffect } from 'react';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap'; // Import React Bootstrap components

function UserSelectionPage() {
  const navigate = useNavigate();

  const handleUserSelect = (userType) => {
    switch(userType) {
      case 'foodbank':
        navigate('/restaurant-donation-form');
        break;
      case 'restaurant':
        navigate('/restaurant');
        break;
      default:
        console.log('Invalid user type:', userType);
    }
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('User logged out successfully.');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('User logged in successfully.');
      } else {
        console.log('User is not logged in.');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h2>Select User Type</h2>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col md="auto">
          <Button variant="primary" onClick={() => handleUserSelect('foodbank')}>Login as Foodbank</Button>
        </Col>
        <Col md="auto">
          <Button variant="secondary" onClick={() => handleUserSelect('restaurant')}>Login as Restaurant/Grocery Store</Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col md="auto">
          <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default UserSelectionPage;
