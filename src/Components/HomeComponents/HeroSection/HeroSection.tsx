import { Link } from "react-router-dom";
import { PiShoppingBagFill } from "react-icons/pi";
import { FaCircle, FaPlayCircle } from "react-icons/fa";

import "./HeroSection.scss"
import Photo from "../../../Assets/IMG_9432.jpg";

export const HeroSection = () => {
  return (
    <section className="hero-section">
      <span className="hero-left">
        <p>Get Prettier in Minutes</p>

        <h2>
          We Provide a wide Range of Elegant & Beautiful Hand Accessories from
          Around The World.
        </h2>

        <Link to={"/products"} className="shop">
          <span className="shop-text">SHOP NOW</span>
          <PiShoppingBagFill />
        </Link>
      </span>

      <span className="hero-right">
        <img src={Photo} alt="" />

        <span className="ad">
          <h3>Nail Tech tutorials</h3>

          <p>
            We Provide Fully Detailed Video Tutorials on how to Install and Enhance
            Your Beautiful Nails, All from The comfort of Your Home.
          </p>

          <button className="button-link">
            <FaCircle className="circle" />
            <FaPlayCircle size={60} />
          </button>
        </span>

        <p className="background-text">Classy</p>
      </span>
    </section>
  );
};
