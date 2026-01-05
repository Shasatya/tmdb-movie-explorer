"use client";

import { Cross } from "@/icons/index";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { fetchMe } from "@/store/slices/authSlice";

export default function AuthModal({ onClose }) {
  const dispatch = useAppDispatch();

  const [type, setType] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint =
        type === "login" ? "/api/auth/login" : "/api/auth/register";

      const payload =
        type === "login"
          ? { email: form.email, password: form.password }
          : form;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      dispatch(fetchMe());

      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface p-4 rounded-2xl">
      <div className="flex items-start justify-between ">
        <h2 className="mb-4 text-xl font-semibold">
          {type === "login" ? "Login" : "Sign Up"}
        </h2>
        <div className="cursor-pointer" onClick={onClose}>
          <Cross className="h-5 w-5 text-white" />
        </div>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {type === "signup" && (
          <div>
            <label className="mb-1 block text-sm text-text-secondary">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              type="text"
              placeholder="John Doe"
              className="w-full rounded-lg border border-surface bg-background px-3 py-2 text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm text-text-secondary">
            Email
          </label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-surface bg-background px-3 py-2 text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-text-secondary">
            Password
          </label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-surface bg-background px-3 py-2 text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-accent px-4 py-2 font-medium text-white hover:bg-accent-hover transition-colors cursor-pointer"
        >
          {loading ? "Please wait..." : type === "login" ? "Login" : "Sign Up"}{" "}
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-text-secondary">
        {type === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              disabled={loading}
              type="button"
              onClick={() => setType("signup")}
              className="text-accent hover:underline cursor-pointer"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              disabled={loading}
              type="button"
              onClick={() => setType("login")}
              className="text-accent hover:underline cursor-pointer"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
