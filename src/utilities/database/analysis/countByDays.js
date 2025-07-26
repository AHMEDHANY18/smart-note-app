const moment = require('moment-timezone');

const countByDays = async ({ daysCount, model, query = {}, app }) => {
    let dateBeforeXDays; // تاريخ ووقت الحالي

    if (daysCount === 0) {
        dateBeforeXDays = moment().startOf('day'); // بداية اليوم الحالي
    } else {
        dateBeforeXDays = moment().subtract(daysCount, 'days').startOf('day'); // تقديم التاريخ بناءً على عدد الأيام المحدد
    }
    console.log(dateBeforeXDays.format('YYYY-MM-DD HH:mm:ss'),"بعد او يساوي aa")

    const q = {
        createdAt: { $gte: dateBeforeXDays.toDate() },
        app: app._id,
        ...query
    }
    return await model.countDocuments(q);
}

module.exports = countByDays;
