const insertDaily = (req, username, callback) => {
    var MongoClient = require('mongodb').MongoClient;
    //Connection details for mLab if environmental variables exist (deployed from cloud)
    if (process.env.mLabUser){
        let dbUsername = process.env.mLabUser;
        let dbPassword = process.env.mLabPassword;
        var url = "mongodb://" + dbUsername + ':' + dbPassword + "@ds119052.mlab.com:19052/mydb";
    }
    //Local mongodb url
    else{
        var url = "mongodb://localhost:27017/myapp";
    }

    MongoClient.connect(url, function(err, db) {
        console.log("Database Connected!");
        
        if(process.env.mLabUser){
            var dbo = db.db("mydb");
        }
        else{
            var dbo = db.db("myapp")
        }

        let date = new Date(req.date)

        let data = { Date: date,
            Run: { Time: 0, Distance: 0, Cals: 0 },
            Swim: { Time: 0, Distance: 0, Cals: 0 },
            Bike: { Time: 0, Distance: 0, Cals: 0 },
            Workout: { Time: 0, Distance: 0, Cals: 0 },
            Username: username}

        dbo.collection("Entries").insert(data, function(err, result) {
            if (err) throw err;

            callback(result)
        
        });

        db.close();
    })
}

module.exports = insertDaily;
