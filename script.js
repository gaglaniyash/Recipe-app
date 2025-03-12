document.getElementById("searchBtn").addEventListener("click", async () => {
    const searchInput = document.getElementById("searchBox").value.trim();
    const recipeContainer = document.getElementById("recipeContainer");

    if (!searchInput) {
        recipeContainer.innerHTML = "<h5>Please enter a recipe name</h5>";
        return;
    }

    recipeContainer.innerHTML = "<h5>Fetching Recipes...</h5>";

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
        const data = await response.json();

        recipeContainer.innerHTML = "";

        if (!data.meals) {
            recipeContainer.innerHTML = "<h5>No recipes found</h5>";
            return;
        }

        data.meals.forEach(meal => {
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe");
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p><strong>Origin:</strong> ${meal.strArea}</p>
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <button class="btn-small waves-effect waves-light view-recipe" data-name="${meal.strMeal}" data-instructions="${meal.strInstructions}">View Recipe</button>
            `;
            recipeContainer.appendChild(recipeDiv);
        });
    } catch (error) {
        recipeContainer.innerHTML = "<h5>Error fetching recipes</h5>";
    }
});

document.getElementById("recipeContainer").addEventListener("click", event => {
    if (event.target.classList.contains("view-recipe")) {
        const name = event.target.getAttribute("data-name");
        const instructions = event.target.getAttribute("data-instructions");
        showRecipeDetails(name, instructions);
    }
});

function showRecipeDetails(name, instructions) {
    document.getElementById("modalTitle").innerText = name;
    document.getElementById("modalInstructions").innerText = instructions;
    
    // Show modal
    document.getElementById("recipeModal").style.display = "block";
    document.getElementById("modalOverlay").style.display = "block";
}

// Close modal
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("recipeModal").style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
});

// Close modal when clicking outside
document.getElementById("modalOverlay").addEventListener("click", () => {
    document.getElementById("recipeModal").style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
});