import React from 'react';

const ContactForm = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Contact Us</h2>
      <form
        action=""
        method="POST"
        target="_blank"
      >
        <div style={{ marginBottom: '15px' }}>
          <label>First Name:</label>
          <input
            type="text"
            name="entry.FIRST_NAME_ENTRY_ID"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Last Name:</label>
          <input
            type="text"
            name="entry.LAST_NAME_ENTRY_ID"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="entry.EMAIL_ENTRY_ID"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Message:</label>
          <textarea
            name="entry.MESSAGE_ENTRY_ID"
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
