require("dotenv").config();

const express = require("express");
const mongodb = require("mongodb");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const QRCode = require("qrcode");
const PDFDocument = require("pdfkit");
const jwt = require("jsonwebtoken");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadQRImage, getFileStream, uploadPdf } = require("../../s3");

// Download QRCODE Image from s3
router.get("/images/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

// Download PDF from s3

router.get("/pdf/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

// protected
// GET ALL QUEUE
router.get("/", authenticateToken, async (req, res) => {
  const queues = await loadQueueCollection();
  console.log("get all queue");
  res.send(await queues.find({}).toArray());
});

// protected
// Get Limited Queue
router.get("/_limit=:limit", authenticateToken, async (req, res) => {
  const limit = parseInt(req.params.limit);
  const queues = await loadQueueCollection();
  res.send(await queues.find({}).limit(limit).toArray());
  console.log(`Get ${limit} queues only`);
});

// protected
// GET LATEST QUEUE
router.get("/latest", authenticateToken, async (req, res) => {
  const queues = await loadQueueCollection();
  res.send(await queues.find({}).sort({ queueNumber: -1 }).limit(1).toArray());
  console.log("get latest queue");
});

// protected
// Delete Queue
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const queues = await loadQueueCollection();
    await queues.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
    console.log("delete Queue");
    res.status(200).json({ msg: "Queue Successfully Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// protected
// Delete All QUeue
router.delete("/", authenticateToken, async (req, res) => {
  try {
    const queues = await loadQueueCollection();
    await queues.deleteMany({});
    console.log("all Queue Deleted");
    res.status(200).json({ msg: "All Queue Successfully Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Create Queue
router.post("/", authenticateToken, getCurrentQueue, async (req, res, next) => {
  try {
    const queues = await loadQueueCollection();
    await queues.insertOne({
      queueNumber: res.avaiableQueue,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      vaccineBrand: req.body.vaccineBrand,
      dose: req.body.dose,
      date: new Date(),
    });
    console.log("post queue");
    res.status(201).json({
      msg: "Queue Successfully Created",
      queueInfo: req.body,
      user: req.user,
    });
    next(); // call this to run the next middleware
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.use(getCurrentQueueInfo);

async function getCurrentQueueInfo(req, res, next) {
  let currentQueueInfo;
  try {
    const queues = await loadQueueCollection();
    const response = await queues
      .find({})
      .sort({ queueNumber: -1 })
      .limit(1)
      .toArray();
    currentQueueInfo = response[0];
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  generateQR(currentQueueInfo);
  console.log("getCurrentQueueInfo");
  next();
}

// Generate QR Code
function generateQR(queueInfo) {
  const JSONQueueInfo = JSON.stringify(queueInfo, null, 2);
  const ObjectQueueInfo = JSON.parse(JSON.stringify(queueInfo, null, 2));
  // Directly uploading to aws s3
  QRCode.toDataURL(
    JSONQueueInfo,
    {
      color: {
        dark: "#000", // Blue dots
        // Transparent background
      },
      width: 1200,
    },
    async (err, base64) => {
      if (err) throw err;
      const base64Data = new Buffer.from(
        base64.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      const imageName = `${queueInfo.queueNumber}-QRCODE.png`;
      console.log("done generating qrcode");
      await uploadQRImage(base64Data, imageName);
      generatePDF(ObjectQueueInfo, base64);
    }
  );

  console.log("generatedQR");
}

async function generatePDF(queueInfo, qrImage) {
  const date = new Date(queueInfo.date);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  let hour = date.getHours();
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12;
  let minute = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;

  function formatMonth(month) {
    if (month === 0) {
      return "January";
    } else if (month === 1) {
      return "February";
    } else if (month === 2) {
      return "March";
    } else if (month === 3) {
      return "April";
    } else if (month === 4) {
      return "May";
    } else if (month === 5) {
      return "June";
    } else if (month === 6) {
      return "July";
    } else if (month === 7) {
      return "August";
    } else if (month === 8) {
      return "September";
    } else if (month === 9) {
      return "October";
    } else if (month === 10) {
      return "November";
    } else if (month === 11) {
      return "December";
    }
  }

  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(
    path.join(
      __dirname,
      "../../",
      "imageStatic",
      "pdf",
      `${queueInfo.queueNumber}-Queue Certificate.pdf`
    )
  );
  const fileName = `${queueInfo.queueNumber}-Queue Certificate.pdf`;
  doc.pipe(writeStream);
  doc.image(
    path.join(__dirname, "../../", "imageStatic", `Logo.png`),
    150,
    10,
    {
      width: 300,
      align: "center",
      valign: "center",
    }
  );
  doc
    .image(qrImage, 20, 150, {
      fit: [300, 300],
      align: "center",
      valign: "center",
    })
    .roundedRect(16, 150, 580, 350, 10)
    .stroke("#008789");

  doc.fontSize(15);
  doc
    .fillColor("#008789")
    .text("Full Name:", 350, 170, {})
    .fillColor("#000")
    .text(`${queueInfo.firstName} ${queueInfo.lastName}`, 350, 190, {})
    .fillColor("#008789")
    .text("Queue Number:", 350, 240, {})
    .fillColor("#000")
    .text(`${queueInfo.queueNumber}`, 350, 260, {})
    .fillColor("#008789")
    .text("Vaccine Brand:", 350, 305, {})
    .fillColor("#000")
    .text(`${queueInfo.vaccineBrand}`, 350, 325, {})
    .fillColor("#008789")
    .text("Dose:", 350, 370, {})
    .fillColor("#000")
    .text(`${queueInfo.dose}`, 350, 390, {})
    .fillColor("#008789")
    .text("Date Issued:", 350, 440, {})
    .fillColor("#000")
    .text(
      `${day}-${formatMonth(month)}-${year} ${hour}:${minute} ${ampm}`,
      350,
      460,
      {}
    );
  doc.fontSize(10);
  doc.text(
    "This is an unsecure QR Code and can be verified using the scan functionality at https://sehc.com/scanqr",
    40,
    450,
    {
      width: 280,
    }
  );
  doc.image(
    path.join(__dirname, "../../", "imageStatic", `Footer.jpg`),
    0,
    700,
    {
      align: "center",
      valign: "bottom",
    }
  );
  doc.end();
  console.log("PDF Generated");
  // For this to work on deployment (heroku) add .gitkeep file to the pdf folder
  writeStream.on("finish", async function () {
    await uploadPdf(
      path.join(
        __dirname,
        "../../",
        "imageStatic",
        "pdf",
        `${queueInfo.queueNumber}-Queue Certificate.pdf`
      ),
      fileName
    );
    await unlinkFile(
      path.join(
        __dirname,
        "../../",
        "imageStatic",
        "pdf",
        `${queueInfo.queueNumber}-Queue Certificate.pdf`
      )
    );
    console.log("PDF Finished");
  });
}

// Get the current available queue for creating new queue
async function getCurrentQueue(req, res, next) {
  let currentQueue;
  try {
    const queues = await loadQueueCollection();
    const response = await queues
      .find({})
      .sort({ queueNumber: -1 })
      .limit(1)
      .toArray();
    currentQueue = response[0];
    currentQueue = currentQueue == undefined ? 0 : currentQueue.queueNumber;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.avaiableQueue = currentQueue + 1;
  console.log("getCurrentQueue");
  next();
}

function authenticateToken(req, res, next) {
  // GEt the Token
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // set token or become null
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Connect to mongodb
async function loadQueueCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://dev-royet:123@cluster0.witrn.mongodb.net/queue_system_mobile?retryWrites=true&w=majority"
  );
  return client.db("queue_system_mobile").collection("queue_info");
}

module.exports = router;
