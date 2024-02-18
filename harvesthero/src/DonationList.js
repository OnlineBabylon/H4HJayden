import React, { useEffect, useState } from 'react';
import { db } from './firebaseconfig'; // Adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore';
import { Card, Button, Carousel, Row, Col, Badge } from 'react-bootstrap';

const DonationsList = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const donationsCollectionRef = collection(db, "donations");
      const data = await getDocs(donationsCollectionRef);
      setDonations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchDonations();
  }, []);

  const chunkArray = (arr, size) =>
    arr.reduce((acc, e, i) => {
      if (i % size === 0) acc.push([]);
      acc[acc.length - 1].push(e);
      return acc;
    }, []);

  // Group donations into chunks of three
  const donationChunks = chunkArray(donations, 3);

  // Function to render tags based on donation categories
  const renderTags = (donation) => {
    const categories = ['bakery', 'dairy', 'fruits', 'meat', 'prepared', 'vegetables'];
    return categories.map((category) =>
      donation[category] === 'on' ? <Badge bg="secondary" className="me-2">{category}</Badge> : null
    );
  };

  return (
    <div>
      <h2 className="mb-4">All Donations</h2>
      <Carousel>
        {donationChunks.map((chunk, index) => (
          <Carousel.Item key={index}>
            <Row className="mx-auto" style={{ width: '75%' }}>
              {chunk.map((donation) => (
                <Col key={donation.id} xs={12} md={4}>
                  <Card className="mb-4">
                    {donation.imageUrl && (
                      <Card.Img variant="top" src={donation.imageUrl} alt={donation.name} />
                    )}
                    <Card.Body>
                      <Card.Title>{donation.name}</Card.Title>
                      <Card.Text>
                        {donation.description}
                        <div className="mt-3">
                          {renderTags(donation)}
                        </div>
                      </Card.Text>
                      {donation.contactInfo && (
                        <div className="mb-3">
                          <Badge bg="danger">Contact # {donation.contactInfo}</Badge>
                        </div>
                      )}
                      <Button variant="primary">Accept</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
      <style>
  {`
    .carousel-indicators li {
      background-color: black !important;
    }

    .carousel-indicators .active {
      background-color: black !important;
    }
  `}
</style>

    </div>
    
  );



};

export default DonationsList;
