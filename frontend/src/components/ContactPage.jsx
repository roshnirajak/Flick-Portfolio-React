import React, { useState } from 'react';
import { AiOutlineMail } from "react-icons/ai";
import { FiInstagram } from 'react-icons/fi';
import { FaSpotify } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL, SUB_URI } from './helpers';
import toastConfig from './toastConfig';

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    contact_num: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios.post(`${API_URL}${SUB_URI}/add-contact`, formData)
      .then(response => {
        toast.success(response.data.message, toastConfig);
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message, toastConfig);
        } else {
          toast.error('An unexpected error occurred.', toastConfig);
        }
      });
    setIsLoading(false)
  };

  return (
    <div className="contact-page">
      <section id="contact">
        <h3>Contact Me Here</h3>
        <ToastContainer />
        <div className="col">
          <div className="block1">
            <form id="contactForm" onSubmit={handleSubmit}>
              <label htmlFor="fullname">Name</label>
              <input type="text" id="fullname" name="fullname" placeholder="Name" required value={formData.fullname} onChange={handleChange} />

              <label htmlFor="contact_num">Contact Number</label>
              <input type="tel" id="contact_num" name="contact_num" placeholder="Contact Number" maxLength="10" pattern="\d{10}" value={formData.contact_num} onChange={handleChange} />

              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />

              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="Subject" required value={formData.subject} onChange={handleChange} />

              <label htmlFor="message">Your Message</label>
              <textarea id="message" name="message" rows="4" style={{ maxWidth: '96%' }} placeholder="Your Message..." required value={formData.message} onChange={handleChange} />

              <button name="submitContact" disabled={isLoading} type="submit">Submit</button>
            </form>
          </div>
          <div className="block2">
            <div className="block2-social">
              <a href="mailto:chilledspriteae@gmail.com">
                <AiOutlineMail />
                <span>chilledspriteae@gmail.com</span>
              </a>
            </div>
            <div className="block2-social">
              <a href="https://www.instagram.com/flickvfx/">
                <FiInstagram />
                <span>Dm me here</span>
              </a>
            </div>
            <div className="block2-social">
              <a href="https://open.spotify.com/user/31lky5dbczeenbrmeq3ghvphhgke">
                <FaSpotify />
                <span>My Spotify</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
