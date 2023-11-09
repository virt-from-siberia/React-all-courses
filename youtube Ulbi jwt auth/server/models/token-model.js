const { BaseEntity, EntitySchema } = require("typeorm");

const TokenSchema = new EntitySchema({
  name: "Token",
  target: class Token extends BaseEntity {
    constructor() {
      super();
      this.id = undefined;
      this.refreshToken = undefined;
      this.userId = undefined;
    }
  },
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    refreshToken: {
      type: "varchar",
      nullable: false,
    },
    userId: {
      type: "int",
      nullable: false,
    },
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: { name: "userId" },
      cascade: true,
    },
  },
});

module.exports = TokenSchema;
