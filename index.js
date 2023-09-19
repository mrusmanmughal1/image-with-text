const express = require("express");
const app = express();
const Jimp = require("jimp");
const port = 4550;
const inputImagePath = "2.jpeg";
const outputImagePath = "outputtt.jpg";
const text = "AAAA";
const fontFamily = "../250.fnt";

// Define a larger font size
Jimp.loadFont(fontFamily) // You can use a different Jimp font if needed
  .then((font) => {
    return Jimp.read(inputImagePath).then((image) => {
      // Create a new Jimp image for the text
      const textImage = new Jimp(700, 300); // Adjust the width and height as needed
      textImage.print(font, 0, 0, text); // Add text to the textImage
      textImage.rotate(90); // Rotate the text by 45 degrees

      // Add a red color to the text (RGBA format)
      textImage.color([{ apply: "xor", params: ["#D3D0AD"] }]);

      // Apply a text shadow by cloning the text with a slight offset and color
      const shadowOffset = -7; // Adjust the shadow offset as needed
      const shadowColor = Jimp.rgbaToInt(0, 0, 25, 100);
      const shadowImage = textImage
        .clone()
        .color([{ apply: "xor", params: ["#F3E020"] }]);
      textImage
        .clone()
        .color([{ apply: "darken", params: [shadowColor, 100] }]);

      // Calculate the position to center the rotated textImage
      const textX = (image.bitmap.width - textImage.bitmap.width) / 1.5;
      const textY = (image.bitmap.height - textImage.bitmap.height) / 2;
      const shadowX = textX + shadowOffset;
      const shadowY = textY + shadowOffset;

      // Composite the shadowImage onto the original image
      image.composite(shadowImage, shadowX, shadowY);
      // Composite the rotated textImage onto the original image
      image.composite(textImage, textX, textY);
      console.log(image.getWidth(), image.getHeight());
      return image;
    });
  })
  .then((modifiedImage) => {
    // Save the modified image
    return modifiedImage.writeAsync(outputImagePath);
  })
  .then(() => {
    console.log(
      `Text added and rotated, and the image is saved as ${outputImagePath}`
    );
  })
  .catch((err) => {
    console.error(err);
  });

// Define an endpoint
app.get('/img', (req, res) => {
  // Construct the URL of the generated image
  const imageUrl = `http://localhost:${port}/${outputImagePath}`;
  
  // Send the image URL as a response
  res.json({ imageUrl });
});

app.listen(port, () => {
  console.log(`App is listening to the port ${port}`);
});
