
import { useState } from "react";
import "./App.css";

const photos = {
  hero: "/images/hero.png",
  students: "/images/students.png",
  working: "/images/working.png",
  mothers: "/images/mother_png_copy.png",
  shg: "/images/shg.png",
  senior: "/images/elder.png",
  marriage: "/images/marraige.png",
};

const categories = [
  {
    title: "Students",
    icon: "🎓",
    desc: "Scholarships, education support and opportunities",
    color: "pink",
    image: photos.students,
  },
  {
    title: "Working Women",
    icon: "💼",
    desc: "Employment, skills and career growth",
    color: "purple",
    image: photos.working,
  },
  {
    title: "Mothers",
    icon: "🤱",
    desc: "Maternity, childcare and health benefits",
    color: "peach",
    image: photos.mothers,
  },
  {
    title: "Self-Help Groups",
    icon: "🤝",
    desc: "Financial support, loans and business opportunities",
    color: "green",
    image: photos.shg,
  },
  {
    title: "Senior Women",
    icon: "🌷",
    desc: "Pension, healthcare and social security",
    color: "blue",
    image: photos.senior,
  },
  {
    title: "Marriage Assistance",
    icon: "💍",
    desc: "Explore marriage assistance and financial support",
    color: "peach",
    image: photos.marriage,
  },
];

const navItems = [
  "Home",
  "Find My Benefits",
  "Explore Schemes",
  "Ask Sakhi AI",
  "About",
];

const incomeValues = {
  "Below ₹1 lakh": 50000,
  "₹1–2.5 lakh": 150000,
  "₹2.5–5 lakh": 350000,
  "₹5–8 lakh": 650000,
  "Above ₹8 lakh": 900000,
};

