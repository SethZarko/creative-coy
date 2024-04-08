import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm } from '@formspree/react';

export const Contact = () => {
  const defaultFormState = useMemo(() => ({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  }), []);

  const [state, handleSubmit] = useForm('xoqgkelb');

  const [success, setSuccess] = useState('');
  const [validationMessages, setValidationMessages] = useState(defaultFormState);
  const [formTouched, setFormTouched] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormState);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Clear validation message when field becomes empty
    if (value === '') {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        [name]: '',
      }));
      return;
    }

    // Validation for email
    if (name === 'email') {
      const isValidEmail =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        email: isValidEmail ? '' : 'Invalid Email',
      }));
    }

    // Validation for phone
    if (name === 'phone') {
      const isValidPhone = /^\+?1?(\d{10}|\d{3}-\d{3}-\d{4})$/.test(value);
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        phone: isValidPhone ? '' : 'Invalid Phone Number',
      }));
    }

    // Validation for city
    if (name === 'city') {
      const isValidCity = /^[A-Za-z\s]+$/.test(value);
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        city: isValidCity ? '' : 'City must contain only letters and spaces',
      }));
    }

    // Validation for message
    if (name === 'message') {
      const isValidMessage = value.length >= 20 && value.length <= 200;
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        message: isValidMessage
          ? ''
          : 'Message must be between 20 and 200 characters',
      }));
    }
  };

  const isSubmitDisabled = () => {
    const isEmptyField = Object.values(formValues).some(
      (val) => val.trim() === ''
    );
    const isAnyInvalid = Object.values(validationMessages).some(
      (message) => message !== ''
    );
    return isEmptyField || isAnyInvalid;
  };

  const isAnyFieldEmpty = useCallback(() => {
    for (const key in formValues) {
      if (formValues[key].trim() === '') {
        return true;
      }
    }
    return false;
  }, [formValues]);

  useEffect(() => {
    if (formTouched && isAnyFieldEmpty()) {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        all: 'All Fields Required',
      }));
    } else {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        all: '',
      }));
    }
  }, [formTouched, isAnyFieldEmpty]);

  useEffect(() => {
    if (state.succeeded) {
      setSuccess(
        <p className="form-success-message">Message Sent Successfully!</p>
      );
  
      const timer = setTimeout(() => {
        setSuccess('');
      }, 4000);
  

      setFormValues(defaultFormState);

      setValidationMessages(defaultFormState);
  
      document.getElementById('myForm').reset();
  
      setFormTouched(false);
  
      return () => clearTimeout(timer);
    }
  }, [state.succeeded, defaultFormState]);

  return (
    <section id="contact-page">
      <div className="page-top-section">
        <h3>Let&apos;s Talk!</h3>
        <p>
          If you&apos;re interested in hiring us, please fill out our contact
          form with your event details and any questions you may have. We look
          forward to helping you plan your event!
        </p>
      </div>
      <div className="page-bottom-section">
        {success}
        <form
          id="myForm"
          onSubmit={handleSubmit}
          onBlur={() => setFormTouched(true)}
        >
          {validationMessages.all && (
            <p className="validation-message">{validationMessages.all}</p>
          )}

          {validationMessages.name && (
            <p className="validation-message">{validationMessages.name}</p>
          )}
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Full Name..."
            value={formValues.name}
            onChange={handleFormChange}
          />

          {validationMessages.email && (
            <p className="validation-message">{validationMessages.email}</p>
          )}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email Address..."
            value={formValues.email}
            onChange={handleFormChange}
          />

          {validationMessages.phone && (
            <p className="validation-message">{validationMessages.phone}</p>
          )}
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text"
            name="phone"
            placeholder="Phone Number..."
            value={formValues.phone}
            onChange={handleFormChange}
          />

          {validationMessages.city && (
            <p className="validation-message">{validationMessages.city}</p>
          )}
          <label htmlFor="city">Location (City)</label>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="City..."
            value={formValues.city}
            onChange={handleFormChange}
          />

          {validationMessages.message && (
            <p className="validation-message">{validationMessages.message}</p>
          )}
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Send Message..."
            value={formValues.message}
            onChange={handleFormChange}
          />

          <button
            className="submit-form-btn"
            type="submit"
            disabled={isSubmitDisabled()}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};