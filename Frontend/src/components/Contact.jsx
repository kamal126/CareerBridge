import React from 'react';
import { state } from './data';

function Contact() {
  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start px-6 md:px-12 gap-10">
        {/* left section */}
        <div className="flex-1 bg-blue-600 text-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">
            Contact Our Education Experts Now!
          </h3>
          <form className="space-y-4 border-0" >
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full p-3 rounded border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full p-3 rounded border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Number"
              required
              className="w-full p-3 rounded border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              name="Country"
              className="w-full p-3 rounded border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="India">India</option>
            </select>
            <select
              name="State"
              className="w-full p-3 rounded border border-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {Object.values(state).map((item, idx) => (
                <option value={item} key={idx} className='text-white bg-blue-500'>
                  {item}
                </option>
              ))}
            </select>
            <input
              type="button"
              value="Apply Now"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded cursor-pointer transition"
            />
          </form>
        </div>

        {/* right Section */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <span className="text-sm text-gray-500 uppercase tracking-wider">Contact Information</span>
            <h2 className="text-3xl font-bold mt-2 mb-4">Get in Touch with Us Today!</h2>
            <p className="text-gray-600">
              We’re here to help! Reach out for inquiries, support, or collaboration, and let’s create something amazing.
            </p>
          </div>

          <div className="flex items-start gap-4">
            <img src="phone.svg" alt="phone" className="w-6 h-6" />
            <div>
              <span className="block font-semibold text-gray-700">Phone Number</span>
              <span className="text-gray-500">Call us: +91-7268668989</span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <img src="email.svg" alt="email" className="w-6 h-6" />
            <div>
              <span className="block font-semibold text-gray-700">Email Address</span>
              <span className="text-gray-500">careerbridge243301@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
