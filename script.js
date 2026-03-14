let step = 0;
let userData = {};

function addMessage(text, type){

let chat = document.getElementById("chat");

let message = document.createElement("div");

message.className = type;

message.innerText = text;

chat.appendChild(message);

chat.scrollTop = chat.scrollHeight;

}

addMessage("Hola 👋 Soy JobBot. ¿Cómo te llamas?", "bot");

function sendMessage(){

let input = document.getElementById("input");

let text = input.value;

addMessage(text,"user");

input.value="";

if(step==0){

userData.name = text;

addMessage("Mucho gusto "+text+" 😊 ¿Qué carrera estudiaste?","bot");

step++;

}

else if(step==1){

userData.career = text;

addMessage("¿Cuántos años de experiencia tienes?","bot");

step++;

}

else if(step==2){

userData.exp = text;

addMessage("Perfecto. Estoy buscando trabajos para "+userData.career+"...","bot");

searchJobs(userData.career);

step++;

}

}

async function searchJobs(career){

let response = await fetch("https://remotive.com/api/remote-jobs");

let data = await response.json();

let jobs = data.jobs.slice(0,5);

addMessage("Encontré estas vacantes:","bot");

jobs.forEach(job => {

addMessage(job.title+" - "+job.company_name,"bot");

});

}
