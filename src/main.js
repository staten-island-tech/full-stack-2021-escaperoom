import firebase from "firebase";
import Vue from 'vue'
import App from './App.vue'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAMHt38VEtOh7ggYRQLQooixyo08wxUhGc",
  authDomain: "escape-room-project-677cd.firebaseapp.com",
  projectId: "escape-room-project-677cd",
  storageBucket: "escape-room-project-677cd.appspot.com",
  messagingSenderId: "440341783920",
  appId: "1:440341783920:web:0aa7dcc75245ad05481bb5",
  measurementId: "G-VKNQM8049J",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth();

// import Vue from "vue";
// import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
