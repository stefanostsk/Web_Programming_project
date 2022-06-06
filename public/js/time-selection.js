let dateinput = document.querySelector("input");
// let dateinputVal = document.querySelector("input").value;

let defVal = new Date(),
d = defVal.getDate(),
m = defVal.getMonth()+1, 
y = defVal.getFullYear(),
data;

if(d < 10){
d = "0"+d;
};
if(m < 10){
m = "0"+m;
};

data = y+"-"+m+"-"+d;
dateinput.value = data;

const datenow = new Date()
const crntDate = new Date(datenow.getFullYear(), datenow.getMonth(), datenow.getDate());
let selDate = crntDate;

let defaultHeightInt = 4;
let z = 10;
let x1 = 0
let y1 = 0
let  startY, startHeight, height;

let elementDragged;

let endY = 0;

let y2 = 0;


function initDrag(e) {
    e.stopPropagation();

    elementDragged = e.target.parentElement
    if ((e.target == 'i') || (e.target.nodeName == 'I')) {
        elementDragged = e.target.parentElement.parentElement
    }
    elementDragged.style.zIndex = z;
    z++;
    elementDragged.style.cursor = "n-resize"
    document.body.style.cursor = "n-resize"

    startY = e.clientY;
    startHeight = parseInt(document.defaultView.getComputedStyle(elementDragged).height, 10);

    height = elementDragged.parentElement.getBoundingClientRect()['height'];

    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
    endY = 0;
    y2 = 0;
 }


function doDrag(e) {
    endY = startY - e.clientY
    startY = e.clientY

    y2 -= endY

    if (y2 > height/(24*4*2)) {
        let prevHeight = parseInt(document.defaultView.getComputedStyle(elementDragged).height, 10)
        defaultHeight = prevHeight + height/(24*4)
        defaultHeightInt++;
        elementDragged.style.height = defaultHeight + 'px';
        elementDragged.dataset.height = Number(elementDragged.dataset.height) + 1;
        elementDragged.dataset.tempHeight = elementDragged.dataset.height
        y2 -= height/(24*4);


        let startTime = elementDragged.dataset.startTime;
        let endTime = elementDragged.dataset.endTime;

    
        let quarterEnd = Number(endTime.slice(3)) + 15;

        if (quarterEnd !== 60) {
            if (endTime.slice(0,2) === '24') {
                endTime = '00:' + quarterEnd;
            }
            else {
                endTime = endTime.slice(0,3) + quarterEnd;
            }
        }
        else {
            let plusOne = Number(endTime.slice(0,2)) + 1;
            if (plusOne < 10) {
                endTime = '0' + plusOne + ':00';
            }
            else {
                endTime = plusOne + ':00';
            }
        }

        let k = newlist.indexOf(`${elementDragged.dataset.shortDate}${elementDragged.dataset.startTime} ${elementDragged.dataset.endTime}`);

        newlist[k] = newlist[k].slice(0,10)+startTime+" "+endTime;

        elementDragged.children[0].textContent = startTime + ' - ' + endTime;
        elementDragged.dataset.endTime = endTime;

    }


    else if ((y2 < -height/(24*4*2)) && (parseInt(document.defaultView.getComputedStyle(elementDragged).height, 10) > height/(24*4))) {
        let prevHeight = parseInt(document.defaultView.getComputedStyle(elementDragged).height, 10)
        defaultHeight = prevHeight - height/(24*4)
        defaultHeightInt--;
        elementDragged.style.height = defaultHeight + 'px';
        elementDragged.dataset.height = Number(elementDragged.dataset.height) - 1;
        elementDragged.dataset.tempHeight = elementDragged.dataset.height

        y2 += height/(24*4);

        let startTime = elementDragged.dataset.startTime;
        let endTime = elementDragged.dataset.endTime;

        let quarterEnd = Number(endTime.slice(3)) - 15;
        if (quarterEnd === 0) {
            quarterEnd = '00';
        }


        if (quarterEnd !== -15) {
            endTime = endTime.slice(0,3) + quarterEnd;
            if (endTime === '00:00') {
                endTime = '24:00'
            }
        }
        else {
            let minusOne = Number(endTime.slice(0,2)) - 1;
            if (minusOne < 10) {
                endTime = '0' + minusOne + ':45';
            }
            else {
                endTime = minusOne + ':45';
            }
        }
          
        let j = newlist.indexOf(`${elementDragged.dataset.shortDate}${elementDragged.dataset.startTime} ${elementDragged.dataset.endTime}`);

        newlist[j] = newlist[j].slice(0,10)+startTime+" "+endTime;

        elementDragged.children[0].textContent = startTime + ' - ' + endTime;
        elementDragged.dataset.endTime = endTime;
    }
}

