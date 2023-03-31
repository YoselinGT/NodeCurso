import mongoose from "mongoose";

const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.MONGODB_CCN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        });

        console.log('Base de datos online');

    } catch (err){
        console.log("Entro al error ",err)
        throw new Error('Error para iniciar la base de datos');
    }
}

export {
    dbConnection
}