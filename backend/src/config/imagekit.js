const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_API_PUBLIC,
  privateKey: process.env.IMAGE_KIT_API_PRIVATE,
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
});

module.exports = imagekit;
