const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Inbox",
  tableName: "inbox",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    telNumber: {
      type: "varchar",
    },
    message: {
      type: "varchar",
    },
    Subject: {
      type: "varchar",
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      inverseSide: "inbox",
    },
  },
  //Ürün hakkında mail olacak onla ilişkili
});
