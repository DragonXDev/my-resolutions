import React from "react";
import { FaTrash } from "react-icons/fa";

const TrashIcon = ({ onClick }) => (
  <FaTrash className="text-red-600 cursor-pointer" onClick={onClick} />
);

export default TrashIcon;
