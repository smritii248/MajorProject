import { useState } from "react";
import { Leaf, User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function SignupScreen({ onSignup, goLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    // Placeholder: replace with real signup API call once backend is ready
    onSignup({ name, email });
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#FAF9F4] px-6 flex flex-col justify-center">
      {/* Brand */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-3">
          <Leaf size={26} className="text-green-600" />
        </div>
        <div className="font-extrabold text-lg">EcoThread</div>
        <div className="text-xs text-gray-500 mt-1">Create your account</div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Name field */}
        <div className="flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3">
          <User size={16} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-sm outline-none bg-transparent"
          />
        </div>

        {/* Email field */}
        <div className="flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3">
          <Mail size={16} className="text-gray-400 shrink-0" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-sm outline-none bg-transparent"
          />
        </div>

        {/* Password field */}
        <div className="flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3">
          <Lock size={16} className="text-gray-400 shrink-0" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-sm outline-none bg-transparent"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="shrink-0 text-gray-400"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Confirm password field */}
        <div className="flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3">
          <Lock size={16} className="text-gray-400 shrink-0" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full text-sm outline-none bg-transparent"
          />
        </div>

        {error && (
          <div className="text-xs text-red-500 font-medium px-1">{error}</div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-2xl bg-green-600 text-white py-3 font-bold text-sm mt-2"
        >
          Sign up
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">or</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Login link */}
      <div className="text-center text-sm">
        <span className="text-gray-500">Already have an account? </span>
        <button onClick={goLogin} className="font-bold text-green-600">
          Log in
        </button>
      </div>
    </div>
  );
}
