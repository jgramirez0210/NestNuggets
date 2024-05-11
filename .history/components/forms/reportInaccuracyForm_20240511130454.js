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
    const userId = 'user_XXXXX'; // replace with your actual user ID
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
    <section>
      <aside />
      <form className="for" onSubmit={handleSubmit}>
        <div className="form_group">
          <label htmlFor="name">Name</label>
          <input id="name" ref={nameRef} placeholder="Enter your name" />
        </div>
        <div className="form_group">
          <label htmlFor="email">Email</label>
          <input id="email" ref={emailRef} type="email" placeholder="Enter your email" />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          Subscribe
        </button>
        {message && <p>{message}</p>}
      </form>
    </section>
  );
}
