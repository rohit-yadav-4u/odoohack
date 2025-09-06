import { useState } from "react";
import { 
  Home, Search, PlusSquare, Heart, User, LogOut, 
  Package, MessageSquare, List, Info, Menu 
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // if using React Router

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("home");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: "home", label: "Dashboard", icon: <Home size={20} /> },
    { id: "browse", label: "Browse Items", icon: <Search size={20} /> },
    { id: "sell", label: "Sell Item", icon: <PlusSquare size={20} /> },
    { id: "listings", label: "My Listings", icon: <List size={20} /> },
    { id: "wishlist", label: "Saved Items", icon: <Heart size={20} /> },
    { id: "messages", label: "Messages", icon: <MessageSquare size={20} /> },
    { id: "orders", label: "Orders", icon: <Package size={20} /> },
    { id: "profile", label: "Profile & Settings", icon: <User size={20} /> },
    { id: "about", label: "About / Mission", icon: <Info size={20} /> },
    { id: "logout", label: "Logout", icon: <LogOut size={20} /> },
  ];

  const handleLogout = () => {
    // Close modal
    setShowLogoutConfirm(false);

    // Clear any auth/session data if needed
    localStorage.removeItem("Token"); 

    // Redirect to login
    navigate("/");
  };

  return (
    <>
      <div className={`h-screen ${open ? "w-64" : "w-20"} bg-white shadow-lg flex flex-col transition-all duration-300`}>
        {/* Header with Toggle Button */}
        <div className="flex items-center justify-between p-4 border-b">
          {open && <h1 className="text-2xl font-bold text-green-600">EcoFinds</h1>}
          <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-gray-100">
            <Menu size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 mt-4 px-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "logout") {
                  setShowLogoutConfirm(true);
                } else {
                  setActive(item.id);
                }
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 font-medium transition 
                ${active === item.id ? "bg-green-100 text-green-700" : "hover:bg-gray-100"}`}
            >
              {item.icon}
              {open && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-around">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
