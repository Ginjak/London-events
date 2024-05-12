import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form submission via Netlify
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
      // Redirect to "/search" page upon successful submission
      navigate("/search");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div id="contact-page">
      <div className="contact-test"></div>
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
    </div>
  );
};

export default Contact;
