const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "TourDetail",
  tableName: "tourDetail",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    departureCity: {
      type: "varchar",
    },
    additionalInfo: {
      type: "mediumtext",
      //length: 65535,  En fazla karakter sayısını belirtiyoruz.
    },
    returnPolicy: {
      type: "mediumtext",
      //length: 65535,  En fazla karakter sayısını belirtiyoruz.
    },
    languages: {
      type: "simple-array",
      nullable: true,
    },
    vehicle: {
      type: "simple-array",
      nullable: true,
    },
    maxPerson: {
      type: "int",
    },
    dateInfo: {
      type: "mediumtext",
      //length: 65535,  En fazla karakter sayısını belirtiyoruz.
    },
    seperationInfo: {
      type: "mediumtext",
      //length: 65535,  En fazla karakter sayısını belirtiyoruz.
    },
  },
  relations: {
    tour: {
      type: "one-to-one",
      target: "Tour",
      joinColumn: true,
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});
