const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Tahsilat",
  tableName: "tahsilat",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    channel: {
      type: "varchar",
      nullable: false,
    },
    description: {
      type: "text",
      nullable: true,
    },
    status: {
      type: "enum",
      enum: ["Bekliyor", "Tamamlandı", "Ödeme Hatası"],
      default: "Bekliyor", // Örnek bir varsayılan durum
    },
  },
  relations: {
    // Eğer ödeme belirli bir kullanıcıya aitse, User tablosu ile ilişkilendirilebilir
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      inverseSide: "tahsilat", // Her ödeme bir kullanıcıya ait olmayabilir
      //BURDAN KULLANCI İSMİ GELECEK
    },
    // Eğer ödeme belirli bir rezervasyon veya aktivite ile ilişkiliyse
    reservation: {
      type: "many-to-one",
      target: "Reservation",
      joinColumn: true,
      nullable: true,
      inverseSide: "tahsilat",
      //BURDAN AMOUNT, TARİH VE PNR GELECEK
    },
  },
});
