const { EntitySchema } = require("typeorm");
const ReservationStatus = require("./ReservationStatusModel");

module.exports = new EntitySchema({
  name: "Reservation",
  tableName: "reservations",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    pnr: {
      type: "varchar",
      unique: true,
    },
    totalAmount: {
      //bu değer activtyden gelmeyecek çünkü activityde bir kişinin fiyatı var. burda totalde ne kadar harcanmış onu tutacağız ve
      //bu değer tahsilata ordan da raporlara gidecek
      type: "float",
    },
    reservationDate: {
      type: "date",
    },
    startDate: {
      type: "date",
    },
    status: {
      type: "enum",
      enum: ReservationStatus,
    },
    roomNum: {
      type: "int",
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      inverseSide: "reservations",
    },
    tour: {
      type: "many-to-one",
      target: "Tour",
      joinColumn: true,
      inverseSide: "reservations",
    },
    participant: {
      type: "one-to-many",
      target: "Participant",
      inverseSide: "reservations",
    },
    tahsilat: {
      type: "one-to-many",
      target: "Tahsilat",
      inverseSide: "reservation",
      cascade: true,
    },
  },
});
