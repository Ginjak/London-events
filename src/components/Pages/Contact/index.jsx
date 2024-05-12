import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    let myForm = document.getElementById("contact-form");
    let formData = new FormData(myForm);
    fetch("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => navigate("/search"))
      .catch((error) => alert(error));
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
