const express = require("express");
const app = express();
const Jimp = require("jimp");
const port = 4550;
const outputImagePath = "outputtt.jpg";
const getFont = require('./getFont');


// Define an endpoint
app.get("/img", (req, res) => {
  const phoneModel = req.query.phoneModel;
  const Text = req.query.Text;
  const TextLength = Text.length;
  const height =getFont.textheight(TextLength);
  const width=getFont.textWidth(TextLength);
  let fontFamily =getFont.Font(TextLength);
  Jimp.loadFont(fontFamily)
    .then((font) => {
      return Jimp.read(phoneModel).then((image) => {
        const textImage = new Jimp(width, height);
        textImage.print(font, 0, 0, Text );
        textImage.rotate(90);
        console.log(width,height)
        const shadowImage = textImage
          .clone()
          .color([
            { apply: 'xor', params: [ '#4295f5' ] }
          ]);
        textImage.color([
          { apply: 'xor', params: [ '#42f5cb' ] }
        ]);
        const shadowOffset = -7;
        // Calculate the position to center the rotated textImage
        const textX = (image.bitmap.width - textImage.bitmap.width) / 2;
        const textY = (image.bitmap.height - textImage.bitmap.height) / 2;
        const shadowX = textX + shadowOffset;
        const shadowY = textY + shadowOffset;
        image.composite(shadowImage, shadowX, shadowY);
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
  const imagePath = __dirname + "/outputtt.jpg";

  res.sendFile(imagePath);
});

app.listen(port, () => {
  console.log(`App is listening to the port ${port}`);
});
