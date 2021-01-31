const mongoose = require('mongoose');
mongoose.connect("mongodb://locahost:27017/mongooseFruits", { useNewUrlParser: true,  useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema ({
    name: {
      type: String,
      required: [true, "Please check data entry, has no name"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
    name: "Apple",
    rating: 10,
    review: "tasty"
});

//fruit.save();

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
   name: "Pineapple",
   score: 9,
   review: "Great fruit."
});

pineapple.save();

const person = new Person({
    name: "John",
    age: 37,
    favoriteFruit: pineapple
});

person.save

/*const kiwi = new Fruit ({
    name: "Kiwi",
    rating: 6,
    review: "sweet"
});

const mango = new Fruit ({
    name: "Mango",
    rating: 10,
    review: "meaty"
});

const strawberry= new Fruit ({
    name: "Strawberry",
    rating: 10,
    review: "red"
}); */

//* Fruit.insertMany([kiwi, mango, strawberry], function(err){
//   if (err) {
//        console.log(err);
//    } else {
//      console.log("All Saved");
//    }
//}); 

Fruit.find(function(err, fruits){
    if (err) {
        console.log(err);
    } else {

      mongoose.connection.close();

      fruits.forEach(function(fruit){
        console.log(fruit.name);
     });
    }
  });


/*Fruit.updateOne({_id: "yr,jha5m,e4ym35"}, {name: "Peach"}, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Updated documents");
    }
});*/

/*Fruit.deleteOne({name: "Peach"}, function(err) {
    if (err){
        console.log(err);
    } else {
        console.log("Deleted the document");
    }
})*/

Person.deleteMany({name: "John",
age: {$gte: 37}}, function(err) {
    if (err){
        console.log(err);
    } else {
        console.log("Deleted the documents");
    }
});


const insertDocuments = function(db, callback) {
    // Get the document collection
    const collection = db.collection('Fruits');
    //Insert some document
    collection.insertMany([
      {a: 1}, 
      {a: 2}, 
      {a: 3}
     ], 
     function(err, result) {
       assert.equal(err, null);
       assert.equal(3, result.result.n);
       assert.equal(3, result.ops.length);
       console.log("Inserted 3 document into the collection");
       callback(result);        
     });
} 

const findDocuments = function(db, callback) {
    //Get the documents collection
    const collection = db.collection('Fruits');
    // Find some documents
    collection.find({}).toArray(function(err, Fruits) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(Fruits);
      callback(Fruits); 
    });
}