// Functions

// Generated random number
export const generateRandomNumber = (maxValue) => {
  return Math.floor(Math.random() * maxValue);
};

// Check Ticketmaster api for event image with specific size

export const imageSizeApi = (images, imgWidth) => {
  for (const image of images) {
    if (
      image.hasOwnProperty("width") &&
      typeof image.width === "number" &&
      image.width > imgWidth
    ) {
      return image.url;
    }
  }
  return null;
};

// image={imageSizeApi(event.images), 1024} calling it, target object width images url
