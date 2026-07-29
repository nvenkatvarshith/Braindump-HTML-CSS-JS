(
    function loadPage(){
        let currentDate = new Date();
        let grettingTime = document.getElementById("timeofday");
        let grettingMsg = ", let's get Organized"
        if(currentDate.getHours()>20){
            grettingTime.innerHTML = "Good Night! Let's discuss tomorrow";
        }else if(currentDate.getHours() > 18){
            grettingTime.innerHTML = "Good Evening! " + grettingMsg;
        }else if(currentDate.getHours() > 12){
            grettingTime.innerHTML = "Good Afternoon! " + grettingMsg;
        }else{
            grettingTime.innerHTML = "Good Morning! " + grettingMsg;
        }
        document.getElementById("current-date").innerHTML = getFormattedDate(currentDate)
    }
)()

function getFormattedDate(currentDate){
    return `${currentDate.getDate()}-${currentDate.getMonth()+1}-${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
}

function toggleDarkTheme(theme){
    switch(theme){
        case "dark" :
            document.body.style.backgroundColor = '#000';
            document.body.style.color = '#fff';
            document.getElementById("light").classList.remove("hidden");
            document.getElementById("dark").classList.add("hidden");
            break;
        case "light" :
            document.body.style.backgroundColor = '#fff';
            document.body.style.color = '#000';
            document.getElementById("light").classList.add("hidden");
            document.getElementById("dark").classList.remove("hidden");
            break;
        default: 
            console.log("no theme selected!!!");
    }
}

function organizeMyDay(){
    console.log("organization is in progress");
}