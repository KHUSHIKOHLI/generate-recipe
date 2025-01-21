const React=require ('react');
const {useState}= React;
const axios=require('axios');

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const allIngredients = [
    "tomato", "lettuce", "cucumber", "onion", "carrot", "spinach", 
    "olive oil", "salt", "pepper", "garlic", "potato", "broccoli", 
    "cheese", "eggplant", "mushroom", "zucchini", "basil", "avocado", 
    "rice", "pasta","chicken","tortilla","banana","milk","yogurt","eggs",
    "carrot","butter","brocolli"
  ];

  // Handle ingredient change
  const handleIngredientChange = (event) => {
    const value = event.target.value;
    if (value) {
      const selectedIngredients = value.split(',').map((ingredient) => ingredient.trim());
      setIngredients(selectedIngredients);
    }
  };

  // Handle dietary preference change
  const handleDietaryChange = (event) => setDietaryPreference(event.target.value);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null); // Clear previous errors

    const data = { ingredients, dietaryPreference };

    try {
      const response = await axios.post("http://localhost:5000/generate-recipes", data);
      setRecipes(response.data);
    } catch (err) {
      setError("Error fetching recipes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Smart Recipe Generator</h1>
      
      <div>
        <label>Ingredients:</label>
        <input 
          type="text" 
          value={ingredients.join(', ')} 
          onChange={handleIngredientChange} 
          placeholder="Enter ingredients separated by commas"
        />
        {/* <p>Suggested ingredients: {allIngredients.join(", ")}</p> */}
      </div>

      <div>
        <label>Dietary Preference:</label>
        <select value={dietaryPreference} onChange={handleDietaryChange}>
          <option value="vegetarian">Vegetarian</option>
          <option value="gluten-free">Gluten-Free</option>
          <option value="none">None</option>
          <option value-="non-vegetarian">Non-Vegetarian</option>
        </select>
      </div>

      <button onClick={handleSubmit}>
        {loading ? "Generating Recipes..." : "Generate Recipes"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <h2>Suggested Recipes</h2>
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index}>
              <h3>{recipe.name}</h3>
              <p>{recipe.instructions}</p>
              <p><strong>Calories:</strong> {recipe.nutrition.calories}</p>
            </div>
          ))
        ) : (
          <p>No recipes found. Please try again.</p>
        )}
      </div>
    </div>
  );
}

export default App;