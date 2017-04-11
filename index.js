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

function downLoadRuntime(bucketName, fileName, dest) {
    const storage = Storage();
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    // Check if dest directory exists, and create it if it doesn't.
    try {
        if (!fs.statSync(dest).isDirectory) {
           throw "Dest is not a directory"
        }
    } catch(err) {
       fs.mkdir(dest);
    }
    const options = {
        // The path to which the file should be downloaded, e.g. "./file.txt"
        destination: dest + "/" + fileName
    };
    console.log("Attempting to download runtime");
    return file.download(options)
     .then((err) => {
         console.log(`File ${file.name} downloaded to ${dest}.`);
         //extract tarball
         var temp = fs.createReadStream(dest + "/" + fileName);
         console.log("here");
         var temp2 = temp.pipe(gunzip());
         console.log("there");
         var temp3 = temp2.pipe(tar.extract(dest))
            .on("finish", () => {
              console.log(`Tarball extracted in ${dest}.`);
            });
       }, (err) => {
          console.log(err); 
       });
}

// uploadFile(BUCKET, "./test.txt");
exports.RUNTIMETEST = function (event, callback) {
    downLoadRuntime(BUCKET, FILENAME, "/tmp");
//    child_process.execSync("ls -lha /tmp").toString("ascii");
};
