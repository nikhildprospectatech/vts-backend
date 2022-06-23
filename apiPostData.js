const DATABASE = require("./connection/db_connection")
const {DBNAME, VEHICLEDATA} = require("./constant/database")

exports.apiPostData = async (req,res) => {
    let payload = {};
    let findBy = {};

    try{
        payload = req.body;
        findBy["id"] = req.body.id;
        delete payload.id;

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
        res.status(200).send(response);
    }
    catch(err){
        throw new Error(err.toString());
    }
};

