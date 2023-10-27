require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectionManager = require("typeorm").getConnectionManager();
const router = require("./router/index");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/api", router);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const connection = connectionManager.create({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "authjwt",
      synchronize: true,
      logging: false,
      entities: [path.join(__dirname, "/models/*{.ts,.js}")],
    });

    await connection.connect();

    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (e) {
    console.error("Error connecting to the database", e);
  }
};

start();
