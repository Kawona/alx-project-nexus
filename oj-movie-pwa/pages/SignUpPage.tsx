import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Create the user using AuthContext
    const err = await signUp(name, email, password);

    if (err) {
      setError(err);
      return;
    }

    // Immediately sign the user in after creating account
    await signIn(email, password);

    navigate("/"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="max-w-md w-full bg-[#1a1a1a] p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Create Account
        </h1>

        {error && (
          <div className="bg-red-600 text-white px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-300">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-300">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-500 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-gray-400 mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-yellow-400 underline hover:text-yellow-500"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
