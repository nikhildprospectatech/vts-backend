const DATABASE = require("./connection/db_connection")
const {DBNAME, USERDATA} = require("./constant/database")
const bcrypt = require('bcryptjs');
const { generateReqId } = require('./lib/utils');
const jwt = require('jsonwebtoken');

exports.apiRegUserdata = async (req, res) => {

    console.log("register API Triggered")

    try{
     
        const { fullName, email, password } = req.body;
       
        let client = await DATABASE.getClient();

        if(!(fullName && email && password ) ){
            return res.status(400).send("All inputs are required")
        }

        const oldUser = await client.db(DBNAME).collection(USERDATA).findOne(
            { email }
        )

        if(oldUser){
            return res.status(200).send( { message : "user already exist, please login", success : false});
        }

        encryptedPassword = await bcrypt.hash(password, 10);
        let userId = await generateReqId();

        await client.db(DBNAME).collection(USERDATA).insertOne(
            {
                userId : userId,
                fullName : fullName,
                email : email.toLowerCase(),
                password : encryptedPassword
            }
        )


        const token = jwt.sign( { userId : userId, fullName, email }, process.env.CLIENT_SECRET,{ expiresIn: "2h" });

        res.status(200).send( 
                {
                    email,
                    token : token,
                    success : true
                }
             )

    }catch(err){
        err.isjoi
       throw new Error(err.toString())
    }
}