import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Anchor, Menu, X } from "lucide-react";
import { useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config/api";
import LanguageSwitcher from "./LanguageSwitcher";
import Avatar from "./Avatar";

function Layout() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoading, signOut } = useAuth();
  const canOfferRide = user && user.role !== "tourist";
  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2">
        <OrbitProgress
          color="#318dcc"
          size="medium"
          text=""
          textColor="#ffffff"
        />
      </div>
    );
  }

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
                <div className="text-xs text-gray-500">{t("nav.tagline")}</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/buissnes"
                className={`text-sm transition-colors ${
                  location.pathname === "/buissnes"
                    ? "text-blue-600 font-medium"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {t("nav.forBusinesses")}
              </Link>

              {user ? (
                <>
                  {canOfferRide && (
                    <Link
                      to="/offer"
                      className={`text-sm transition-colors ${
                        location.pathname === "/offer"
                          ? "text-blue-600 font-medium"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      {t("nav.offerRide")}
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
                  >
                    {t("nav.signOut")}
                  </button>
                  <Avatar
                    src={
                      user.image_path ? `${API_URL}/${user.image_path}` : null
                    }
                    name={user.user_name}
                    initials={`${user.user_name[0] ?? ""}${user.user_name[1] ?? ""}`}
                    alt={user.user_name}
                    onClick={() => navigate(`/profile/${user.id}`)}
                    className="w-12 h-12 cursor-pointer rounded-full object-cover shadow-md"
                    fallbackClassName="w-12 h-12 cursor-pointer rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-700"
                  />
                </>
              ) : (
                <Link
                  to="/auth"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  {t("nav.signIn")}
                </Link>
              )}

              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col gap-4">
                <Link
                  to="/search"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.findRide")}
                </Link>
                {canOfferRide && (
                  <Link
                    to="/offer"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("nav.offerARide")}
                  </Link>
                )}
                <Link
                  to="/business"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.forBusinesses")}
                </Link>

                {user ? (
                  <button
                    onClick={handleLogout}
                    className="text-left text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {t("nav.signOut")}
                  </button>
                ) : (
                  <Link
                    to="/auth"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("nav.signIn")}
                  </Link>
                )}

                <LanguageSwitcher />
              </div>
            </div>
          )}
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
                  <Anchor className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-blue-600">Barka</span>
              </div>
              <p className="text-sm text-gray-600">{t("footer.tagline")}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {t("footer.aboutHeading")}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {t("footer.howItWorks")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {t("footer.safety")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {t("footer.trustSafety")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {t("footer.supportHeading")}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {t("footer.helpCenter")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {t("footer.contactUs")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {t("footer.termsOfService")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {t("footer.popularRoutesHeading")}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Split → Hvar
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Dubrovnik → Korčula
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Zadar → Pag
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
