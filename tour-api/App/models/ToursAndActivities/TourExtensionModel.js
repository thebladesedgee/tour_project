const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "TourExtension",
  tableName: "tourExtension",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    includedServices: {
      type: "mediumtext",
    },
    extraServices: {
      type: "mediumtext",
    },
    includedMeals: {
      type: "varchar",
    },
  },
  relations: {
    otherServices: {
      // Refers to the 'tourExtensions' in OtherService
      type: "many-to-many",
      target: "OtherService",
      inverseSide: "tourExtensions",
      joinTable: true, // Creates the join table
    },
    tour: {
      type: "one-to-one",
      target: "Tour",
      joinColumn: true,
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});
