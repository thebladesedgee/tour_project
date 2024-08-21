const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "OtherService",
  tableName: "otherServices",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    product: {
      type: "varchar",
    },
    duration: {
      type: "float",
    },
    price: {
      type: "float",
    },
    region: {
      type: "varchar",
    },
    lastUpdate: {
      type: "date",
    },
    display: {
      type: "int",
    },
    order: {
      type: "int",
    },
  },
  relations: {
    tourExtensions: {
      // Changed to plural to match 'inverseSide' in TourExtension
      type: "many-to-many",
      target: "TourExtension",
      inverseSide: "otherServices", // Refers to the 'otherServices' in TourExtension
    },
  },
});
