import express from "express";
import router from "./routes/api";
import { connectDb } from "./utils/database";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import docs from "./docs/route";
import cors, { CorsOptions } from "cors";

async function init() {
  const db = await connectDb();
  console.log(`Database status: ${db}`);

  const app = express();

  const whitelist = ["https://front-end-cungur.vercel.app/"];
  const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };

  app.use(cors(corsOptions));
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
