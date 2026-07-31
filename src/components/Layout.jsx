import { Outlet, Link, useLocation } from "react-router";
import { Anchor, User, Menu, X } from "lucide-react";
import { useState } from "react";

function Layout() {
    
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
                <Anchor className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  Barka
                </span>
                <div className="text-xs text-gray-500">Boat Sharing Croatia</div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/offer"
                className={`text-sm transition-colors ${
                  location.pathname === "/offer"
                    ? "text-blue-600 font-medium"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Offer a Ride
              </Link>
              <Link
                to="/auth"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Sign In
              </Link>
            </div>

            <button
              className="md:hidden text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col gap-4">
                <Link
                  to="/search"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Find a Ride
                </Link>
                <Link
                  to="/offer"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Offer a Ride
                </Link>
                <Link
                  to="/auth"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
                  <Anchor className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-blue-600">Barka</span>
              </div>
              <p className="text-sm text-gray-600">
                Connecting captains and passengers across the beautiful Croatian coast.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">About</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Trust & Safety</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Popular Routes</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Split → Hvar</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Dubrovnik → Korčula</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Zadar → Pag</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2026 Barka. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;