"use client";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { supabase } from "../supabaseClient";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        console.log("User is logged in");
      } else {
        console.log("No user is logged in");
      }
    }

    checkSession();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    // router.push("/");
    if (error) {
      console.error("Error logging in:", error);
      setLoading(false);
    } else if (user) {
      router.push("/"); // Redirect to the dashboard page
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-red-400 p-8 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-white">Login</h2>
        <button
          onClick={handleLogin}
          className="bg-white text-red-400 px-4 py-2 rounded hover:bg-gray-100"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login with Google"}
        </button>
      </div>
    </div>
  );
}
