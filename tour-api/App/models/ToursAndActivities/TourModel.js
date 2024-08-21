const { EntitySchema } = require("typeorm");
const TourStatus = require("./TourStatusModel");

module.exports = new EntitySchema({
  name: "Tour",
  tableName: "tours",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    status: {
      type: "enum",
      enum: TourStatus,
    },
  },
  relations: {
    offer: {
      type: "one-to-many",
      target: "Offer",
      inverseSide: "tour",
    },
    //Rezervasyon tablosuyla ilişkili olmalı. 1 tur için, birden fazla (many) rezervasyon yapılabilir.
    //ilişki sahibi rezervasyon tablosu olmalıdır. yani bu alana herhangi bir şey yazılmamalıdır. (bence daha mantıklı)
    //rezervasyon tablosundaki "ürün" alanı, tur tablosundan gelmektedir (product)
    //rezervasyon tablosundaki "fiyat" alanı, tur tablosundan gelmektedir. (amount)
    reservations: {
      type: "one-to-many",
      target: "Reservation",
      inverseSide: "tour",
    },

    //otherServiceId alanı, diğer servisler tablosunun id siyle ilişkili olmalı. many to many ilişkisi var. çünkü bir turda, birden fazla diğer servisler olabilir (hem sigorta hem vize gibi)
    otherServices: {
      type: "many-to-many",
      target: "OtherService",
      inverseSide: "tour",
    },
    generalInfo: {
      type: "one-to-one",
      target: "TourGeneralInfo",
      inverseSide: "tour",
      joinColumn: true,
      nullable: true,
      cascade: true,
    },
    tourDetail: {
      type: "one-to-one",
      target: "TourDetail",
      joinColumn: true,
      inverseSide: "tour",
      cascade: true,
    },

    tourExtension: {
      type: "one-to-one",
      target: "TourExtension",
      joinColumn: true,
      inverseSide: "tour",
      cascade: true,
    },

    tourSettings: {
      type: "one-to-one",
      target: "TourSettings",
      joinColumn: true,
      inverseSide: "tour",
      nullable: true,
      cascade: true,
    },

    tourBroadcast: {
      type: "one-to-one",
      target: "TourBroadcast",
      joinColumn: true,
      inverseSide: "tour",
      nullable: true,
      cascade: true,
    },

    salesReports: {
      type: "one-to-many",
      target: "SalesReport",
      inverseSide: "tour",
    },

    tourGallery: {
      type: "one-to-many",
      target: "TourGallery",
      inverseSide: "tour",
    },
  },
});
