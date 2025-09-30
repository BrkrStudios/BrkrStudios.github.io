"use client";
import React from "react";
import Script from "next/script";

const HomePage = () => {
  React.useEffect(() => {
    const text = document.querySelector(".sec-text");
    const textLoad = () => {
      setTimeout(() => {
        text.textContent = "a Developer";
      }, 0);
      setTimeout(() => {
        text.textContent = "a Photographer";
      }, 4000);
      setTimeout(() => {
        text.textContent = "a Creator";
      }, 8000); // 1s = 1000 milliseconds
    };
    textLoad();
    setInterval(textLoad, 12000);
  }, []);

  const openContactForm = () => {
    const contactWrapper = document.querySelector(".contact-wrapper");
    contactWrapper.style.display = "flex";
    setTimeout(() => {
      contactWrapper.classList.add("active");
    }, 10);
  };

  const toggleMenu = () => {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("active");
  };

  const validateForm = () => {
    // Basic validation, can be expanded
    return true;
  };
  return (
    <>
      <Script src="/scripts.js" />
      <a
        href="javascript:void(0);"
        className="top-right-contact"
        onClick={openContactForm}
      >
        Contact
      </a>
      {/* Hero Section including Header */}
      <section className="hero">
        {/* Navigation and Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          &#9776;
        </div>
        <nav className="navbar">
          <ul className="nav-menu" id="navMenu">
            <li>
              <a href="#top">Home</a>
            </li>
            <li>
              <a href="#milliLife">MilliLife</a>
            </li>
            <li>
              <a href="#aboutBrkrStudios">BrkrStudios</a>
            </li>
            <li>
              <a href="#partners">Partners</a>
            </li>
            <li>
              <a href="#meetTheCreator">Me</a>
            </li>
            <button className="btnLogin-popup">Contact</button>
          </ul>
        </nav>
        {/* Hero Content */}
        <div id="hero-content" className="hero-content">
          <h1>BrkrStudios</h1>
          <div className="container">
            <span className="text sec-text"></span>
          </div>
          <div className="image-buttons">
            <div className="button-wrapper">
              <a href="#milliLife">
                <img src="sunsetblvd.jpg" alt="MilliLife" />
              </a>
              <p className="button-label">MilliLife</p>
            </div>
            <div className="button-wrapper">
              <a href="#aboutBrkrStudios">
                <img src="aboutbrkr.jpg" alt="About BrkrStudios" />
              </a>
              <p className="button-label">About BrkrStudios</p>
            </div>
            <div className="button-wrapper">
              <a href="#partners">
                <img
                  src="Screenshot 2024-11-13 at 7.53.28 PM.png"
                  alt="Partners"
                />
              </a>
              <p className="button-label">Partners</p>
            </div>
            <div className="button-wrapper">
              <a href="#meetTheCreator">
                <img src="creator1.jpg" alt="Meet the Creator" />
              </a>
              <p className="button-label">About Me</p>
            </div>
            {/* <div className="button-wrapper">
            <a href="#photography"><img src="photosicon.jpg" alt="photography"></a>
            <p className="button-label">Photography</p>
            </div> */}
          </div>
        </div>
      </section>
      <section
        id="milliLife"
        className="MilliLife"
        style={{ backgroundImage: "url('sunsetblvdmaxed.jpg')" }}
      >
        <div className="milli-container">
          <div className="milli-text">
            <h2>MilliLife: Time Is Of The Essence</h2>
            <p>
              MilliLife transforms your perception of time by calculating your
              exact age down to the millisecond. With features like Docked View,
              Age Skip, countdowns, real-time widgets, and zero data
              collection, MilliLife helps you track your life’s moments with
              precision, all while keeping your data secure. Make every second
              count.
            </p>
            {/* Centered Get The App Button */}
            <a
              href="https://apps.apple.com/us/app/millilife/id6468538447"
              target="_self"
              className="milli-link"
            >
              <img src="appclick.jpg" alt="App Store Logo" className="app-logo" />
              Get The App
            </a>
          </div>
        </div>
      </section>
      <section id="aboutBrkrStudios" className="AboutBrkrStudios">
        <div className="about-container">
          <h2>About BrkrStudios</h2>
          <p>
            BrkrStudios is a creative team delivering high-quality digital
            solutions. Specializing in custom app development and professional
            photography, we bring ideas to life with user-friendly designs and
            artistic visuals. We prioritize a zero-data-collection policy,
            balancing functionality and style in every project.
          </p>
        </div>
      </section>
      <section id="partners" className="partners">
        <h2>Our Partners</h2>
        <div className="partner-container-wrapper">
          <div className="partner-container">
            <div className="partner-text">
              <h3>Shots By Alpha</h3>
              <p>
                Our collaboration with Shots By Alpha brings unique, high-quality
                photography to capture unforgettable moments. As partners, we
                work together to deliver premium visual content that meets the
                highest standards of creativity and professionalism, ideal for
                various events and branding needs.
              </p>
              <a
                href="https://shots-by-alpha.mypixieset.com"
                className="partner-link"
                target="_self"
                rel="noopener noreferrer"
              >
                Visit Their Website
              </a>
            </div>
            <div className="partner-image">
              <img
                src="Screenshot 2024-11-13 at 7.53.28 PM.png"
                alt="Shots By Alpha Partner"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Meet The Creator Section */}
      <section id="meetTheCreator" className="meet-creator">
        <div className="creator-container">
          {/* Header */}
          <div className="creator-header">
            <h2>About Me</h2>
          </div>
          {/* Main Content */}
          <div className="creator-content">
            <div className="creator-image-section">
              <img
                src="mepicture.jpeg"
                alt="Xander Angulo"
                className="creator-image"
              />
            </div>
            <div className="creator-text-section">
              <h3>Hi, I&apos;m Xander Angulo</h3>
              <p>
                I&apos;m a passionate Computer Science student who loves building
                innovative apps and capturing moments through photography.
                Currently studying at Houston Christian University, I specialize
                in creating user-friendly applications with a strong focus on
                privacy and user experience.
              </p>
              <p>
                My journey in tech started with a curiosity about how things
                work, and has evolved into a passion for creating digital
                solutions that make a difference. When I&apos;m not coding,
                you&apos;ll find me behind a camera lens or exploring new
                technologies.
              </p>
            </div>
          </div>
          {/* Highlights */}
          <div className="creator-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">📱</div>
              <h4>App Development</h4>
              <p>
                Creating intuitive mobile applications with focus on user
                experience and privacy-first design principles.
              </p>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">📸</div>
              <h4>Photography</h4>
              <p>
                Capturing life&apos;s moments through creative photography,
                specializing in portraits and event documentation.
              </p>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">🎓</div>
              <h4>Student</h4>
              <p>
                Pursuing Computer Science at Houston Christian University while
                building real-world projects and gaining experience.
              </p>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">🔒</div>
              <h4>Privacy Advocate</h4>
              <p>
                Committed to developing applications with zero data collection
                policies, ensuring user privacy and security.
              </p>
            </div>
          </div>
          {/* Social Links */}
          <div className="social-section">
            <h3>Connect With Me</h3>
            <div className="social-links">
              <a href="#instagram-section" className="social-link">
                <img src="Instagram_icon.png" alt="Instagram" />
                <span>Instagram</span>
              </a>
              <a href="#resume-section" className="social-link">
                <img src="Resumeimage.png" alt="Resume" />
                <span>Resume</span>
              </a>
              <a href="#linkedin-section" className="social-link">
                <img src="Linkedin-Logo.png" alt="LinkedIn" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Extended Me Sections */}
      <div className="extended-sections">
        <section id="portfolio-section" className="me-subsection">
          <div className="subsection-container">
            <h2>My Portfolio</h2>
            <div className="portfolio-items">
              <div className="portfolio-item">
                <img
                  src="millilifeappport.png"
                  alt="MilliLife App Screenshot"
                />
                <div className="portfolio-info">
                  <h3>MilliLife App</h3>
                  <p className="portfolio-description-short">
                    A precision age tracker that calculates your age down to the
                    exact millisecond.
                  </p>
                </div>
                <div className="portfolio-description-full hover-overlay">
                  <h3>MilliLife App</h3>
                  <p>
                    Offers unique features such as Docked View, customizable
                    Widgets, and Countdown timers. Designed with an intuitive
                    interface, MilliLife respects your privacy with a strict
                    zero-data collection policy, ensuring your personal
                    information stays yours. Ideal for users who love detailed
                    timekeeping and seamless app experiences.
                  </p>
                </div>
              </div>
              <div className="portfolio-item">
                <img src="churchpicture.png" alt="Church Conference Platform" />
                <div className="portfolio-info">
                  <h3>Church Conference Project</h3>
                  <p className="portfolio-description-short">
                    A robust web-based platform engineered to streamline the
                    organization and management of church conferences.
                  </p>
                </div>
                <div className="portfolio-description-full hover-overlay">
                  <h3>Church Conference Project</h3>
                  <p>
                    It supports distinct user roles—Admins and Regular
                    Users—with features specifically tailored to their unique
                    administrative and interactive needs. Developed using HTML,
                    CSS, JavaScript, PHP, and MySQL, the application ensures a
                    responsive, organized, and user-friendly experience for
                    managing entities such as Congregations, Conferences,
                    Speakers, Attendees, Volunteers, and Sponsors.
                  </p>
                </div>
              </div>
              <div className="portfolio-item">
                <img src="mbdpicture.png" alt="Milk Breakfast Dispenser" />
                <div className="portfolio-info">
                  <h3>MBD (Milk Breakfast Dispenser)</h3>
                  <p className="portfolio-description-short">
                    An innovative, Arduino-driven appliance designed to
                    automate breakfast preparation.
                  </p>
                </div>
                <div className="portfolio-description-full hover-overlay">
                  <h3>MBD (Milk Breakfast Dispenser)</h3>
                  <p>
                    Dispenses a precise mixture of chilled milk and cereal into
                    a bowl. Utilizing copper coils and a cooling fan, the MBD
                    effectively maintains milk freshness while providing users
                    convenience during their morning routines. This project
                    emphasizes practical integration of technology to simplify
                    everyday tasks.
                  </p>
                </div>
              </div>
              <div className="portfolio-item">
                <img src="froggypicture.png" alt="Froggy Alarm Clock" />
                <div className="portfolio-info">
                  <h3>Froggy Alarm</h3>
                  <p className="portfolio-description-short">
                    A whimsical Raspberry Pi-based alarm clock tailored
                    specifically for children.
                  </p>
                </div>
                <div className="portfolio-description-full hover-overlay">
                  <h3>Froggy Alarm</h3>
                  <p>
                    Offers a fun, frog-themed interface that makes waking up
                    enjoyable. In addition to standard alarm features, it
                    integrates a convenient weather app, giving kids and parents
                    a helpful morning forecast. Recognized with the Presentation
                    Excellence Award for its creative design, engaging
                    functionality, and user-friendly approach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Photography Section */}
      <section id="photography-section" className="me-subsection photography">
        <div className="subsection-container">
          <div className="photo-words">
            <h2>Photography</h2>
          </div>
          <div className="photo-gallery">
            <div className="photo-item">
              <img src="port1.jpg" alt="Photography Sample 1" />
            </div>
            <div className="photo-item">
              <img src="port2.jpg" alt="Photography Sample 2" />
            </div>
            <div className="photo-item">
              <img src="port3.jpg" alt="Photography Sample 3" />
            </div>
            <div className="photo-item">
              <img src="port4.jpg" alt="Photography Sample 4" />
            </div>
          </div>
          <div className="view-more-container">
            <a href="photography.html" className="view-more-btn">
              View More <span className="arrow-icon">→</span>
            </a>
          </div>
        </div>
      </section>
      {/* Instagram Section */}
      <section id="instagram-section" className="me-subsection instagram-section">
        <div className="subsection-container">
          <div className="insta-content">
            <div className="insta-image">
              <img src="instagramphone.png" alt="Instagram Profile" />
            </div>
            <div className="insta-arrow">
              <svg width="100" height="40" viewBox="0 0 100 40">
                <path
                  d="M0,20 H70 M60,5 L80,20 L60,35"
                  fill="none"
                  stroke="#4070F4"
                  strokeWidth="3"
                />
              </svg>
            </div>
            <div className="insta-text">
              <h2>Find Me on Instagram</h2>
              <p>
                Follow me for photography and behind-the-scenes dev content
              </p>
              <a
                href="https://www.instagram.com/xander_ang03"
                target="_blank"
                className="insta-link"
              >
                @xander_ang03
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Resume Section */}
      <section id="resume-section" className="me-subsection">
        <div className="subsection-container">
          <div className="resume-content">
            <div className="resume-image">
              <img src="Angulo_Xander_Resume_2025.jpg" alt="Resume Preview" />
            </div>
            <div className="resume-text">
              <h2>My Resume</h2>
              <p>
                I&apos;m currently pursuing my Computer Science degree while
                building apps and websites. See my full qualifications and
                experience in my resume.
              </p>
              <a
                href="https://drive.google.com/file/d/1AUFh4FsrYPW2_nx4r-IkhN2Q3sdR_l0c/view?usp=sharing"
                target="_blank"
                className="resume-button"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* LinkedIn Section */}
      <section id="linkedin-section" className="me-subsection">
        <div className="subsection-container">
          <div className="linkedin-content">
            <div className="linkedin-image">
              <img src="linkedinprofile.jpg" alt="LinkedIn Preview" />
            </div>
            <div className="linkedin-text">
              <h2>Connect on LinkedIn</h2>
              <p>
                Let&apos;s connect professionally! Follow my journey and reach
                out for collaborations or opportunities.
              </p>
              <a
                href="https://www.linkedin.com/in/steve-angulo-117250290"
                target="_blank"
                className="linkedin-button"
              >
                Visit My Profile
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="footer">
        <p>No matter your age, you&apos;ll always wish you started younger.</p>
        <p>
          <u> But today is the youngest you&apos;ll ever be.</u>
        </p>
        <p style={{ marginBottom: "40px" }}>
          © 2025 BrkrStudios & Xander Angulo. All rights reserved.
        </p>
        <img src="IMG_5457.WEBP" alt="Footer Image" className="footer-image" />
      </footer>
      {/* Contact Form Wrapper */}
      <div className="contact-wrapper">
        <span className="icon-close">
          <ion-icon name="close"></ion-icon>
        </span>
        <div className="form-box contact-form">
          <h2>Contact Form</h2>
          <form
            onSubmit={validateForm}
            action="https://formspree.io/f/mzblwkbq"
            method="post"
          >
            <div className="input-box">
              <span className="icon">
                <ion-icon name="mail"></ion-icon>
              </span>
              <input type="email" name="email" required />
              <label>Email</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="person"></ion-icon>
              </span>
              <input type="text" name="name" autoComplete="off" required />
              <label>Your name</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="chatbubble"></ion-icon>
              </span>
              <input type="text" name="message" autoComplete="off" required />
              <label>Your Message</label>
            </div>
            <button type="submit" className="btn">
              Submit Form
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HomePage;
