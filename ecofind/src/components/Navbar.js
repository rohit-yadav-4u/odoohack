import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-black font-bold text-xl">EcoFinds</h1>
      <div>
        <Link className="text-green-600 mr-4" to="/login">Login</Link>
        <Link className="text-green-600" to="/register">Register</Link>
      </div>
    </nav>
  );
}
