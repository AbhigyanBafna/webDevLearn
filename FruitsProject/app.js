const mongoose = require('mongoose');

// Handles connecting to mongodb server and creates fruitsDB
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true});

//Specifies a structure that certain collections will have to follow.
const fruitsSchema = new mongoose.Schema ({
  name : {
    type: String,
    required: [true, 'Names are important!']
  },
  rating : {
    type: Number,
    min: 1,
    max: 10 
  },
  review : String
});

const Fruit = mongoose.model("Fruit", fruitsSchema); //Creates collection named 'fruits'.

//Creating new data to put into DB
const apple = new Fruit({
  name : "Apple",
  rating : 7,
  review : "Pretty solid as a fruit. Can't hate apples right?"
});

const banana = new Fruit({
  name : "Banana",
  rating : 6,
  review : "Harder to handle"
});

const kiwi = new Fruit({
  name : "Kiwi",
  rating : 4,
  review : "Gets too sour sometimes"
});

const mango = new Fruit({
  name : "Mango",
  rating : 9,
  review : "King of all fruits"
});

const grapes = new Fruit({
  name : "Grapes",
  rating : 8,
  review : "Sometimes sweet, sometimes sour"
});

//Person Schema
const personSchema = new mongoose.Schema ({
  name : String,
  age : Number,
  favFruit : fruitsSchema //Linking the fruits schema to person schema
});

const Person = mongoose.model("Person", personSchema); //Creates collection named 'people'.

//Updating an entry

// Person.updateOne({ name: 'John' }, {favFruit : grapes}, function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Updated Successfully.");
//   }
// });

//Putting data into DB

// Fruit.insertMany([apple,banana,kiwi,mango], function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully saved all fruits");
//   }
// })

//Fetching data from DB
Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }else{
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });

    mongoose.connection.close();
    }
});

