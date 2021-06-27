
//Loads date as todays date!
function  loadTodaysDate() {
    //Getting Today's date!
    let todays_date = new Date();
    let todays_day = todays_date.getDate();
    let todays_month = todays_date.getMonth() + 1;
    let todays_year = todays_date.getFullYear();
    let todays_string = todays_day.toString() + "/" + todays_month.toString() + "/" + todays_year.toString();
    console.log(todays_string)
    let day_of_week = todays_date.toString().slice(0,3);
    console.log(day_of_week);

    //Set Today's date!
    let todays_date_element = document.getElementById("todays_date");
    todays_date_element.innerHTML = todays_string;
    let todays_day_element = document.getElementById("todays_day");
    todays_day_element.innerHTML = day_of_week;
}

loadTodaysDate();


//Loads question prompts:
const question_prompts = ["What's something you're grateful for?", "What are you looking forward to doing?", "How was your day?"]
function loadNextQuestionPrompt() {
    let question_prompt_element = document.getElementById("prompt-question");
    let current_question = question_prompt_element.innerHTML;

    let index = 0;
    for (question of question_prompts) {
        if (current_question === question) {
            index = question_prompts.indexOf(question);
        }
    }
    console.log("Current question index: " + index);
    index ++;
    if (index >= question_prompts.length) {
        index = 0;
    }

    question_prompt_element.innerHTML = question_prompts[index];
}

function loadNextQuestionPrompt(arrow_value) {
    let question_prompt_element = document.getElementById("prompt-question");
    question_prompt_element.style.transitionDuration = "1s";
    let current_question = question_prompt_element.innerHTML;

    let index = 0;
    for (question of question_prompts) {
        if (current_question === question) {
            index = question_prompts.indexOf(question);
        }
    }
    console.log("Current question index: " + index);
    index += arrow_value;
    if (index >= question_prompts.length) {
        index = 0;
    }
    if (index < 0) {
        index = question_prompts.length - 1;
    }

    //Fade in and out question prompt:
    question_prompt_element.style.opacity = "0";
    console.log("Making invisible");
    setTimeout(function() {
    question_prompt_element.innerHTML = question_prompts[index];
    question_prompt_element.style.opacity = "1";
    }, 500);
    console.log("Making Visible")
}


//Loads Calendar of the current month:
const lst_of_days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
function loadCalendar() {
    let todays_date = new Date();
    let todays_month = todays_date.getMonth();
    let todays_year = todays_date.getFullYear();
    let first_day_of_current_month = new Date(todays_year, todays_month, 1, 12);
    let first_dow_current_month = first_day_of_current_month.toString().slice(0, 3);
    let last_day_of_month = new Date(todays_year, todays_month + 1, 0);
    let total_number_of_days_in_current_month = last_day_of_month.getDate();

    let first_day_of_month_index = lst_of_days.indexOf(first_dow_current_month);
    let number_of_days_invis_first = first_day_of_month_index;


    //Start making days invisible:
    let day_elements = document.getElementsByClassName("day");
    let day_dates = document.getElementsByClassName("day-date");
    //Invis first row days and add day number
    let day_number = 1;
    for (let i=0; i < day_elements.length; i++) {
        if (day_number > total_number_of_days_in_current_month) {
            break;
        }
        if (i < number_of_days_invis_first) {
            continue;
        } else {
            day_dates[i].innerHTML = day_number;
            day_elements[i].classList.add("show")
            day_number += 1;
        }
    }
}

loadCalendar();


//Select Mood:
function selectMood(current) {
    //Clear all current borders!
    let mood_buttons = document.getElementsByClassName('mood-option');
    let current_mood_button = current;
    for (mood_button of mood_buttons) {
        mood_button.classList.remove("selected-mood");
    }
    current_mood_button.classList.add("selected-mood");
}

