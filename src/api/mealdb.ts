export async function getFeaturedRecipes(): Promise<any> {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return response.json();
}

export async function getRecipeById(id: string): Promise<any> {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }
  return response.json();
}

export async function getCategories(): Promise<any> {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?c=list",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function getRecipesByCategory(category: string): Promise<any> {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return response.json();
}

export async function searchRecipes(query: string): Promise<any> {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
  );

  if (!response.ok) {
    throw new Error("Failedto search recipes");
  }

  return response.json();
}

export async function getRandomRecipe(): Promise<any> {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch random recipe");
  }

  return response.json();
}
