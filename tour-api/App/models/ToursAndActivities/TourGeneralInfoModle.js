const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "TourGeneralInfo",
  tableName: "tourgeneralinfo",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    product: {
      type: "varchar",
    },
    summaryInroduction: {
      type: "varchar",
    },
    firsthighlights: {
      type: "varchar",
    },
    secondhighlights: {
      type: "varchar",
    },
    thirthhighlights: {
      type: "varchar",
    },
    fourthhighlights: {
      type: "varchar",
    },
    textInroduction: {
      type: "mediumtext",
      //length: 65535,  En fazla karakter sayısını belirtiyoruz.
    },
    durationDay: {
      type: "int",
    },
    price: {
      type: "decimal",
    },
    priceModel: {
      type: "varchar",
    },
  },
  relations: {
    //bir tour modeli olacak one-to-one
    tour: {
      type: "one-to-one",
      target: "Tour",
      joinColumn: true,
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});
