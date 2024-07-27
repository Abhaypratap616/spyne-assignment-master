const { S3Client } = require('@aws-sdk/client-s3');

const {
  AWS_S3_CREDENTIALS_ACCESS_KEY,
  AWS_S3_CREDENTIALS_SECRET_KEY,
  S3_REGION,
} = process.env;

const s3Client = new S3Client({
  credentials: {
    secretAccessKey: AWS_S3_CREDENTIALS_SECRET_KEY,
    accessKeyId: AWS_S3_CREDENTIALS_ACCESS_KEY,
  },
  region: S3_REGION,
});



module.exports = { s3Client };
