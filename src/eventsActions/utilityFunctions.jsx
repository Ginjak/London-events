// Functions

// Generated random number
export const generateRandomNumber = (maxValue) => {
  return Math.floor(Math.random() * maxValue);
};

// Check Ticketmaster api for event image with specific size

export const imageSizeApi = (images, imgWidth) => {
  let largestImage = null;

  for (const image of images) {
    if (
      image.hasOwnProperty("width") &&
      typeof image.width === "number" &&
      image.width > imgWidth &&
      (!largestImage || image.width < largestImage.width)
    ) {
      largestImage = image;
    }
  }

  return largestImage ? largestImage.url : null;
};

// Function to display a string up till /, //, +, ( characters.
export const extractText = (str) => {
  // Regular expression to match "/", "(", "+", or "//"
  const regex = /[\/(+]|\/\/+/;
  // Find the index of the first match
  const matchIndex = str.search(regex);
  // If no match is found, return the original string
  if (matchIndex === -1) {
    return str;
  }
  // Return the substring before the first occurrence of the matched character
  return str.substring(0, matchIndex);
};
