const mongoosegoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = async () => {
    try {
        const conn = await mongoosegoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        process.exit();
    }
}
module.exports = connectDB;