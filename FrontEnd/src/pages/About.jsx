import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import Learn1 from '../Assets/learn1.png'; 
import Learn2 from '../Assets/learn2.png'; 
import { Globe, BookOpen, Users, Brain, CalendarDays, Mail, MapPin , Phone , CheckCircle } from 'lucide-react';



const About = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending the message with redirection
    setTimeout(() => {
      setLoading(false);
      navigate('/thank-you');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Side background color */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-[-1] bg-[#1E3A8A] w-full h-full"></div>
      
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white relative z-10">
        
        {/* Introduction Section */}
        <section className="mb-25 mt-28">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-20" style={{ transform: 'translateY(-30px)' }}>
            WELCOME TO <span className='text-blue-600'>LearnCodeLab</span> – LEARN PROGRAMMING
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch min-h-[500px]">
            
            {/* Left text */}
            <div className="space-y-4 text-gray-700 text-left h-full">
              <p className="leading-relaxed">
                <b>LearnCodeLab</b> is a programming learning platform that delivers knowledge in a simple and practical way. Learn JavaScript, Python, HTML/CSS, and much more!
              </p>
              <p className="leading-relaxed">
                With us, you'll create real projects and go from beginner to pro!
              </p>

              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">What LearnCodeLab offers:</h2>
                <ul className="space-y-3">
                  <li className="flex items-start"><CheckCircle className="text-gray-500 w-5 h-5 mr-2 mt-1" /><span>Video courses in Darija and French</span></li>
                  <li className="flex items-start"><CheckCircle className="text-gray-500 w-5 h-5 mr-2 mt-1" /><span>Practical exercises on a code editor</span></li>
                  <li className="flex items-start"><CheckCircle className="text-gray-500 w-5 h-5 mr-2 mt-1" /><span>Support via WhatsApp and Discord</span></li>
                  <li className="flex items-start"><CheckCircle className="text-gray-500 w-5 h-5 mr-2 mt-1" /><span>Certificates upon course completion</span></li>
                </ul>
              </div>
            </div>

            {/* Right image */}
            <div className="w-full h-full flex items-stretch">
              <img src={Learn1} alt="LearnCodeLab" className="rounded shadow-lg w-full object-cover h-full" />
            </div>
          </div>
        </section>

        {/* Key Stats Section */}
        <section className="my-16">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-12">OUR KEY NUMBERS</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <Globe className="text-blue-600 text-3xl mx-auto mb-3" />
              <h3 className="text-4xl font-bold text-gray-800 mb-2">6</h3>
              <p className="text-gray-700">Available languages (French, English...)</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <BookOpen className="text-blue-600 text-3xl mx-auto mb-3" />
              <h3 className="text-4xl font-bold text-gray-800 mb-2">15</h3>
              <p className="text-gray-700">Quality programming courses</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <Users className="text-blue-600 text-3xl mx-auto mb-3" />
              <h3 className="text-4xl font-bold text-gray-800 mb-2">5,000+</h3>
              <p className="text-gray-700">Students already enrolled</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <Brain className="text-blue-600 text-3xl mx-auto mb-3" />
              <h3 className="text-4xl font-bold text-gray-800 mb-2">100%</h3>
              <p className="text-gray-700">Interactive and well-explained exercises</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <CalendarDays className="text-blue-600 text-3xl mx-auto mb-3" />
              <h3 className="text-4xl font-bold text-gray-800 mb-2">2021</h3>
              <p className="text-gray-700">Platform launch year</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <Mail className="text-blue-600 text-3xl mx-auto mb-3" />
              <h3 className="text-4xl font-bold text-gray-800 mb-2">24/7</h3>
              <p className="text-gray-700">Support available anytime</p>
            </div>
          </div>
        </section>

        {/* Image + Text Section */}
        <section className="mb-16">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-20">
            LEARNING DESIGNED FOR YOU!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[500px]">
            <div className="w-full h-full flex items-stretch">
              <img src={Learn2} alt="Interactive Courses" className="rounded shadow-lg w-full object-cover h-full" />
            </div>

            <div className="space-y-4 text-gray-700 text-left h-full">
              <p className="leading-relaxed">
                With <b>LearnCodeLab</b>, you can learn anytime, anywhere: from a computer, phone, or tablet.
              </p>
              <p className="leading-relaxed">
                The interface is simple, and everything is explained in Darija for better understanding.
              </p>

              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Why choose us?</h2>
                <ul className="space-y-3">
                  <li className="flex items-start"><CheckCircle className="text-gray-500 w-5 h-5 mr-2 mt-1" /><span>Support and interaction with teachers</span></li>
                  <li className="flex items-start"><CheckCircle className="text-gray-500 w-5 h-5 mr-2 mt-1" /><span>Real-world projects in each course</span></li>
                  <li className="flex items-start"><CheckCircle className="text-gray-500 w-5 h-5 mr-2 mt-1" /><span>Training tailored to the job market</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="mt-16 mb-16">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-12">ASK A QUESTION OR SEND A MESSAGE</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#f5f3f4] p-6 rounded shadow-md">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Your name" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                <input type="email" placeholder="Your email" className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
                <textarea placeholder="Your question or message" className="w-full px-4 py-2 border border-gray-300 rounded-md" required />
                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer">
                    {loading ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-[#f5f3f4] p-6 rounded shadow-md space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact Us</h3>
                <p className="text-gray-700">Our dynamic and multilingual team is here to assist you with your needs.</p>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="text-blue-600 text-xl mt-1"/>
                <div>
                  <h4 className="font-medium text-gray-800">Phone</h4>
                  <p className="text-gray-700">+212 6 18 76 91 58</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="text-blue-600 text-xl mt-1"/>
                <div>
                  <h4 className="font-medium text-gray-800">Address</h4>
                  <p className="text-gray-700">
                    LearnCodeLab Morocco<br />
                    3rd Floor, TechPark Residence<br />
                    Mohammed VI Avenue, Marrakech 40000, Morocco
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
