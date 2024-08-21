const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
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
    password: {
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
    customerType: {
      type: "enum",
      enum: ["Müşteri", "Tedarikçi", "XML SAĞLAYICI/ GDS"],
    },
    address: {
      type: "varchar",
    },
    dateOfBirth: {
      type: "date",
    },
    companyName: {
      type: "varchar",
      nullable: true,
    },
    taxAdministration: {
      type: "varchar",
      nullable: true,
    },
    taxNo: {
      type: "varchar",
      nullable: true,
    },
    registrationDate: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    lastLoginDate: {
      type: "timestamp",
      nullable: true,
    },
    isBlackList: {
      type: "boolean",
      default: false,
    },
    MessagePermition: {
      type: "boolean",
      default: true,
    },
  },
  relations: {
    reservations: {
      type: "one-to-many",
      target: "Reservation",
      inverseSide: "user",
    },
    tahsilatlar: {
      type: "one-to-many",
      target: "Tahsilat",
      inverseSide: "user",
    },
    tahsilat: {
      type: "one-to-many",
      target: "Tahsilat",
      inverseSide: "user",
    },
    offer: {
      type: "one-to-many",
      target: "Offer",
      inverseSide: "user",
    },
  },
});
