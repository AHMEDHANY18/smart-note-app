const {periods} = require('../../../config/constants')
module.exports = (date, num, type) => {
    if(Object.values(periods).includes(type) && !!date.getDate()) {
        type == "years" ? date.setFullYear(date.getFullYear() + num) : null;
        type == "months" ? date.setMonth(date.getMonth() + num) : null;
        type == "days" ? date.setDate(date.getDate() + num) : null;
        type == "hours" ? date.setHours(date.getHours() + num) : null;
        type == "minutes" ? date.setMinutes(date.getMinutes() + num) : null;
        type == "seconds" ? date.setSeconds(date.getSeconds() + num) : null;
        type == "milliseconds" ? date.setMilliseconds(date.getMilliseconds() + num) : null;

        return date;
    }
    return null
}