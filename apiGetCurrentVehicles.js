const DATABASE = require("./connection/db_connection")
const {DBNAME, VEHICLEDATA} = require("./constant/database")

exports.apiGetCurrentVehicles = async (req,res) => {
    let findBy = {currentStatus : JSON.parse(req.query.currentStatus)};

    try{

        let client = await DATABASE.getClient();
        let response = await client.db(DBNAME).collection(VEHICLEDATA).find(findBy).toArray();
        response.forEach(element => {
            element["date"] = new Date(element.date * 1000)
        });
        res.status(200).send(response);
    }
    catch(err){
        throw new Error(err.toString());
    }
};
