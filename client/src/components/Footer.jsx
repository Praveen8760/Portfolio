import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';
import emailjs from 'emailjs-com';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      "service_oxmaccp",   
      "template_rrqruvk",  
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      },
      "ZSlhxQ2AjaRGYIjFy"
    )
    .then(() => {
      alert("✅ Message sent successfully!");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setLoading(false);
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("❌ Failed to send message. Please try again later.");
      setLoading(false);
    });
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-black border-t border-orange-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto px-4">
            Let's connect and discuss opportunities, projects, or just have a chat about technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column - Contact Info */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            {/* Contact Information */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-white">
                Contact Information
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {/* Email */}
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="bg-orange-100 p-2.5 sm:p-3 rounded-full flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-white text-sm sm:text-base">Email</p>
                    <p className="text-slate-400 text-sm sm:text-base break-all sm:break-normal">
                      praveen890340@gmail.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="bg-orange-100 p-2.5 sm:p-3 rounded-full flex-shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-white text-sm sm:text-base">Phone</p>
                    <p className="text-slate-400 text-sm sm:text-base">+91 70941 80341</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="bg-orange-100 p-2.5 sm:p-3 rounded-full flex-shrink-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-white text-sm sm:text-base">Location</p>
                    <p className="text-slate-400 text-sm sm:text-base">Chennai, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">
                Connect with me
              </h4>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="https://github.com/Praveen8760"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-md border border-orange-400 bg-dark hover:border-white hover:text-orange-400 transition-colors"
                >
                  <Github className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/praveenthirumurthy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-md border border-orange-400 bg-dark hover:border-white hover:text-orange-400 transition-colors"
                >
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </a>
                <a
                  href="mailto:praveen890340@gmail.com"
                  className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-md border border-orange-400 bg-dark hover:border-white hover:text-orange-400 transition-colors"
                >
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </a>
              </div>
            </div>

            {/* Resume Download */}
            <div className="rounded-lg border border-orange-400 bg-dark shadow-sm">
              <div className="p-4 sm:p-6">
                <div className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 text-white">
                  Download Resume
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6">
                  Get a copy of my latest resume with detailed information about my experience and skills.
                </div>
                <a href="https://drive.google.com/uc?export=download&id=1Ajvk_0HThtboY2GPpH85RTFjlpZfgwYk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <button className="w-full bg-orange-400 text-white px-4 py-2.5 sm:py-3 rounded-md font-medium hover:bg-orange-500 transition-colors text-sm sm:text-base">
                    Download Resume (PDF)
                  </button>
                </a>
              </div>
            </div>
          </div>
          
          {/* Right Column - Contact Form */}
          <div className="rounded-lg border border-orange-400 bg-dark shadow-sm order-1 lg:order-2">
            <div className="p-4 sm:p-6">
              <div className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 text-white">
                Send me a message
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6">
                Fill out the form below and I'll get back to you as soon as possible.
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                      className="w-full px-3 py-2 sm:py-2.5 border border-slate-600 rounded-md bg-dark text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="w-full px-3 py-2 sm:py-2.5 border border-slate-600 rounded-md bg-dark text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-white">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    required
                    className="w-full px-3 py-2 sm:py-2.5 border border-slate-600 rounded-md bg-dark text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message..."
                    rows={4}
                    required
                    className="w-full px-3 py-2 sm:py-2.5 border border-slate-600 rounded-md bg-dark text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-400 text-white px-4 py-2.5 sm:py-3 rounded-md font-medium hover:bg-orange-500 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50"
                >
                  {loading ? "Sending..." : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark border-t border-orange-400 mt-8 sm:mt-12 lg:mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-fairy mb-1 sm:mb-2 text-orange-400 font-bold">
                Praveen
              </h3>
              <p className="text-slate-400 mt-2 text-xs sm:text-sm">
                Aspiring Software Developer | Building the future with code
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-4 sm:mt-6 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-slate-400">
            © {new Date().getFullYear()} Praveen. All rights reserved.
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
