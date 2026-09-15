import { useRef, useEffect, useState } from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import emailjs from '@emailjs/browser';

export default function ReportInaccuracyForm() {
  const emailRef = useRef();
  const nameRef = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    emailjs.init('service_wkf9g74');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceId = 'service_wkf9g74';
    const templateId = 'template_ug373cb';
    const userId = 'p8Ciw0itkxzIBUHjx';
    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
        name: nameRef.current.value,
        recipient: emailRef.current.value,
      }, userId);
      setMessage('Email successfully sent, check inbox!');
    } catch (error) {
      setMessage('An error occurred, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="text-primary mb-4 text-center">Report Inaccuracy</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              ref={nameRef}
              placeholder="Enter your name"
              className="form-control"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              ref={emailRef}
              type="email"
              placeholder="Enter your email"
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Sending...' : 'Submit Report'}
          </button>
          {message && (
            <p className={`mt-3 text-center ${message.includes('successfully') ? 'text-success' : 'text-danger'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
