import React, { memo } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const navLinks = [
    { to: "/taskform", label: "Task Creation" },
    { to: "/tasklist", label: "Task List" },
    { to: "/userprofile", label: "Profile" },
  ];

  return (
    <nav>
      <div className="logo">Task Manager</div>
      <ul>
        {navLinks.map(({ to, label }) => (
          <li key={to}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default memo(Navbar);
