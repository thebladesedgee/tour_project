const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Participant",
  tableName: "participant",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    firstName: {
      type: "varchar",
    },
    lastName: {
      type: "varchar",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    telNumber: {
      type: "varchar",
    },

    identityNo: {
      type: "varchar",
      unique: true,
    },
    passportNo: {
      type: "varchar",
      unique: true,
      nullable: true,
    },
    gender: {
      type: "varchar",
    },

    dateOfBirth: {
      type: "date",
    },
    registrationDate: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    reservations: {
      type: "many-to-one",
      target: "Reservation",
      joinColumn: true,
      inverseSide: "participant",
    },
  },
});