//Send Entry:
function sendEntry() {
    //Log current values:
    let selected_mood = document.getElementsByClassName("selected-mood")[0];
    //Check if theres a mood selected:
    if (!selected_mood) {
        alert("Please pick a mood.");
        return;
    }
    let selected_mood_value = selected_mood.getAttribute("value");

    let current_entry = document.getElementById("journal-entry");
    let current_entry_text = current_entry.value;
    //Check if theres an entry written:
    if (!current_entry_text) {
        alert("Please write something.");
        return;
    }

    //Get Data
    let question_prompt = document.getElementById("prompt-question");
    let question_prompt_text = question_prompt.innerHTML;
    let date = document.getElementById("todays_date");
    let date_text = date.innerHTML;

    console.log(selected_mood_value);
    console.log(current_entry_text);
    console.log(question_prompt_text);
    console.log(date_text);

    //Send to Sheets:
    fetch("https://api.apispreadsheets.com/data/14737/", {
    	method: "POST",
    	body: JSON.stringify({"data": {"date":date_text,"mood_value":selected_mood_value,"post_entry":current_entry_text,"question_general":question_prompt_text}}),
    }).then(res =>{
    	if (res.status === 201){
    		// SUCCESS
    		console.log("Entry Saved!");
            alert("Entry saved!");
    	}
    	else{
    		// ERROR
    		console.log("Entry didn't save!");
    	    alert("Something went wrong! Please try again.")
    	    return;
    	}
    })


    //Empty values:
    selected_mood.classList.remove("selected-mood");
    current_entry.value = "";

    setTimeout(function() {
        loadCalendarWithData();
        console.log("Updated Calendar!");
    }, 1000);
    return;
}



//Load Calendar with existing entries:

//Google Sheets ID: 19ro2IJAtyFVoiTGv1iF4oKCxLq7SiuZdpPZOQ4iBDe4
//Google Sheets API Key: 74a97099bf60e6c6e1aefd4f965e0515b4bcac8a
//API Url: https://api.apispreadsheets.com/data/14731/
mood_colours = ["#54478c", "#048ba8", "#0db39e", "#16db93", "#83e377", "#b9e769"];

function loadCalendarWithData() {
    //Fetch Google sheets data:
    fetch("https://api.apispreadsheets.com/data/14737/").then(res=>{
    	if (res.status === 200){
    		// SUCCESS
    		res.json().then(data=>{
    			const yourData = data
                console.log(yourData);
                let date_elements = document.getElementsByClassName("day");
                for (entry of yourData["data"]) {
                    let entry_day = entry["date"].slice(0,2);
                    if (entry_day[0] == "0") {
                        entry_day = entry_day.slice(1,2);
                    }
                    let entry_color = parseInt(entry["mood_value"]);
                    console.log(entry_color);
                        for (day_element of date_elements) {
                            if (day_element.getElementsByClassName("day-date")[0].innerHTML == entry_day) {
                                day_element.getElementsByClassName("day-mood")[0].style.backgroundColor = mood_colours[entry_color / 20];
                                day_element.setAttribute("post_entry", entry["post_entry"]);
                                day_element.setAttribute("question_prompt", entry["question_general"]);
                            }
                            else {
                                //day_element.getElementsByClassName("day-mood")[0].style.backgroundColor = "white";
                            }
                        }
                }

    		}).catch(err => console.log(err))
    		console.log("Successfully retrieved calendar data!");
    	}
    	else{
    		// ERROR
    		console.log("Failed in retrieving calendar data!")
    	}
    })
}

loadCalendarWithData();


//Google Sheets JSON: https://spreadsheets.google.com/feeds/cells/19ro2IJAtyFVoiTGv1iF4oKCxLq7SiuZdpPZOQ4iBDe4/1/public/values?alt=json-in-script

//Load Specific Day's Entry:
function loadDay(current_day) {
    console.log(current_day);
    //Change Entry Date:
    let today = new Date();
    let todays_month = today.getMonth() + 1;
    let todays_year = today.getFullYear();
    let todays_date = current_day.getElementsByClassName("day-date")[0].innerHTML;
    let today_string = todays_date + "/" + todays_month + "/" + todays_year
    document.getElementsByClassName("current-day")[0].innerHTML = today_string;

    //Change Mood
    let entry_mood_element = document.getElementsByClassName("current-day-mood")[0];
    let entry_mood_color = current_day.getElementsByClassName("day-mood")[0].style.backgroundColor;
    entry_mood_element.style.backgroundColor = entry_mood_color;

    //Load Entry:
    let entry_box_element = document.getElementsByClassName("current-entry-content")[0];
    entry_box_element.innerHTML = current_day.getAttribute("post_entry");
    console.log(current_day.getAttribute("post_entry"));

    //Load Question:
    let entry_question_prompt = document.getElementsByClassName("current-entry-question-prompt")[0];
    entry_question_prompt.innerHTML = current_day.getAttribute("question_prompt");

}


















