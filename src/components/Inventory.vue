<template>
  <div>
    <div ref="mapItems"></div>
    <div class="inventory" ref="inventory"></div>

    <!-- <div id="mapItems">
      <div @click="push()" class="inventory-item"></div>
    </div>
    <div id="inventoryList" class="inventory">
      <div class="inventory-item"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "inventory",

  // el: "#inventoryList, #mapItems, #app",
  data() {
    return {};
  },

  methods: {
    // displayInventory: function () {
    //   inventoryArray.forEach(function (item) {
    //     inventory.insertAdjacentHTML(
    //       "afterbegin",
    //       `<div class="inventory-item" id="${item.name}" >
    //       <img class="item-img" src="${item.img}" >
    //       <div class="hidden">${item.img}</div>
    //       <div>${item.name}</div>
    //     </div>`
    //     );
    //   });
    // },
  },

  mounted: function () {
    this.displayInventory();
    // this.addToInventory();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.inventory {
  border: 0.5rem black solid;
  width: calc(30rem);
  height: 6rem;
  margin: auto;
  position: fixed;
  display: flex;
  bottom: 0rem;
}

.inventory-item {
  /* border: solid; */
  padding: 0.5rem;
  /* border-color: gray; */
  /* border-width: 0.5rem; */
}

.item-img {
  width: 5rem !important;
  height: 5rem !important;
}

.item-img:hover {
  transform: scale(1.1);
  transition: 0.2s;
}
.flex-row {
  display: flex;
  justify-content: space-around;
}

.hidden {
  display: none;
}
</style>
