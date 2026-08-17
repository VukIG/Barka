import { useState } from "react";
import { useNavigate } from "react-router";
import { Anchor, Mail, Lock, User, Eye, EyeOff, Waves } from "lucide-react";
import { useTranslation } from "react-i18next";
import { API_URL } from "../config/api";
import ImageUpload from "../components/ImageUpload";
import { nationalities, EMPTY_FORM } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
function AuthPage() {
  const { t } = useTranslation();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [description, setDescription] = useState("");
  const { submitAuth } = useAuth();
  const navigate = useNavigate();

  const genderLabels = {
    male: t("auth.genderMale"),
    female: t("auth.genderFemale"),
  };
  const roleLabels = {
    tourist: t("auth.roleTourist"),
    owner: t("auth.roleOwner"),
    both: t("auth.roleBoth"),
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert(t("auth.passwordsDontMatch"));
      return; // note: you currently forget to reset submitting here
    }
    setSubmitting(true);

    const url = isSignUp ? `${API_URL}/users/signUp` : `${API_URL}/users/logIn`;
    const payload = isSignUp
      ? {
          username: formData.name,
          firstName: formData.firstname,
          lastName: formData.lastname,
          age: formData.age,
          gender: formData.gender,
          nationality: formData.nationality,
          role: formData.role,
          email: formData.email,
          password: formData.password,
          description,
        }
      : { email: formData.email, password: formData.password };

    const body = new FormData();
    Object.entries(payload).forEach(([k, v]) => body.append(k, v));
    if (imageFile) body.append("image", imageFile);

    try {
      await submitAuth(url, body);
      if (isSignUp) {
        navigate("/verify"); // no window.location.href, no reload
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false); // always clears, even on the password-mismatch path
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg shadow-lg">
                <Anchor className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                Barka
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isSignUp ? t("auth.createAccountTitle") : t("auth.welcomeBackTitle")}
            </h1>
            <p className="text-gray-600">
              {isSignUp ? t("auth.joinCommunity") : t("auth.signInContinue")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("auth.username")}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t("auth.chooseUsername")}
                      required={isSignUp}
                    />
                  </div>
                </div>

                {/* First + Last name — stacks on mobile, two columns on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("auth.firstName")}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.firstname}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstname: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={t("auth.firstName")}
                        required={isSignUp}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("auth.lastName")}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.lastname}
                        onChange={(e) =>
                          setFormData({ ...formData, lastname: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={t("auth.lastName")}
                        required={isSignUp}
                      />
                    </div>
                  </div>
                </div>

                {/* Age + Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("auth.age")}
                    </label>
                    <input
                      type="number"
                      min="18"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="18"
                      required={isSignUp}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("auth.gender")}
                    </label>
                    <div className="flex gap-3">
                      {["male", "female"].map((g) => (
                        <label
                          key={g}
                          className={`flex-1 flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                            formData.gender === g
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="gender"
                            className="sr-only"
                            checked={formData.gender === g}
                            onChange={() =>
                              setFormData({ ...formData, gender: g })
                            }
                          />
                          {genderLabels[g]}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nationality + Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("auth.nationality")}
                    </label>
                    <select
                      value={formData.nationality}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nationality: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required={isSignUp}
                    >
                      <option value="">{t("auth.selectNationality")}</option>
                      {nationalities.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("auth.role")}
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required={isSignUp}
                    >
                      <option value="">{t("auth.selectRole")}</option>
                      {["tourist", "owner", "both"].map((r) => (
                        <option key={r} value={r}>
                          {roleLabels[r]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("auth.emailAddress")}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t("auth.enterEmail")}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("auth.password")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t("auth.enterPassword")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("auth.confirmPassword")}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t("auth.confirmYourPassword")}
                    required={isSignUp}
                  />
                </div>
                <div>
                  <br />
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    {t("auth.uploadProfilePicture")}
                  </h2>
                  <p className="text-sm text-gray-500 mt-5 mb-5">
                    {" "}
                    {t("auth.uploadHeadshot")}
                  </p>
                  <ImageUpload onFileSelect={setImageFile} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("auth.aboutYou")}
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t("auth.aboutYouPlaceholder")}
                    rows={4}
                    maxLength={1000}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {t("auth.charactersCount", { count: description.length })}
                  </p>
                </div>
              </div>
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700"
                >
                  {t("auth.forgotPassword")}
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
            >
              {isSignUp ? t("auth.createAccountButton") : t("auth.signInButton")}
            </button>
          </form>

          {/* Toggle Sign In/Sign Up */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isSignUp ? t("auth.alreadyHaveAccount") : t("auth.dontHaveAccount")}{" "}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  });
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                {isSignUp ? t("auth.signInLink") : t("auth.signUpLink")}
              </button>
            </p>
          </div>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1759068207850-35367e2dc3f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9hdGlhbiUyMGNvYXN0JTIwYm9hdHMlMjBhZHJpYXRpYyUyMHNlYXxlbnwxfHx8fDE3NzQ2MTY2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Adriatic Coast"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <Waves className="w-12 h-12 mb-4" />
          <h2 className="text-4xl font-bold mb-4">{t("auth.exploreTitle")}</h2>
          <p className="text-xl text-blue-100">{t("auth.exploreBody")}</p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
