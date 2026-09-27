import React, { useState } from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Instagram, Facebook, Twitter, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Contact = () => {
  const { setToastMessage } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setToastMessage('Thank you! Your message has been sent to our baristas.');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <div className="pt-28 pb-16 space-y-16">
      
      {/* Title */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Get in Touch"
          title="Contact AromaCraft Coffee Co."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Contact Info & Map Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info Box */}
            <div className="bg-white rounded-3xl border border-coffee-200/80 shadow-coffee-soft p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-xl font-bold text-coffee-950 border-b border-coffee-100 pb-3">
                Visit Our Coffee Shop
              </h3>

              <div className="space-y-4 text-sm text-coffee-700">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-coffee-100 flex items-center justify-center text-coffee-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-coffee-950">Address</h4>
                    <p className="text-coffee-600">15 Road 9, Maadi District, Cairo, Egypt</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-coffee-100 flex items-center justify-center text-coffee-700 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-coffee-950">Phone & WhatsApp</h4>
                    <p className="text-coffee-600">+20 100 888 9900</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-coffee-100 flex items-center justify-center text-coffee-700 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-coffee-950">Email Us</h4>
                    <p className="text-coffee-600">hello@aromacraftcoffee.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-coffee-100">
                  <div className="w-10 h-10 rounded-xl bg-coffee-100 flex items-center justify-center text-coffee-700 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-coffee-950">Opening Hours</h4>
                    <p className="text-coffee-600">Mon - Sun: 7:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-coffee-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-coffee-400 mb-3">Connect With Us</h4>
                <div className="flex items-center gap-3">
                  <a href="#instagram" className="p-3 rounded-xl bg-coffee-100 hover:bg-coffee-900 text-coffee-800 hover:text-white transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#facebook" className="p-3 rounded-xl bg-coffee-100 hover:bg-coffee-900 text-coffee-800 hover:text-white transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#twitter" className="p-3 rounded-xl bg-coffee-100 hover:bg-coffee-900 text-coffee-800 hover:text-white transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Styled Map Placeholder */}
            <div className="bg-coffee-900 text-white rounded-3xl p-6 border border-coffee-800 shadow-md space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Map Preview</span>
                <span className="text-[11px] text-coffee-300">Maadi Branch</span>
              </div>
              <div className="h-40 rounded-2xl bg-coffee-800 flex flex-col items-center justify-center text-center p-4 space-y-2 border border-coffee-700/80">
                <MapPin className="w-8 h-8 text-amber-400 animate-bounce" />
                <p className="text-xs text-coffee-200 font-semibold">15 Road 9, Maadi, Cairo</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] bg-coffee-700 hover:bg-coffee-600 text-amber-200 px-3 py-1 rounded-lg font-bold transition-colors"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>

          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-coffee-200/80 shadow-coffee-soft p-6 sm:p-10 space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-coffee-950">Send Us a Message</h3>
              <p className="text-xs text-coffee-600">Have a question about our coffee beans, catering, or feedback?</p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-emerald-900">Message Received!</h4>
                <p className="text-xs text-emerald-700">
                  Thank you for reaching out to AromaCraft Coffee Co. Our customer care team will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-coffee-700 uppercase">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Layla Ahmed"
                      className="w-full bg-coffee-50 border border-coffee-200 text-sm p-3 rounded-xl text-coffee-900 focus:outline-none focus:border-coffee-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-coffee-700 uppercase">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="layla@example.com"
                      className="w-full bg-coffee-50 border border-coffee-200 text-sm p-3 rounded-xl text-coffee-900 focus:outline-none focus:border-coffee-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-coffee-700 uppercase">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+20 100 000 0000"
                      className="w-full bg-coffee-50 border border-coffee-200 text-sm p-3 rounded-xl text-coffee-900 focus:outline-none focus:border-coffee-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-coffee-700 uppercase">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-coffee-50 border border-coffee-200 text-sm p-3 rounded-xl text-coffee-900 focus:outline-none focus:border-coffee-500"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Catering & Events">Catering & Events</option>
                      <option value="Wholesale Beans">Wholesale Beans</option>
                      <option value="Feedback">Feedback / Review</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-coffee-700 uppercase">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your inquiry or coffee order questions here..."
                    className="w-full bg-coffee-50 border border-coffee-200 text-sm p-3 rounded-xl text-coffee-900 focus:outline-none focus:border-coffee-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-coffee-900 hover:bg-coffee-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-coffee-glow flex items-center justify-center gap-2 transition-all text-sm"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Send Message</span>
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
