import React from "react";

const WelcomePopup = ({ setShowWelcomePopup }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-10 rounded-lg text-black shadow-xl">
      <h2 className="text-lg font-bold mb-4">Welcome!</h2>
      <p>Please be respectful and keep it family-friendly.</p>
      <button
        onClick={() => setShowWelcomePopup(false)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Okay
      </button>
    </div>
  </div>
);

export default WelcomePopup;
