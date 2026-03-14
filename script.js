let step = 0;
let userData = {};

function addMessage(text,type){

let chat = document.getElementById("chat");

let message = document.createElement("div");

message.className = type;

message.innerHTML = text;

chat.appendChild(message);

chat.scrollTop = chat.scrollHeight;

}

window.onload = function(){

addMessage("Hola 👋 Soy <b>JobBot</b>, tu agente inteligente de empleo.<br>¿Cómo te llamas?","bot");

}

function sendMessage(){

let input = document.getElementById("input");

let text = input.value;

if(text=="") return;

addMessage(text,"user");

input.value="";

if(step==0){

userData.name = text;

addMessage("Encantado <b>"+text+"</b> 😊<br>¿Qué carrera estudiaste?","bot");

step++;

}

else if(step==1){

userData.career = text;

addMessage("Perfecto.<br>¿Cuántos años de experiencia tienes?","bot");

step++;

}

else if(step==2){

userData.exp = text;

addMessage("Buscando vacantes reales para <b>"+userData.career+"</b>... 🔎","bot");

searchJobs(userData.career);

step++;

}

}

async function searchJobs(career){

let response = await fetch("https://remotive.com/api/remote-jobs?search="+career);

let data = await response.json();

let jobs = data.jobs.slice(0,6);

addMessage("<b>Encontré estas vacantes:</b>","bot");

jobs.forEach(job => {

addMessage(
`<a href="${job.url}" target="_blank">
🔗 ${job.title} - ${job.company_name}
</a>`
,"bot");

});

addMessage("¿Quieres subir tu CV para analizarlo como reclutador? 📄","bot");

}
