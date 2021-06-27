
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const result = document.getElementById("resultContainer");
const mood = document.getElementById("mood");

var rHolder = [];
const suicide = "Suicide hotline: 1800-221 4444";
const depression = "Depression hotline: 6389-2222"; //this is IMH hotline
const anger = "Anger-management hotline: 91348146";
const chat = "CHAT hotline: 64936500";


// create our questions

let questions = [
    {
        question : "A friend calls you and wants to chat. What do you do?",
        choiceA : "Ignore the call",
        choiceB : "Answer the call and talk for hours!",
        choiceC : "Answer and don't say much",
        choiceD : "Answer and begin ranting about your problems"
    },{
      question : "The sun is shining and the temperature is just right. What are you going to do?",
      choiceA : "The same repetitive thing I do everyday",
      choiceB : "I'm not sure - just waiting for someone to ruin my day",
      choiceC : "Sing my favourite songs",
      choiceD : "Burrow in my bed and binge a Netflix series by myself"

    },{
      question : "It's another Monday morning, and you have to work. What do you do?",
      choiceA : "Come in early and excited!",
      choiceB : "Call in sick",
      choiceC : "Think about quitting",
      choiceD : "Go in late"

    },{
      question : "If you could have anything you wanted, you would:",
      choiceA : "Sleep",
      choiceB : "Give retribution to those who have wronged you",
      choiceC : "Go on a long walk alone",
      choiceD : "Buy all your friends and family a present"
    }
];

const lastQuestion = questions.length - 1;

let runningQuestion = 0;

function renderQuestion(){
    let q = questions[runningQuestion];
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
}

start.addEventListener("click", startQuiz);


function checkAnswer(answer){
    rHolder.push(answer);
    console.log(rHolder);
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    } else{
        // end the quiz and show the score
        returnResults(rHolder);
        rHolder.splice(0,4);
        console.log("this is end " + rHolder);
    }
}

function mode(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

function getMood(rh){
    var ls = [];
    if (rh[0] == 'A'){
      ls[0] = 1;
    } else if (rh[0] == 'B') {
      ls[0] = 2;
    } else if (rh[0] == 'C') {
      ls[0] = 4;
    } else {
      ls[0] = 3;
    }

    if (rh[1] == 'A'){
      ls[1] = 4;
    } else if (rh[1] == 'B') {
      ls[1] = 3;
    } else if (rh[1] == 'C') {
      ls[1] = 2;
    } else {
      ls[1] = 1;
    }

    if (rh[2] == 'A'){
      ls[2] = 2;
    } else if (rh[2] == 'B') {
      ls[2] = 1;
    } else if (rh[2] == 'C') {
      ls[2] = 3;
    } else {
      ls[2] = 4;
    }

    if (rh[3] == 'A'){
      ls[3] = 4;
    } else if (rh[3] == 'B') {
      ls[3] = 3;
    } else if (rh[3] == 'C') {
      ls[3] = 1;
    } else {
      ls[3] = 2;
    }
    console.log(ls);

    let m = mode(ls);
    let mood = "";
    let hotline = "";
    if (m == 1 || m == undefined) {
      mood = "Lonely";
      hotline = suicide + "<br>" + chat;
    } else if (m == 2) {
      mood = "Happy";
      hotline = "There's none! You are doing well!";
    } else if (m == 3) {
      mood = "Angry";
      hotline = anger + "<br>" + chat;
    } else if (m == 4) {
      mood = "Sad";
      hotline = depression + "<br>" + chat;
    } else {
      mood = "Lonely";
      hotline = suicide + "<br>" + chat;
    }
    console.log(mood);
    var ans = [mood, hotline];
    return ans;
}

//return results
function returnResults(rh){
  quiz.style.display = "none";
  result.style.display = "block";
  var mo = getMood(rh)[0];
  var h = getMood(rh)[1];
  console.log("this is m" + mo);
  console.log(h);
  mood.innerHTML = "You are feeling " + mo + "<br><br>Here are some hotlines that might help: <br><br>" + h;
}


// function apiHandler() {
//   fetch("https://api.apispreadsheets.com/data/14710/", {
//   	method: "POST",
//   	body: JSON.stringify({"data": {"Timestamp":"26/06/2021 17:56:24","A friend calls you and wants to chat. What do you do?":"Ignore the call","The sun is shining and the temperature is just right. What are you going to do?":"I'm not sure - just waiting for someone to ruin my day","It's another Monday morning, and you have to work. What do you do?":"Think about quitting","If you could have anything you wanted, you would:":"Give retribution of those who have wronged you"}}),
//   }).then(res =>{
//   	if (res.status === 201){
//   		// SUCCESS
//   	}
//   	else{
//   		// ERROR
//   	}
//   })
// }
//
//
// function SubForm(x){
// 			$.ajax({
// 				url:"https://api.apispreadsheets.com/data/14729/",
// 				type:"post",
// 				data:$(x).serializeArray(),
// 				success: function(){
// 					alert("Form Data Submitted :)")
// 				},
// 				error: function(){
// 					alert("There was an error :(")
// 				}
// 			});
// 		}
