//The connection of the server and database goes here...

require("dotenv").config();
//---------------------------------------------MODULES---------------------------------------------
const mongoose = require("mongoose");


//---------------------------------------------DEFAULTS---------------------------------------------
mongoose.set('runValidators', true); // Runs Validator [by default] on any Update


//---------------------------------------------VARIABLES---------------------------------------------
const db = process.env.MONGO_URL;


//---------------------------------------------CONNECTIONS---------------------------------------------

/* Connecting the server to the database */

class Connection {
  
  async connectDB(callback) {
    try {
      mongoose.connect(db);
      console.log("Database succesfully connected with server... ");
      callback(200)
    } catch (err) {
      callback(500)
      console.error(err.message);
      process.exit(1);
    }
  }

  async disconnectDB() {
    try {
      await mongoose.disconnect(db);
      console.log("Database succesfully disconnected with server... ");
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  }
}


module.exports = Connection;