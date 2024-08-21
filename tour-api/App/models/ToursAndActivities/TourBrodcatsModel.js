const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "TourBroadcast",
  tableName: "tourBroadcast",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    mainCategory: {
      type: "varchar",
    },
    temaCategories: {
      type: "simple-array",
      nullable: true,
    },
    regionCategories: {
      type: "simple-array",
      nullable: true,
    },
    city: {
      type: "varchar",
    },
    region: {
      type: "varchar",
    },
    sticker: {
      type: "varchar",
    },
  },
  relations: {
    //bir karegorisi olacak ama bir kategorinin birden fazla tourgenerali olabilir
    tourCategories: {
      type: "many-to-one",
      target: "TourCategory",
      joinColumn: true,
      onDelete: "SET NULL",
    },
    //tour ile bağlantı one-to-one
    tour: {
      type: "one-to-one",
      target: "Tour",
      joinColumn: true,
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});