function App() {
  const [page, setPage] = useState("Home");
  const [language, setLanguage] = useState("English");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [state, setState] = useState("Telangana");
  const [income, setIncome] = useState("");
  const [category, setCategory] = useState("");

  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "sakhi",
      text: "Namaste! 💜 I'm Sakhi, your friendly benefits guide. What would you like to know today?",
    },
  ]);

  const goTo = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const findMyBenefits = async () => {
    if (!name.trim() || !age || !income || !category) {
      alert("Please complete all required fields.");
      return;
    }

    setLoading(true);
    setApiError("");
    setSchemes([]);
    setHasSearched(false);

    try {
      const response = await fetch(
        "http://localhost:8080/api/eligibility/check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            age: Number(age),
            annualIncome: incomeValues[income],
            state: state,
            community: "Not specified",
            gender: "Female",
            employmentStatus: category,
            lifeStage: category,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to retrieve schemes. Please try again.");
      }

      const data = await response.json();

      setSchemes(data);
      setHasSearched(true);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((previous) => [
      ...previous,
      { from: "you", text: message },
      {
        from: "sakhi",
        text: "Thank you for your question! Claude AI integration is coming next. For now, explore the scheme categories and use Find My Benefits to discover potential matches. 💜",
      },
    ]);

    setMessage("");
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand" onClick={() => goTo("Home")}>
          <div className="brand-icon">🌸</div>
          <div>
            <div className="brand-name">
              Sakhi Yojana <span>AI</span>
            </div>
            <div className="brand-tag">
              Every Woman. Every Opportunity.
            </div>
          </div>
        </div>

        <nav>
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-link ${page === item ? "active" : ""}`}
              onClick={() => goTo(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="nav-right">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Choose language"
          >
            <option>English</option>
            <option>తెలుగు</option>
            <option>हिन्दी</option>
          </select>

          <button
            className="nav-cta"
            onClick={() => goTo("Find My Benefits")}
          >
            Get Started ↗
          </button>
        </div>
      </header>

      <main>
        {page === "Home" && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow">
                  ✦ YOUR JOURNEY. YOUR OPPORTUNITIES.
                </div>

                <h1>
                  Your Guide to
                  <br />
                  Government Benefits,
                  <br />
                  <span>at Every Stage of Life.</span>
                </h1>

                <p className="hero-description">
                  Discover, understand and access government
                  schemes designed for women — personalized
                  for your needs, with the power of AI.
                </p>

                <div className="hero-actions">
                  <button
                    className="primary-btn"
                    onClick={() => goTo("Find My Benefits")}
                  >
                    ✨ Find My Benefits <span>→</span>
                  </button>

                  <button
                    className="secondary-btn"
                    onClick={() => goTo("Explore Schemes")}
                  >
                    Explore Schemes
                  </button>
                </div>

                <div className="trust-row">
                  <span>✦ Personalized discovery</span>
                  <span>♡ Regional languages</span>
                  <span>◎ Official information</span>
                </div>
              </div>

              <div className="hero-visual">
                <div
                  className="hero-image"
                  style={{
                    backgroundImage: `url("${photos.hero}")`,
                  }}
                />

                <div className="floating-note note-one">
                  💜 Your journey, your benefits
                </div>

                <div className="floating-note note-two">
                  ✨ A little help. A big difference.
                </div>

                <div className="hero-sticker">
                  SAKHI
                  <span>WITH YOU</span>
                </div>
              </div>
            </section>

            <section className="section category-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">
                    SUPPORT FOR EVERY JOURNEY
                  </span>
                  <h2>
                    Find benefits by
                    <br />
                    <em>your life stage.</em>
                  </h2>
                </div>

                <button
                  className="text-link"
                  onClick={() => goTo("Explore Schemes")}
                >
                  View all categories ↗
                </button>
              </div>

              <CategoryGrid
                onSelect={(item) => {
                  setCategory(item);
                  goTo("Find My Benefits");
                }}
              />
            </section>

            <section className="feature-banner">
              <div
                className="feature-image"
                style={{
                  backgroundImage: `url("${photos.shg}")`,
                }}
              />

              <div className="feature-copy">
                <span className="eyebrow">
                  INFORMATION THAT EMPOWERS
                </span>

                <h2>
                  Your next opportunity
                  <em> could be one discovery away.</em>
                </h2>

                <p>
                  No more searching through scattered information.
                  Let Sakhi help you understand the support
                  available to you.
                </p>

                <button
                  className="light-btn"
                  onClick={() => goTo("Find My Benefits")}
                >
                  Discover My Benefits →
                </button>
              </div>
            </section>

            <section className="ask-banner">
              <div>
                <span className="eyebrow">
                  YOUR FRIENDLY AI COMPANION
                </span>
                <h2>Have a question? Ask Sakhi. 💬</h2>
                <p>
                  Explore government benefits in a language
                  that feels comfortable to you.
                </p>
              </div>

              <button
                className="primary-btn"
                onClick={() => goTo("Ask Sakhi AI")}
              >
                Talk to Sakhi →
              </button>
            </section>
          </>
        )}

        {page === "Find My Benefits" && (
          <section className="inner-page">
            <div className="inner-heading">
              <span className="eyebrow">
                YOUR JOURNEY STARTS HERE
              </span>

              <h1>
                Let's discover what
                <em> you may be eligible for.</em>
              </h1>

              <p>
                Share a few details so we can explore
                potentially relevant government schemes.
              </p>
            </div>

            <div className="profile-layout">
              <div className="profile-card">
                <div className="progress-label">
                  <span>YOUR PROFILE</span>
                  <span>GETTING STARTED</span>
                </div>

                <div className="progress-track">
                  <div></div>
                </div>

                <label>Your name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What should we call you?"
                />

                <label>Your age</label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                />

                <label>Where do you live?</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option>Telangana</option>
                  <option>Andhra Pradesh</option>
                  <option>Karnataka</option>
                  <option>Maharashtra</option>
                  <option>Tamil Nadu</option>
                  <option>Kerala</option>
                  <option>Other</option>
                </select>

                <label>Annual family income</label>
                <select
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                >
                  <option value="">Choose an income range</option>
                  <option>Below ₹1 lakh</option>
                  <option>₹1–2.5 lakh</option>
                  <option>₹2.5–5 lakh</option>
                  <option>₹5–8 lakh</option>
                  <option>Above ₹8 lakh</option>
                </select>

                <label>Which best describes you?</label>

                <div className="choice-grid">
                  {[
                    "Student",
                    "Working woman",
                    "Entrepreneur",
                    "Homemaker",
                    "Mother",
                    "Senior woman",
                    "Self-help group member",
                    "Seeking marriage assistance",
                    "Other",
                  ].map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setCategory(item)}
                      className={
                        category === item
                          ? "choice selected"
                          : "choice"
                      }
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <button
                  className="primary-btn full-btn"
                  onClick={findMyBenefits}
                  disabled={loading}
                >
                  {loading
                    ? "Finding Your Schemes..."
                    : "Discover My Schemes ✨ →"}
                </button>

                {apiError && (
                  <p style={{ color: "red", marginTop: "15px" }}>
                    {apiError}
                  </p>
                )}

                {hasSearched && (
                  <div className="scheme-results">
                    <h2>
                      {schemes.length} Potential Scheme Matches 💜
                    </h2>

                    {schemes.length === 0 ? (
                      <p>
                        No matching records found for this state.
                        Please check again later.
                      </p>
                    ) : (
                      schemes.map((scheme) => (
                        <div
                          className="step-card"
                          key={scheme.id}
                          style={{
                            textAlign: "left",
                            marginBottom: "15px",
                          }}
                        >
                          <h3>{scheme.name}</h3>
                          <p>
                            <strong>Category:</strong>{" "}
                            {scheme.category}
                          </p>
                          <p>{scheme.description}</p>

                          {scheme.officialWebsite && (
                            <a
                              href={scheme.officialWebsite}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Visit Official Website ↗
                            </a>
                          )}
                        </div>
                      ))
                    )}

                    <p className="privacy-note">
                      These are potential matches based on
                      available database information, not
                      confirmed eligibility. Always verify
                      requirements with the official department.
                    </p>
                  </div>
                )}

                <p className="privacy-note">
                  🔒 Your details help personalize scheme discovery.
                </p>
              </div>

              <div className="profile-aside">
                <div
                  className="aside-photo"
                  style={{
                    backgroundImage: `url("${photos.mothers}")`,
                  }}
                />

                <h3>A little about you goes a long way.</h3>
                <p>
                  Your profile helps Sakhi explore scheme
                  criteria that may be relevant to your needs.
                  Final eligibility depends on official rules.
                </p>

                <div className="aside-pill">
                  💜 Designed around your needs
                </div>
              </div>
            </div>

            <section className="how-section">
              <div className="section-heading centered">
                <span className="eyebrow">
                  SIMPLE. PERSONAL. ACCESSIBLE.
                </span>
                <h2>How Sakhi makes it easier</h2>
                <p>
                  Three simple steps to discover opportunities
                  that may be right for you.
                </p>
              </div>

              <div className="steps-grid">
                <div className="step-card">
                  <div className="step-icon">📝</div>
                  <span className="step-number">01</span>
                  <h3>Share a Few Details</h3>
                  <p>Tell us about yourself and what you need.</p>
                </div>

                <div className="step-card">
                  <div className="step-icon">✨</div>
                  <span className="step-number">02</span>
                  <h3>Find Your Matches</h3>
                  <p>Explore schemes based on your profile.</p>
                </div>

                <div className="step-card">
                  <div className="step-icon">📋</div>
                  <span className="step-number">03</span>
                  <h3>Take the Next Step</h3>
                  <p>
                    Understand documents, eligibility and official links.
                  </p>
                </div>
              </div>
            </section>
          </section>
        )}

        {page === "Explore Schemes" && (
          <section className="inner-page">
            <div className="inner-heading">
              <span className="eyebrow">
                OPPORTUNITIES FOR EVERY STAGE
              </span>

              <h1>
                Explore your
                <em> possibilities.</em>
              </h1>

              <p>
                Choose a category to discover government
                support that may be relevant to you.
              </p>
            </div>

            <CategoryGrid
              large
              onSelect={(item) => {
                setCategory(item);
                goTo("Find My Benefits");
              }}
            />

            <div className="info-note">
              ⓘ Scheme details and eligibility should be checked
              against verified official government sources.
              Always check official requirements before applying.
            </div>
          </section>
        )}

        {page === "Ask Sakhi AI" && (
          <section className="inner-page chat-page">
            <div className="inner-heading">
              <span className="eyebrow">
                YOUR PERSONAL BENEFITS COMPANION
              </span>

              <h1>
                Talk to <em>Sakhi.</em> 💜
              </h1>

              <p>
                Ask questions in your own words.
                Telugu, Hindi and English support is part of our vision.
              </p>
            </div>

            <div className="chat-card">
              <div className="chat-top">
                <div className="sakhi-avatar">🌸</div>

                <div>
                  <b>Ask Sakhi AI</b>
                  <small>
                    <span className="online-dot"></span>
                    Your friendly scheme guide
                  </small>
                </div>

                <span className="chat-language">{language}</span>
              </div>

              <div className="chat-messages">
                {messages.map((item, index) => (
                  <div
                    className={`message ${item.from}`}
                    key={index}
                  >
                    <span>
                      {item.from === "sakhi" ? "🌸" : "You"}
                    </span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="suggestions">
                <button
                  onClick={() =>
                    setMessage(
                      "Are there scholarships for women students?"
                    )
                  }
                >
                  🎓 Scholarships
                </button>

                <button
                  onClick={() =>
                    setMessage(
                      "What support is available for women entrepreneurs?"
                    )
                  }
                >
                  🚀 Business support
                </button>

                <button
                  onClick={() =>
                    setMessage("How can I find schemes in my state?")
                  }
                >
                  📍 Find schemes
                </button>
              </div>

              <div className="chat-input">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && sendMessage()
                  }
                  placeholder="Ask Sakhi anything..."
                />

                <button onClick={sendMessage}>Send ↗</button>
              </div>

              <p className="chat-disclaimer">
                Prototype chat. Claude AI integration is coming next.
              </p>
            </div>
          </section>
        )}

        {page === "About" && (
          <section className="inner-page about-page">
            <div className="about-hero">
              <div>
                <span className="eyebrow">OUR PURPOSE</span>

                <h1>
                  Information is power.
                  <br />
                  <em>Access is empowerment.</em>
                </h1>

                <p>
                  Sakhi Yojana AI is being built to make
                  women's government benefits easier to
                  discover and understand.
                </p>

                <button
                  className="primary-btn"
                  onClick={() => goTo("Find My Benefits")}
                >
                  Start Your Journey →
                </button>
              </div>

              <div
                className="about-photo"
                style={{
                  backgroundImage: `url("${photos.hero}")`,
                }}
              />
            </div>

            <div className="values-grid">
              <div>
                <span>💜</span>
                <h3>Women First</h3>
                <p>
                  Built around the different needs and journeys
                  of women.
                </p>
              </div>

              <div>
                <span>🔎</span>
                <h3>Clarity First</h3>
                <p>
                  Simple explanations, eligibility guidance
                  and official sources.
                </p>
              </div>

              <div>
                <span>🌍</span>
                <h3>Access for All</h3>
                <p>
                  Regional languages and a welcoming
                  experience for every woman.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <div className="brand-name">
            🌸 Sakhi Yojana <span>AI</span>
          </div>
          <div className="brand-tag">
            Every Woman. Every Opportunity.
          </div>
        </div>

        <p>Built with 💜 for women across India.</p>
        <span>© 2026 SAKHI YOJANA AI · Prototype</span>
      </footer>

      <button
        className="floating-chat"
        onClick={() => goTo("Ask Sakhi AI")}
      >
        <span>🌸</span>
        Ask Sakhi AI
        <b>↗</b>
      </button>
    </div>
  );
}

function CategoryGrid({ onSelect, large = false }) {
  return (
    <div className={`category-grid ${large ? "large-grid" : ""}`}>
      {categories.map((item) => (
        <button
          className={`category-card ${item.color}`}
          key={item.title}
          onClick={() => onSelect(item.title)}
        >
          <div
            className="category-photo"
            style={{
              backgroundImage: `url("${item.image}")`,
            }}
          />

          <div className="category-content">
            <span className="category-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <span className="category-arrow">↗</span>
          </div>
        </button>
      ))}
    </div>
  );
}

export default App;
