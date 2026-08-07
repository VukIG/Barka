import { useState } from "react";
import { useNavigate } from "react-router";
import { Anchor, Mail, Lock, User, Eye, EyeOff, Waves } from "lucide-react";
import { API_URL } from "../config/api";
import ImageUpload from "../components/ImageUpload";
import { nationalities, EMPTY_FORM } from "../data/mockData";
function AuthPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const API_URL = "http://localhost:5000";
  const [submitting, setSubmitting] = useState(false);
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return; // guard against double-fire
    setSubmitting(true);
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

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
          description: description,
        }
      : { email: formData.email, password: formData.password };

    const body = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      body.append(key, value);
    });

    if (imageFile) {
      body.append("image", imageFile);
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: body,
      });

      const result = await response.json();
      setSubmitting(false);
      if (!response.ok) {
        alert(
          response.message || (isSignUp ? "Sign up failed." : "Login failed."),
        );
        return;
      } else {
        localStorage.setItem("user", JSON.stringify(result.user));
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Request failed:", err);
      alert("Could not reach the server.");
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
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-gray-600">
              {isSignUp
                ? "Join the Adriatic boat sharing community"
                : "Sign in to continue your journey"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
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
                      placeholder="Choose a username"
                      required={isSignUp}
                    />
                  </div>
                </div>

                {/* First + Last name — stacks on mobile, two columns on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First name
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
                        placeholder="First name"
                        required={isSignUp}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last name
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
                        placeholder="Last name"
                        required={isSignUp}
                      />
                    </div>
                  </div>
                </div>

                {/* Age + Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
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
                      Gender
                    </label>
                    <div className="flex gap-3">
                      {["male", "female"].map((g) => (
                        <label
                          key={g}
                          className={`flex-1 flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer capitalize transition-colors ${
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
                          {g}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nationality + Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nationality
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
                      <option value="">Select nationality</option>
                      {nationalities.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required={isSignUp}
                    >
                      <option value="">Select role</option>
                      {["tourist", "owner", "both"].map((r) => (
                        <option key={r} value={r} className="capitalize">
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
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
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
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
                  placeholder="Enter your password"
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
                  Confirm Password
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
                    placeholder="Confirm your password"
                    required={isSignUp}
                  />
                </div>
                <div>
                  <br />
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    Upload your profile picture
                  </h2>
                  <p className="text-sm text-gray-500 mt-5 mb-5">
                    {" "}
                    Upload an image of your headshot.
                  </p>
                  <ImageUpload onFileSelect={setImageFile} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About you
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell other users a bit about yourself — where you travel, your boat, what to expect on a ride..."
                    rows={4}
                    maxLength={1000}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {description.length}/1000 characters
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
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          {/* Toggle Sign In/Sign Up */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
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
                {isSignUp ? "Sign In" : "Sign Up"}
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
          <h2 className="text-4xl font-bold mb-4">
            Explore the Adriatic Coast
          </h2>
          <p className="text-xl text-blue-100">
            Connect with captains and passengers for unforgettable journeys
            along the Adriatic Sea
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
