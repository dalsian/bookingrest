const MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;  
const URL = 'mongodb+srv://user:user@defaultcluster-9qvq1.mongodb.net/cinema';
const DB = 'cinema';
const COLLECTION = 'layouts';

module.exports = {
    getLayouts : (callback) => {
        MongoClient.connect(URL, (err, client) => {
            const db = client.db(DB);
            db.collection(COLLECTION).find().toArray((err, docs) => {
                callback(err, docs);
                client.close();
            });
        });
    },
    getLayoutById : (oid, callback) => {
        MongoClient.connect(URL, (err, client) => {
            const db = client.db(DB);
            db.collection(COLLECTION).findOne({'_id': new ObjectID(oid)}, (err, doc) => {
                callback(err, doc);
                client.close();
            });
        });
    },
    createLayout : (Layout, callback) => {
        MongoClient.connect(URL, (err, client) => {
            const db = client.db(DB);
            db.collection(COLLECTION).insert(Layout, (err, result) => {
                callback(err, result);
                client.close();
            });
        });
    },
    updateLayout : (id, Layout, callback) => {
        MongoClient.connect(URL, (err, client) => {
            const db = client.db(DB);
            db.collection(COLLECTION).update({ _id : new ObjectID(id)}, Layout, (err, result) => {
                callback(err, result);
                client.close();
            });
        });
    },
    deleteLayoutById : (id, callback) => {
        MongoClient.connect(URL, (err, client) => {
            const db = client.db(DB);
            db.collection(COLLECTION).deleteOne({_id: new ObjectID(id)}, (err, result) => {
                callback(err, result);
                client.close();
            });
        });
    }
}