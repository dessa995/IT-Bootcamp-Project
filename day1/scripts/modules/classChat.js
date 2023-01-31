class Chatroom {
  constructor(r, u) {
    this.room = r;
    this.username = u;
    this.chats = db.collection("Chats");
  }

  //getters

  get room() {
    return this._room;
  }

  get username() {
    return this._username;
  }

  // setters

  set room(r) {
    if (r.length > 0) {
      this._room = r;
    } else {
      this._room = "#general";
    }
  }

  set username(u) {
    if (u.length > 1 && u.length < 11) {
      if (u.includes(" ") == false) {
        this._username = u;
      } else {
        alert("Username is not valid");
        this._username = "Anonymous";
      }
    } else {
      alert("Username is not valid");
      this._username = "Anonymous";
    }
  }

  //methods
  async addChat(message) {
    //async cini da je metoda ashinhona
    let time = new Date();
    let docChats = {
      message: message,
      username: this.username,
      room: this.room,
      createdAt: firebase.firestore.Timestamp.fromDate(time),
    };

    let response = await this.chats
      .add(docChats)
      .then(() => {
        console.log("successfully added chat");
      })
      .catch((e) => {
        console.log("An error occured " + e);
      });
    return response;
  }

  getChats(callback) {
    this.chats.orderBy("createdAt", "asc").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        let type = change.type;
        let doc = change.doc;
        if (type == "added") {
          let chat = doc.data();
          console.log("There has been a change in database");
          console.log(chat);
        } else if (type == "removed") {
          // radice nesto kasnije
        }
      });
    });
  }
}

let chatroom1 = new Chatroom("#js", "Stefan");
console.log(chatroom1.username, chatroom1.room);
// let chatroom2 = new Chatroom("#js", "Ste fan");
// console.log(chatroom2.username, chatroom2.room);
// let chatroom3 = new Chatroom("#general", "Djordje");
// chatroom3
//   .addChat("Pozdravite vasu mamu")
//   .then(() => {
//     console.log("successfully added chat");
//   })
//   .catch((e) => {
//     console.log("An error occured " + e);
//   });
