db.collection("Chats")
  .get()
  .then(function (snapshot) {
    snapshot.forEach((doc) => {
      let message = doc.data();
      console.log(message.message);
    });
  })
  .catch();
