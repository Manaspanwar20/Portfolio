import React, { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import './App.css'
import myvideo from './assets/TornadoBiceps.gif';
import twinproject from './assets/twin.png';

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const wordVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const AnimatedText = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  };

  return (
    <motion.p
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariant}
          className="animated-word"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.p>
  );
};

function App() {
  const videoSrc = myvideo;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const skillCategories = [
    {
      title: "Frontend",
      skills: ["HTML", "CSS", "React"],
      icon: (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="card-bg-icon">
          <circle cx="0" cy="0" r="2.05" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      )
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "Jwt Auth", "REST APIs", "MongoDB"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="card-bg-icon">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
      )
    },
    {
      title: "Additional",
      skills: ["Git", "System Design", "Docker"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="card-bg-icon">
          <rect x="2" y="2" width="6" height="6" rx="1"></rect>
          <rect x="16" y="2" width="6" height="6" rx="1"></rect>
          <rect x="2" y="16" width="6" height="6" rx="1"></rect>
          <rect x="16" y="16" width="6" height="6" rx="1"></rect>
          <path d="M8 5h8"></path>
          <path d="M8 19h8"></path>
          <path d="M5 8v8"></path>
          <path d="M19 8v8"></path>
        </svg>
      )
    },

  ];

  const projects = [
    {
      title: "Interactive E-Commerce",
      description: "A full-stack online store with seamless cart management and secure checkout.",
      github: "https://github.com",
      live: "https://example.com",
      image: "",
      tech: ["React", "Node.js", "Stripe", "MongoDB"]
    },
    {
      title: "Twin - Study together",
      description: "A platform for students to study efficiently with the help of AI",
      github: "https://github.com/Manaspanwar20/Twin-Study-with-ai-",
      live: "https://twin-study-with-ai.vercel.app/",
      image: twinproject,
      tech: ["React", "GeminiAI", "MongoDB", "Express"]
    },
    {
      title: "Portfolio Masterpiece",
      description: "The very website you are looking at! Built with speed and modern aesthetics in mind.",
      github: "https://github.com",
      live: "https://example.com",
      image: "",
      tech: ["React", "Framer Motion", "Vite"]
    }
  ];

  return (
    <div className="portfolio">
      <motion.div className="progress-bar" style={{ scaleX }} />

      {/* Immersive Background Glow */}
      <motion.div
        className="bg-glow"
        animate={{
          x: mousePos.x - 200,
          y: mousePos.y - 200,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      />

      {/* Background Grid Pattern */}
      <div className="bg-grid" />

      <motion.nav
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-container">
          <motion.div
            className="logo"
            whileHover={{ scale: 1.1 }}
          >
            PORTFOLIO.
          </motion.div>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section id="hero" className="hero">
          <div className="video-container">
            <img
              src={myvideo}
              className="hero-video"
              alt="Background"
            />
          </div>
          <div className="hero-content">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              Manas Panwar
            </motion.h1>
            <AnimatedText
              text="Building beautiful, performant, and user-centric digital experiences."
              className="hero-p"
            />
            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <a href="#projects" className="cta-button primary">View Projects</a>
              <a href="https://drive.google.com/your-resume-link" target="_blank" rel="noopener noreferrer" className="cta-button secondary">Resume</a>
              <a href="#contact" className="cta-button outline">Contact Me</a>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="container">
          <motion.h2
            className="section-title"
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <div className="about-content">
            <AnimatedText
              text="I am Manas Panwar, I build AI-assisted web applications and backend systems using Node.js, React, and modern tooling."
              className="about-p-highlight"
            />
            <AnimatedText
              text="With expertise in modern Web technologies, I enjoy turning complex ideas into practical products with clean UI and scalable architecture."
              className="about-p-sub"
              delay={1.5}
            />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="container">
          <motion.h2
            className="section-title"
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            My Skills
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Developing high-performance applications with a modern, scalable stack and AI-driven solutions.
          </motion.p>
          <motion.div
            className="skills-cards-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                className="skill-category-card"
                variants={fadeInVariant}
                whileHover={{ y: -12, scale: 1.02 }}
              >
                {category.icon}
                <h3>{category.title}</h3>
                <motion.div 
                  className="skills-grid"
                  variants={staggerContainer}
                >
                  {category.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      className="skill-badge"
                      variants={wordVariant}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(168, 85, 247, 0.2)' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container">
          <motion.h2
            className="section-title"
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          <motion.div
            className="projects-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card"
                variants={fadeInVariant}
                whileHover={{ y: -15 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-image">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="project-img-content" />
                  ) : (
                    <div className="project-placeholder">Project Preview</div>
                  )}
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer">Live Demo</a>
                  </div>
                  <div className="project-tech-section">
                    <h4>Tech Stack</h4>
                    <div className="project-tech-grid">
                      {project.tech.map((t, i) => (
                        <span key={i} className="tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <>
              <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
              />
              <motion.div
                className="project-modal"
                initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-40%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-40%" }}
              >
                <button className="close-modal" onClick={() => setSelectedProject(null)}>×</button>
                <div className="modal-content">
                  <div className="modal-image">
                    {selectedProject.image ? (
                      <img src={selectedProject.image} alt={selectedProject.title} />
                    ) : (
                      <div className="project-placeholder">No Image Available</div>
                    )}
                  </div>
                  <div className="modal-info">
                    <h2>{selectedProject.title}</h2>
                    <p className="modal-desc">{selectedProject.description}</p>

                    <div className="modal-tech">
                      <h4>Technologies Used</h4>
                      <div className="tech-tags">
                        {selectedProject.tech.map((t, i) => (
                          <span key={i} className="tech-tag">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="modal-links">
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="cta-button primary">GitHub Repo</a>
                      <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="cta-button secondary">Live Website</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Contact Section */}
        <section id="contact" className="container">
          <motion.h2
            className="section-title"
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <div className="contact-content">
            <AnimatedText
              text="Interested in working together? Let's connect!"
              className="contact-p"
            />
            <motion.div
              className="contact-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.a
                href="mailto:[EMAIL_ADDRESS]"
                className="contact-item"
                variants={fadeInVariant}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <span>Email</span>
              </motion.a>

              <motion.a
                href="https://github.com/Manaspanwar20"
                className="contact-item"
                variants={fadeInVariant}
                whileHover={{ y: -10, scale: 1.05 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </div>
                <span>GitHub</span>
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/manas-panwar-641262329"
                className="contact-item"
                variants={fadeInVariant}
                whileHover={{ y: -10, scale: 1.05 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </div>
                <span>LinkedIn</span>
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} PORTFOLIO. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App
