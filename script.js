let nickname = '';
let salaAtual = '';

function entrar() {
  nickname = document.getElementById('nickname').value;
  if (nickname) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('salas').style.display = 'block';
  } else {
    alert('Por favor, escolha um nome.');
  }
}

function entrarSala(sala) {
  salaAtual = sala;
  document.getElementById('salas').style.display = 'none';
  document.getElementById('chat').style.display = 'block';
  document.getElementById('mensagens').innerHTML = `<p>Entrou na sala: ${sala}</p>`;
  // Aqui você pode adicionar a lógica para conectar ao servidor de chat e iniciar a comunicação em vídeo.
}

function enviarMensagem() {
  const msg = document.getElementById('mensagem').value;
  if (msg) {
    document.getElementById('mensagens').innerHTML += `<p><strong>${nickname}:</strong> ${msg}</p>`;
    document.getElementById('mensagem').value = '';
    // Aqui você pode adicionar a lógica para enviar a mensagem para o servidor de chat.
  }
}
