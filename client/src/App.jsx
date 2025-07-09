import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import FloatingRaffleWidget from "./components/FloatingRaffleWidget";

const mockAPI = {
  getStatus: async () => ({ tickets: 1 }),
  joinRaffle: async (currentTickets) => ({
    success: true,
    tickets: (currentTickets || 1) + 1,
  }),
  createCheckoutSession: async () => {
    return {
      sessionId: "test_session_123",
      amount: 100,
      currency: "usd",
    };
  },
  simulateWebhook: async (userId) => {
    return { success: true, tickets: 5 };
  },
};

const App = () => {
  const [tickets, setTickets] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const baseUrl =
    import.meta.env.VITE_VERCEL_API_BASE_URL ||
    "https://istanbullore-staging.onrender.com";

  const getStatus = async () => {
    try {
      setLoading(true);
      const data = await mockAPI.getStatus();
      setTickets(data.tickets);
    } catch (err) {
      setTickets("error");
    } finally {
      setLoading(false);
    }
  };

  const enterRaffle = async () => {
    try {
      setLoading(true);
      const data = await mockAPI.joinRaffle(tickets);
      setTickets(data.success ? data.tickets : "error");
    } catch (err) {
      setTickets("error");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setPaymentStatus("processing");

      const { sessionId } = await mockAPI.createCheckoutSession();

      window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;

      setTimeout(async () => {
        try {
          const webhookResponse = await mockAPI.simulateWebhook("123");
          if (webhookResponse.success) {
            setTickets(webhookResponse.tickets);
            setPaymentStatus("success");
          } else {
            setPaymentStatus("failed");
          }
        } catch (err) {
          setPaymentStatus("failed");
        } finally {
          setLoading(false);
        }
      }, 1500);
    } catch (err) {
      setPaymentStatus("failed");
      setLoading(false);
      alert("Payment failed. Please try again.");
    }
  };

  useEffect(() => {
    if (paymentStatus === "success") {
      alert("Payment successful! Your tickets have been added.");
    } else if (paymentStatus === "failed") {
      alert("Payment failed. Please try again.");
    }
  }, [paymentStatus]);

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div className="page-container">
      <Header />
      <header
        className="hero"
        role="banner"
        aria-label="Hero section with Istanbul backdrop and site identity"
      >
        <div className="hero-bg" aria-hidden="true"></div>
        <div className="hero-content">
          <h1 className="hero-title" lang="en">
            City Canvas
          </h1>
          <p className="subtitle" lang="en">
            Discover the Untold Stories of a Timeless City
          </p>
        </div>
      </header>
      <main>
        <section
          className="main-section"
          aria-label="Main content layout with content feed and raffle sidebar"
        >
          <div className="main-grid" id="stories">
            <div className="content-feed">
              <article className="fade-in-block story-card">
                <h3 className="story-title">Whispers from Balat’s Walls</h3>
                <p className="story-text">
                  Tucked within Balat’s maze-like alleys, the walls do more than
                  crumble—they speak. Layers of graffiti and faded murals bleed
                  into one another, each fragment echoing forgotten protests,
                  clandestine loves, and timeless resilience. Under the soft
                  haze of dusk, what appears to be decay is in fact a mural of
                  memory—an ever-changing canvas of the city’s soul.
                </p>
              </article>
              <article className="fade-in-block story-card">
                <h3 className="story-title">The Midnight Simit Vendor</h3>
                <p className="story-text">
                  When Istanbul sleeps, he stirs—a lone vendor, cart glowing
                  amber beneath Galata’s watchful tower. Locals exchange quiet
                  nods, tourists linger in curiosity. There’s magic in his
                  motion, ritual in his rhythm. The scent of toasted sesame
                  trails behind him like a story passed down—freshly baked into
                  the city’s night air.
                </p>
              </article>
            </div>
            <aside
              className="raffle-sidebar"
              role="complementary"
              aria-labelledby="raffle-title"
              id="raffle"
            >
              <div className="raffle-card">
                <h2 id="raffle-title">🎟️ Join the Raffle</h2>
                <p>
                  Be part of the narrative and stand a chance to receive
                  exclusive keepsakes inspired by the soul of Istanbul.
                </p>
                <button
                  className="primary-btn pulse"
                  type="button"
                  onClick={enterRaffle}
                >
                  🎟️ Join the Raffle
                </button>
                <p className="raffle-status-display">
                  {loading
                    ? "Loading ticket status..."
                    : tickets === "error"
                    ? "❌ Error, try again."
                    : `✅ You have ${tickets} tickets`}
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <footer className="site-footer enhanced-footer" role="contentinfo">
        <div className="footer-container">
          <p className="footer-text">
            &copy; 2025 <strong>IstanbulLore.com</strong> – Crafted with culture
            in mind.
          </p>
          <nav className="footer-social" aria-label="Social media links">
            <a
              href="#"
              aria-label="Follow us on Instagram"
              className="social-link icon-insta"
            ></a>
            <a
              href="#"
              aria-label="Follow us on Twitter"
              className="social-link icon-twitter"
            ></a>
            <a
              href="#"
              aria-label="Follow us on Facebook"
              className="social-link icon-fb"
            ></a>
          </nav>
        </div>
      </footer>
      <FloatingRaffleWidget
        tickets={tickets}
        loading={loading}
        onJoinRaffle={enterRaffle}
        onPayment={handlePayment}
        paymentStatus={paymentStatus}
      />
    </div>
  );
};

export default App;
