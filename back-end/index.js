import express from "express";
import routes from "./src/routes/crmRoutes.js";
import mongoose, { mongo } from "mongoose";
import bodyParser from "body-parser";
import fs from "fs";
import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config.js";

// __dirname due to type: module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//   importing CREDENTIALS file
const credentials = JSON.parse(fs.readFileSync("./credentials.json"));

// initializing firebase admin
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();
const PORT = process.env.PORT || 4001;

main().catch((err) => console.log(err));

// mongoose connection
async function main() {
  await mongoose.connect(
    `mongodb+srv://secret-db:${process.env.MONGO_PASSWORD}@cluster0.mb845nd.mongodb.net/?retryWrites=true&w=majority`
  );
}

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  // for CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  const { authtoken } = req.headers;

  if (authtoken) {
    // verifys the authtoken and loads corresponding user
    try {
      req.user = await admin.auth().verifyIdToken(authtoken);
    } catch (error) {
      res.sendStatus(400);
    }
  }
  next();
});

// serving static assets
app.use(express.static(path.join(__dirname, "./build")));

// all other calls then to /contact go to index

app.get(/^(?!\/contact).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

routes(app);

app.get("/", (req, res) => {
  res.send(`Node Server run @ ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Running at localhost: ${PORT}`);
});
