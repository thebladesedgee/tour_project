const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "CompanyInformation",
  tableName: "companyInformation",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    companyName: {
      type: "varchar",
      length: 255,
    },
    legalInvoiceTitle: {
      //Şirket Unvanı: (Yasal Fatura Ünvanı)
      type: "varchar",
      length: 255,
    },
    companyAuthorizedName: {
      //Şirket Yetkili Adı:
      type: "varchar",
      length: 255,
    },
    companyAuthorizedLastname: {
      type: "varchar",
      length: 255,
    },
    telNumber: {
      type: "varchar",
      length: 20,
    },
    email: {
      type: "varchar",
      length: 255,
    },
    notificationEmail: {
      //Bildirim Email: (Agentis bildirimleri bu adrese gönderilecektir.)
      type: "varchar",
      length: 255,
    },
    address: {
      type: "varchar",
    },
    addressSecondLine: {
      type: "varchar",
      nullable: true,
    },
    city: {
      type: "varchar",
      length: 255,
    },
    country: {
      type: "varchar",
      length: 255,
    },
    taxNumber: {
      type: "varchar",
      length: 50,
    },
    taxAdministration: {
      type: "varchar",
      length: 255,
    },
  },
});
