const express = require('express');
const mongodb = require('mongodb')
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const app = express();
const client = mongodb.MongoClient;
const port = 8081;
//const exec = require('child_process').exec;
const update = require('./Update');

function getTopicById(id, callback) {
  client.connect(url, { useUnifiedTopology: true})
  .then(client => {
    console.log('Connected to the database')
    console.log('Attempting to retrieve data')
    const db = client.db('therm')
    const cursor = db.collection('stats').find({'id': id}).project({'topic': 1, '_id': 0})
    .toArray(function(err, docs) {
      assert.equal(err, null);
      if(err)
      {
        console.log(err)
      }
      if(docs)
      {
        console.log('Query returned the following:');
        console.log(docs)
        callback.json(docs);
      }
      client.close();
    })
  })
}

function getElementById(id, callback) {
  client.connect(url, { useUnifiedTopology: true})
  .then(client => {
    console.log('Connected to the database')
    console.log('Attempting to retrieve data')
    const db = client.db('therm')
    const cursor = db.collection('stats').find({'id': id}).project({'id': 1, 'topic': 1, 'sentiment': 1, '_id': 0})
    .toArray(function(err, docs) {
      assert.equal(err, null);
      if(err)
      {
        console.log(err)
      }
      if(docs)
      {
        console.log('Query returned the following:');
        console.log(docs)
        callback.json(docs);
      }
      client.close();
    })
  })}

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  app.get('/api/:id', function(req, res) {
    const sid = parseInt(req.params.id);
    console.log(sid);
    getElementById(sid, res, function(err, result) {
      if(err)
      {
        console.log(err)
      }
      if(result)
      {
        console.log('Server replied successfully')
        return res.json(result);
      }
    });
  });
  // handler for the /user/:id path
app.get('/api/:id', function (req, res, next) {
  res.end(req.params.id)
})

app.get('/api/reset', function(req, res, next) {
  update.updateDB();
})


setInterval(update.updateDB, 60000);


  app.listen(port, () => {
    console.log('Server listening on port 8081');
    setInterval(update.updateDB, 60000);
  })
