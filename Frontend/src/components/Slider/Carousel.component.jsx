// src/components/ImageSlider.jsx
import { useEffect, useRef } from "react";
import "./Carousel.css" // pura CSS idhar daalna jo tumne diya hai

const images = [
  { src: "img1.jpeg", title: "GALGOTIAS UNIVERSITY", name: "" },
  { src: "img2.jpeg", title: "SHARDHA UNIVERSITY", name: "" },
  { src: "img3.jpeg", title: "NISU", name: "" },
  { src: "img4.jpeg", title: "NSUT", name: "" },
  { src: "img5.jpeg", title: "J.L. Bajal", name: "" },
  { src: "img6.jpeg", title: "GALGOTIAS COLLEGE", name: "" },
  { src: "img7.jpeg", title: "IP UNIVERSITY", name: "" },
];

export default function ImageSlider() {
  const carouselRef = useRef(null);
  const listRef = useRef(null);
  const runningTimeRef = useRef(null);

  const timeRunning = 3000;
  const timeAutoNext = 7000;
  let runTimeOut = useRef(null);
  let runNextAuto = useRef(null);

  useEffect(() => {
    resetTimeAnimation();
    runNextAuto.current = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);

    return () => {
      clearTimeout(runNextAuto.current);
      clearTimeout(runTimeOut.current);
    };
  }, []);

  const resetTimeAnimation = () => {
    const bar = runningTimeRef.current;
    if (bar) {
      bar.style.animation = "none";
      bar.offsetHeight; // force reflow
      bar.style.animation = null;
      bar.style.animation = "runningTime 7s linear 1 forwards";
    }
  };

  const showSlider = (type) => {
    const carousel = carouselRef.current;
    const list = listRef.current;
    const sliderItemsDom = list.querySelectorAll(".carousel .list .item");

    if (type === "next") {
      list.appendChild(sliderItemsDom[0]);
      carousel.classList.add("next");
    } else {
      list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
      carousel.classList.add("prev");
    }

    clearTimeout(runTimeOut.current);

    runTimeOut.current = setTimeout(() => {
      carousel.classList.remove("next");
      carousel.classList.remove("prev");
    }, timeRunning);

    clearTimeout(runNextAuto.current);
    runNextAuto.current = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);

    resetTimeAnimation();
  };

  return (
    <>
      {/* Carousel */}
      <div className="carousel " ref={carouselRef}>
        <div className="list" ref={listRef}>
          {images.map((img, idx) => (
            <div
              className="item"
              key={idx}
              style={{ backgroundImage: `url(${img.src})` }}
            >
              <div className="content">
                <div className="title">{img.title}</div>
                <div className="name">{img.name}</div>
                <div className="des">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Officiis culpa similique consequuntur, reprehenderit dicta
                  repudiandae.
                </div>
                <div className="btn">
                  <button>See More</button>
                  <button>Subscribe</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="arrows ">
          <button className="prev" onClick={() => showSlider("prev")}>
            &lt;
          </button>
          <button className="next" onClick={() => showSlider("next")}>
            &gt;
          </button>
        </div>

        {/* Running Time */}
        <div className="timeRunning" ref={runningTimeRef}></div>
      </div>
    </>
  );
}
