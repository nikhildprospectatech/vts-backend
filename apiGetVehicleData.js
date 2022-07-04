const DATABASE = require("./connection/db_connection")
const {DBNAME, VEHICLEDATA} = require("./constant/database")

exports.apiGetVehicleData = async (req,res) => {
    try{
        let findBy = {};

        if(req.query.currentStatus)[
            findBy['currentStatus'] =JSON.parse(req.query.currentStatus)
        ]
        
        let client = await DATABASE.getClient();
       
            page = parseInt(req.query.page) || 1;
            limit = parseInt(req.query.limit) || 1;
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        
        let vehicleCountData = await client.db(DBNAME).collection(VEHICLEDATA).aggregate([
            {"$skip": startIndex },
            {"$limit": endIndex },
                { "$group": {
                    "_id": null,
                    "items": {$push: '$$ROOT'},
                    "vehicleIn": {
                        "$sum": {
                            "$cond": [ { $eq : [ "$currentStatus", true] }, 1, 0 ]
                        }
                    },
                    "vehicleOut": {
                        "$sum": {
                            "$cond": [ { $eq : [ "$currentStatus", false] }, 1, 0 ]
                        }
                    }
                }}

        ]).toArray()
        
        res.status(200).send(vehicleCountData);
    }
    catch(err){
        throw new Error(err.toString());
    }
};
