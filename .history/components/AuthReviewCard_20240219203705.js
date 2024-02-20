import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function AuthReviewCard({ reviewObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      {reviewObj && <Card.Img variant="top" src={reviewObj.image} alt={reviewObj.title} style={{ height: '400px' }} />}
      <Card.Body>
        <Card.Title>{reviewObj && reviewObj.title}</Card.Title>
        <p className="card-text bold">{reviewObj && reviewObj.sale && <span>SALE<br /></span> } ${reviewObj && reviewObj.price}</p>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        {reviewObj && (
          <Link href={`/book/${reviewObj.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
        )}


      </Card.Body>
    </Card>
  );
}

AuthReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    sale: PropTypes.bool,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BookCard;
