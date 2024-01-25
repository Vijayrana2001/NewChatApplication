// import {
//   CreateBucketCommand,
//   DeleteBucketCommand,
//   DeleteObjectCommand,
//   GetObjectCommand,
//   PutObjectCommand,
//   S3Client,
//   paginateListObjectsV2,
// } from "@aws-sdk/client-s3";
// import { createReadStream } from "fs";
// import { createInterface } from "readline/promises";

// export async function main() {
//   const s3Client = new S3Client({
//     // Add your AWS configuration here (accessKeyId, secretAccessKey, region, etc.)

//   });

//   const bucketName = `test-bucket-${Date.now()}`;
//   await s3Client.send(
//     new CreateBucketCommand({
//       Bucket: bucketName,
//     })
//   );

//   const videoPath = "path/to/your/video.mp4";

//   await s3Client.send(
//     new PutObjectCommand({
//       Bucket: bucketName,
//       Key: "my-first-object.txt",
//       Body: createReadStream(videoPath),
//     })
//   );

//   // Read the object.
//   const { Body } = await s3Client.send(
//     new GetObjectCommand({
//       Bucket: bucketName,
//       Key: "my-first-object.txt",
//     })
//   );

//   console.log(await Body.transformToString());

//   const prompt = createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   const result = await prompt.question("Empty and delete bucket? (y/n) ");
//   prompt.close();

//   if (result === "y") {
//     // Create an async iterator over lists of objects in a bucket.
//     const paginator = paginateListObjectsV2(
//       { client: s3Client },
//       { Bucket: bucketName }
//     );
//     for await (const page of paginator) {
//       const objects = page.Contents;
//       if (objects) {
//         // For every object in each page, delete it.
//         for (const object of objects) {
//           await s3Client.send(
//             new DeleteObjectCommand({ Bucket: bucketName, Key: object.Key })
//           );
//         }
//       }
//     }

//     // Once all the objects are gone, the bucket can be deleted.
//     await s3Client.send(new DeleteBucketCommand({ Bucket: bucketName }));
//   }
// }

// // Call a function if this file was run directly. This allows the file
// // to be runnable without running on import.
// import { fileURLToPath } from "url";

// if (process.argv[1] === fileURLToPath(import.meta.url)) {
//   main();
// }


