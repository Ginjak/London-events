import React, { useState } from "react";
import "./contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          name,
          message,
        }).toString(),
      });

      setSubmitted(true); // Set submitted to true after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div id="contact-page">
      <div className="contact-test"></div>
      {submitted ? ( // If form is submitted, display thank you message
        <div className="thank-you-message">
          <h2>Thank you for your message!</h2>
          <p>We'll get back to you as soon as possible.</p>
        </div>
      ) : (
        // If form is not submitted, display the form
        <form
          name="contact"
          method="POST"
          className="mt-5"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <div>
            <label>
              Name:
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Message:
              <textarea
                name="message"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Contact;
