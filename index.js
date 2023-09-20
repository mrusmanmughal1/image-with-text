const express = require("express");
const app = express();
const Jimp = require("jimp");
const port = 4550;
const outputImagePath = "outputtt.jpg";
const fontFamily = "../128.fnt";

// Define an endpoint
app.get('/img', (req, res) => {
  const phoneModel = req.query.phoneModel; 
  const Text = req.query.Text; 
  console.log("model: "+phoneModel);
Jimp.loadFont(fontFamily)  
  .then((font) => {
    return Jimp.read(phoneModel).then((image) => {
      // Create a new Jimp image for the text
      const textImage = new Jimp(300, 600); // Adjust the width and height as needed
      textImage.print(font, 0, 0, Text); // Add text to the textImage
      textImage.rotate(90);  
      textImage.color([{ apply: "xor", params: ["#D3D0AD"] }]);
      const shadowOffset = -7; // Adjust the shadow offset as needed
      const shadowColor = Jimp.rgbaToInt(0, 0, 25, 100);
      const shadowImage = textImage
        .clone()
        .color([{ apply: "xor", params: ["#F3E020"] }]);
      textImage
        .clone()
        .color([{ apply: "darken", params: [shadowColor, 100] }]);

      // Calculate the position to center the rotated textImage
      const textX = (image.bitmap.width - textImage.bitmap.width) / 2;
      const textY = (image.bitmap.height - textImage.bitmap.height) / 2;
      const shadowX = textX + shadowOffset;
      const shadowY = textY + shadowOffset;

     

      // Composite the shadowImage onto the original image
      image.composite(shadowImage, shadowX, shadowY);
      // Composite the rotated textImage onto the original image
      image.composite(textImage, textX, textY);
      console.log("second screen ",textImage.getWidth() , textImage.getHeight())
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
  const imagePath = __dirname + '/outputtt.jpg' ;
  
  res.sendFile(imagePath);
});

app.listen(port, () => {
  console.log(`App is listening to the port ${port}`);
});
