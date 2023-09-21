function Font(length) {
    if (length === 1) {
        return "../250.fnt";
      } else if (length === 2) {
        return "../128.fnt";
      }else if (length === 3) {
        return "../64.fnt";
      } else {
        return "../64.fnt";
      }
    }

    function textheight (length){
        if (length === 1) {
            return 250;
          } else if (length === 2) {
            return 150;
          }else if (length === 3) {
            return 80;
          } else {
            return 80;
          }
    }
    
    function textWidth (length){
      if (length === 1) {
          return 150;
        } else if (length === 2) {
          return 160;
        }else if (length === 3) {
          return 150;
        } else {
          return 180;
        }
  }
  
  // Export the function so it can be used in other files
  module.exports = {
    Font,textheight,textWidth
  };