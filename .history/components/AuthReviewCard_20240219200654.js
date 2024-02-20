import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteBook } from '../api/bookData';

function AuthReviewCard({ reviewObj, onUpdate }) {
//  DELETE FUNCTION
  const deleteReview = () => {
    if (reviewObj && reviewObj.address) {
      if (window.confirm(`Delete ${reviewObj.address}?`)) {
        deleteBook(reviewObj.firebaseKey).then(() => onUpdate());
      }
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      {reviewObj && <Card.Img variant="top" src={reviewObj.image} alt={reviewObj.title} style={{ height: '400px' }} />}
      <Card.Body>
        <Card.Title>{reviewObj && reviewObj.title}</Card.Title>
        <p className="card-text bold">{reviewObj && reviewObj.sale && <span>SALE<br /></span> } ${bookObj && bookObj.price}</p>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        {bookObj && (
          <Link href={`/book/${bookObj.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
        )}
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        {bookObj && (
          <Link href={`/book/edit/${bookObj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
        )}
        <Button variant="danger" onClick={deleteThisBook} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

BookCard.propTypes = {
  bookObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    sale: PropTypes.bool,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BookCard;
