const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient({
  keyFilename: "path_to_your_service_account_key.json",
});

async function recognizeIngredientsFromImage(imagePath) {
  const [result] = await client.labelDetection(imagePath);
  const labels = result.labelAnnotations;
  const ingredients = labels.map((label) => label.description);
  return ingredients;
}
