function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(function (data) {
        return createEmployeeRecord(data);
    });
}

function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour)
    });
    return this;
}

function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour)
    });
    return this;
}

function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date).hour;
    const timeOut = this.timeOutEvents.find(event => event.date === date).hour;
    return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0);

    return payable;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor.call(record), 0);
}