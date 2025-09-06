import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import MyListings from "./pages/MyListings";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage for token on mount
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setActivePage("dashboard");
  };

  const renderPage = () => {
    // If not logged in, render full-screen login/register
    if (!isLoggedIn) {
      if (activePage === "register") {
        return <Register onRegister={() => setActivePage("dashboard")} />;
      } else {
        return (
          <Login
            onLogin={() => setIsLoggedIn(true)}
            onCreate={() => setActivePage("register")}
          />
        );
      }
    }

    // If logged in, render pages normally
    switch (activePage) {
      case "dashboard":
      case "browse":
        return <Dashboard />;
      case "sell":
        return <AddProduct />;
      case "listings":
        return <MyListings />;
      case "cart":
        return <Cart />;
      case "orders":
        return <Orders />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {isLoggedIn && (
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          onLogout={handleLogout}
        />
      )}
      <main
        className={`flex-1 ${
          !isLoggedIn
            ? "h-screen w-full flex items-center justify-center bg-gray-900"
            : "p-6 overflow-y-auto bg-gray-50"
        }`}
      >
        {renderPage()}
      </main>
    </div>
  );
}
