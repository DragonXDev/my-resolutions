"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import DisplayName from "./components/DisplayName";
import AddResolutionButton from "./components/AddResolution";
import Modal from "./components/AddModal";
import TrashIcon from "./components/TrashIcon";
import EditIcon from "./components/EditIcon";
import WelcomePopup from "./components/WelcomePopup";
import { uid } from "./utilities/uid";
import {
  handleAddResolution,
  handleDeleteResolution,
  updateResolution,
} from "./utilities/resolutionHandlers";

export default function Home() {
  const [resolutions, setResolutions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState("");
  const [editingResolution, setEditingResolution] = useState(null);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
        setUserDisplayName(user.user_metadata.full_name);
      }
      let { data, error } = await supabase.from("resolutions").select("*");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setResolutions(data);
      }
    };
    fetchData();
  }, []);

  const onAddResolutionClick = () => {
    if (isLoggedIn) {
      setModalOpen(true);
    } else {
      setShowLoginPrompt(true);
    }
  };

  const addNewResolution = async (resolutionText) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (isLoggedIn) {
      let idNum = uid();
      await handleAddResolution(resolutionText, idNum, user, setResolutions);
    }
  };

  const handleEditResolution = (resolutionToEdit) => {
    setEditingResolution(resolutionToEdit);
    setModalOpen(true);
  };

  return (
    <div
      className={`flex flex-wrap justify-center gap-y-0.5 gap-x-4 items-start h-screen bg-white ${
        isLoggedIn ? "loggedIn" : "loggedOut"
      }`}
    >
      <div className="col-span-full w-full p-4 flex justify-end ">
        {isLoggedIn ? (
          <div className="bg-zinc-700 shadow-2xl rounded-2xl p-3 mr-7 mt-4">
            <DisplayName />
          </div>
        ) : (
          <a
            className="bg-zinc-700 shadow-2xl rounded-2xl p-3 mr-7 mt-4"
            onClick={() => console.log("HERE")}
            href="/login"
          >
            Login
          </a>
        )}
      </div>

      {resolutions.map((resolution) => (
        <div
          key={resolution.id}
          className="bg-red-400 m-2 p-6 rounded-2xl shadow-2xl relative break-words h-auto max-w-xs"
        >
          {resolution.name === userDisplayName && (
            <div className="absolute top-2 right-2 flex space-x-2">
              <EditIcon onClick={() => handleEditResolution(resolution)} />
              <TrashIcon
                onClick={() =>
                  handleDeleteResolution(resolution, setResolutions)
                }
              />
            </div>
          )}
          <h3 className="text-lg font-bold">{resolution.name}</h3>
          <p>{resolution.message}</p>
        </div>
      ))}
      <div className="col-span-full">
        <AddResolutionButton onClick={onAddResolutionClick} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingResolution(null);
        }}
        onAdd={addNewResolution}
        editingResolution={editingResolution}
        updateResolution={(res) => updateResolution(res, setResolutions)}
      />
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-10 rounded-lg text-black shadow-xl">
            <h2 className="text-lg font-bold mb-4">Login Required</h2>
            <p>Please log in to add a resolution.</p>
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showWelcomePopup && (
        <WelcomePopup setShowWelcomePopup={setShowWelcomePopup} />
      )}
    </div>
  );
}
