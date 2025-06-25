import React, { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`main-header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">IstanbulLore</div>

      {/* Desktop Nav */}
      <div className="desktop-nav">
        <a href="/">Home</a>
        <a href="#stories">Stories</a>
        <a href="#raffle">Raffle</a>
      </div>

      {/* Mobile Nav */}
      <nav className="mobile-nav">
        <button className="menu-toggle">☰</button>
        <div className="menu-items">
          <a href="/">Home</a>
          <a href="#stories">Stories</a>
          <a href="#raffle">Raffle</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
