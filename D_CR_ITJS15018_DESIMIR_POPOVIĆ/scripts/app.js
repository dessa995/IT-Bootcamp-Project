import { responsiveAccordian } from "./modules/responsiveStyling.js";
import { Chatroom } from "./modules/classChat.js";
import { ChatUI } from "./modules/ui.js";

let activeUsernameInput = document.getElementById("username-input");
let btnUpdateUser = document.getElementById("username-update-btn");
let user = localStorage.getItem("username");
let messageInput = document.getElementById("message-input");
let btnMessageSend = document.getElementById("message-send-btn");

let navButtons = document.querySelectorAll(".nav-buttons");

let ul = document.getElementById("message-board-ul");
let chatUI = new ChatUI(ul);
let lastRoom = localStorage.getItem("room");

if (lastRoom) {
  lastRoom = localStorage.getItem("room");
} else {
  lastRoom = "#general";
}

let chatroom = new Chatroom(lastRoom, user);

// username update

btnUpdateUser.addEventListener("click", function (e) {
  let usernameInputValue = activeUsernameInput.value;
  chatroom.username = activeUsernameInput.value;
  user = activeUsernameInput.value;
  localStorage.setItem("username", chatroom.username);
  activeUsernameInput.value = "";
  // Write Username on screen
  let showUsernameDiv = document.getElementById("show-username-div");
  showUsernameDiv.innerHTML = `<p class="show-username-p"> ${chatroom.username} </p>`;
  setTimeout(() => {
    showUsernameDiv.innerHTML = "";
    // document.location.reload();
  }, 3000);

  chatroom.updateUsername(usernameInputValue);
  chatUI.clearUl();
  chatroom.getChats((data) => {
    chatUI.templateLi(data);
  });

  if (
    usernameInputValue.trim() == "" ||
    usernameInputValue.length < 1 ||
    usernameInputValue.length > 10 ||
    usernameInputValue.includes(" ") == true
  ) {
    activeUsernameInput.value = "Username invalid";
    activeUsernameInput.style.backgroundColor = "red";
    activeUsernameInput.style.color = "white";
    activeUsernameInput.style.fontWeight = "bold";
    activeUsernameInput.disabled = true;
    btnUpdateUser.disabled = true;
    if (activeUsernameInput.disabled == true) {
      setTimeout(() => {
        activeUsernameInput.disabled = false;
        activeUsernameInput.style.backgroundColor = "white";
        activeUsernameInput.style.fontWeight = "lighter";
        activeUsernameInput.style.color = "black";
        activeUsernameInput.value = "";
        btnUpdateUser.disabled = false;
      }, 2000);
    }
  }
});

/////////////////////////////////////

chatroom.getChats((data) => {
  chatUI.templateLi(data);
});

// send message controls

btnMessageSend.addEventListener("click", function (e) {
  let messageText = messageInput.value;
  e.preventDefault();
  if (messageText.trim() != "") {
    chatroom
      .addChat(messageInput.value)
      .then(() => {
        messageInput.value = ""; // postoji form .reset() koji resetuje celu formu
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    messageInput.value = "Please write a message first";
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

//promenljiva koja hvata u kojoj ste sobi, tj na koje dugme ste kliknuli i upisujemo umesto #js u chatroom creator
navButtons.forEach((button) => {
  if (button.textContent == lastRoom) {
    button.style.backgroundColor = "#100792";
  }
});
navbar.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.tagName == "DIV") {
    //0. oznacavam kliknuto dugme
    navButtons.forEach((button) => {
      if (button == e.target) {
        button.style.backgroundColor = "#100792";
      } else {
        button.style.backgroundColor = "#157aff";
      }
    });
    //1. uzimam ime sobe klikom na vrednost
    let newRoom = e.target.textContent;
    //2. Updateujemm ime sobe na kliknutu vrednost
    chatroom.updateRoom(newRoom);
    //3. izbrisati sve poruke sa ekrana
    chatUI.clearUl();
    //4. prikazi chatove
    chatroom.getChats((data) => {
      chatUI.templateLi(data);
    });
    //5. Setujem u lokalnu memoriju
    localStorage.setItem("room", newRoom);
  }
});

//delete message
ul.addEventListener("click", function (e) {
  let deleteMessage = "Are you sure you want to delete this message?";
  if (e.target.classList == "delete-icon") {
    let firstParent = e.target.parentElement;
    let id = e.target.parentElement.id;
    function getUsername() {
      let childTextContent = "Nije dohvaceno";
      for (let i = 0; i < firstParent.children.length; i++) {
        let child = firstParent.children[i];
        // console.log(child.tagName);
        if (child.tagName == "SPAN") {
          if (child.classList == "username-message-display") {
            childTextContent = child.textContent;
          }
        }
        return childTextContent;
      }
    }
    let messageUser = getUsername();
    console.log(messageUser);

    if (chatroom.username == user && messageUser == user) {
      if (confirm(deleteMessage) == true) {
        firstParent.parentElement.remove();
        chatroom.chats
          .doc(id)
          .get()
          .then(() => {
            chatroom.chats
              .doc(id)
              .delete()
              .then(() => {
                alert("Message successfully deleted!");
              });
          })
          .catch((e) => {
            console.log("Message not deleted: " + e);
          });
      }
    } else {
      if (confirm(deleteMessage) == true) {
        firstParent.parentElement.remove();
      }
    }
  }
});

//change color

let colorPicker = document.getElementById("color-picker");
let btnColor = document.getElementById("color-update-btn");
let backColor = localStorage.getItem("color");
console.log(backColor);
function bodyColor() {
  if (backColor) {
    document.body.style.backgroundColor = backColor;
  } else {
    document.body.style.backgroundColor = "#fff";
  }
}

bodyColor();

btnColor.addEventListener("click", function () {
  let colorValue = colorPicker.value;
  backColor = colorValue;
  localStorage.setItem("color", colorValue);
  setTimeout(() => {
    bodyColor();
  }, 500);
});

// za responsive
responsiveAccordian();
