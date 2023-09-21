const express = require('express')
const app = express()
const gm = require('gm');
const path = require('path');
// Font settings
const fontSize = 150;
const fontColor = '#ffffff';
const fontFamily = '../clasic.ttf';
const port = 4550;

// Get the current directory
const currentDir = __dirname;

// Input image file path (assuming "input.jpg" is in the same directory as this script)
const inputImagePath = path.join(currentDir, '1.jpeg');

// Output image file path (will be saved in the same directory)
const outputImagePath = path.join(currentDir, 'output.jpg');

 
// Create a GraphicsMagick instance
const image = gm(inputImagePath);

// Get image dimensions
image.size((err, size) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`width : ${size.width} and the height is: ${size.height}`)

 
  const textX = 30;
  const textY = (size.height + fontSize) / 2;


 
 // Rotate only the text by drawing it on a separate canvas
  const textCanvas = gm(size.width, size.height, 'none');
  textCanvas
    .font(fontFamily, fontSize)
    .fill(fontColor)
    .drawText(0, 0, "AAAA")
    .rotate('white', 45);

  // Composite the rotated text onto the original image
  image
    .composite(textCanvas, textX, textY);

  // Write the modified image to the output file
  image.write(outputImagePath, (writeErr) => {
    if (writeErr) {
      console.error(writeErr);
    } else {
      console.log(`Text added and saved to ${outputImagePath}`);
    }
  });
});



app.listen(port, ()=>{
    console.log(`App is listening to the port ${port}`)
})