function stopDrag(e) {
    document.body.style.cursor = "auto";
    elementDragged.style.cursor = "grab"
    document.documentElement.removeEventListener('mousemove', doDrag, false);    
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
}

let selDateMonth = crntDate;
let clickedDay = '.none';
let clickeddate = 0;

const weekColumnsMonth = document.querySelector('.week-columns-month')

let defaultHeightMonth = parseInt(document.defaultView.getComputedStyle(weekColumnsMonth).height, 10)/24;


function createDayCalendar(date) {
    const inpdate = new Date(dateinput.value);
    selDateMonth = date;
    const currentDate = date;
    
    const allOptions = document.querySelectorAll('.option');

    for (let i=0; i<allOptions.length; i++) {
        allOptions[i].style.display = 'none';
    }

    const dateClass = `.date-${selDateMonth.toLocaleString("en-US", {day: "2-digit", month: "2-digit", year: "numeric"}).replaceAll('/','-')}`;
    clickedDay = dateClass;


    const selectedOptions = document.querySelectorAll(dateClass);
    
    for (let i=0; i<selectedOptions.length; i++) {
        selectedOptions[i].style.display = 'block';
    }

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const days = document.querySelectorAll(".day-name-month>span");
    const thisDay = new Date(currentYear, currentMonth, currentDay);
    days[0].textContent = thisDay.toLocaleString("en-US", {month: "short"});
    days[1].textContent = thisDay.toLocaleString("en-US", {day: "numeric"});
    days[2].textContent = thisDay.toLocaleString("en-US", {year: "numeric"});
}

let newlist=[];

