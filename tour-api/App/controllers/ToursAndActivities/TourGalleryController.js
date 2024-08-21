const { getRepository } = require("typeorm");
const multer = require("multer");
const ImageSchema = require("../../models/ToursAndActivities/TourGallery"); // Adjust the path as needed

// Set up multer for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Controller for uploading an image
const uploadImage = async (req, res) => {
  const { originalname, mimetype, buffer } = req.file;
  const { tourId, description } = req.body; // Extract tourId and description from the request body

  const imageRepository = getRepository(ImageSchema);
  const image = {
    filename: originalname,
    mime_type: mimetype,
    data: buffer,
    tour: { id: tourId }, // Set the tour relation
    description: description,
  };

  try {
    const savedImage = await imageRepository.save(image);

    res.status(201).json({
      message: "Image uploaded successfully!",
      imageId: savedImage.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for retrieving an image
const getImage = async (req, res) => {
  const { id } = req.params; // Extract the image ID from the request parameters

  const imageRepository = getRepository(ImageSchema); // Get the image repository

  try {
    // Use the ID to find the image
    const image = await imageRepository.findOne({ where: { id } });

    if (image) {
      res.set("Content-Type", image.mime_type); // Set the content type
      res.send(image.data); // Send the image data
    } else {
      res.status(404).json({ message: "Image not found" }); // Handle image not found
    }
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ message: "Internal server error" }); // Handle server error
  }
};

// Export the multer upload middleware for use in your routes
const uploadMiddleware = upload.single("image");

module.exports = {
  uploadImage,
  getImage,
  uploadMiddleware,
};
