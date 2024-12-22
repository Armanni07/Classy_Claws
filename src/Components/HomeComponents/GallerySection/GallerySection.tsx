import { useEffect, useRef } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaTiktok } from "react-icons/fa";

import "./GallerySection.scss";
import Photo from "../../../Assets/IMG_9434.jpg";
import Photo1 from "../../../Assets/IMG_9435.jpg";
import Photo2 from "../../../Assets/IMG_9436.jpg";
import Photo3 from "../../../Assets/IMG_8754.jpg";
import Photo4 from "../../../Assets/IMG_9448.jpg";
import { method } from "../../../Utils/Functions/Functions";

export const GallerySection = () => {
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
    <section ref={SectionRef} className="gallery-section">
      <span className="gallery-images">
        <span className="gallery-left">
          <img src={Photo} alt="" className="image top-left" />

          <img src={Photo1} alt="" className="image mid-left" />

          <img src={Photo2} alt="" className="image bottom-left" />
        </span>

        <span className="gallery-right">
          <img src={Photo3} alt="" className="image top-right" />

          <img src={Photo4} alt="" className="image bottom-right" />
        </span>
      </span>

      <span className="socials">
        <h1> Follow Classy Claws on All Socials</h1>

        <p>
          Stay in Touch With Our Latest Contents and Don't Hesitate to Shoot us
          a DM on any of our Socials
        </p>

        <span className="link insta">
          <h4>Follow Us On Instagram</h4> <FaInstagram />
        </span>

        <span className="link twitter">
          <h4>Follow Us On X</h4> <FaXTwitter />
        </span>

        <span className="link tiktok">
          <h4>Follow Us on TikTok</h4> <FaTiktok />
        </span>
      </span>
    </section>
  );
};
