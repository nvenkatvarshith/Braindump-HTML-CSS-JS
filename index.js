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
        document.getElementById("current-date").innerHTML = getFormattedDate(currentDate);
        let todayTasks = localStorage.getItem("aiResponse");
        if(todayTasks != null){
            showCards(JSON.parse(todayTasks));
        }
    }
)()

const textarea = document.getElementById('todo');

textarea.addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = `${this.scrollHeight}px`;
});


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
    let userSchedule = document.getElementById("todo").value;
    showLoader(true);
    getAIResponse(userSchedule);
}

async function  getAIResponse(userSchedule) {
    const apiKey = 'OPEN-API-KEY';
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    const systemPrompt = `You are an expert productivity assistant. Your job is to take the user's unstructured brain dump and organize it into a structured, highly actionable list of tasks.                           
                            For each extracted task, you must:
                            1. Define a concise, clear task title.
                            2. Estimate the time required to complete it in minutes.
                            3. Assess the required concentration level (Low, Medium, or High).
                            4. Assign a priority (High for urgent/important, Medium for important but not urgent, Low for quick wins, errands, or chores).
                            You must organize the final array so that High priority tasks appear first, followed by Medium, then Low.`;    
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-5.4-nano',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userSchedule }
                ],
                response_format: {
                    type: "json_schema",
                    json_schema: {
                        name: "organized_tasks",
                        strict: true,
                        schema: {
                        type: "object",
                        properties: {
                            tasks: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                title: { 
                                    type: "string" 
                                },
                                estimated_time_minutes: { 
                                    type: "integer" 
                                },
                                concentration_level: { 
                                    type: "string", 
                                    enum: ["Low", "Medium", "High"] 
                                },
                                priority: { 
                                    type: "string", 
                                    enum: ["High", "Medium", "Low"] 
                                }
                                },
                                required: ["title", "estimated_time_minutes", "concentration_level", "priority"],
                                additionalProperties: false
                            }
                            }
                        },
                        required: ["tasks"],
                        additionalProperties: false
                        }
                    }
                }
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const parsedData = JSON.parse(data.choices[0].message.content);
        console.log(parsedData.tasks);
        localStorage.setItem("aiResponse",JSON.stringify(parsedData.tasks));
        showCards(parsedData.tasks);
        
    }catch(error){
        console.log(error);
    }
    return null;
}

function showLoader(loading){
    if(loading){
        document.getElementById("loader").classList.remove("hidden");
    }else{
        document.getElementById("loader").classList.add("hidden");
    }
}

function getCard(activity){
    return `
            <div class="activity">
                <h4>Title: <span>${activity.title}</span></h4>
                <h4>Estimated Time in Minutes: <span>${activity.estimated_time_minutes}</span></h4>
                <h4>Concentration level: <span>${activity.concentration_level}</span></h4>
                <h4>Priority: <span>${activity.priority}</span></h4>
            </div>
        `;
}

function showCards(activities){
    let highActivity = '';
        let mediumActivity = '';
        let lowActivity = '';
        activities.forEach(function(activity){
            if(activity.priority == 'High'){
                highActivity += getCard(activity);
            }else if(activity.priority == 'Medium'){
                mediumActivity += getCard(activity);
            }else{
                lowActivity += getCard(activity);
            }
        });
        document.getElementById("todo").value = "";
        showLoader(false);
        const str = `
            <div id="activity-high">
                <h3>🔴 High Priority / Do Today</h3>
                ${highActivity}
            </div>
            <div id="activity-medium">
                <h3>🟡 Medium / Schedule</h3>
                ${mediumActivity}
            </div>
            <div id="activity-low">
                <h3>🟢 Low / Quick Wins</h3>
                ${lowActivity}
            </div>
        `;
        document.getElementById("activities").innerHTML = str;
}

function clearResponse(){
    localStorage.removeItem("aiResponse");
    window.location.href= "/";
}