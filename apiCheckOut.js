const DATABASE = require("./connection/db_connection")
const {DBNAME, VEHICLEDATA} = require("./constant/database")

exports.apiCheckOutData = async (req,res) => {
    let findBy = {vehicleNumber : req.body.vehicleNumber};
    let findById = {};
    try{
     

        let client = await DATABASE.getClient();
        const filterData = await client.db(DBNAME).collection(VEHICLEDATA).find(findBy).toArray();

        filterData.forEach(ele => {
            if(!ele.exitDate){
                findById['vehicleId'] = ele.vehicleId;
            }
        });

        let payload = { exitDate: Math.floor(new Date().getTime() / 1000), exitTime: new Date().toLocaleTimeString('en-US', {  hour: '2-digit', minute: '2-digit', hours12 : false}), currentStatus: false} 

        const result = await client.db(DBNAME).collection(VEHICLEDATA).findOneAndUpdate(
            findById,
            { $set : payload }
        )

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