import { responsiveAccordian } from "./modules/responsiveStyling.js";
import { Chatroom } from "./modules/classChat.js";
import { ChatUI } from "./modules/ui.js";

let chatroom = new Chatroom("#js");

// chatroom.getChats((data) => {
//   console.log(data);
// });

/////////////////////////////////////

let ul = document.getElementById("message-board-ul");

let chatUI = new ChatUI(ul);

chatroom.getChats((data) => {
  chatUI.templateLi(data);
});

let messageInput = document.getElementById("message-input");
let btnMessageSend = document.getElementById("message-send-btn");

btnMessageSend.addEventListener("click", function (e) {
  let messageText = messageInput.value;
  e.preventDefault();
  if (messageText != "") {
    chatroom
      .addChat(messageInput.value)
      .then(() => {
        messageInput.value = "";
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    messageInput.value = "Ne moze prazna poruka";
    messageInput.style.backgroundColor = "red";
    messageInput.style.color = "white";
    messageInput.style.fontWeight = "bold";
    messageInput.disabled = true;
    btnMessageSend.disabled = true;
    if (messageInput.disabled == true) {
      setTimeout(() => {
        messageInput.disabled = false;
        messageInput.style.backgroundColor = "white";
        messageInput.style.fontWeight = "lighter";
        messageInput.style.color = "black";
        messageInput.value = "";
        btnMessageSend.disabled = false;
      }, 2000);
    }
  }
});

// za responsive
responsiveAccordian();

// chatroom1.getChats((data) => {
//   let li = document.createElement("li");
//   li.textContent = data;
//   ul.innerHTML += chatUI.templateLi(data);
// });
