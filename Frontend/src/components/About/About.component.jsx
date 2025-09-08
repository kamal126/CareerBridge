import React from "react";
import "./style.css"

function About() {
  return (
    <>
      <div className="bg-white w-full flex flex-col sm:flex-row sm:mt-5 min-h-screen p-6 items-center justify-center sm:justify-around ">

        {/* left text section */}
        <div className="max-w-xl text-gray-500 dark:text-gray-400 text-sm mb-6 sm:mb-0 sm:mr-6">
          <p>
            Hello, I’m Dr. Prerna Mishra. Me and my team are here to guide you
            on your journey to pursue MBBS in Russia. Having been in your shoes
            not too long ago, I understand the excitement, confusion and
            challenges that come with making such a big decision. This personal
            experience is what drives me to ensure that students like you have
            the smoothest, most trustworthy path to achieving your dreams.</p>
          <p className="mt-4">
            My team includes dedicated professionals and experienced doctors who
            are here to support you every step of the way. From helping you
            choose the right university to managing the admission process,
            documentation, and visa requirements, we take care of it all. Even
            after you’ve secured your seat, we remain by your side, providing
            guidance and support throughout your academic journey.</p>
          <p className="mt-4">
            Unlike many consultancies that make false promises and mislead
            students, I’ve built this initiative on honesty, transparency and
            integrity. I know what it’s like to face uncertainty during this
            process and my goal is to provide the kind of reliable guidance I
            wished for when I began my own MBBS journey in Russia. With my team
            and me by your side, you can trust that you’re in safe hands.
            Together, we’ll make your dream of becoming a doctor a reality.
            Let’s take this first step toward your future, together.”
          </p>
        </div>
        {/* right image section */}
        <div className="flex justify-center sm:justify-start">
          <img
            className="w-64 h-auto sm:w-auto sm:h-auto rounded-lg shadow-md animate-wiggle"
            src="about.png"
            alt="About Image"
          />
        </div>
      </div>
    </>
  );
}

export default About;
