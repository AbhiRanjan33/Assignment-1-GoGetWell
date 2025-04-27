import React from 'react';
import { FaStar } from 'react-icons/fa';

const SocialProofSection: React.FC = () => {
  const logos = [
    { name: 'HealthCorp', src: '/img/logos/healthcorp.png' },
    { name: 'MediCare', src: '/img/logos/medicare.png' },
    { name: 'CarePlus', src: '/img/logos/careplus.png' },
    { name: 'WellnessHub', src: '/img/logos/wellnesshub.png' },
  ];

  const testimonials = [
    {
      quote: "GoGetWell.ai transformed our patient acquisition process. The AI tools are intuitive and effective.",
      author: "Dr. Sarah Thompson",
      role: "Chief Medical Officer, HealthCorp",
    },
    {
      quote: "The platform's ease of use and powerful features have doubled our lead conversion rates.",
      author: "James Patel",
      role: "Hospital Administrator, MediCare",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Trusted by Leading Healthcare Providers</h2>
          <p className="text-lg text-gray-600 mt-4">Join thousands of professionals who rely on GoGetWell.ai</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {logos.map((logo) => (
            <img
              key={logo.name}
              src={logo.src}
              alt={`${logo.name} logo`}
              className="h-12 opacity-60 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
              <p className="font-semibold text-gray-900">{testimonial.author}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;