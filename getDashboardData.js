const database = require('./connection/db_connection');
const { DBNAME, VEHICLEDATA } = require('./constant/database');


exports.getDashboardData = async (req, res) => {

    let findBy = {};
    try {

        const client = await database.getClient();
        // weekly basis data 
        const curr = new Date();
        const firstDay = Math.floor(new Date(curr.setDate(curr.getDate() - curr.getDay())).getTime() / 1000)
        const currdate = Math.floor(new Date().getTime() / 1000)


        //set hours to get hourly basis data
        let yesterday  = curr.setDate(new Date().getDate() - 1)
        let sethr = new Date(yesterday).setHours(24,59,59,999)
        sethr = Math.floor(new Date(sethr).getTime() / 1000)

        //monthly basis data
        let firstDateOfCurrentMonth = new Date(curr.getFullYear(), curr.getMonth(), 1);
        let endDateOfCurrentMonth = new Date(curr.getFullYear(), curr.getMonth() + 1, 0)
        let startDate = Math.floor(firstDateOfCurrentMonth.getTime() / 1000);
        let endDate = Math.floor(endDateOfCurrentMonth.getTime() / 1000)

        if (req.query.isDailyBasis) {
            findBy = { "date": { $gte : sethr }  }
        }

        if(req.query.isMonthlyBasis){
            findBy =
                {
                    "date" : { $gte : startDate, $lte : endDate }
                }
        }

        if (req.query.isWeeklyBasis) {
            findBy['$or'] = [
                { "exitDate": { $gte: firstDay, $lte: currdate } },
                { "date": { $gte: firstDay, $lte: currdate } }
            ]
        }


        const result = await client.db(DBNAME).collection(VEHICLEDATA).find(
            findBy
        ).toArray()

        res.send(result)

    } catch (err) {
        throw new Error(err.toString())
    }
}