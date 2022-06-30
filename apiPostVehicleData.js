const DATABASE = require("./connection/db_connection")
const {DBNAME, VEHICLEDATA} = require("./constant/database")

exports.apiPostVehicleData = async (req,res) => {
    let payload = {};
    let findBy = {vehicleNumber : req.body.vehicleNumber};
    try{
        let funccheck = await checkNP(req.body,res);

        if(funccheck.length > 0){
            return
        }

        payload = req.body;
        payload['vehicleCategory'] = "";
        payload["date"] = Math.floor(new Date().getTime() / 1000);
        payload["entryTime"] = new Date().toLocaleTimeString('en-US', {  hour: '2-digit', minute: '2-digit', hours12 : true});
        payload["currentStatus"] = true
        
        await exitTime(payload, findBy, res);
        
    }
    catch(err){
        throw new Error(err.toString());
    }
};

const checkNP = async (findBy,res) => {
    try{
        let temp = { vehicleNumber : findBy.vehicleNumber }
        let client = await DATABASE.getClient();
        let response = await client.db(DBNAME).collection(VEHICLEDATA).find(
            temp
        ).toArray();
        if(response.length > 0){
            let payload = {exitTime: new Date().toLocaleTimeString('en-US', {  hour: '2-digit', minute: '2-digit', hours12 : false}), currentStatus: false} 
            exitTime(payload,temp, res)
        }
        return response
    }
    catch(err){
        throw new Error(err.toString());
    }
}

const exitTime = async (payload, findBy, res) => {
    try {
        let client = await DATABASE.getClient();
        let response = await client.db(DBNAME).collection(VEHICLEDATA).findOneAndUpdate(
            findBy,
            {
                $set:payload
            },
            {
               returnNewDocument: true, returnOriginalDocument: false, upsert: true
            }
        )
        res.status(200).send({ success : true, message : "Vehicle Data Upload Successfull"});
    }
    catch(err){
        throw new Error(err.toString());
    }
}