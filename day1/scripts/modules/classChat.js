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

  //pracenje poruka u bazi i ispis dodatih poruka

  getChats(callback) {
    this.chats.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          // console.log(change.doc.data());
          callback(change.doc.data());
        }
      });
    });
  }
}

export { Chatroom };
