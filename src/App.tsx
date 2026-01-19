import { useEffect, useState } from "react";
import {
  getCategories,
  getRecipesByCategory,
  getRecipeById,
  searchRecipes,
  getRandomRecipe,
} from "./api/mealdb";

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [category, setCategory] = useState("Beef");
  const [selectedId, setSelectedId] = useState<any>(null);
  const [recipeDetail, setRecipeDetail] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [homeRecipes, setHomeRecipes] = useState<any[]>([]);

  useEffect(() => {
    async function loadHomeRecipes() {
      if (page !== "home") return;

      try {
        const first = await getRandomRecipe();
        const second = await getRandomRecipe();
        const third = await getRandomRecipe();
        const fourth = await getRandomRecipe();
        const fifth = await getRandomRecipe();
        const sixth = await getRandomRecipe();

        const list = [
          first.meals[0],
          second.meals[0],
          third.meals[0],
          fourth.meals[0],
          fifth.meals[0],
          sixth.meals[0],
        ];
        setHomeRecipes(list);
      } catch (error) {
        setHomeRecipes([]);
      }
    }

    loadHomeRecipes();
  }, [page]);

  useEffect(() => {
    async function loadRecipes() {
      if (page !== "recipes") return;

      setLoading(true);
      setError("");

      try {
        const data = await getRecipesByCategory(category);
        if (data && Array.isArray(data.meals)) {
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
  }, [page, category]);

  function goHome() {
    setPage("home");
    setMenuOpen(false);
    setSelectedId(null);
    setRecipeDetail(null);
  }

  function goRecipes() {
    setPage("recipes");
    setMenuOpen(false);
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function clearSearch() {
    setSearch("");
    setNoResults(false);
    setError("");
  }

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        if (data && Array.isArray(data.meals)) {
          setCategories(data.meals);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadDetail() {
      if (!selectedId) return;

      try {
        const data = await getRecipeById(selectedId);
        if (data && data.meals && data.meals[0]) {
          setRecipeDetail(data.meals[0]);
        }
      } catch (error) {
        setRecipeDetail(null);
      }
    }
    loadDetail();
  }, [selectedId]);

  async function doSearch() {
    if (search.trim() === "") return;

    setPage("recipes");
    setMenuOpen(false);

    setLoading(true);
    setError("");
    setNoResults(false);

    try {
      const data = await searchRecipes(search);

      if (data && data.meals) {
        setRecipes(data.meals);
        setNoResults(false);
      } else {
        setRecipes([]);
        setNoResults(true);
      }
      setSelectedId(null);
      setRecipeDetail(null);
    } catch (error) {
      setError("Search failed, Please try again.");
      setRecipes([]);
    }

    setLoading(false);
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

        <div className="header-search">
          <input
            type="text"
            value={search}
            onChange={(error) => setSearch(error.target.value)}
            placeholder="Search..."
          ></input>

          <button onClick={doSearch}>Search</button>
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
            <h1>Welcome to the recipe site!</h1>

            <h2>Popular recipes right now!</h2>

            <div className="card-grid">
              {homeRecipes.map((recipe: any) => (
                <div key={recipe.idMeal} className="card">
                  <img
                    className="card-img"
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                  />
                  <h3>{recipe.strMeal}</h3>
                </div>
              ))}
            </div>
          </>
        )}

        {page === "recipes" && (
          <>
            <h1>Recipes</h1>

            <p>Choose Category</p>

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSelectedId(null);
                setRecipeDetail(null);
              }}
            >
              {categories.map((category: any) => (
                <option key={category.strCategory} value={category.strCategory}>
                  {category.strCategory}
                </option>
              ))}
            </select>

            {loading && <p>Loading...</p>}
            {error !== "" && <p>{error}</p>}

            {noResults && (
              <p>
                No results found.{" "}
                <span
                  onClick={clearSearch}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Clear search
                </span>
              </p>
            )}

            {recipeDetail ? (
              <div className="detail">
                <img
                  className="detail-img"
                  src={recipeDetail.strMealThumb}
                  alt={recipeDetail.strMeal}
                />

                <h2>{recipeDetail.strMeal}</h2>
                <p>{recipeDetail.strInstructions}</p>

                <p
                  onClick={() => {
                    setSelectedId(null);
                    setRecipeDetail(null);
                  }}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Back to recipes
                </p>
              </div>
            ) : (
              <div className="card-grid">
                {recipes.map((recipe: any) => (
                  <div key={recipe.idMeal} className="card">
                    <img
                      className="card-img"
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      onClick={() => setSelectedId(recipe.idMeal)}
                    />

                    <h3
                      onClick={() => setSelectedId(recipe.idMeal)}
                      style={{ cursor: "pointer" }}
                    >
                      {recipe.strMeal}
                    </h3>
                  </div>
                ))}
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
