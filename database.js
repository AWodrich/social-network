const spicedPg = require('spiced-pg');
const pw = require('./password.js');


if(process.env.DATABASE_URL){
    dbUrl = process.env.DATABASE_URL
} else {
    var info = require('./secret.json')
    dbUrl = `postgres:${info.username}:${info.password}@localhost:5432/socialNetwork`
}
var db = spicedPg(dbUrl);

// 1. Store user data after registration
exports.storeRegistrationData = (first, last, email, hashedPassword) => {
    console.log('store registration data', first, last, email, hashedPassword);
    var q = `INSERT INTO users (first, last, email, hashed_password)
            VALUES ($1, $2, $3, $4)
            RETURNING id`;
    var params = [first, last, email, hashedPassword];
    return db.query(q, params)
    .then(results => {
        console.log('results?', results);
        return results.rows[0].id
    }).catch(err => {
        console.log(err);
    });
};


// 2. Getting Login Credential for authorization

exports.getLoginCreds = (email) => {
    console.log('in database', email);
    var q = `SELECT email, hashed_password, id
            FROM users
            WHERE email = $1`
    var params = [email]
    return db.query(q, params)
    .then(data => {
        console.log('loginData', data);
        return data.rows[0];
    })
    .catch(err => {
        console.log(err);
    })
}

// 3. Uoploading Profile images// ==== uploading images and storing into database
exports.uploadImages = (imageUrl, id) => {
    // var q = `INSERT INTO images(image, user_id)
    //         VALUES($1, $2)`

    var q = `UPDATE images
            SET image=$1
            WHERE user_id=$2`
    var params = [imageUrl, id]
    return db.query(q, params)
    .then(results => {
        console.log('results after storing data into uploadImages?', results);
        return results;
    })
    .catch(err => {
        console.log(err);
    })
}
