<template>
  <div class="roomThree">
    <div class="popUpModal" id="popUpModal">
      <div class="closeModal" id="closeModal"></div>
      <div id="modal-content"></div>
    </div>

    <div class="canvas" id="canvas">
      <div id="character">
        <img class="Character_shadow pixelart" src="@/assets/Images/Character_Shadow.png" alt="Shadow" />

        <img class="Character_spritesheet pixelart face-down" id="spriteCharacter" src="@/assets/Images/Character.png" alt="Character" />
      </div>

      <div class="mapItems" id="mapItems">
        <div class="map-item" id="FinalLock">
          <img class="item-img pos-item" src="@/assets/Images/RoomThree/jail-cell-door.png" />
          <div class="hidden">https://raw.githubusercontent.com/staten-island-tech/full-stack-2021-escaperoom/master/src/assets/Images/RoomThree/jail-cell-door.png</div>
          <div class="hidden">FinalLock</div>
          <div class="modal-item" id="final-ans-modal">
            <div class="modal-content">
              <span class="modal_close" @click="closeModal()">&times;</span>
              <p>Room Three Final Puzzle</p>
              <div id="answerCheck"></div>
              <input type="text" id="roomThreeAns" placeholder="Your Answer" />
              <input type="submit" value="Submit" @click="verify()" />
            </div>
          </div>
        </div>

        <div class="map-item" id="Maze">
          <img class="item-img pos-item" src="@/assets/Images/RoomThree/open-window.png" />
          <div class="hidden">https://raw.githubusercontent.com/staten-island-tech/full-stack-2021-escaperoom/master/src/assets/Images/RoomThree/Maze.jpg</div>
          <div class="hidden">Hedge Maze</div>
          <div class="modal-item">
            <div class="modal-content">
              <span class="modal_close" @click="closeModal()">&times;</span>
              <p>Hedge Maze</p>
              <img id="Hedge_Maze" src="@/assets/Images/RoomThree/Maze.jpg" alt="Hedge Maze" />
            </div>
          </div>
        </div>

        <div class="map-item forInventory" id="Torch">
          <img class="item-img pos-item" src="@/assets/Images/RoomThree/torch.png" />
          <div class="hidden">https://raw.githubusercontent.com/staten-island-tech/full-stack-2021-escaperoom/master/src/assets/Images/RoomThree/torch.png</div>
          <div>&#8204;</div>
        </div>

        <div class="map-item forInventory" id="Skull-1">
          <img class="item-img pos-item" src="@/assets/Images/RoomThree/skull.png" />
          <div class="hidden">https://raw.githubusercontent.com/staten-island-tech/full-stack-2021-escaperoom/master/src/assets/Images/RoomThree/T.jpg</div>
          <div>‌</div>
        </div>

        <div class="map-item forInventory" id="Skull-2">
          <img class="item-img pos-item" src="@/assets/Images/RoomThree/skull.png" />
          <div class="hidden">https://raw.githubusercontent.com/staten-island-tech/full-stack-2021-escaperoom/master/src/assets/Images/RoomThree/I.jpg</div>
          <div>‌</div>
        </div>

        <div class="map-item forInventory" id="Skull-3">
          <img class="item-img pos-item" src="@/assets/Images/RoomThree/skull.png" />
          <div class="hidden">https://raw.githubusercontent.com/staten-island-tech/full-stack-2021-escaperoom/master/src/assets/Images/RoomThree/A.jpg</div>
          <div>‌</div>
        </div>

        <div class="map-item forInventory" id="Skull-4">
          <img class="item-img pos-item" src="@/assets/Images/RoomThree/skull.png" />
          <div class="hidden">https://raw.githubusercontent.com/staten-island-tech/full-stack-2021-escaperoom/master/src/assets/Images/RoomThree/H.jpg</div>
          <div>‌</div>
        </div>
      </div>
    </div>

    <div class="inventory" ref="inventory"></div>
  </div>
</template>

