const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Offer",
  tableName: "offer",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    offerStatus: {
      type: "enum",
      enum: [
        "Değerlendiriliyor (%30)",
        "Revize/ Pazarlık (%50)",
        "Yanıt Bekleniyor (%70)",
        "Tamamlandı (%100)",
      ],
    },
    dateOfEntry: {
      type: "date",
    },
    dateOfOut: {
      type: "date",
    },
    totalPrice: {
      type: "float",
      default: 0.0,
    },
    discount: {
      type: "float",
      default: 0.0,
    },
    offerAmount: {
      type: "float",
      default: 0.0,
    },
    moneyCurrency: {
      type: "enum",
      enum: ["TL", "EUR", "USD", "GBP"],
    },
    adultNo: {
      type: "int",
    },
    kidNo: {
      type: "int",
    },
    babyNo: {
      type: "int",
    },
    offerText: {
      type: "varchar",
    },
  },
  relations: {
    //Bir offerın bir tane customer'a ihityacı var, aratarak bulmalı
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      inverseSide: "offer",
    },
    //Bir offerın bir tane activity'e ihityacı var, aratarak bulmalı
    tour: {
      type: "many-to-one",
      target: "Tour",
      joinColumn: true,
      inverseSide: "offer",
    },
  },
});
