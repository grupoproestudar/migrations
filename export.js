const admin = require("firebase-admin");
const fs = require('fs');
const serviceAccount = require("./serviceAccountKey.json");
const env = require("./env")

let collectionName = process.argv[2];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: env.databaseURL
});

let db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

let data = {};
data[collectionName] = {};

let results = db.collection(collectionName)
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      data[collectionName][doc.id] = doc.data();
    })
    return data;
  })
  .catch(error => {
    console.log(error);
  })

results.then(dt => {
  let json = JSON.stringify(data)
  let dateNow = new Date()
  fs.writeFile(`${collectionName}-${dateNow.toISOString().slice(0, 10)}.json`, json, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
})
