const { Entity, Column, PrimaryGeneratedColumn } = require("typeorm");

const User = Entity("User", {
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

module.exports = User;