<script>
  export default {
    name: "RoomThree",
    emits: ["roomThreeFin"],
    mounted: function() {
      this.addToInventory();

      const sprite = document.getElementById("spriteCharacter");
      const character = document.getElementById("character");
      let screenWidth;
      let screenHeight;

      let x = 0;
      let y = 0;

      //screen size
      const findScreenSize = function() {
        //divide by 6 to put in rem
        //6 bc width of sprite is 6
        screenWidth = window.innerWidth / 16 - 6;
        document.getElementById("canvas").style.width = window.innerWidth / 16 + "rem";
        //8 bc height of sprite is 8
        //plus 8 for inventory
        screenHeight = window.innerHeight / 16 - 14;
        document.getElementById("canvas").style.height = window.innerHeight / 16 + "rem";
        document.getElementById("mapItems").style.height = screenHeight + "rem";
      };

      findScreenSize();
      window.onresize = findScreenSize;

      //animation
      const addAnimation = function() {
        sprite.classList.add("Character_animation");
      };

      const removeAnimation = function() {
        sprite.classList.remove("Character_animation");
      };

      //movement
      const moveUp = function() {
        sprite.classList.add("face-up");
        sprite.classList.remove("face-down", "face-right", "face-left");
        y = y - 1;
      };

      const moveRight = function() {
        sprite.classList.add("face-right");
        sprite.classList.remove("face-down", "face-left", "face-up");
        x = x + 1;
      };

      const moveLeft = function() {
        sprite.classList.add("face-left");
        sprite.classList.remove("face-down", "face-right", "face-up");
        x = x - 1;
      };

      const moveDown = function() {
        sprite.classList.add("face-down");
        sprite.classList.remove("face-right", "face-left", "face-up");
        y = y + 1;
      };

      const updateSpritePosition = function() {
        character.style.left = x + "rem";
        character.style.top = y + "rem";
      };

      //boundaries
      const walls = function() {
        if (x < 0) {
          sprite.classList.remove("Character_animation");
          x = 0;
        } else if (x > screenWidth) {
          sprite.classList.remove("Character_animation");
          x = screenWidth;
        } else if (y < 0) {
          sprite.classList.remove("Character_animation");
          y = 0;
        } else if (y > screenHeight) {
          sprite.classList.remove("Character_animation");
          y = screenHeight;
        }
      };

      //keyboard
      const keyboardAnimate = function(event) {
        if (event.keyCode == "38" || event.keyCode == "87") {
          moveUp();
        } else if (event.keyCode == "39" || event.keyCode == "68") {
          moveRight();
        } else if (event.keyCode == "37" || event.keyCode == "65") {
          moveLeft();
        } else if (event.keyCode == "40" || event.keyCode == "83") {
          moveDown();
        }
        coordinates(event);
      };

      function move(event) {
        addAnimation();
        //animate
        keyboardAnimate(event);
        //check if overboard
        walls();
        updateSpritePosition();
      }
      document.addEventListener("keydown", move);

      //when arrow keys are released, stops animation
      function stop() {
        removeAnimation();
        clearInterval();
      }
      document.addEventListener("keyup", stop);

      const coordinates = function(event) {
        const mapArray = Array.from(document.getElementsByClassName("map-item"));
        const modalArray = Array.from(document.getElementsByClassName("modal-item"));
        let playerCoords = document.getElementById("character").getBoundingClientRect();
        let playerLeft = Math.round(playerCoords.left / 16);
        let playerRight = Math.round(playerCoords.right / 16);
        let playerTop = Math.round(playerCoords.top / 16 + 2);
        let playerBottom = Math.round(playerCoords.bottom / 16);
        mapArray.forEach(function(item) {
          let objectCoords = item.getBoundingClientRect();
          let objectLeft = Math.round(objectCoords.left / 16);
          let objectRight = Math.round(objectCoords.right / 16);
          let objectTop = Math.round(objectCoords.top / 16);
          let objectBottom = Math.round(objectCoords.bottom / 16);
          if (playerRight > objectLeft && playerLeft < objectRight && playerBottom > objectTop && playerTop < objectBottom) {
            item.style.pointerEvents = "all";
            if (event.keyCode == "13") {
              modalArray.forEach(function(item) {
                item.style.display = "none";
              });
              item.children[3].style.display = "block";
            }
          } else {
            item.children[0].style.transform = "scale(1)";
            item.style.pointerEvents = "none";
          }
        });
      };
    },
    methods: {
      nextRoom: function() {
        document.getElementById("final-ans-modal").style.display = "block";
      },
      closeModal: function() {
        const modalCloseArray = Array.from(document.getElementsByClassName("modal-item"));
        modalCloseArray.forEach(function(item) {
          item.style.display = "none";
        });
      },
      verify: function() {
        var answer = document.getElementById("roomThreeAns").value.toUpperCase();
        if (answer == `A.I.T.H.` || `A.I.T.M.` || `ROOMTHREE`) {
          document.getElementById("answerCheck").innerHTML = "";
          document.getElementById("answerCheck").style.color = "green";
          document.getElementById("answerCheck").insertAdjacentHTML("beforeend", `${answer} is Correct :D!`);
          this.$emit("roomThreeFin");
        } else {
          document.getElementById("answerCheck").innerHTML = "";
          document.getElementById("answerCheck").style.color = "red";
          document.getElementById("answerCheck").insertAdjacentHTML("beforeend", `${answer} is incorrect, try again :(`);
        }
      },

      addToInventory: function() {
        //get array of items on map
        const mapItemArray = Array.from(document.getElementsByClassName("forInventory"));
        let inventoryArray = [];
        const inventory = document.querySelector(".inventory");

        //if item on map is selected, add to inventory
        mapItemArray.forEach(function(item) {
          //when img is clicked
          item.addEventListener("click", function() {
            let addedItem = {
              name: item.children[2].textContent,
              img: item.children[1].textContent,
            };
            if (addedItem.img === "https://raw.githubusercontent.com/staten-island-tech/full-stack-2021-escaperoom/master/src/assets/Images/RoomThree/torch.png" || inventoryArray.length >= 1) {
              inventoryArray.push(addedItem);
              inventory.innerHTML = "";
              display();
              item.style.display = "none";
            }
          });
        });

        const display = function() {
          inventoryArray.forEach(function(item) {
            inventory.insertAdjacentHTML(
              "afterbegin",
              `<div class="inventory-item" id="${item.name}" >
          <img class="item-img" src="${item.img}" >
          <div class="hidden">${item.img}</div>
          <div>${item.name}</div>
        </div>`
            );
          });
        };
      },
    },
  };
