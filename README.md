# How to Reproduce this test

* Set up a bucket with google cloud storage, and put the `.tar` file there.

* In `index.js`, set `FILENAME` to the name of the tar, and `BUCKET` to the name of the bucket.

* In `index.js`, add a `exports.<functionName> `function handler.  My functionName was `RUNTIMETEST`

* Deploy the cloud function. I did this by linking my [mirroring my github repo to google cloud](https://cloud.google.com/source-repositories/docs/connecting-hosted-repositories)  and running the following command on my terminal.
 `gcloud beta functions deploy RUNTIMETEST --source-url https://source.developers.google.com/p/pywrenTest/r/pytest --source-path / --trigger-bucket allanpeng11231994storage`

* `source-url` is the link to the repo with the format 
`https://source.developers.google.com/p/<PROJECT_NAME>/r/<REPO_NAME>`
* `--source-path` is the location of the function file in the repo directory.

* `trigger-bucket` refers to the bucket whose events will trigger the function. 


## Running the function

To run the function, upload a blank file to the trigger bucket.

`
touch test.txt &&
gsutil cp test.txt gs://allanpeng11231994storage
`

To view the output, execute `gcloud beta functions logs read --limit 10` in the terminal.



# Notes
May need to increase memory allocation through google cloud console. Also increase the alloted time or else it'll time out after 1 minute.

The runtime I'm using is over 300MB, and GCF defaults to 256MB, so it will kill your function if you don't raise it.

![screen shot 2017-04-11 at 3 31 57 pm](https://cloud.githubusercontent.com/assets/7637700/24933672/5c0e1250-1ecc-11e7-9443-0410e7dffb0b.png)
