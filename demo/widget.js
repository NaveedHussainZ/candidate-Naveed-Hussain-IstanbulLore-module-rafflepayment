import React, { useState } from "react";
import "./FloatingRaffleWidget.css";

export default function FloatingRaffleWidget({
  tickets,
  loading,
  onJoinRaffle,
  onPayment,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="floating-raffle-widget">
      {/* Collapsed Icon */}
      <button className="raffle-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        🎟️
      </button>

      {/* Expanded Panel */}
      {isOpen && (
        <div className="raffle-panel">
          <h3>Your Raffle Status</h3>
          <div className="ticket-count">
            {loading
              ? "Loading..."
              : tickets === "error"
              ? "❌ Error, try again."
              : `You have ${tickets} tickets`}
          </div>

          <button
            className="join-raffle-btn"
            onClick={onJoinRaffle}
            disabled={loading}
          >
            Join Raffle
          </button>

          {/* NEW: Payment Button */}
          <button className="payment-btn" onClick={onPayment}>
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
}
