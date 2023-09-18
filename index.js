const express = require("express");
const app = express();
const Jimp = require("jimp");
const port = 4550;
const inputImagePath = "check2.jpg";
const outputImagePath = "outputtt.jpg";
const text = "ABCD";
const fontFamily ="./d.fnt";

// Define a larger font size
Jimp.loadFont(fontFamily) // You can use a different Jimp font if needed
  .then((font) => {
    return Jimp.read(inputImagePath).then((image) => {
      // Create a new Jimp image for the text
      const textImage = new Jimp(200, 100); // Adjust the width and height as needed
      textImage.print(font, 55, 35, text); // Add text to the textImage
      textImage.rotate(90); // Rotate the text by 45 degrees
      textImage.resize(1200,1400)

      // Add a red color to the text (RGBA format)
      textImage.color([
        { apply: "hue", params: [-90] },
        { apply: "lighten", params: [50] },
        { apply: "xor", params: ["#FFFFFF"]}
      ]);

      // Apply a text shadow by cloning the text with a slight offset and color
      const shadowOffset = -7; // Adjust the shadow offset as needed
      const shadowColor = Jimp.rgbaToInt(0, 0, 25, 100);  
      const shadowImage = textImage.clone().color([
     
        { apply: "xor", params: ["#ff0000"] }
      ]);
    //   textImage.clone().color([{ apply: "darken", params: [shadowColor, 100] }]);

      // Calculate the position to center the rotated textImage
      const textX = (image.bitmap.width - textImage.bitmap.width) / 2;
      const textY = (image.bitmap.height - textImage.bitmap.height) / 2;
      const shadowX = textX + shadowOffset;
      const shadowY = textY + shadowOffset;

            // Composite the shadowImage onto the original image
            image.composite(shadowImage, shadowX, shadowY);
      // Composite the rotated textImage onto the original image
      image.composite(textImage, textX, textY);

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
app.get('/img-url', (req, res) => {
  res.send('This is my custom endpoint!');
});


app.listen(port, () => {
  console.log(`App is listening to the port ${port}`);
});
