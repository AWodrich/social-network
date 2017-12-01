// knox is an easy-to-use S3 client.
// knox is used to send the files users have uploaded to S3.
const knox = require('knox');
const fs = require('fs');


let secrets;
if (process.env.NODE_ENV == 'production') {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require('./secrets.json'); // secrets.json is in .gitignore
}
const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: 'anjaspiced'
});


// ======CREATE REQUEST OBJECT =========//

exports.upload = file => {
    return new Promise(function(resolve, reject) {
        const s3Request = client.put(file.filename, {
            'Content-Type': file.mimetype,
            'Content-Length': file.size,
            'x-amz-acl': 'public-read'
        });
        const readStream = fs.createReadStream(file.path);
        readStream.pipe(s3Request);
        s3Request.on('response', s3Response => {
            const wasSuccessful = s3Response.statusCode == 200;
            if (wasSuccessful) {
                resolve();
                // if you use a middleware in the post route then:
                // next()
            } else {
                reject();
                // if you use a middleware in the post route then:
                // res.json.success = false
            }
        });
    })
}
