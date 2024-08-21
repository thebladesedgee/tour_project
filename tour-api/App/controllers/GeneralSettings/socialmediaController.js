const { getRepository } = require("typeorm");
const SocialMedia = require("../../models/GeneralSettings/socialMediaModel");

const getSocialMedias = async (req, res) => {
  try {
    const socialMediaRepository = getRepository(SocialMedia);
    const socialMedias = await socialMediaRepository.find();
    res.json(socialMedias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSocialMediaById = async (req, res) => {
  try {
    const { id } = req.params;
    const socialMediaRepository = await getRepository(SocialMedia);
    const socialMedia = await socialMediaRepository.findOneBy({ id: id });
    if (socialMedia) {
      res.json(socialMedia);
    } else {
      res.status(404).json({ message: "SocialMedia not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSocialMedia = async (req, res) => {
  try {
    const socialMediaRepository = getRepository(SocialMedia);
    const socialMedia = socialMediaRepository.create(req.body);
    const savedSocialMedia = await socialMediaRepository.save(socialMedia);
    res.status(201).json(savedSocialMedia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSocialMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const socialMediaRepository = await getRepository(SocialMedia);
    const socialMedia = await socialMediaRepository.findOneBy({ id: id });
    if (socialMedia) {
      getRepository(SocialMedia).merge(socialMedia, req.body);
      const result = await getRepository(SocialMedia).save(socialMedia);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "SocialMedia not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSocialMedia = async (req, res) => {
  try {
    const result = await getRepository(SocialMedia).delete(req.params.id);
    if (result.affected) {
      res.status(200).json({ message: "SocialMedia deleted successfully" });
    } else {
      res.status(404).json({ message: "SocialMedia not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSocialMedias,
  getSocialMediaById,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
};
