var moment = require('moment-timezone');

const countByDays = async ({ startDays, daysCount, model, query = {}, app }) => {
    const cairoTimeZone = 'Africa/Cairo';
    let currentDate, endDate, startDate ;
    if(startDays === 0){
        currentDate = moment().tz(cairoTimeZone)
        endDate = moment(currentDate).subtract(startDays, 'days')
        startDate = moment(endDate).subtract(daysCount, 'days').startOf('day');
    }else {
        currentDate = moment().tz(cairoTimeZone).startOf('day').startOf('day');
        endDate = moment(currentDate).subtract(startDays, 'days').startOf('day');
        startDate = moment(endDate).subtract(daysCount, 'days').startOf('day');
    }
    const q = {
        createdAt: {
            $gte: startDate.toDate(),
            $lt: endDate.toDate(),
        },
        app: app._id,
        ...query
    }
    return await model.find(q).countDocuments();
}

module.exports = countByDays;
