const DATABASE = require("./connection/db_connection")
const {DBNAME, VEHICLEDATA} = require("./constant/database")

exports.apiGetVehicleData = async (req,res) => {
    try{
        let findBy = {};

        if(req.query.currentStatus)[
            findBy['currentStatus'] =JSON.parse(req.query.currentStatus)
        ]

        let client = await DATABASE.getClient();
        let response = await client.db(DBNAME).collection(VEHICLEDATA).find(findBy).sort({entryTime: -1}).toArray();
        response.forEach(element => {
            element["date"] = new Date(element.date)
        });
        
        res.status(200).send(response);
    }
    catch(err){
        throw new Error(err.toString());
    }
};
