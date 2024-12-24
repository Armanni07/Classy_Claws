import { useEffect, useRef } from "react";

import "./AboutSection.scss";
import { useAuth } from "../../../Hooks/UseAuth";
import Photo1 from "../../../Assets/IMG_9473.jpg";
import { method } from "../../../Utils/Functions/Functions";
import { ClickType } from "../../../Utils/Types/FunctionTypes";

export const AboutSection = ({ click, setClick }: ClickType) => {
  const { loggedIn } = useAuth();

  const SectionRef = useRef<HTMLElement>(null);

  const ViewOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      method.SectionObserver,
      ViewOptions
    );

    observer.observe(SectionRef.current as HTMLElement);
  });

  return (
    <section ref={SectionRef} className="about-section">
      <img src={Photo1} alt="" />

      <span className="info-card">
        <h3>Premium Customizable Sets</h3>
        <p>
          In the future, we aim to provide Customizable nail sets are a unique
          offering that can instantly differentiate our brand. Allowing our
          customers to select length, shape, and color gives them a personalized
          experience that feels high-end and tailored to their preferences,
          making it a memorable and engaging product.
        </p>
      </span>

      <span className="info-card">
        <h3>Quality and Durability Assurance</h3>
        <p>
          We Emphasize the quality and durability of Our products, offering a
          satisfaction guarantee . Our products Highlight chip resistance and
          fade-proof colors, building credibility and making our brand
          synonymous with long-lasting quality for our Customers.
        </p>
      </span>

      <span className="info-card">
        <h3>Loyalty Program with Exclusive Perks</h3>
        <p>
          We offer a loyalty program that rewards your purchases and all Your
          social media shares. Points can be redeemed for discounts, early
          access, or small perks, fostering Your loyalty and encouraging
          engagement with us from the start.
        </p>

        {!loggedIn && (
          <span className="info-card-register">
            <h2>Sign Up With Us for Classy Discounts!!</h2>

            <button onClick={() => method.click({ click, setClick })}>
              Sign Up
            </button>
          </span>
        )}
      </span>
    </section>
  );
};
