import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");

  const [menuOpen, setMenuOpen] = useState(false);

  function goHome() {
    setPage("home");
    setMenuOpen(false);
  }

  function goRecipes() {
    setPage("recipes");
    setMenuOpen(false);
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className="page">
      <div className="header">
        <div
          className="header-left"
          onClick={toggleMenu}
          style={{ cursor: "pointer" }}
        >
          ☰
        </div>

        <div
          className="header-title"
          onClick={goHome}
          style={{ cursor: "pointer" }}
        >
          Bon appétit
        </div>
      </div>

      {menuOpen && (
        <div className="menu">
          <p onClick={goHome}>Home</p>
          <p onClick={goRecipes}>Recipes</p>
        </div>
      )}

      <div className="content">
        {page === "home" && (
          <>
            <h1>Hello world</h1>
            <p>Þetta er síðan mín</p>
          </>
        )}

        {page === "recipes" && (
          <>
            <h1>Recipes</h1>
            <p>Setja recipes hér.</p>
          </>
        )}
      </div>

      <div className="footer">
        <p> Bon appétit</p>
      </div>
    </div>
  );
}
