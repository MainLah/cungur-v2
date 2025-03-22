import express from "express";
import router from "./routes/api";
import { connectDb } from "./utils/database";
import bodyParser from "body-parser";

async function init() {
  const db = await connectDb();
  console.log(`Database status: ${db}`);

  const app = express();
  app.use(bodyParser.json());

  app.use("/api", router);

  const port = 3000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

init();
