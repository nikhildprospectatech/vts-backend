const DATABASE = require("./connection/db_connection")
const {DBNAME, VEHICLEDATA} = require("./constant/database")

exports.apiCheckInData = async (req,res) => {
    let payload = {};
    let findBy = {vehicleNumber : req.body.vehicleNumber};
    try{
     

        let client = await DATABASE.getClient();

        const  exist = await client.db(DBNAME).collection(VEHICLEDATA).findOne(findBy);

        if(exist){
            return res.send({
                status : 201,
                success : false
            })
        }

        payload = req.body;
        payload['vehicleCategory'] = "";
        payload["date"] = Math.floor(new Date().getTime() / 1000);
        payload["entryTime"] = new Date().toLocaleTimeString('en-US', {  hour: '2-digit', minute: '2-digit', hours12 : true});
        payload["currentStatus"] = true

        const result = await client.db(DBNAME).collection(VEHICLEDATA).insertOne(payload)

        res.send({
            status : 200,
            success : true,
            result
        })
    }
    catch(err){
        throw new Error(err.toString());
    }
};