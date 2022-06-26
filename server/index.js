const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Set static folder

const authRoutes = require("./routes/api/authentication");
app.use("/api/auth", authRoutes);

const statusRoutes = require("./routes/api/status");
app.use("/api/status", statusRoutes);

const queueRoutes = require("./routes/api/queue");
app.use("/api/queue", queueRoutes);

const missedQueueRoutes = require("./routes/api/missedQueue");
app.use("/api/missedqueue", missedQueueRoutes);

const vaccineRoutes = require("./routes/api/vaccine");
app.use("/api/vaccine", vaccineRoutes);

const recentlyServedRoutes = require("./routes/api/recentlyServed");
app.use("/api/recentlyserved", recentlyServedRoutes);

// app.use(express.static(path.join(__dirname, "public")));
// app.use("/api/static", express.static(path.join(__dirname, "imageStatic")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public")));
  app.use("/api/static", express.static(path.join(__dirname, "imageStatic")));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running in PORT:${PORT}`));
