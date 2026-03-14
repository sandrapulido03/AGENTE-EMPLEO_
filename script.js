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

addMessage("👋 Hola, soy <b>JobBot</b>, tu asistente de empleo.<br>¿Cómo te llamas?","bot");

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

addMessage("🔎 Buscando vacantes para <b>"+userData.career+"</b>...","bot");

searchJobs(userData.career);

step++;

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

addMessage("Ahora puedes subir tu CV para analizarlo.","bot");

}

document.getElementById("cv").addEventListener("change",function(event){

let file = event.target.files[0];

if(!file){

return;

}

if(file.type !== "application/pdf"){

addMessage("Por favor sube un archivo PDF.","bot");

return;

}

let reader = new FileReader();

reader.onload = function(){

let typedarray = new Uint8Array(this.result);

pdfjsLib.getDocument(typedarray).promise.then(function(pdf){

let textContent = "";

let totalPages = pdf.numPages;

let countPromises = [];

for(let i=1;i<=totalPages;i++){

countPromises.push(

pdf.getPage(i).then(function(page){

return page.getTextContent().then(function(text){

text.items.forEach(function(item){

textContent += item.str + " ";

});

});

})

);

}

Promise.all(countPromises).then(function(){

analyzeCV(textContent);

});

});

};

reader.readAsArrayBuffer(file);

});

function analyzeCV(text){

addMessage("📄 Analizando tu CV como reclutador...","bot");

let skills = [];

if(text.toLowerCase().includes("excel")) skills.push("Excel");
if(text.toLowerCase().includes("python")) skills.push("Python");
if(text.toLowerCase().includes("data")) skills.push("Análisis de datos");
if(text.toLowerCase().includes("logistica")) skills.push("Logística");
if(text.toLowerCase().includes("project")) skills.push("Gestión de proyectos");

if(skills.length==0){

addMessage("No detecté habilidades claras en el CV.","bot");

}

else{

addMessage("Detecté estas habilidades en tu CV: <b>"+skills.join(", ")+"</b>","bot");

addMessage("💡 Consejo: fortalece herramientas analíticas y liderazgo para mejorar tu perfil profesional.","bot");

}

}
