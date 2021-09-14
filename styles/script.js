const assets = [
  {
    id: 1,
    name: "batu",
    imageUrl: "assets/game/batu.png",
  },
  {
    id: 2,
    name: "kertas",
    imageUrl: "assets/game/kertas.png",
  },
  {
    id: 3,
    name: "gunting",
    imageUrl: "assets/game/gunting.png",
  },
];

const gameSection = document.getElementById("theGame");
const player = gameSection.querySelector(".player");
const computer = gameSection.querySelector(".computer");
const result = gameSection.querySelector(".result");
const refresh = document.getElementById("refresh");

const generateChoice = (user) => {
  const title = document.createElement("span");
  title.append(document.createTextNode(user.getAttribute("id")));
  user.append(title);
  assets.forEach((item) => {
    const choice = document.createElement("div");
    choice.setAttribute(
      "class",
      `${item.name} choice d-flex align-items-center justify-content-center`
    );
    const img = document.createElement("img");
    img.setAttribute("src", item.imageUrl);
    choice.append(img);
    user.append(choice);
  });
};

const getResult = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) return "draw";
  if (playerChoice === "batu")
    return computerChoice === "kertas" ? "COM WIN" : "Player win";
  if (playerChoice === "kertas")
    return computerChoice === "gunting" ? "com win" : "player win";
  if (playerChoice === "gunting")
    return computerChoice === "batu" ? "com win" : "player win";
};

const getComputerChoice = () => {
  const number = Math.round(Math.random() * 2 + 1);
  if (number === 1) return "batu";
  if (number === 2) return "kertas";
  if (number === 3) return "gunting";
};

const removeEvent = () => {
  const refreshNote = document.querySelector("span#refreshNote");
  const computerChoice = computer.querySelectorAll(".choice");
  let i = 0;
  playerChoice.forEach((item) => {
    item.classList.add("removeEvent");
    computerChoice[i++].classList.add("removeEvent");
  });
  refreshNote.append(document.createTextNode("Reload page to play again !"));
  refreshNote.style.color = "white";
};

generateChoice(player);
generateChoice(computer);

const playerChoice = player.querySelectorAll(".choice");
playerChoice.forEach((item) => {
  item.addEventListener("click", () => {
    const comp = getComputerChoice();
    const compLocation = computer.querySelector(`div .${comp}`);

    compLocation.classList.add("choiced");
    item.classList.add("choiced");

    removeEvent();

    result.classList.add("gameResult");
    const hasil = getResult(item.classList[0], comp);
    result.innerHTML = hasil;
  });
});

refresh.addEventListener("click", () => {
  window.location.reload();
});
