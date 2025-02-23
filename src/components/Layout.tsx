import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/script-editor">Script Editor</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
