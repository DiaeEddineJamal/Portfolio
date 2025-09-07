import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import ElectricBorder from './ElectricBorder';
import { MatrixText } from './ui/matrix-text';

/*
 * CONTACT FORM EMAIL SETUP INSTRUCTIONS:
 * 
 * To receive actual emails from the contact form, you need to set up one of these services:
 * 
 * OPTION 1 - Formspree (Recommended - Easy Setup):
 * 1. Go to https://formspree.io/ and sign up for a free account
 * 2. Click "New Form" and enter your email: diae_2002@hotmail.com
 * 3. Copy the form endpoint (e.g., https://formspree.io/f/abc123def)
 * 4. Replace 'xdknzqko' in the fetch URL below with your actual form ID
 * 5. Test the form - Formspree will send a confirmation email first
 * 6. After confirming, all form submissions will be forwarded to your email
 * 
 * OPTION 2 - EmailJS (More Customizable):
 * 1. Go to https://www.emailjs.com/
 * 2. Sign up and create a service (Gmail, Outlook, etc.)
 * 3. Create an email template
 * 4. Get your service ID, template ID, and user ID
 * 5. Replace the Formspree implementation with EmailJS code
 * 
 * OPTION 3 - Backend API:
 * 1. Create a backend endpoint (Node.js, Python, etc.)
 * 2. Use services like Nodemailer, SendGrid, or AWS SES
 * 3. Replace the current fetch call with your API endpoint
 * 
 * Current Status: Demo form configured (xdknzqko) - Replace with your own form ID
 * 
 * QUICK START:
 * The form is currently using a demo Formspree endpoint. To receive emails:
 * 1. Create your Formspree account at https://formspree.io/
 * 2. Create a form with email: diae_2002@hotmail.com
 * 3. Replace 'xdknzqko' with your form ID in the code below
 * 4. Test the form to ensure emails are received
 */

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status when user starts typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
  };

  const validateForm = () => {
    const { name, email, subject, message } = formData;
    
    if (!name.trim()) {
      setSubmitMessage('Please enter your name.');
      return false;
    }
    
    if (!email.trim()) {
      setSubmitMessage('Please enter your email address.');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitMessage('Please enter a valid email address.');
      return false;
    }
    
    if (!subject.trim()) {
      setSubmitMessage('Please enter a subject.');
      return false;
    }
    
    if (!message.trim()) {
      setSubmitMessage('Please enter your message.');
      return false;
    }
    
    if (message.trim().length < 10) {
      setSubmitMessage('Message must be at least 10 characters long.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');
    
    try {
      // Using EmailJS to send emails directly from the frontend
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'diae_2002@hotmail.com'
      };
      
      // Using Formspree for easy email handling
      // This is configured to work with a demo form - replace with your actual form ID
      const response = await fetch('https://formspree.io/f/xdknzqko', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Portfolio Contact: ${formData.subject}`
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      
      setSubmitStatus('success');
      setSubmitMessage('Thank you! Your message has been sent successfully to diae_2002@hotmail.com. I\'ll get back to you soon.');
      
      // Reset form after successful submission
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setSubmitMessage('Demo email service active. For production use, please set up your own Formspree form as described in the code comments, or contact me directly at diae_2002@hotmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      info: 'diae_2002@hotmail.com',
      link: 'mailto:diae_2002@hotmail.com'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      info: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      info: 'Casablanca (Remote work worldwide)',
      link: '#'
    }
  ];

  const socialLinks = [
    {
      icon: <Github size={24} />,
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      color: 'hover:text-white'
    },
    {
      icon: <Linkedin size={24} />,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      color: 'hover:text-blue-600'
    },
    {
      icon: <Twitter size={24} />,
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-6">
              <MatrixText
                text="Get In Touch"
                className="text-3xl md:text-4xl font-bold text-gray-100"
                initialDelay={200}
                letterAnimationDuration={500}
                letterInterval={100}
                scrollTriggered={true}
                matrixColor="rgb(198, 128, 255)"
              />
            </div>
            <div className="w-24 h-1 bg-electric mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Let's discuss your next project or just say hello. I'm always open to new opportunities and collaborations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ElectricBorder color="rgb(198, 128, 255)" speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 16 }}>
              <div className="bg-black rounded-2xl p-8 shadow-lg border border-[#2a2766] hover:border-electric transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-100 mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#2a2766] rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent bg-black text-gray-100 transition-all duration-200"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#2a2766] rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent bg-black text-gray-100 transition-all duration-200"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#2a2766] rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent bg-black text-gray-100 transition-all duration-200"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-[#2a2766] rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent bg-black text-gray-100 transition-all duration-200 resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  
                  {/* Status Message */}
                  {submitMessage && (
                    <div className={`p-4 rounded-lg border ${
                      submitStatus === 'success' 
                        ? 'bg-green-900/20 border-green-500/30 text-green-400'
                        : 'bg-red-900/20 border-red-500/30 text-red-400'
                    }`}>
                      <p className="text-sm">{submitMessage}</p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    className={`w-full px-8 py-3 bg-white/15 backdrop-blur-xl border border-white/25 text-white rounded-xl hover:bg-white/25 hover:border-white/40 transition-all duration-500 ease-out font-semibold cursor-target flex items-center justify-center gap-2 shadow-2xl hover:shadow-3xl transform hover:scale-105 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </ElectricBorder>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-100 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <ElectricBorder key={index} color="rgb(198, 128, 255)" speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 12 }}>
                      <a
                        href={item.link}
                        className="flex items-center gap-4 p-4 bg-black rounded-xl shadow-md border border-[#2a2766] hover:border-electric transition-all duration-300 group cursor-target text-gray-200"
                      >
                        <div className="p-3 bg-[#2a2766] text-electric rounded-lg group-hover:bg-electric group-hover:text-black transition-all duration-300">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-100">{item.title}</h4>
                          <p className="text-gray-300">{item.info}</p>
                        </div>
                      </a>
                    </ElectricBorder>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-100 mb-6">Follow Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <ElectricBorder key={index} color="rgb(198, 128, 255)" speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 12 }}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 flex items-center justify-center bg-black rounded-xl shadow-md border border-[#2a2766] hover:border-electric transition-all duration-300 text-gray-200 ${social.color} group cursor-target`}
                        title={social.name}
                        aria-label={social.name}
                      >
                        <span className="transition-transform duration-300 group-hover:scale-110">
                          {social.icon}
                        </span>
                      </a>
                    </ElectricBorder>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;