function createOption (e){
    if (e.nodeName=="SPAN") {
        return null;
    }
    else {
        const startDate = new Date(selDateMonth);

        const newOption = document.createElement('div');
        
        const startTime = e.firstChild.textContent;

        const content = document.createElement('span');
        const plusOne = Number(startTime.slice(0,2)) + 1;
        let endTime;
        if (plusOne < 10) {
            endTime = '0' + plusOne + startTime.slice(2);
        }
        else if ((plusOne === 24) && startTime.slice(3) !== '00') {
            endTime = '00' + startTime.slice(2);
            
        }
        else {
            endTime = plusOne + startTime.slice(2);
        }

        
        content.textContent = startTime + ' - ' + endTime;
        content.style.display = 'inline';
        newOption.appendChild(content);

        const xbtn = document.createElement('i');
        xbtn.classList.add('fas','fa-times','xButton-time');
        xbtn.addEventListener('mousedown', (e) => {
            e.stopPropagation()
        })
        xbtn.addEventListener('click', function (e) {
            e.stopPropagation()
            newOption.remove();
            newlist.splice(newlist.indexOf(`${this.parentElement.dataset.shortDate}${this.parentElement.dataset.startTime}+" "+${this.parentElement.dataset.endTime}`),1);            
        })
        newOption.appendChild(xbtn)

        newOption.addEventListener('mouseover', function() {
            xbtn.style.color = '#9e4922'
        })
        newOption.addEventListener('mouseout', function() {
            xbtn.style.color = 'transparent'
        })
        
        const selDateFirst = new Date(Number(selDateMonth.getTime()) - Number(selDateMonth.getDay())*24*3600*1000);

        const dateClass = `d${selDateFirst.getFullYear()}-${selDateFirst.getMonth()}-${selDateFirst.getDate()}`;
        newOption.classList.add(dateClass);
        newOption.classList.add('option');

        newOption.style.gridRow = (Number(startTime.slice(0,2))*4 + 1) + Number(startTime.slice(3,5)/15);
        newOption.style.gridColumn = e.style.gridColumn;


        const thedate = selDateMonth

        newOption.dataset.date = thedate;

        newOption.dataset.shortDate = thedate.toLocaleString("en-US", {day: "2-digit", month: "2-digit", year: "numeric"});
        newOption.dataset.startTime = startTime;
        newOption.dataset.endTime = endTime;
        newOption.dataset.height = defaultHeightInt;
        newOption.dataset.tempHeight = defaultHeightInt;


        newOption.classList.add('date-'+newOption.dataset.shortDate.replaceAll('/','-'));

        const resizer = document.createElement('div');
        resizer.innerHTML = '<i class="fas fa-grip-lines"></i>'
        resizer.className = 'resizer';
        newOption.appendChild(resizer);

        if(act === 1){
            // newOption.style.backgroundImage = "url('/public/images/team-logos/boston.jpg');
            newOption.style.backgroundImage = "url('/images/logo.png')";
            newOption.style.backgroundSize = "140px";
            newOption.style.backgroundPosition= "center";
            newOption.style.backgroundRepeat = "repeat";
            resizer.addEventListener('mousedown', initDrag, false);
        }
        else if(act === 2){
            // newOption.style.backgroundImage = "url('/public/images/team-logos/boston.jpg') , url('/public/images/team-logos/evergreen.jpg') , url('/public/images/VS.png')";
            newOption.style.backgroundImage = "url('/images/logo.png') , url('/images/logo.png') , url('/images/VS.png')";

            newOption.style.backgroundSize = "34%";
            // newOption.innerHTML = `<span>VS</span>`;
            newOption.style.backgroundPosition= " left top, right top , center";
            newOption.style.backgroundRepeat = "repeat-y, repeat-y , repeat-y";
            resizer.addEventListener('mousedown', initDrag, false);
        }
    
        dragElementHorizontal(newOption);
        newlist.push(newOption.dataset.shortDate+ newOption.dataset.startTime+" "+newOption.dataset.endTime) ;

        newOption.style.height = defaultHeightMonth + 'px';
        
        e.parentElement.appendChild(newOption);
        // console.log(newlist);
    }
}

let act=0;
document.querySelectorAll("select")[0].addEventListener("input",function (){
    act=1;
})
document.querySelectorAll("select")[1].addEventListener("input",function (){
    act=2;
})

const allHoursMonth = document.querySelectorAll(".week-columns-month>div");

for (let i = 0; i<24*4; i++) {
    allHoursMonth[i].style.gridRow = (i%(24*4)+1) +'/' + (i%(24*4)+2);
    allHoursMonth[i].style.gridColumn = (Math.floor(i/(24*4))+1) +'/' + (Math.floor(i/(24*4))+2);
    allHoursMonth[i].addEventListener("click", (e) => createOption(e.target));
}


let currdate = datenow;
const highlighted_days = [];

var modalday = document.getElementById("daymodal");
var linkday = document.getElementById("signuplink");
var spanday = document.querySelector(".close-sign-month");



// function saveDate(givendate, numday) {
//     const givenmonth = givendate.getMonth();
//     const givenyear = givendate.getFullYear();
//     highlighted_days.push(new Date(givenyear, givenmonth, numday).getTime());
// }

// function deleteDate(givendate, numday) {
//     const givenmonth = givendate.getMonth();
//     const givenyear = givendate.getFullYear();
//     let ind = highlighted_days.indexOf(new Date(givenyear, givenmonth, numday).getTime());
    
//     // console.log(ind);
//     if (ind !== -1) {
//       highlighted_days.splice(ind, 1);
//     }
  
// }

const monthAll = document.querySelector('fieldset');

