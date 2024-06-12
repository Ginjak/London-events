import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async"; // Import Helmet
import "./contact.css";
import MultipleSlider from "../../MultipleSlider";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emptyField, setEmptyField] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let interval;
    if (submitted) {
      interval = setInterval(() => {
        setCountdown((count) => count - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [submitted]);

  useEffect(() => {
    if (countdown === 0) {
      setSubmitted(false);
      setCountdown(5);
      setMessage("");
      setName("");
      setEmail("");
    }
  }, [countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || message === "") {
      setEmptyField(true);
    } else {
      try {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            "form-name": "contact",
            name,
            email,
            message,
          }).toString(),
        });

        setSubmitted(true);
        setEmptyField(true);
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Music Events in the UK</title>
        <meta
          name="description"
          content="Contact us with your questions, suggestions, or inquiries about music events in the UK. We'd love to hear from you!"
        />
        <meta
          name="keywords"
          content="contact, contact us, music events, UK events, music concerts, event inquiries"
        />
      </Helmet>
      <div
        id="contact-page"
        className="d-flex justify-content-center align-items-center flex-column"
      >
        {submitted ? (
          <div className="thank-you-message text-center">
            <h2 className="mb-3">Thank you for your message!</h2>
            <p className="mb-3">We'll get back to you as soon as possible.</p>
            <p className="mb-0">Returning to page in {countdown} seconds...</p>
          </div>
        ) : (
          <div id="contact-form-id" className="contact-form-wraper">
            <h2>Contact us</h2>
            <h5>
              Got any questions or suggestions? Fill out this form to reach out
            </h5>
            <form
              name="contact"
              method="POST"
              className="mt-5"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="name-email-wraper flex-column flex-sm-row d-flex gap-2">
                <div className="w-100 mb-3">
                  <label className="w-100">
                    <input
                      className="form-input"
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </label>
                </div>
                <div className="w-100  mb-3">
                  <label className="w-100">
                    <input
                      className="form-input"
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="w-100 mb-3">
                  <textarea
                    className="w-100 form-input"
                    rows="3"
                    name="message"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message"
                  />
                </label>
              </div>
              {emptyField && <p>Please complete all required fields.</p>}
              <button className="dates-btn w-100" type="submit">
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Contact;
