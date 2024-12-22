import { useEffect, useRef } from "react";

import "./Footer.scss";
import Logo from "../../Assets/CC-Logo-Dark.png";
import { method } from "../../Utils/Functions/Functions";

export const Footer = () => {
  const SectionRef = useRef<HTMLElement>(null);

  const ViewOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      method.SectionObserver,
      ViewOptions
    );
    observer.observe(SectionRef.current as HTMLElement);
    return () => observer.disconnect();
  });

  return (
    <section ref={SectionRef} className="footer">
      <span className="footer-left">
        <img src={Logo} alt="" />
        <p>Keep Up With Our New Releases, Nail Tech Tips and Stay Classy :)</p>
      </span>

      <span className="footer-right">
        <h3>Contact Us:</h3>
        <h4>Phone: +233504599919</h4>
        <h4> Email: Classyclaws777@gmail.com</h4>
      </span>
    </section>
  );
};
