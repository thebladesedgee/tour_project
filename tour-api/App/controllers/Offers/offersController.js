const { getRepository } = require("typeorm");
const Offer = require("../../models/Offers/OfferModel");

const getOffers = async (req, res) => {
  try {
    const offerRepository = getRepository(Offer);
    const offers = await offerRepository.find();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOfferById = async (req, res) => {
  try {
    const { id } = req.params;
    const offerRepository = await getRepository(Offer);
    const offer = await offerRepository.findOneBy({ id: id });
    if (offer) {
      res.json(offer);
    } else {
      res.status(404).json({ message: "Offer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOffer = async (req, res) => {
  try {
    const offerRepository = getRepository(Offer);
    const offer = offerRepository.create(req.body);
    const savedOffer = await offerRepository.save(offer);
    res.status(201).json(savedOffer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const offerRepository = await getRepository(Offer);
    const offer = await offerRepository.findOneBy({ id: id });
    if (offer) {
      getRepository(Offer).merge(offer, req.body);
      const result = await getRepository(Offer).save(offer);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Offer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOffer = async (req, res) => {
  try {
    const result = await getRepository(Offer).delete(req.params.id);
    if (result.affected) {
      res.status(200).json({ message: "Offer deleted successfully" });
    } else {
      res.status(404).json({ message: "Offer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
};
