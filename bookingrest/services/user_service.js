const MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;  
const URL = 'mongodb+srv://user:user@defaultcluster-9qvq1.mongodb.net/cinema';
const DB = 'cinema';
const COLLECTION = 'users';

module.exports = {
    login : (credential, callback) => {
        MongoClient.connect(URL, (err, client) => {
            const db = client.db(DB);
            db.collection(COLLECTION).findOne({email: credential.email, password : credential.password}, 
            (err, doc) => {
                callback(err, doc);
                client.close();
            });
        });
    },
    createUser : (user, callback) => {
        MongoClient.connect(URL, (err, client) => {
            const db = client.db(DB);
            db.collection(COLLECTION).insert(user, (err, result) => {
                callback(err, result);
                client.close();
            });
        });
    },
    getUsers : (callback) => {
        MongoClient.connect(URL, (err, client) => {
            const db = client.db(DB);
            db.collection(COLLECTION).find().toArray((err, docs) => {
                callback(err, docs);
                client.close();
            });
        });
    },
    updateUser : (id, user, callback) => {
        MongoClient.connect(URL, (err, client) => {
            const db = client.db(DB);
            db.collection(COLLECTION).update({ _id : new ObjectID(id)}, user, (err, result) => {
                callback(err, result);
                client.close();
            });
        });
    },
    deleteUserById : (id, callback) => {
        MongoClient.connect(URL, (err, client) => {
            const db = client.db(DB);
            db.collection(COLLECTION).deleteOne({_id: new ObjectID(id)}, (err, result) => {
                callback(err, result);
                client.close();
            });
        });
    }
}