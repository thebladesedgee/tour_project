const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "TourCategory",
  tableName: "tourCategories",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    url: {
      type: "varchar", //deneme
    },
    creationDate: {
      type: "date",
    },
    order: {
      type: "int",
    },
    language: {
      type: "varchar",
    },
    parentCategory: {
      type: "varchar",
    },
  },
  relations: {
    tourBroadcast: {
      type: "one-to-many",
      target: "TourBroadcast",
      inverseSide: "tourCategories",
    },
  },
});
