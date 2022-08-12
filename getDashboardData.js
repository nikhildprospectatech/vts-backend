const database = require('./connection/db_connection');
const { DBNAME, VEHICLEDATA } = require('./constant/database');


exports.getDashboardData = async (req, res) => {

    try {

        const client = await database.getClient();
        var curr = new Date();
        var firstDay = Math.floor(new Date(curr.setDate(curr.getDate() - curr.getDay())).getTime() / 1000)

        const currdate = Math.floor(new Date().getTime() / 1000)

        const result = await client.db(DBNAME).collection(VEHICLEDATA).find(
            {
                $or: [
                    { "exitDate": { $gte: firstDay, $lte: currdate } },
                    { "date": { $gte: firstDay, $lte: currdate } }
                ]
            }).toArray()

        res.send(result)

    } catch (err) {
        throw new Error(err.toString())
    }
}