import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import "../css/Navbar.css";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <h3></h3>
      <nav ref={navRef}>
        <a href="/">Home</a>
        <a href="/ImagePredict">Image Predicter</a>
        <a href="/ImageConverter">Image Converter</a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FontAwesomeIcon className="fontAS" icon={faArrowUpFromBracket} />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FontAwesomeIcon className="fontAS" icon={faArrowUpFromBracket} />
      </button>
    </header>
  );
}

export default Navbar;
