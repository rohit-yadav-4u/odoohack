// src/pages/About.js
import React from "react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">About Our Marketplace</h1>
      <p className="text-gray-700 mb-4">
        Welcome to our marketplace platform! 🚀 Here you can buy, sell, and
        manage products with ease. Sellers can list their items, buyers can
        browse all categories, and everyone can enjoy a smooth experience.
      </p>
      <p className="text-gray-700 mb-4">
        This project was built using <strong>React</strong> for the frontend,
        <strong> Express + Node.js</strong> for the backend, and
        <strong> MongoDB</strong> for data storage.
      </p>
      <p className="text-gray-700">
        Have questions or feedback? Reach out to us at{" "}
        <a href="mailto:support@marketplace.com" className="text-blue-600 underline">
          support@marketplace.com
        </a>
      </p>
    </div>
  );
}
