import React from "react";
import { Leaf, Globe, Recycle } from "lucide-react";

export default function About() {
  return (
    <div className="flex-1 min-h-screen bg-gray-50 flex flex-col items-center px-6 py-12">
      {/* Header */}
      <h1 className="text-4xl font-bold text-green-600 mb-4">Our Mission</h1>
      <p className="text-gray-600 text-center max-w-2xl mb-12">
        At <span className="font-semibold text-green-600">EcoFinds</span>, we
        believe in building a sustainable future by encouraging the reuse,
        recycling, and sharing of resources. Our platform connects people who
        want to sell, buy, or donate eco-friendly items, creating a positive
        impact on both the environment and communities.
      </p>

      {/* Mission Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition">
          <div className="flex justify-center mb-4">
            <Leaf className="text-green-500" size={40} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Sustainability
          </h2>
          <p className="text-gray-600">
            Promoting eco-friendly choices and reducing waste by giving items a
            second life.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition">
          <div className="flex justify-center mb-4">
            <Recycle className="text-green-500" size={40} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Circular Economy
          </h2>
          <p className="text-gray-600">
            Encouraging reuse and recycling to minimize the environmental
            footprint of everyday products.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition">
          <div className="flex justify-center mb-4">
            <Globe className="text-green-500" size={40} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Community Impact
          </h2>
          <p className="text-gray-600">
            Creating a supportive community where people can share, save, and
            contribute to a greener planet.
          </p>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="mt-16 max-w-2xl text-center">
        <p className="text-lg text-gray-700 italic">
          “The greatest threat to our planet is the belief that someone else
          will save it.”
        </p>
        <p className="mt-2 text-green-600 font-semibold">– Robert Swan</p>
      </div>
    </div>
  );
}
