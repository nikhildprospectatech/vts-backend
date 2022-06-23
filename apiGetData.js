const DATABASE = require("./connection/db_connection")
const {DBNAME, VEHICLEDATA} = require("./constant/database")

exports.apiGetData = async (req,res) => {
    console.log('API Get data triggered')
    let findBy = {};

    try{

        let client = await DATABASE.getClient();
        let response = await client.db(DBNAME).collection(VEHICLEDATA).find(findBy).toArray();
        console.log(response)
        res.status(200).send(response);
    }
    catch(err){
        throw new Error(err.toString());
    }
};

