import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import {
  createReview, updateReview,
} from '../../api/reviewData';
import WasThisReviewHelpful from '../WasThisHelpfulComponent';

const initialState = {
  address: '',
  photo: '',
  reviewProperty: '',
  reviewPropertyManager: '',
  reviewArea: '',
  monthlyPrice: '',
  rating: '',
  rentalDuration: '',
};

function AddAReviewForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [, setReview] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  AddAReviewForm.defaultProps = {
    obj: initialState,
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    (user.uid).then((reviewRatings) => {
      setReview(reviewRatings);
    });

    if (obj && obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.firebaseKey) {
      updateReview(formInput).then(() => router.push(`/review/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createReview(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateReview(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{formInput.firebaseKey ? 'Update' : 'Create'} Review</h2>

      {/* ADDRESS */}
      <FloatingLabel controlId="floatingInput1" label="Address" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Address"
          name="address"
          value={formInput.address}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* REVIEW PROPERTY */}
      <FloatingLabel controlId="floatingInput1" label="Review Property" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Review Property"
          name="reviewProperty"
          value={formInput.reviewProperty}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* REVIEW PROPERTY MANAGER */}
      <FloatingLabel controlId="floatingInput1" label="Review Property Manager" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Review Property Manager"
          name="reviewPropertyManager"
          value={formInput.reviewPropertyManager}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* REVIEW AREA */}
      <FloatingLabel controlId="floatingInput1" label="Review Area" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Review Area"
          name="reviewArea"
          value={formInput.reviewArea}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* MONTHLY PRICE */}
      <FloatingLabel controlId="floatingInput1" label="Monthly Price" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Monthly Price"
          name="monthlyPrice"
          value={formInput.monthlyPrice}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* UPLOAD HOME INSPECTION DOCS */}
      {/* UPLOAD PHOTOS */}
      <FloatingLabel controlId="floatingInput1" label="Image URL" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Image URL"
          name="photo"
          value={formInput.photo}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* Star Rating Inputs */}
      {/* RATING */}
      <FloatingLabel>
        <WasThisReviewHelpful firebaseKey={formInput.reviewId} reviews={[{ category: 'overall' }, { category: 'safety' }, { category: 'management' }]} />
      </FloatingLabel>
      {/* RENTAL DURATION */}
      <FloatingLabel controlId="floatingInput2" label="How Long Did You Rent For?" className="mb-3">
        <Form.Control
          type="text"
          placeholder="How Long Did You Rent For?"
          name="rentalDuration"
          value={formInput.rentalDuration}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* DATE / TIME */}

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{formInput.firebaseKey ? 'Update' : 'Create'} Review</Button>
    </Form>
  );
}

AddAReviewForm.propTypes = {
  obj: PropTypes.shape({
    address: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    author_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

AddAReviewForm.defaultProps = {
  obj: initialState,
};

export default AddAReviewForm;
