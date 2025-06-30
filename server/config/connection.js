const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        let conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(`${conn.connection.name} DB connected ✅✅`);
        
    }catch(error){
        console.log(`DB-Connection :${error}`);
    }

};

module.exports={connectDB};