const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "SocialMedia",
  tableName: "socialMedia",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    wpNumber: {
      type: "varchar",
      length: 20,
    },
    facebookLink: {
      type: "varchar",
      length: 255,
    },
    twitterLink: {
      type: "varchar",
      length: 255,
    },
    instagramLink: {
      type: "varchar",
      length: 255,
    },
    youtubeLink: {
      type: "varchar",
      length: 255,
    },
    apiAddress: {
      type: "varchar",
      length: 255,
    },
  },
});
