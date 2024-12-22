import { useEffect, useRef } from "react";

import "./CTASection.scss";
import Photo from "../../../Assets/IMG_9433.jpg";
import { method } from "../../../Utils/Functions/Functions";
import { Link } from "react-router-dom";

export const CTASection = () => {
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
  });

  return (
    <section ref={SectionRef} className="cta-section">
      <span className="cta-left">
        <h1>Classy Nails Are Just a Click Away</h1>
        <p>
          Our Release include limited-edition collections based on trending
          themes or seasons, such as pop culture themes, or popular art styles.
        </p>

        <Link to={"/products"}>
          <span className="cta-button">View More</span>
        </Link>
      </span>

      <span className="cta-right">
        <span className="cta-image">
          <img src={Photo} alt="" />
        </span>
      </span>
    </section>
  );
};
