import { useState } from "react";

import "./Home.scss";
import { Footer } from "../../Components/Footer/Footer";
import { CTASection } from "../../Components/HomeComponents/CTASection/CTASection";
import { HeroSection } from "../../Components/HomeComponents/HeroSection/HeroSection";
import { AboutSection } from "../../Components/HomeComponents/AboutSection/AboutSection";
import { ReviewSection } from "../../Components/HomeComponents/ReviewSection/ReviewSection";
import { GallerySection } from "../../Components/HomeComponents/GallerySection/GallerySection";
import { Login } from "../../Components/Auth/Login/Login";
import { Register } from "../../Components/Auth/Register/Register";

export const Home = () => {
  const [login, setLogin] = useState<boolean>(false);
  const [register, setRegister] = useState<boolean>(false);

  return (
    <div className="home">
      <HeroSection />

      <AboutSection click={register} setClick={setRegister} />

      <ReviewSection login={login} setLogin={setLogin} />

      {login && <Login click={login} setClick={setLogin} />}
      {register && <Register click={register} setClick={setRegister} />}

      <CTASection />

      <GallerySection />

      <Footer />
    </div>
  );
};
