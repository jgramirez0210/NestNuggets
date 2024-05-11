import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext.js';
import { createReport } from '../../api/reportData.js';
import { sendEmail } from './sendEmail.js';

const initialState = {
  reportDetails: '',
};

function ReportInaccuracyForm({ obj, firebaseKey }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  ReportInaccuracyForm.defaultProps = {
    obj: initialState,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = { ...formInput, uid: user.uid, reviewId: firebaseKey };
  createReport(payload).then(() => {
    router.push(`/review/${firebaseKey}`);
  });

  // Send the email
  const response = await fetch('/api/sendEmail', { method: 'POST' });
  const data = await response.json();
  console.log(data);
};

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">Report Inaccuracy</h2>

      {/* REPORT DETAILS */}
      <FloatingLabel controlId="floatingInput1" label="Report Details" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Please provide details of the inaccuracy..."
          name="reportDetails"
          value={formInput.reportDetails}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">Submit Report</Button>
    </Form>
  );
}

ReportInaccuracyForm.propTypes = {
  obj: PropTypes.shape({
    reportDetails: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  firebaseKey: PropTypes.string,
};

ReportInaccuracyForm.defaultProps = {
  obj: initialState,
  firebaseKey: '',
};

export default ReportInaccuracyForm;
