const candidates = [
    { name: "Candidato 1", proposal: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", image: "https://picsum.photos/seed/candidato1/400/300" },
    { name: "Candidato 2", proposal: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", image: "https://picsum.photos/seed/candidato2/400/300" },
    { name: "Candidato 3", proposal: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", image: "https://picsum.photos/seed/candidato3/400/300" },
    { name: "Candidato 4", proposal: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", image: "https://picsum.photos/seed/candidato4/400/300" },
    { name: "Candidato 5", proposal: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.", image: "https://picsum.photos/seed/candidato5/400/300" },
    { name: "Candidato 6", proposal: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.", image: "https://picsum.photos/seed/candidato6/400/300" }
  ];
  const gridContainer = document.getElementById('candidateGrid');
  candidates.forEach(candidate => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-name', candidate.name);
    card.setAttribute('data-proposal', candidate.proposal);
    card.innerHTML = `
      <img src="${candidate.image}" alt="${candidate.name}">
      <div class="card-content">
        <h3>${candidate.name}</h3>
        <p>${candidate.proposal.substring(0,40)}...</p>
      </div>
    `;
    card.addEventListener('click', () => {
      modalTitle.textContent = candidate.name;
      modalBody.textContent = candidate.proposal;
      modal.style.display = 'flex';
    });
    gridContainer.appendChild(card);
  });
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
  window.addEventListener('click', e => { if(e.target === modal) modal.style.display = 'none'; });
  let currentConversation = { id: Date.now(), messages: [{ sender: "Bot", text: "Hello Coder, welcome to our chat!" }] };
  const chatLog = document.getElementById('chatLog');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = chatInput.value.trim();
    if(!msg) return;
    appendChatMessage("You", msg);
    currentConversation.messages.push({ sender: "You", text: msg });
    chatInput.value = '';
    setTimeout(() => {
      const botMsg = "Thanks for your message. I will respond soon.";
      appendChatMessage("Bot", botMsg);
      currentConversation.messages.push({ sender: "Bot", text: botMsg });
      addHistoryEntry(currentConversation);
      currentConversation = { id: Date.now(), messages: [] };
    }, 1000);
  });
  function appendChatMessage(sender, text) {
    const p = document.createElement('p');
    p.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatLog.appendChild(p);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
  const chatInner = document.getElementById('chatInner');
  function addHistoryEntry(convo) {
    const entry = document.createElement('div');
    entry.className = 'chat-entry';
    if(convo.messages.length > 0){
      entry.innerHTML = `<strong>${convo.messages[0].sender}:</strong> ${convo.messages[0].text.substring(0,30)}...`;
    }
    entry.addEventListener('click', () => {
      modalTitle.textContent = `Conversation`;
      modalBody.innerHTML = "";
      convo.messages.forEach(msg => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${msg.sender}:</strong> ${msg.text}`;
        modalBody.appendChild(p);
      });
      modal.style.display = 'flex';
    });
    chatInner.appendChild(entry);
  }
  let scrollPaused = false;
  const chatHistory = document.getElementById('chatHistory');
  chatHistory.addEventListener('mouseenter', () => { scrollPaused = true; });
  chatHistory.addEventListener('mouseleave', () => { scrollPaused = false; });
  function autoScroll() {
    if(!scrollPaused) {
      chatHistory.scrollTop += 0.5;
      if(chatHistory.scrollTop >= chatInner.offsetHeight - chatHistory.clientHeight){
        chatHistory.scrollTop = 0;
      }
    }
    requestAnimationFrame(autoScroll);
  }
  autoScroll();
  const chatBtn = document.getElementById('chatButton');
  const chatPopup = document.getElementById('chatBox');
  const closeChatPopup = document.getElementById('closeChat');
  chatBtn.addEventListener('click', () => {
    chatPopup.style.display = 'flex';
    chatBtn.style.display = 'none';
  });
  closeChatPopup.addEventListener('click', () => {
    chatPopup.style.display = 'none';
    chatBtn.style.display = 'block';
  });
  const sendBoxChat = document.getElementById('sendBoxChat');
  const boxChatInput = document.getElementById('boxChatInput');
  const chatBodyPopup = document.getElementById('chatBody');
  sendBoxChat.addEventListener('click', () => {
    const msg = boxChatInput.value.trim();
    if(msg) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'chat-box-body-send';
      msgDiv.innerHTML = `<p>${msg}</p><span>${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>`;
      chatBodyPopup.appendChild(msgDiv);
      boxChatInput.value = '';
      chatBodyPopup.scrollTop = chatBodyPopup.scrollHeight;
    }
  });
  