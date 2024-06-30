import React, { useState } from 'react';

const formAction = process.env.CONTACT_FORM_ACTION
const firstNameID = process.env.CONTACT_FIRST_NAME_ID
const lastNameID = process.env.CONTACT_LAST_NAME_ID
const emailID = process.env.CONTACT_EMAIL_ID
const messageID = process.env.CONTACT_MESSAGE_ID

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      mode: 'no-cors',
    }).then(() => setSubmitted(true));
  };

  if (submitted) {
    return <div>Thank you for your message!</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Contact Us</h2>
      <form
        action={formAction}
        method="POST"
        onSubmit={handleSubmit}
      >
        <div style={{ marginBottom: '15px' }}>
          <label>First Name:</label>
          <input
            type="text"
            name={firstNameID}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Last Name:</label>
          <input
            type="text"
            name={lastNameID}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            name={emailID}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Message:</label>
          <textarea
            name={messageID}
            required
            rows="4"
            style={{ width: '100%', padding: '8px' }}
          ></textarea>
        </div>
        <button type="submit" style={{ padding: '10px 15px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
