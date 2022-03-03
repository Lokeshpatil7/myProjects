import S3FileUpload from "react-s3";

const config = {
  bucketName: "cdndhiranddhir",
  // dirName: "assets" /* optional */,
  region: "ap-southeast-1",
  accessKeyId: "AKIASMAEZCZCZLTTSMWI",
  secretAccessKey: "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",
};

export const s3Upload = async (file, dirName = "") => {
  return await S3FileUpload.uploadFile(file, { ...config, dirName });
  // .then((data) => console.log(data))
  // .catch((err) => console.error(err));
};
