const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "TourSettings",
  tableName: "tourSettings",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    googleMapsUrl: {
      type: "varchar",
      length: 255,
    },
    productCode: {
      type: "varchar",
      length: 50,
    },
    supplier: {
      type: "varchar",
      length: 100,
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    updatedAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    //one to one tour
    tour: {
      type: "one-to-one",
      target: "Tour",
      joinColumn: true,
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});
