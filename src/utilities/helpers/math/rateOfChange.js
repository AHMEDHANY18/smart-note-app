module.exports = (currentValue, previousValue) => {
    if (previousValue === 0) {
        return (currentValue - previousValue) * 100;
    } else {
        
        return ((currentValue - previousValue) / (Math.abs(previousValue))) * 100;
    }
};