dateinput.addEventListener('input', function (e) {

    const inpdate = new Date(dateinput.value);
    currdate =inpdate;
    clickeddate = inpdate.getUTCDate();

    monthAll.style.gridTemplateColumns = '5fr 1.2fr'
    window.innerWidth
    clickeddate = inpdate.getUTCDate();

    const givenmonth = currdate.getMonth();
    const givenyear = currdate.getFullYear();
    
    createDayCalendar(new Date(givenyear, givenmonth, clickeddate));
    
    modalday.style.display = "block";

})


spanday.onclick = function () {
    modalday.style.display = "none";
    monthAll.style.gridTemplateColumns = '1fr'
}


function dragElementHorizontal(elmnt) {

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    elmnt.onmouseenter = () => {
        elmnt.style.zIndex = z;
        z++;
        elmnt.children[2].style.opacity = '0.7'
    }
    elmnt.onmouseleave = () => {
        elmnt.children[2].style.opacity = '1'
    }


    function dragMouseDown(e) {

        e.stopPropagation();
        e.target.style.zIndex = z;
        z++;
        e.target.style.cursor = "grabbing"
        e.target.classList.add('grabbing')
        document.body.style.cursor = "grabbing"
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        y1 = 0
    }


    function elementDrag(e) {

        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        

        x1 -= pos1
        y1 -= pos2

        const parentDivDims = e.target.parentElement.getBoundingClientRect()

        
        const width = parentDivDims['width']
        const height = parentDivDims['height']
        const rowNum = Number(elmnt.style.gridRow.split('/')[0])

        if ((y1 > height/(24*4*2)) && (rowNum < 24*4)) {
            elmnt.style.gridRow = (rowNum+1) + '/' + (rowNum+2);
            y1 = y1 - height/(24*4);
            

            let startTime = elmnt.dataset.startTime;
            let endTime = elmnt.dataset.endTime;

            let quarterStart = Number(startTime.slice(3)) + 15;
            let quarterEnd = Number(endTime.slice(3)) + 15;


            if (quarterStart !== 60) {
                startTime = startTime.slice(0,3) + quarterStart;
            }
            else {
                let plusOne = Number(startTime.slice(0,2)) + 1;
                if (plusOne < 10) {
                    startTime = '0' + plusOne + ':00';
                }
                else {
                    startTime = plusOne + ':00';
                }
            }

            if (quarterEnd !== 60) {
                if (endTime.slice(0,2) === '24') {
                    endTime = '00:' + quarterEnd;
                }
                else {
                    endTime = endTime.slice(0,3) + quarterEnd;
                }
            }
            else {
                let plusOne = Number(endTime.slice(0,2)) + 1;
                if (plusOne < 10) {
                    endTime = '0' + plusOne + ':00';
                }
                else {
                    endTime = plusOne + ':00';
                }
            }
            
            elmnt.children[0].textContent = startTime + ' - ' + endTime;
            
            let j = newlist.indexOf(`${elmnt.dataset.shortDate}${elmnt.dataset.startTime} ${elmnt.dataset.endTime}`);

            newlist[j] = newlist[j].slice(0,10)+startTime+" "+endTime;

            elmnt.dataset.startTime = startTime;
            elmnt.dataset.endTime = endTime;

            if (rowNum+1 + Number(elmnt.dataset.tempHeight) > 98) {
                let height = elmnt.parentElement.getBoundingClientRect()['height'];
                elmnt.style.height = parseInt(elmnt.style.height, 10) - height/(24*4) + 'px';
                elmnt.dataset.tempHeight = Number(elmnt.dataset.tempHeight) - 1;
            }

        }
        else if ((y1 < -height/(24*4*2)) && (rowNum > 1)) {
            elmnt.style.gridRow = (rowNum-1) + '/' + (rowNum);
            y1 = y1 + height/(24*4);

            let startTime = elmnt.dataset.startTime;
            let endTime = elmnt.dataset.endTime;

            let quarterStart = Number(startTime.slice(3)) - 15;
            if (quarterStart === 0) {
                quarterStart = '00';
            }
            let quarterEnd = Number(endTime.slice(3)) - 15;
            if (quarterEnd === 0) {
                quarterEnd = '00';
            }

            if (quarterStart !== -15) {
                startTime = startTime.slice(0,3) + quarterStart;
            }
            else {
                let minusOne = Number(startTime.slice(0,2)) - 1;
                if (minusOne < 10) {
                    startTime = '0' + minusOne + ':45';
                }
                else {
                    startTime = minusOne + ':45';
                }
            }

            if (quarterEnd !== -15) {
                endTime = endTime.slice(0,3) + quarterEnd;
                if (endTime === '00:00') {
                    endTime = '24:00'
                }
            }
            else {
                let minusOne = Number(endTime.slice(0,2)) - 1;
                if (minusOne < 10) {
                    endTime = '0' + minusOne + ':45';
                }
                else {
                    endTime = minusOne + ':45';
                }
            }
            
            elmnt.children[0].textContent = startTime + ' - ' + endTime;
            
            let k = newlist.indexOf(`${elmnt.dataset.shortDate}${elmnt.dataset.startTime} ${elmnt.dataset.endTime}`);

            newlist[k] = newlist[k].slice(0,10)+startTime+" "+endTime;

            elmnt.dataset.startTime = startTime;
            elmnt.dataset.endTime = endTime;

            if ((rowNum-1 + Number(elmnt.dataset.tempHeight) <= 98) && (Number(elmnt.dataset.tempHeight) < Number(elmnt.dataset.height))) {
                let height = elmnt.parentElement.getBoundingClientRect()['height'];
                elmnt.style.height = parseInt(elmnt.style.height, 10) + height/(24*4) + 'px';
                elmnt.dataset.tempHeight = Number(elmnt.dataset.tempHeight) + 1;
            }
        }

    }

    function closeDragElement(e) {
        document.body.style.cursor = "auto";
        e.target.style.cursor = "grab"
        document.querySelector('.grabbing').classList.remove('grabbing');
        x1 = 0;
        y1 = 0;
        document.onmouseup = null;
        document.onmousemove = null;
    }
    }


