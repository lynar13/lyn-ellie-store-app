// src/pages/ContactPage.js
import React, { useState } from "react";
import Layout from "../components/Layout";
import styles from "../App.module.css";

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    email: "@stud.noroff.no",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, subject, email, message } = formData;

    // Basic Validation
    if (
      fullName.length >= 3 &&
      subject.length >= 3 &&
      email &&
      message.length >= 3
    ) {
      console.log("Form Data:", formData);
      alert("Message sent successfully!");
    } else {
      alert("Please fill out all fields correctly.");
    }
  };

  return (
    <Layout>
      <h1>Contact Us</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          minLength={3}
          className={styles.input}
          value={formData.fullName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          required
          minLength={3}
          className={styles.input}
          value={formData.subject}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          required
          minLength={3}
          className={styles.textarea}
          value={formData.message}
          onChange={handleChange}
        />
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>
            Send
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default ContactPage;
