import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext.js';
import { createReport } from '../../api/reportData.js';

const initialState = {
  reportDetails: '',
};

function ReportInaccuracyForm({ obj, firebaseKey }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  const emailRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const [loading, setLoading] = useState(false);

  useEffect(() => emailjs.init("service_wkf9g74"))

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceId = 'service_wkf9g74';
    const templateId = 'template_ug373cb'
    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
        name:nameRef.current.value,
          recipient: emailRef.current.value
      });
      alert("email sucessfully sent check inbox")
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
    const payload = { ...formInput, uid: user.uid, reviewId: firebaseKey };
    createReport(payload).then(() => {
      router.push(`/review/${firebaseKey}`);
    });
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
  }),
  firebaseKey: PropTypes.string,
};

ReportInaccuracyForm.defaultProps = {
  obj: initialState,
  firebaseKey: '',
};

export default ReportInaccuracyForm;