</script>

<style scoped>
  :root {
    --scale: 6;
  }
  * {
    margin: 0;
    padding: 0;
  }

  html {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }

  body {
    overflow: hidden;
  }

  .roomThree {
    width: 100%;
    height: 100%;
  }

  .canvas {
    padding: 0;
    position: absolute;
    background-color: black;
    background-image: url(https://raw.githubusercontent.com/staten-island-tech/full-stack-2021-escaperoom/master/src/assets/Images/RoomThree/background.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: -1;
  }

  #character {
    width: calc(1rem * var(--scale));
    height: calc(1rem * var(--scale));
    overflow: hidden;
    position: absolute;
    top: 5rem;
    left: 0;
    z-index: 1;
  }

  .Character_spritesheet {
    width: calc(4rem * var(--scale));
    position: absolute;
    left: 0;
  }

  .Character_animation {
    animation: moveSpritesheet 1s steps(4) infinite;
  }

  .Character_shadow {
    position: absolute;
    width: calc(1rem * var(--scale));
    height: calc(1rem * var(--scale));
    left: 0;
  }

  .pixelart {
    image-rendering: pixelated;
  }

  .face-right {
    top: calc(-1rem * var(--scale));
  }
  .face-up {
    top: calc(-2rem * var(--scale));
  }
  .face-left {
    top: calc(-3rem * var(--scale));
  }

  @keyframes moveSpritesheet {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }

  .keypadBtns {
    position: absolute;
    bottom: 3rem;
    display: flex;
    flex-direction: row;
    z-index: 1;
  }

  .mapItems {
    position: relative;
    margin: 3rem;
  }

  .map-item {
    cursor: pointer;
    position: absolute;
    pointer-events: none;
  }

  .popUpModal {
    position: absolute;
    background-color: black;
    height: 5rem;
    width: 5rem;
    display: none;
    color: wheat;
    z-index: 3;
  }

  .closeModal {
    height: 2rem;
    width: 2rem;
    background-color: red;
  }

  #FinalLock {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  /* inventory styling */

  .inventory {
    border: 0.5rem black solid;
    width: calc(30rem);
    height: 6rem;
    margin: auto;
    position: fixed;
    display: flex;
    bottom: 0rem;
    background-color: rgba(23, 65, 19, 0.8);
    left: 25%;
  }

  .inventory-item {
    padding: 1rem;
    border-color: gray;
    cursor: pointer;
  }

  .item-img {
    width: 5rem !important;
    height: 5rem !important;
  }

  .item-img:hover {
    transform: scale(1);
  }

  .flex-row {
    display: flex;
    justify-content: space-around;
  }

  .hidden {
    display: none;
  }

  .modal-item {
    display: none;
    position: fixed; /* Stay in place */
    top: 0;
    left: 0;
    z-index: 3; /* Sit on top */
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 20, 2, 0.9);
  }

  .modal_close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .modal_close:hover,
  .modal_close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  .modal-content {
    background-color: #fefefe;
    margin: 4rem;
    padding: 3rem;
    z-index: 3;
    border-radius: 1rem;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  #Maze {
    position: absolute;
    top: 25%;
    left: 50%;
  }

  #Skull-3 {
    position: absolute;
    bottom: 50%;
    left: 5%;
  }

  #Skull-1 {
    position: absolute;
    top: 40%;
    left: 15%;
  }
  #Torch {
    position: absolute;
    bottom: 20%;
    left: 35%;
  }
  #Skull-2 {
    position: absolute;
    top: 30%;
    right: 25%;
  }
  #Skull-4 {
    position: absolute;
    top: 10%;
    left: 30%;
  }
  #Hedge_Maze {
    width: 75%;
  }
</style>
