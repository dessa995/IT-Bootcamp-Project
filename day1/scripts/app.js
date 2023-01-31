import { responsiveAccordian } from "./modules/responsiveStyling.js";
import { Chatroom } from "./modules/classChat.js";
import { ChatUI } from "./modules/ui.js";

let chatroom1 = new Chatroom("#js", "Stefan");
console.log(chatroom1.username, chatroom1.room);
chatroom1.getChats((data) => {
  console.log(data);
});

let ul = document.getElementById("message-board-ul");

let chatUI1 = new ChatUI(ul);
console.log(chatUI1.list);

// chatroom1.getChats((data) => {
//   let li = document.createElement("li");
//   li.textContent = data;
//   ul.innerHTML += chatUI1.templateLi(data);
// });

chatroom1.getChats((data) => {
  chatUI1.templateLi(data);
});

// za responsive
responsiveAccordian();
