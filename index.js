
var tar = require('tar-fs')
var fs = require('fs')
var gunzip = require("gunzip-maybe")
var child_process = require("child_process");

const Storage = require('@google-cloud/storage');
const FILENAME = "condaruntime.tar.xz";
const BUCKET = "allanpywrentest";

function uploadFile (bucketName, fileName) {
  const storage = Storage();
  const bucket = storage.bucket(bucketName);
  return bucket.upload(fileName)
    .then((results) => {
      const file = results[0];
      console.log(`File ${file.name} uploaded.`);
      return file;
    });
}

function downLoadRuntime(bucketName, src, dest) {
    const storage = Storage();
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(src);

//    try {
  //      if (!fs.statSync(dest).isDirectory) {
   //         throw "Dest is not a directory"
 //       }
//    } catch(err) {
 //       fs.mkdir(dest);
//    }
    const options = {
        // The path to which the file should be downloaded, e.g. "./file.txt"
        destination:  "./" + src
    };
    console.log("Attempting to download runtime");
    return file.download(options)
     .then(() => {
         console.log(`File ${file.name} downloaded to ${dest}.`);
         fs.createReadStream(dest + "/" + src).pipe(gunzip()).pipe(tar.extract(src))
            .on("finish", () => {
              console.log(`Tarball extracted in ${src}.`);
            });
    });
}

// uploadFile(BUCKET, "./test.txt");
exports.RUNTIMETEST = function (event, callback) {
    downLoadRuntime(BUCKET, FILENAME, "./foo");
};
