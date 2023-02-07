class Chatroom {
  constructor(r, u) {
    this.room = r;
    this.username = u;
    this.chats = db.collection("Chats");
    this.unsub; // bice undefioned prilikom kreiranja objekta
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

  // update sobe

  updateRoom(ur) {
    this.room = ur;
    if (this.unsub) {
      this.unsub();
    }
  }

  getID() {
    return firebase.firestore.FieldPath.documentId();
  }

  set username(u) {
    if (u) {
      if (u.trim().length > 1 && u.trim().length < 11) {
        if (u.includes(" ") == false) {
          this._username = u;
        } else {
          this.username = "Anonymous";
        }
      } else {
        this._username = "Anonymous";
      }
    } else {
      this._username = "Anonymous";
    }
  }

  updateUsername(udateUN) {
    this.userName = udateUN;
    if (this.unsub) {
      this.unsub();
    }
    localStorage.setItem("username", udateUN);
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
    this.unsub = this.chats
      .orderBy("createdAt", "asc")
      .where("room", "==", this.room)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let doc = change.doc;
          let type = change.type;
          if (type == "added") {
            callback(doc);
          }
        });
      });
  }
}

export { Chatroom };
