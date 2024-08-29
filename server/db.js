const mongoose = require('mongoose');

const connectTodb = async () => {
    try {
        mongoose.set('strictQuery', false);
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`MongoDb connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

module.exports = connectTodb;
