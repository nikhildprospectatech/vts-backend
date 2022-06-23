const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;

const dbConnection = () => {
    try {
        let client=null;
        const getClient = async () => {
            if(client){
                return client;
            }
            if(!process.env.DBURL){
                throw new Error(
                    "DBURL not found"
                );
            }
            client = await mongoclient.connect(process.env.DBURL,{useNewUrlParser:true, maxPoolSize: 50, useUnifiedTopology:true})
            return client;
        }
        return {
            getClient
        }
    }
    catch(err){
        console.log(err);
    }
}
module.exports = dbConnection();