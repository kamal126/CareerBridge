import React from "react";

function University() {
  return (
    <>
      <div className="flex">
        <div className="w-[5%] "></div>
        <section className="px-6 md:px-20 py-12 p-6">
          <div className="max-w-4xl">
            <h4 className="text-pink-500 font-semibold text-xl mb-3">
              University
            </h4>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              Visit University
            </h2>

            <div className="w-14 h-1 bg-blue-600 mb-6"></div>

            <p className="text-gray-600  text-base md:text-lg">
              We are dedicated to providing world-class education, fostering
              innovation, and shaping leaders of tomorrow. With a diverse range
              of programs, state-of-the-art facilities, and a vibrant campus
              life, we create an environment that inspires growth, creativity,
              and success.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default University;
