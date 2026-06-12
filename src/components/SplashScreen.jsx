import logo from "../images/Logo.jpeg";

export default function SplashScreen() {
  return (
    <div className="splash-screen">

      <img
        src={logo}
        alt="CUTS"
        className="splash-logo"
      />

      <div className="cuts-container">

        <span className="letter c">
          C
        </span>

        <span className="letter u">
          U
        </span>

        <span className="letter t">
          T
        </span>

        <span className="letter s">
          S
        </span>

      </div>

      <p className="tagline">
        Healthy Food. Premium Lifestyle.
      </p>

    </div>
  );
}