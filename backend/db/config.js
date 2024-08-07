const mongoose = require('mongoose');

const databaseConnect = async () => {
  try {
    await mongoose.connect('mongodb+srv://eywa:Eywa1234@cluster1.pfnus6c.mongodb.net', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      dbName: 'Goshala'
    });
    console.log("Connected to Mongodb atlas");
  } catch (error) {
    console.error("Error connecting to Mongodb atlas", error);
    process.exit(1);
  }
};

module.exports = databaseConnect;
