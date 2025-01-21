const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const cors= require("cors");

app.use (cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const recipeDatabase = [
    { name: "Salad", ingredients: ["lettuce", "tomato", "olive oil"], instructions: "Mix ingredients", nutrition: { calories: 150 } },
    { name: "Pasta", ingredients: ["pasta", "tomato", "cheese"], instructions: "Boil pasta, add sauce", nutrition: { calories: 500 } },
    { name: "Grilled Cheese Sandwich", ingredients: ["bread", "cheese", "butter"], instructions: "Grill bread with cheese and butter", nutrition: { calories: 400 } },
    { name: "Fruit Salad", ingredients: ["apple", "banana", "orange"], instructions: "Mix all fruits", nutrition: { calories: 250 } },
    { name: "Chicken Stir Fry", ingredients: ["chicken", "soy sauce", "broccoli", "carrot"], instructions: "Stir fry chicken with vegetables and soy sauce", nutrition: { calories: 600 } },
    { name: "Vegetable Soup", ingredients: ["potato", "carrot", "celery", "onion"], instructions: "Boil vegetables in water", nutrition: { calories: 300 } },
    { name: "Scrambled Eggs", ingredients: ["egg", "milk", "butter"], instructions: "Scramble eggs with milk and butter", nutrition: { calories: 200 } },
    { name: "Smoothie", ingredients: ["banana", "milk", "yogurt"], instructions: "Blend all ingredients", nutrition: { calories: 250 } },
    { name: "Tacos", ingredients: ["tortilla", "chicken", "lettuce", "cheese"], instructions: "Assemble ingredients in tortilla", nutrition: { calories: 450 } },
    { name: "Fried Rice", ingredients: ["rice", "soy sauce", "egg", "peas"], instructions: "Fry rice with soy sauce, egg, and peas", nutrition: { calories: 500 } },
   
  ]
// Route to handle GET requests to the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Smart Recipe Generator backend!');
  console.log("hello")
});

app.post("/generate-recipes", async (req, res) => {
    console.log("request body:",req.body);
  const { ingredients, dietaryPreference, image } = req.body;

  if (image) {
    const ingredientsFromImage = await recognizeIngredientsFromImage(image);
    console.log(ingredientsFromImage);
  }
  if(!Array.isArray(ingredients)){
    return res.status(400).json({error:" 'ingredients' must be an array"});
  }

  const matchedRecipes = recipeDatabase.filter((recipe) => {
    return recipe.ingredients.some((ingredient) => ingredients.includes(ingredient));
  });

  res.json(matchedRecipes);
});

const recognizeIngredientsFromImage = async (image) => {
  const recognizedIngredients = ["tomato", "lettuce"];
  return recognizedIngredients;
};

app.listen(5000, () => {
    console.log("peeks")
  console.log("Server running on http://localhost:5000");
});
