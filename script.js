let date = document.getElementById('date');
let result = document.getElementsByClassName('result');

date.max = new Date().toISOString().split('T')[0];

function CalculateAge() {
    let birthdate = new Date(date.value);
    let todayDate = new Date();

    let d1 = birthdate.getDate();
    let m1 = birthdate.getMonth() + 1;
    let y1 = birthdate.getFullYear();

    let d2 = todayDate.getDate();
    let m2 = todayDate.getMonth() + 1;
    let y2 = todayDate.getFullYear();

    let d3, m3, y3;
    y3 = y2 - y1;

    if (m2 >= m1) {
        m3 = m2 - m1;
    } else {
        y3--;
        m3 = 12 + m2 - m1;
    }

    if (d2 >= d1) {
        d3 = d2 - d1;
    } else {
        m3--;
        d3 = getDaysInMonth(y1, m1) + d2 - d1;
    }

    if (m3 < 0) {
        m3 = 11;
        y3--;
    }

    let ageString = `You are ${y3} years, ${m3} months, and ${d3} days old.`;
    result.innerHTML = ageString;

    savedb(ageString);
    showlist();
 
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function savedb(ageString) {
    let data = JSON.parse(localStorage.getItem("mydata")) || [];
    data.push(ageString);
    localStorage.setItem("mydata", JSON.stringify(data));
    data = " "
}

function showlist() {
    let data = JSON.parse(localStorage.getItem("mydata")) || [];
    result.innerHTML = data.map(item => `<div>${item}</div>`).join('');
}
