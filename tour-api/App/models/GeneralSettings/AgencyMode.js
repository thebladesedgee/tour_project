const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Agency",
  tableName: "agency",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    officialAgencyTitle: {
      //RESMİ ACENTA UNVANI
      type: "varchar",
      length: 255,
    },
    tursabDocumentNo: {
      //TÜRSAB BELGE NO
      type: "varchar",
      length: 50,
    },
    tursabDigitalVerificationSystem: {
      //TÜRSAB Dijital Doğrulama Sistemi
      type: "varchar",
    },
  },
});
