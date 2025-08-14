import React, {useState} from "react";

function About() {
  const [readMore, setReadMore] = useState(false);

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center px-6 md:px-12 gap-10">
        
        {/* Left Section */}
        <div className="flex-1">
          <h3 className="text-xl text-pink-600 font-semibold">
            Passion. Vision. Commitment
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
            About Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hello, I’m <b className="text-green-600 underline">Kamal Chandra</b>. My team and I are here to guide you on
            your journey to pursue Engineering in Delhi NCR. Having been in your shoes not
            too long ago, I understand the excitement, confusion, and challenges
            that come with making such a big decision.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            My team includes dedicated professionals and experienced engineers and Seniors who
            are here to support you every step of the way — from choosing the
            right university to managing the admission process, documentation,
            and visa requirements. Even after you’ve secured your seat, we remain
            by your side, providing guidance throughout your academic journey.
          </p>
          {/* Read More Section */}
          {readMore && (
            <p id="optionable" className="text-gray-700 leading-relaxed mb-4">
            Unlike many consultancies that make false promises, I’ve built this
            initiative on honesty, transparency, and integrity. With my team and
            me by your side, you can trust that you’re in safe hands. Together,
            we’ll make your dream of becoming a doctor a reality.
          </p>
          )}
          {/* tofggle button */}
          <button 
          onClick={() => setReadMore(!readMore)}
          className="mt-2 text-blue-600 font-semibold hover:text-red-600 focus:outline-none"
          >
            {readMore ? "Collepse_ -" : "Read More_ +"}
          </button>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex justify-center">
          <img
            src="/assets/scoler.png"
            className="w-40 h-auto md:w-64 lg:w-80 object-contain"
            alt="Student holding graduation scroll"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
