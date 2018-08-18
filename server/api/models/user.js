var MongoClient = require('mongodb').MongoClient;
if (!process.env.mLabUser){
  var url = "mongodb://localhost:27017/myapp";
}
else{
  let username = process.env.mLabUser;
  let password = process.env.mLabPassword;
  var url = "mongodb://" + username + ':' + password + "@ds119052.mlab.com:19052/mydb";
}
MongoClient.connect(url, function(err, db) {
if (err) throw err;
console.log("Database created!");
db.close();
});
  var myobj = { username: 'amarkenzon', password: 'password', name: "Alex", age: 22, email: "alex.markenzon@yahoo.com" };
  db.collection("Users").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });

/*var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  }
});*/

//var User = mongoose.model('User', UserSchema);



//module.exports = User;