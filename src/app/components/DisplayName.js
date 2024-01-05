import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/navigation";

export default function DisplayName() {
  const [displayName, setDisplayName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        console.log(user);

        let { data, error } = await supabase
          .from("user_profiles")
          .select("display_name")
          .eq("id", user.id)
          .single();
        setDisplayName(data.display_name);
      }
    };

    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // handle post sign out (like redirecting to login page)
    router.push("/login");
  };

  return (
    <div ref={dropdownRef} className="relative">
      <h1 onClick={() => setShowDropdown(!showDropdown)} className="text-white">
        Welcome {displayName}
      </h1>
      {showDropdown && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
          <a
            href="#"
            onClick={handleSignOut}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </a>
        </div>
      )}
    </div>
  );
}
