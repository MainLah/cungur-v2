import express from "express";
import router from "./routes/api";
import { connectDb } from "./utils/database";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import docs from "./docs/route";
import cors from "cors";

async function init() {
  const db = await connectDb();
  console.log(`Database status: ${db}`);

  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Server is running",
      data: null,
    });
  });
  app.use("/api", router);
  // docs(app);

  const port = 3000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

init();
