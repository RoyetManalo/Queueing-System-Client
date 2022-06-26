require("dotenv").config();

const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const path = require("path");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// Upload

function uploadQRImage(file, fileName) {
  const uploadParams = {
    Bucket: bucketName,
    Body: file,
    ContentType: "image/png",
    ContentDisposition: "inline",
    Key: fileName,
  };
  return s3.upload(uploadParams).promise();
}

exports.uploadQRImage = uploadQRImage;

// Upload Pdf

function uploadPdf(file) {
  const fileName = path.basename(file);
  const fileStream = fs.createReadStream(file);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    ContentType: "application/pdf",
    ContentDisposition: "inline",
    Key: fileName,
  };
  return s3.upload(uploadParams).promise();
}

exports.uploadPdf = uploadPdf;

// Donwload qr image / stream qr image

function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;

function fileSignedUrl(fileKey) {
  const params = {
    Key: fileKey,
    Bucket: bucketName,
    Expires: 60,
  };

  return s3.getSignedUrl("getObject", params);
}

exports.fileSignedUrl = fileSignedUrl;
