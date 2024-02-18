import React, { useEffect, useState } from 'react';
import { db } from './firebaseconfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Card, Button, Carousel, Row, Col, Badge } from 'react-bootstrap';

const DonationsList = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    const donationsCollectionRef = collection(db, "donations");
    const data = await getDocs(donationsCollectionRef);
    setDonations(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleAccept = async (donationId) => {
    const donationRef = doc(db, "donations", donationId);
    try {
      await deleteDoc(donationRef);
      console.log(`Donation with ID ${donationId} has been deleted.`);
      fetchDonations(); // Refresh the donations list
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  // Helper function to chunk the array
  const chunkArray = (arr, size) => {
    return arr.reduce((acc, e, i) => {
      if (i % size === 0) acc.push([]);
      acc[acc.length - 1].push(e);
      return acc;
    }, []);
  };

  // Group donations into chunks of three
  const donationChunks = chunkArray(donations, 3);

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
                      <Card.Text>{donation.description}</Card.Text>
                      <Button variant="primary" onClick={() => handleAccept(donation.id)}>Accept</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default DonationsList;
