// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/our-project-2', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    email: "Alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    email: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]

let coworks = [
  {
    name: 'Cowork Central Príncipe Real',
    adress: { 
      street:  'Rua da Alegria',
      Number: '122B',
      coordinates: [38.709082,-9.1553527]
    },
    email: 'sdfsf@asadh',
    mobile: 'dskdjhd', 
    images: 'dshdsd',
    amenities: {
      basics: ['wi-fi','air-conditioning'],
      equipment: ['projector','printer'], 
      facilities: ['kitchen','Event space for rent', 'Personal lockers'],
      transportation: ['5 Minute Walk From Public Transit'],
      relax_zones: ['lounge'] 


    },
    availability: 'sdsd',
    price: 'dsds',



  },
  {}, 

]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})