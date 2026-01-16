import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");

  const [menuOpen, setMenuOpen] = useState(false);

  const recipes = [
    { id: 1, title: "Pasta", description: "chicken pasta ,very good" },
    { id: 2, title: "Soup", description: "warm and good for you" },
    { id: 3, title: "Cake", description: "tasty cake" },
    { id: 4, title: "Salad", description: "Healty for you" },
  ];

  const [selectedRecipe, setSelectedRecipe] = useState<null | {
    id: Number;
    title: string;
    description: String;
  }>(null);

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

            {selectedRecipe === null ? (
              <div className="card-grid">
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="card">
                    <div
                      className="card-image"
                      onClick={() => setSelectedRecipe(recipe)}
                      style={{ cursor: "pointer" }}
                    >
                      Image
                    </div>

                    <h3
                      onClick={() => setSelectedRecipe(recipe)}
                      style={{ cursor: "pointer" }}
                    >
                      {recipe.title}
                    </h3>

                    <p>{recipe.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="detail">
                <div className="detail-image">Image</div>
                <h2>{selectedRecipe.title}</h2>
                <p>(Hérna kemur api datað)</p>

                <p
                  onClick={() => setSelectedRecipe(null)}
                  style={{ cursor: "pointer" }}
                >
                  Back to recipes
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="footer">
        <p> Bon appétit</p>
      </div>
    </div>
  );
}
