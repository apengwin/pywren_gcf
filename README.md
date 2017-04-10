# How to Reproduce this test

* Set up a bucket with google cloud storage, and put the `.tar` file in a new bucket.

* In `index.js`, set `FILENAME` to the name of the tar, and `BUCKET` to the name of the bucket.

* In `index.js`, add a `exports.<functionName> `function handler.  My functionName was `RUNTIMETEST`

* Deploy the cloud function. I did this by linking my [mirroring my github repo to google cloud](https://cloud.google.com/source-repositories/docs/connecting-hosted-repositories)  and running the following command on my terminal.

* `gcloud beta functions deploy RUNTIMETEST --source-url https://source.developers.google.com/p/pywrenTest/r/pytest --source-path / --trigger-bucket allanpeng11231994storage`

* `source-url` is the link to the repo with the format `https://source.developers.google.com/p/<PROJECT_NAME>/r/<REPO_NAME>`, and --source-path is the location of the function file in the repo directory.

* `trigger-bucket` refers to the bucket whose events will trigger the function. 


## Running the function

To run the function, upload a blank file to the trigger bucket.

`
touch test.txt
gsutil cp test.txt gs://allanpeng11231994storage
`

To view the output, execute `gcloud beta functions logs read --limit 10` in the terminal.
