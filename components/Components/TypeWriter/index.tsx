/* eslint-disable no-plusplus */
import { useEffect, useRef, useState } from "react";
import "./style.scss";

interface TypeWriterProps {
  text: Array<string>;
  period?: number;
}
const TypeWriter: React.FC<TypeWriterProps> = ({ text, period = 2000 }) => {
  const typeText = useRef(null);
  let loopNum = 0;
  let txt = "";
  let isDeleting = false;
  let interval;
  const tick = () => {
    const i = loopNum % text.length;
    const fullTxt = text[i];
    if (isDeleting) {
      txt = fullTxt.substring(0, txt.length - 1);
    } else {
      txt = fullTxt.substring(0, txt.length + 1);
    }
    typeText.current.innerHTML = `<span class="wrap">${txt}</span>`;
    let delta = 200 - Math.random() * 100;

    if (isDeleting) {
      delta /= 2;
    }

    if (!isDeleting && txt === fullTxt) {
      delta = period;
      isDeleting = true;
    } else if (isDeleting && txt === "") {
      isDeleting = false;
      loopNum++;
      delta = 500;
    }

    interval = setTimeout(() => {
      tick();
    }, delta);
  };

  useEffect(() => {
    tick();
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="typewrite" ref={typeText}>
      {txt}
    </h1>
  );
};

export default TypeWriter;
