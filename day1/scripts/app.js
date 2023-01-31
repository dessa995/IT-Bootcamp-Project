import { responsiveAccordian } from "./modules/responsiveStyling.js";
import { Chatroom } from "./modules/classChat.js";
import { ChatUI } from "./modules/ui.js";

let chatroom = new Chatroom("#js", "Stefan");

chatroom.getChats((data) => {
  console.log(data);
});

/////////////////////////////////////

let ul = document.getElementById("message-board-ul");

let chatUI = new ChatUI(ul);

chatroom.getChats((data) => {
  chatUI.templateLi(data);
});

let messageInput = document.getElementById("message-input");
let btnMessageSend = document.getElementById("message-send-btn");

btnMessageSend.addEventListener("click", function (e) {
  e.preventDefault();
  chatroom
    .addChat(messageInput.value)
    .then(() => {
      messageInput.value = "";
    })
    .catch((e) => {
      console.log(e);
    });
});

// za responsive
responsiveAccordian();

// chatroom1.getChats((data) => {
//   let li = document.createElement("li");
//   li.textContent = data;
//   ul.innerHTML += chatUI.templateLi(data);
// });
