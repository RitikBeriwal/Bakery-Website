import { useState } from "react";

import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError("All fields are required!");
      return;
    }

    try {
      const res = await fetch("/api/contact/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setSuccess("Message sent successfully!");
      setError("");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Try again later.",err);
      setSuccess("");
    }
  };

  return (
    <div className="pt-40 bg-[#fff9f4] py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center ">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            Have questions? Want to order a cake? Send us a message!
          </p>

          {error && <p className="text-red-500 mb-3">{error}</p>}
          {success && <p className="text-green-600 mb-3">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4 ">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg 
             focus:outline-none 
             focus:ring-2 focus:ring-[#dfa26d] 
             focus:border-transparent shadow-2xl"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg 
             focus:outline-none 
             focus:ring-2 focus:ring-[#dfa26d] 
             focus:border-transparent shadow-2xl"
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg 
             focus:outline-none 
             focus:ring-2 focus:ring-[#dfa26d] 
             focus:border-transparent resize-none  shadow-2xl"
            />

            <button
              type="submit"
              className="w-full bg-[#dfa26d] cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-[#e98d3d] transition"
            >
              Send Message
            </button>
          </form>

          <div className="mt-6 space-y-2  ">
            <p className="font-semibold  text-center">Connect With Us:</p>

            <div className="flex gap-6 justify-center text-2xl">
              {/* WhatsApp */}
              <a
                href="https://api.whatsapp.com/send/?phone=7378021327&text=Hi%21+I+want+to+place+an+order.+Can+you+help+me+with+the+details%3F&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:scale-110 transition-transform"
                aria-label="Chat on WhatsApp"
              >
                <FaWhatsapp />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/Graphura.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:scale-110 transition-transform"
                aria-label="Visit Facebook page"
              >
                <FaFacebook />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/graphura.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:scale-110 transition-transform"
                aria-label="Visit Instagram profile"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18..."
            width="100%"
            height="100%"
            loading="lazy"
            className="h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