// document.querySelector(".selectors-sel select:first-child").addEventListener("input",function (){
//     switch(this.value){
//         case "reserve":
//             if(this.nextElementSibling.classList.contains("notselected")){
//                 this.nextElementSibling.classList.remove("notselected");
//                 this.nextElementSibling.nextElementSibling.classList.add("notselected");
//                 break;
//             }
//             else{
//                 this.nextElementSibling.classList.add("notselected");
//                 break;
//             }

//         case "scrim":
//             if(this.nextElementSibling.nextElementSibling.classList.contains("notselected")){
//                 this.nextElementSibling.nextElementSibling.classList.remove("notselected");
//                 this.nextElementSibling.classList.add("notselected");
//                 break;
//             }
//             else{
//                 this.nextElementSibling.nextElementSibling.classList.add("notselected");
//                 break;
//             }
//     }
// })
document.querySelector(".selb1").onclick = () => {
    
    const allOptions = document.querySelectorAll('.option')
    
    const lista = []

    allOptions.forEach( (el) => {
        let dict = {}
        dict['date'] = el.dataset.shortDate
        dict['startTime'] = el.dataset.startTime
        dict['endTime'] = el.dataset.endTime
        lista.push(dict)
    })
    

    const dataToSend = {"lista":lista};

    if ((lista.length != 0)) {
        const data = { username: 'example' };

        fetch('/time-selection', {
            method: 'POST',
            // mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
    
            body: JSON.stringify(dataToSend) // body data type must match "Content-Type" header
        })
        .then((response) => {
            if (response.ok) {        
                console.log('Written to db')
                // return response.text()
            }
            else {
                alert("HTTP-Error: " + response.status);
            }
        })
        .then((data) => {
            // console.log(data)
            // window.location.href = '/time-selection/'+data;
            window.location.href = '/time-selection/reserve-stadium';

        })}
        else if (lista.length == 0){
            alert("Please select an available tiemslot using the calendar slider..")
        }

}