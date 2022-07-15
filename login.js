const { DBNAME, USERDATA } = require('./constant/database');
const DATABASE = require('./connection/db_connection')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.login = async (req, res) => {
    console.log("login API triggered")

    try {
        const { email, password } = req.query;

        if (!(email && password)) {
            res.status(400).send("username and password is required")
        }

        let client = await DATABASE.getClient();

        const user = await client.db(DBNAME).collection(USERDATA).findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {

            const token = jwt.sign(
                {
                    userId: user.userId,
                    fullName: user.fullName,
                    email
                },
                process.env.CLIENT_SECRET,
                {
                    expiresIn: "2h"
                }
            )

            return res.status(200).send({
                email,
                token,
                success : true
            })

        } 
            res.status(200).send({
                success: false,
                msg :"Invalid credentials"
            }
        )

    } catch (err) {
        throw new Error(err.toString())
    }
}