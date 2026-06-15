import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import SiteVisit from "./pages/SiteVisit";
import VisitHistory from "./pages/VisitHistory";

import "./App.css";
import "./styles/siteVisit.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        {/* Header */}

        <header className="navbar">

          <div className="logo">
            🏢 Smart Real Estate CRM
          </div>

          <nav className="nav-links">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              📍 Site Visit
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              📋 Visit History
            </NavLink>

          </nav>

        </header>

        {/* Main Content */}

        <main className="main-content">

          <Routes>

            <Route
              path="/"
              element={<SiteVisit />}
            />

            <Route
              path="/history"
              element={<VisitHistory />}
            />

          </Routes>

        </main>

        {/* Footer */}

        <footer className="footer">

          © 2026 Smart Real Estate CRM | Module 7 - Site Visit Verification

        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;