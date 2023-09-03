// Decalre variables 
var currentTime = document.getElementById("currentTime");
var alarmsArray = [];
let sound = new Audio("./alarm.mp3")
// Display current time
function format(time){
    if(time<10){
        return "0"+time;
    }
    return time;
}

function updateTime(){
    let date = new Date();
    const hours = format(date.getHours());
    const minutes = format(date.getMinutes());
    const seconds = format(date.getSeconds());

    currentTime.innerHTML = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTime,1000);


// Create Alarm
function createAlarm(){
    var hourInput = format(document.getElementById("hourInput").value);
    var minuteInput = format(document.getElementById("minuteInput").value);
    if(hourInput<1){
        hourInput="00";
    }
    if(minuteInput<1){
        minuteInput="00";
    }
    if(hourInput>23 || minuteInput>59){
        alert("Invalid entry!!");
    }else{
        var alarmObj = {};
        alarmObj.hour = hourInput;
        alarmObj.minute = minuteInput;
        alarmObj.index = alarmsArray.length;
        alarmObj.isActive = false;
        alarmsArray.push(alarmObj);
        displayAlarms(alarmsArray);
    }
}

// Display Alarm
function displayAlarms(alarmsArray){
    var alarmObj = alarmsArray[alarmsArray.length-1];
    var alarmIndex = alarmObj.index;
    var alarmDiv = document.createElement("div");
    alarmDiv.classList.add("alarm");
    alarmDiv.setAttribute("id",alarmIndex);
    alarmDiv.innerHTML=`<span>${alarmObj.hour}:${alarmObj.minute}</span>`;
    document.querySelector(".displayAlarms").appendChild(alarmDiv);
    // checkbox
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("click", (e) => {
        var index = e.target.parentElement.getAttribute("id");
        var status = alarmsArray[index].isActive;
        if(status==false){
            alarmsArray[index].isActive=true;
        }else{
            alarmsArray[index].isActive=false;
        }
    });
    alarmDiv.appendChild(checkbox);

    // Delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", (e) => deleteAlarm(e));
    alarmDiv.appendChild(deleteButton);

    alert("Alarm added.Kindly set the alarm using the toggle switch!!!")
}

// Delete Alarm
function deleteAlarm(e){
    let elementToBeDeleted = e.target.parentElement.parentElement.getAttribute("id");
    e.target.parentElement.parentElement.remove();
    alarmsArray.splice(elementToBeDeleted,1);
    for(i=elementToBeDeleted;i<alarmsArray.length;i++){
        alarmsArray[i].index = alarmsArray[i].index-1;
    }
}

// Ring Alarm

setInterval(function ringAlarm(){
    alarmsArray.forEach((element)=>{
        if(element.isActive){
            let date = new Date();
            if(element.hour == format(date.getHours()) && element.minute == format(date.getMinutes())){
                sound.play();
                sound.loop()==true;
            }else{
                sound.loop=false;
            }
        }
    });
},1000);