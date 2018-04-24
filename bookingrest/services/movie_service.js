const MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;  
const URL = 'mongodb+srv://user:user@defaultcluster-9qvq1.mongodb.net/cinema';
const DB = 'cinema';
const COLLECTION = 'movies';

module.exports = {
    getMovies : (callback) => {
        MongoClient.connect(URL, (err, client) => {
            const db = client.db(DB);
            db.collection(COLLECTION).find().toArray((err, docs) => {
                callback(err, docs);
                client.close();
            });
        });
    },
    getMovieById : (oid, callback) => {
        MongoClient.connect(URL, (err, client) => {
            const db = client.db(DB);
            db.collection(COLLECTION).findOne({'_id': new ObjectID(oid)}, (err, doc) => {
                callback(err, doc);
                client.close();
            });
        });
    },
    searchMovies : (criteria, callback) => {
        let searchParams = {};
        for (let key in criteria) {
            //Make all search parameters LIKE operation with case insensitive.
            searchParams[key] = {'$regex' : criteria[key], '$options':'i'};
        }
        MongoClient.connect(URL, (err, client) => {
            const db = client.db(DB);
            db.collection(COLLECTION).find(searchParams).toArray((err, docs) => {
                callback(err, docs);
                client.close();
            });
        });
    },
    createMovie : (movie, callback) => {
        MongoClient.connect(URL, (err, client) => {
            const db = client.db(DB);
            db.collection(COLLECTION).insert(movie, (err, result) => {
                callback(err, result);
                client.close();
            });
        });
    },
    updateMovie : (id, movie, callback) => {
        MongoClient.connect(URL, (err, client) => {
            const db = client.db(DB);
            db.collection(COLLECTION).update({ _id : new ObjectID(id)}, movie, (err, result) => {
                callback(err, result);
                client.close();
            });
        });
    },
    deleteMovieById : (id, callback) => {
        MongoClient.connect(URL, (err, client) => {
            const db = client.db(DB);
            db.collection(COLLECTION).deleteOne({_id: new ObjectID(id)}, (err, result) => {
                callback(err, result);
                client.close();
            });
        });
    }
}