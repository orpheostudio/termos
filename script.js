const messagesContainer = document.getElementById("messages");
const inputField = document.getElementById("input");
const sendButton = document.getElementById("send");
const menuToggle = document.getElementById("menu-toggle");
const chatMenu = document.getElementById("chat-menu");
let username = "Você";
let botName = "Sofia 🤖";
let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

// --- Menu ---
menuToggle.addEventListener("click", () => { 
  chatMenu.style.display = chatMenu.style.display === 'flex' ? 'none' : 'flex'; 
});

function exportChat(){ alert("Chat exportado!"); }
function deleteChat(){ messagesContainer.innerHTML=''; reminders=[]; localStorage.setItem("reminders", JSON.stringify(reminders)); }
function saveChat(){ alert("Chat salvo!"); }
function shareChat(){ alert("Link compartilhado!"); }
function createReminderPrompt(){ 
  const r=prompt("Digite o lembrete:"); 
  if(r){ addMessage(`✅ Lembrete criado: ${r}`,"bot"); reminders.push(r); localStorage.setItem("reminders", JSON.stringify(reminders)); }
}
function createEventPrompt(){ 
  const e=prompt("Digite o evento:"); 
  if(e){ addMessage(`📅 Evento criado: ${e}`,"bot"); }
}
function renameUser(){ const u=prompt("Digite seu nome:"); if(u) username = u; }
function renameBot(){ const b=prompt("Digite o nome do bot:"); if(b){ botName = b; document.getElementById("bot-name").textContent = botName; }}

// --- Chat ---
function getCurrentTime(){ return new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}); }
function addMessage(text,sender){
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  const avatar = `<div class="avatar">${sender==='user'?'U':'B'}</div>`;
  const content = `<div class="msg-content">${text}<div class="timestamp">${getCurrentTime()}</div></div>`;
  messageDiv.innerHTML = avatar + content;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator(){
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("message","bot","typing-indicator");
  typingDiv.innerHTML = `<div class="avatar">B</div><div class="msg-content"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  return typingDiv;
}

// --- Bot Responses ---
function getBotResponse(text){
  text = text.toLowerCase();
  if(/oi|olá|e aí|opa/i.test(text)) return ["Olá! Como posso ajudar hoje?","Oi! No que posso ser útil?","E aí! Tudo bem?"][Math.floor(Math.random()*3)];
  if(/como você está|tudo bem|tudo certo/i.test(text)) return ["Estou ótima! ⚡","Tudo ótimo por aqui.","Estou a todo vapor!"][Math.floor(Math.random()*3)];
  if(/qual o seu nome|quem é você/i.test(text)) return [`Eu sou ${botName}, seu assistente pessoal.`];
  if(/tchau|até mais|adeus/i.test(text)) return ["Até logo! 👋","Tchau! Se precisar de mim, é só chamar.","Até a próxima!"][Math.floor(Math.random()*3)];
  if(/obrigado|valeu|vlw/i.test(text)) return ["De nada! 😉","Disponha!","Qualquer coisa, estou por aqui."][Math.floor(Math.random()*3)];
  if(/que horas são/i.test(text)) return `⏰ Agora são ${new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}`;
  if(/que dia é hoje|qual a data/i.test(text)) return `📅 Hoje é ${new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'})}`;
  if(/piada/i.test(text)) return ["O que o pato disse para a pata? R: Vem quá!","Por que a velhinha não usa relógio? R: Porque ela é uma senhora.","Qual é o cúmulo da rapidez? R: Sair de uma briga antes do primeiro soco."][Math.floor(Math.random()*3)];
  if(/random|mensagem aleatória/i.test(text)) return ["✨ Hoje é um ótimo dia!","🌟 Pequenas vitórias contam!","🚀 Vamos conquistar seus objetivos!"][Math.floor(Math.random()*3)];
  return "🤔 Não entendi muito bem. Pode reformular?";
}

function handleSend(){
  const userText = inputField.value.trim();
  if(!userText) return;
  addMessage(userText,"user");
  inputField.value="";
  const typing = showTypingIndicator();
  setTimeout(()=>{
    messagesContainer.removeChild(typing);
    const response = getBotResponse(userText);
    addMessage(response,"bot");
  }, 1000 + Math.random()*800);
}

sendButton.addEventListener("click",handleSend);
inputField.addEventListener("keypress",(e)=>{ if(e.key==="Enter") handleSend(); });

// --- Mensagem inicial ---
setTimeout(()=>{ addMessage(`Olá! Eu sou ${botName}, sua assistente pessoal. Como posso ajudar hoje?`,"bot"); },500);
