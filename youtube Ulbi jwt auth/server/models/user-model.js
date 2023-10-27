const { BaseEntity, EntitySchema } = require("typeorm");

const UserSchema = new EntitySchema({
  name: "User",
  target: class User extends BaseEntity {
    constructor() {
      super();
      this.id = undefined;
      this.email = undefined;
      this.password = undefined;
      this.isActivated = false;
      this.activationLink = undefined;
    }
  },
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    password: {
      type: "varchar",
      nullable: false,
    },
    isActivated: {
      type: "boolean",
      default: false,
    },
    activationLink: {
      type: "varchar",
      nullable: true,
    },
  },
});

module.exports = UserSchema;
