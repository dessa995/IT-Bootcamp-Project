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

  templateLi(data) {
    let content = `
    <div class="row">
    <li class="message-display col-9">
    <span class="username-message-display">${data.username}: </span>
    <p class="message-text-content">${data.message}</p>
    <span class="message-time-display">${data.createdAt
      .toDate()
      .toDateString()}</span>
    </li>
    <span class="col-3 empty">&nbsp</span>
    </div>
    `;

    this.list.innerHTML += content;
  }
}

export { ChatUI };
