import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBLn-42vaSeU41pW04o3j7x7tX_IAcNaKw",
  authDomain: "pokeweb-23367.firebaseapp.com",
  projectId: "pokeweb-23367",
  storageBucket: "pokeweb-23367.appspot.com",
  messagingSenderId: "535344882549",
  appId: "1:535344882549:web:917fc051539d089f6fe93c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
