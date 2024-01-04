import React from "react";
import { FaEdit } from "react-icons/fa";

const EditIcon = ({ onClick }) => (
  <FaEdit className="text-red-600 cursor-pointer" onClick={onClick} />
);

export default EditIcon;
