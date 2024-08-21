const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "SalesReport",
  tableName: "salesReports",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    //rezervasyon ve ürün olacak sadece, ekstra sadece ödenme durumu oluşturulacak O DA TAHSİLATTAN GELECEK
  },
  relations: {
    reservation: {
      type: "one-to-one",
      target: "Reservation",
      joinColumn: true,
      nullable: false, // Assuming a SalesReport must have a related reservation
    },
    tour: {
      type: "many-to-one",
      target: "Tour",
      joinColumn: true,
      nullable: false, // Assuming a SalesReport must have a related reservation
    },
    tahsilat: {
      type: "one-to-one",
      target: "Tahsilat",
      joinColumn: true,
      nullable: false, // Assuming a SalesReport must have a related reservation
    },

    //     //     Rezervasyon tablosuyla ilişki.Pnr oradan geliyor. product da. customer, amount.  reserv date soruyor. entry date soruyor. room soruyor oda bilgisi. pax odadaki kişi sayısı.  Many to one olmalı.
    //Ayrıca payment soruyor yani ödeme durumu. bu da accounting ten geliyor muhtemelen. yine many to one. channel de var satış kanalı demek. o da sanırım oradan geliyor. Yani muhasebe tablosuyla ilişkili bu son 2 alan.
  },
});
