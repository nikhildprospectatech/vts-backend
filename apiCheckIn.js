const DATABASE = require("./connection/db_connection")
const {DBNAME, VEHICLEDATA} = require("./constant/database")
const { generateReqId } = require('./lib/utils');

exports.apiCheckInData = async (req,res) => {
    let findBy = {vehicleNumber : req.body.vehicleNumber};
    try{
     
        let client = await DATABASE.getClient();

        const  exist = await client.db(DBNAME).collection(VEHICLEDATA).findOne(findBy);

        if( exist?.vehicleNumber && exist?.entryTime && exist?.exitTime ){
            return await insertVehicle(findBy, res)
        }

        if(exist){
            return res.send({
                status : 201,
                success : false
            })
        }

        await insertVehicle(findBy, res)
    }
    catch(err){
        throw new Error(err.toString());
    }
};



const insertVehicle = async (payload, res ) => {

    try{
        let client = await DATABASE.getClient();
        payload = payload;
        payload['vehicleId'] =await generateReqId();
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

    }catch(err){
       throw new Error(err.toString())
    }
}