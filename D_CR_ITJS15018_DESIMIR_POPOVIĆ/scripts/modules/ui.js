class ChatUI {
  constructor(l) {
    this.list = l;
  }

  //getters

  get list() {
    return this._list;
  }

  //setters

  set list(l) {
    this._list = l;
  }

  templateLi(doc) {
    let data = doc.data();
    if (data.username == localStorage.username) {
      let content = `
      <div class="row userRow">
      <li class="message-display col-9 userMessage" id="${doc.id}">
      <span class="username-message-display">${data.username}</span>
      <span class="message-text-content"><span class="dots">:</span> ${
        data.message
      }</span>
      <div class="message-time-display">
      ${this.formTime(data)} 
      </div>
      <span class="delete-icon">&#128465</span>
      </li>
      <span class="col-3 empty">&nbsp</span>
      </div>
      `;
      this.list.innerHTML += content;
    } else {
      let content = `
      <div class="row nonUserRow">
      <li class="message-display col-9 nonUserMEssage" id="${doc.id}">
      <span class="username-message-display">${data.username}</span>
      <span class="message-text-content"><span class="dots">:</span> ${
        data.message
      }</span>
      <div class="message-time-display">
      ${this.formTime(data)}
      </div>
      <span class="delete-icon">&#128465</span>
      
      </li>
      <span class="col-3 empty">&nbsp</span>
      </div>
      `;
      this.list.innerHTML += content;
    }
  }

  // deleteMessage(data) {
  //   if (data.username == localStorage.username) {
  //     this.list.innerHTML -= content;
  //   }
  // }

  formTime(doc) {
    let timeNow = new Date();
    let timeNowDay = timeNow.getDate();
    let date = doc.createdAt.toDate();
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    let h = date.getHours();
    let min = date.getMinutes();

    d = String(d).padStart(2, "0");
    m = String(m).padStart(2, "0");
    h = String(h).padStart(2, "0");
    min = String(min).padStart(2, "0");

    if (timeNowDay == d) {
      let time = `${h}:${min}`;
      return time;
    } else {
      let time = `${d}.${m}.${y}. - ${h}:${min}`;
      return time;
    }
  }

  clearUl() {
    this.list.innerHTML = "";
  }
}

export { ChatUI };

//${data.createdAt.toDate().toTimeString()}
