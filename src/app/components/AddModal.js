// Modal.js
import { useState, useEffect } from "react";

const Modal = ({
  isOpen,
  onClose,
  onAdd,
  editingResolution,
  updateResolution,
}) => {
  const [resolution, setResolution] = useState("");
  const [isMaxLimitReached, setIsMaxLimitReached] = useState(false);

  useEffect(() => {
    if (editingResolution) {
      setResolution(editingResolution.message);
    } else {
      setResolution("");
    }
  }, [editingResolution]);

  useEffect(() => {
    if (resolution.length >= 100) {
      setIsMaxLimitReached(true);
    } else {
      setIsMaxLimitReached(false);
    }
  }, [resolution]);

  if (!isOpen) return null;

  const handleUpdateResolution = () => {
    if (editingResolution) {
      updateResolution({ ...editingResolution, message: resolution });
    } else {
      onAdd(resolution);
    }
    setResolution(""); // Reset the resolution state
    onClose();
  };

  const handleChange = (e) => {
    if (e.target.value.length >= 100) {
      setIsMaxLimitReached(true);
    } else {
      setIsMaxLimitReached(false);
    }
    setResolution(e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg text-black shadow-xl w-11/12 md:w-1/3">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <div className="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </button>
        </div>
        <textarea
          rows="4" // Set the initial number of rows
          placeholder="My new year's resolution is..."
          value={resolution}
          onChange={handleChange}
          className="border p-3 rounded text-lg w-full resize-none"
          // disabled={isMaxLimitReached} // Disable input when max limit is reached
        />
        {isMaxLimitReached && (
          <p className="text-red-500">Max limit reached (100 characters).</p>
        )}
        <button
          onClick={handleUpdateResolution}
          className={
            isMaxLimitReached
              ? "bg-slate-800 text-black font-bold py-3 px-6 rounded-full mt-4"
              : "bg-blue-500 hover:bg-blue-700 text-black font-bold py-3 px-6 rounded-full mt-4"
          }
          disabled={isMaxLimitReached} // Disable the button when max limit is reached
        >
          {editingResolution ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default Modal;
