const moment = require('moment-timezone');

const daysOfWeek = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

const summaryByDays = async ({ daysCount, model, query = {}, app }) => {
    const currentDate = moment();
    const data = [];

    for (let day = 0; day < daysCount; day++) {
        const dateBeforeXDays = moment(currentDate).subtract(day, 'days').startOf('day');
        const finishDay = moment(dateBeforeXDays).add(1, 'day').subtract(1, 'millisecond');

        const usersCount = await model.countDocuments({
            createdAt: {
                $gte: dateBeforeXDays.toDate(),
                $lt: finishDay.toDate()
            },
            app: app._id,
            ...query
        });

        data.push({
            count: usersCount,
            date: dateBeforeXDays.format('YYYY-MM-DD'),
            day: daysOfWeek[dateBeforeXDays.day()],
        });
    }

    return data;
}

module.exports = summaryByDays;
