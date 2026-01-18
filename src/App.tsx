import { useEffect, useState } from "react";
import { getFeaturedRecipes } from "./api/mealdb";

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  useEffect(() => {
    async function loadRecipes() {
      if (page !== "recipes") return;

      setLoading(true);
      setError("");

      try {
        const data = await getFeaturedRecipes();
        if (data && data.meals) {
          setRecipes(data.meals);
        } else {
          setRecipes([]);
        }
      } catch (error) {
        setError("Something went wrong loading recipes.");
      }

      setLoading(false);
    }

    loadRecipes();
  }, [page]);

  function goHome() {
    setPage("home");
    setMenuOpen(false);
    setSelectedRecipe(null);
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

            {loading && <p>Loading...</p>}
            {error !== "" && <p>{error}</p>}

            {selectedRecipe === null && (
              <div className="card-grid">
                {recipes.map((recipe: any) => (
                  <div key={recipe.idMeal} className="card">
                    <img
                      className="card-img"
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      onClick={() => setSelectedRecipe(recipe)}
                    />

                    <h3
                      onClick={() => setSelectedRecipe(recipe)}
                      style={{ cursor: "pointer" }}
                    >
                      {recipe.strMeal}
                    </h3>
                  </div>
                ))}
              </div>
            )}

            {selectedRecipe && (
              <div className="detail">
                <img
                  className="detail-img"
                  src={selectedRecipe.strMealThumb}
                  alt={selectedRecipe.strMeal}
                />

                <h2>{selectedRecipe.strMeal}</h2>
                <p>
                  <b>Category:</b> {selectedRecipe.strCategory}
                </p>

                <p>Instructions will show later.</p>

                <p
                  onClick={() => setSelectedRecipe(null)}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Back to recipes
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <div className="footer">
        <p>Bon appéttit</p>
      </div>
    </div>
  );
}
