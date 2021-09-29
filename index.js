// Your code here
//let array = ['Derek', 'McArthur', 'Student', 12 ]

function createEmployeeRecord(array){
    let obj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
return obj;
    // let obj = Object.assign({}, array)
    // let keys = ['firstName', 'familyName', 'title', 'payPerHour', 'timeInEvents', 'timeOutEvents']
    
    // for (let i = 0; i < keys.length; i++){
    //     obj[`${keys[i]}`] = obj[`${i}`];
    //     delete obj[`${i}`];
    // }
    // console.log(obj)
    // return obj
}

function createEmployeeRecords(arrays){

    let newArray = arrays.map(function(array){
        return createEmployeeRecord(array);
    })
   // console.log("newArray", newArray);
    return newArray;
    
}

function createTimeInEvent(obj, stamp){
    let newTimeInEvent = {
        type: "TimeIn",
        hour: parseFloat(stamp.slice(-4)),
        date: stamp.slice(0,10),
    };
    obj.timeInEvents.push(newTimeInEvent)
    //console.log("TEST", obj);
    return obj;
    
}

function createTimeOutEvent(obj, stamp){
    let newTimeOutEvent = {
        type: "TimeOut",
        hour: parseFloat(stamp.slice(-4)),
        date: stamp.slice(0,10),
    };
    obj.timeOutEvents.push(newTimeOutEvent);
    //console.log("TEST", obj);
    return obj;
    
}

function hoursWorkedOnDate(obj, date){
   for (let i = 0; i < obj.timeInEvents.length; i++){
       if (date === obj.timeInEvents[i].date){
            let clockedIn = obj.timeInEvents[i].hour;
            let clockedOut = obj.timeOutEvents[i].hour;
            let hoursWorked = clockedOut - clockedIn;
            //console.log(hoursWorked/100);
            return hoursWorked/100;
        };
    }
}

function wagesEarnedOnDate(obj, date){
    let hoursWorked = hoursWorkedOnDate(obj, date);
    let payOwed = hoursWorked * obj.payPerHour;
    return payOwed;
}

function allWagesFor(obj){
    let objValues = Object.values(obj);
    let timeInEvent = objValues[4];
    let sum = 0;
    for (let i = 0; i < timeInEvent.length; i++){
        for (const [key, value] of Object.entries(timeInEvent[i])){
            if (key === 'date'){
                let date = value
                //console.log("DATE:", date);
                //console.log("WAGES:", wagesEarnedOnDate(obj, date));
                sum += wagesEarnedOnDate(obj, date)

        }
    }
}
    //console.log("TOTAL PAY:", sum);
    //console.log(timeInEvent.length)
    //console.log("Testing OBJECT:", objValues);
    return sum;
}

function calculatePayroll(employArray){
    let totalPayroll = 0;
    for (let i = 0; i < employArray.length; i++){
        totalPayroll += allWagesFor(employArray[i])
    }
    //console.log("TOTAL PAYROLL:", totalPayroll)
    return totalPayroll;
}