const sharp = require("sharp");

const { PutObjectCommand } = require("@aws-sdk/client-s3");

const { s3Client } = require("../config/s3Bucket");

const { NODE_ENV, STORAGE_BUCKET_NAME } = process.env;

const bucketFolder = NODE_ENV === "prod" ? "prod" : "stage";

const uploadFileToS3Bucket = async (fileName, file, contentType) => {
  const fileDestination = `${bucketFolder}/${fileName}`;
  const command = new PutObjectCommand({
    Bucket: STORAGE_BUCKET_NAME,
    Key: fileDestination,
    Body: file,
    ContentType: contentType,
  });

  await s3Client.send(command);

  const url = `https://${STORAGE_BUCKET_NAME}.s3.amazonaws.com/${fileDestination}`;

  return url;
};

module.exports = {
  uploadFileToS3Bucket,
};
