// BlueLink.jsx
import React from "react";
import { Link } from "react-router-dom";

const Links = ({ to, children, className = "" }) => {
  return (
    <Link
      to={to}
      className={`text-blue-600 hover:text-blue-800 underline ${className}`}
    >
      {children}
    </Link>
  );
};

export default Links;
