export async function getFeaturedRecipes(): Promise<any> {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return response.json();
}

export async function getRecipeById(id: string) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }
  return response.json;
}
