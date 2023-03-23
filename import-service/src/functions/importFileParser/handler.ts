import { S3 } from "aws-sdk";
import csv from "csv-parser";

export const importFileParser = async (event) => {
  const s3 = new S3({ region: process.env.REGION });
  try {
    for (const record of event.Records) {
      await new Promise((resolve) => {
        s3.getObject({
          Bucket: process.env.BUCKET_PROJECT,
          Key: record.s3.object.key,
        }).createReadStream().pipe(csv())
          .on("data", (data) => console.log(data))
          .on("end", async () => {
            const origin = `${process.env.BUCKET_PROJECT}/${record.s3.object.key}`
            const distKey = record.s3.object.key.replace(
                process.env.BUCKET_UPLOADED,
                process.env.BUCKET_PARSED
            );

            await s3.copyObject({
              Bucket: process.env.BUCKET_PROJECT,
              CopySource: origin,
              Key: distKey,
            }).promise();

            console.log(`Copied from ${origin} to ${process.env.BUCKET_PROJECT}/${distKey}`);

            await s3.deleteObject({
              Bucket: process.env.BUCKET_PROJECT,
              Key: record.s3.object.key,
            }).promise()

            console.log(`Deleted from ${origin}`)

            resolve({ result: 'good'});
          })
          .on("error", (error) => {
            console.error(error)
            resolve({ result: 'error',});
          })
      })
    }
  } catch (error) {
      console.log(error);
  }
};
