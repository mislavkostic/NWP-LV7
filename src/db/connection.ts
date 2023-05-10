import mongoose, {ConnectOptions} from 'mongoose';
import {config} from "../config";

//run all validators even when updating
mongoose.set("runValidators", true);
//connect to db with proper config
async function connect(){
    mongoose.connect(config.MONGO_ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions);
}
//print message in console when db is connected 
mongoose.connection.once("open", ()=>{
    console.log("db is connected");
});
//if there are some errors, show them in console
mongoose.connection.on("error", (error)=>{
    console.log(error);
});

export {connect};