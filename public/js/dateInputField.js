// Creating the total days in a month
let days = [];
for(let i=1; i<=31; i++){
    days.push(i);
}

let dayOptions = days.map(val => {
    return `<option value="${val}">${val}</option>`
})
document.getElementById("selectDays").innerHTML = dayOptions;

// Creating the total months in a year
let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

let monthOptions = months.map(val => {
    return `<option value="${val}">${val}</option>`
})
document.getElementById("selectMonth").innerHTML = monthOptions;
