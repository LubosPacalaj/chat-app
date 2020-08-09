const buttonElement = document.getElementById("send_button");
const inputElement = document.getElementById("chat-message");
const chatBoxMainElement = document.getElementById("messages");

const socket = io();

console.log("socket", socket);

const addMessage = (message, mine = true) => {
  const listItem = document.createElement("li");
  const labelElement = document.createElement("label");
  const messageElement = document.createElement("a");
  const nameElement = document.createElement("a");
  const avatarElement = document.createElement("img");

  if (mine) {
    labelElement.classList.add("message-sent");
    labelElement.classList.add("message");
  } else {
    labelElement.classList.add("message-received");
    labelElement.classList.add("message");
    nameElement.innerHTML = `${message.first_name} ${message.last_name}`;
    listItem.appendChild(avatarElement);
  }

  labelElement.classList.add("message-wrapper");
  nameElement.classList.add("message-name");
  messageElement.classList.add("message-text");

  avatarElement.src = message.avatar;
  messageElement.innerHTML = message.message;

  listItem.appendChild(labelElement);
  labelElement.appendChild(nameElement);
  labelElement.appendChild(messageElement);
  chatBoxMainElement.appendChild(listItem);

  inputElement.value = "";
};

buttonElement.addEventListener("click", e => {
  e.preventDefault();

  const payload = {
    first_name: chance.string({ length: 5, pool: "abcde" }),
    last_name: chance.string({ length: 5, pool: "abcde" }),
    message: inputElement.value,
    avatar: "https://robohash.org/rerumperferendisalias.png?size=50x50&set=set1"
  };

  socket.emit("chat message", payload);
  console.log("SOCKET EMIT chat message", payload);
  addMessage(payload, true);
});

socket.on("chat message", payload => {
  console.log("SOCKET ON message Text", payload);
  addMessage(payload, false);
});

socket.on("user connected", userOnline => {
  console.log(userOnline);
  const onlineUser = document.getElementById("online-user");
  const onlineUserAvatae = document.createElement("p");

  onlineUserAvatae.innerText = "online";
  onlineUser.appendChild(onlineUserAvatae);
  console.log(`user is connected`);
});

socket.on("user disconnected", userOnline => {
  console.log(userOnline);
  const onlineUser = document.getElementById("offline-user");
  const onlineUserAvatae = document.createElement("p");

  onlineUserAvatae.innerText = "offline-user";
  onlineUser.appendChild(onlineUserAvatae);
  console.log("usser disconected");
});
