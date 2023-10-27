const {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} = require("typeorm");

const Token = Entity("Token", {
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
      target: "User", // имя сущности User
      type: "many-to-one",
      joinColumn: { name: "userId" },
      cascade: true,
    },
  },
});

module.exports = Token;
