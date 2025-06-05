// src/pages/ContactPage.js
/**
 * ContactPage component - Provides a contact form with validation and form submission handling.
 *
 * @component
 * @returns {JSX.Element} The rendered ContactPage component.
 */

import React, { useState } from "react";
import Layout from "../components/Layout";
import styles from "../App.module.css";

/**
 * Contact form page that allows users to send messages.
 */
function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    email: "@stud.noroff.no",
    message: "",
  });

  /**
   * Handles changes to form inputs and updates the formData state.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The change event.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission, validates inputs, and shows appropriate alerts.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, subject, email, message } = formData;

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
