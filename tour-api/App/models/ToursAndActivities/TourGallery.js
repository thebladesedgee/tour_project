const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "TourGallery",
  tableName: "tourGallery",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    filename: {
      type: "varchar",
      nullable: false,
    },
    mime_type: {
      type: "varchar",
      nullable: false,
    },
    data: {
      type: "longblob",
      nullable: false,
    },
    description: {
      type: "text",
      nullable: true,
    },
    uploadedAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    tour: {
      type: "many-to-one",
      target: "Tour",
      joinColumn: true,
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});
