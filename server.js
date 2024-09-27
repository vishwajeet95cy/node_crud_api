import express from "express";
import path from "path";
import router from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import { fileURLToPath } from "url";
const port = process.env.PORT || 8000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger Middleware
app.use(logger);

// Setup Static Folder
app.use(express.static(path.join(__dirname, "public")));

//// app.get("/", (req, res) => {
////   res.sendFile(`${path.join(__dirname, "public", "index.html")}`);
//// });

//// app.get("/about", (req, res) => {
////   res.sendFile(`${path.join(__dirname, "public", "about.html")}`);
//// });

app.use("/api/posts", router);

// Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is Running on port ${port}`));
