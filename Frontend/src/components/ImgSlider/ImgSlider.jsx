import React, { useEffect, useRef } from "react";
import "./Slider.css";
import { slider } from "../data";

function ImgSlider() {
  const carouselRef = useRef(null);
  const listRef = useRef(null);
  const runningTimeRef = useRef(null);
  const runTimeOut = useRef(null);
  const runNextAuto = useRef(null);

  const timeRunning = 3000;
  const timeAutoNext = 7000;

  const resetTimeAnimation = () => {
    if (!runningTimeRef.current) return;
    runningTimeRef.current.style.animation = "none";
    runningTimeRef.current.offsetHeight; // force reflow
    runningTimeRef.current.style.animation = null;
    runningTimeRef.current.style.animation =
      "runningTime 7s linear 1 forwards";
  };

  const showSlider = (type) => {
    const list = listRef.current;
    const carousel = carouselRef.current;
    let sliderItemsDom = list.querySelectorAll(".item");

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

  useEffect(() => {
    resetTimeAnimation();
    runNextAuto.current = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);

    return () => {
      clearTimeout(runTimeOut.current);
      clearTimeout(runNextAuto.current);
    };
  }, []);

  return (
    <div className="carousel" ref={carouselRef}>
      <div className="list" ref={listRef}>
        {Object.values(slider).map((item, index) => (
          <div
            className="item"
            style={{ backgroundImage: `url(${item.url})` }}
            key={index}
          >
            <div className="content">
                <div className="title">{item.title}</div>
                <div className="name">{item.name}</div>
                <div className="des">{item.des}</div>
                <div className="btn">
                    <button>See More</button>
                    <button>Subscribe</button>
                </div>
            </div>
          </div>
        ))}
        </div>
        <div className="arrows">
        <button className="prev" onClick={() => showSlider("prev")}>
          &lt;
        </button>
        <button className="next" onClick={() => showSlider("next")}>
          &gt;
        </button>
      </div>

      <div className="timeRunning" ref={runningTimeRef}></div>
    </div>
    
  );
}

export default ImgSlider;
