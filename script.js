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

addMessage("👋 Hola, soy <b>JobBot</b>, tu asistente inteligente de empleo.<br>¿Cómo te llamas?","bot");

}

function sendMessage(){

let input = document.getElementById("input");

let text = input.value;

if(text=="") return;

addMessage(text,"user");

input.value="";

if(step==0){

userData.name = text;

addMessage("Mucho gusto <b>"+text+"</b> 😊<br>¿Qué carrera estudiaste?","bot");

step++;

}

else if(step==1){

userData.career = text;

addMessage("Perfecto.<br>¿Cuántos años de experiencia tienes?","bot");

step++;

}

else if(step==2){

userData.exp = text;

addMessage("🔎 Buscando vacantes reales para <b>"+userData.career+"</b>...","bot");

searchJobs(userData.career);

step++;

}

else if(step==3){

if(text.toLowerCase().includes("si")){

addMessage("Perfecto 👍<br>Puedes subir tu CV abajo y te daré una evaluación como reclutador.","bot");

}

else{

addMessage("Está bien. Si deseas buscar más vacantes escribe otra carrera.","bot");

step=1;

}

}

}

async function searchJobs(career){

let response = await fetch("https://remotive.com/api/remote-jobs?search="+career);

let data = await response.json();

let jobs = data.jobs.slice(0,5);

addMessage("<b>Encontré estas vacantes:</b>","bot");

jobs.forEach(job => {

addMessage(`
<div class="job">
<b>${job.title}</b><br>
${job.company_name}<br>
<a href="${job.url}" target="_blank">🔗 Ver oferta completa</a>
</div>
`,"bot");

});

addMessage("¿Quieres que analice tu perfil como reclutador profesional? (si / no)","bot");

}
