import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueCarousel from 'vue-carousel';
import './plugins/pipes';
import './css/styles.css';

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

store.commit('set_firebase', firebase);

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
    store.commit('log_state', true);
		// console.log('Logueado: onAuthStateChanged');
	} else {
    store.commit('log_state', false);
		// console.log('Deslogueado: onAuthStateChanged');
	}
});

export default firebase.firestore();

Vue.component('loader-c', () => import('./components/Loader'));
Vue.component('snackbar-c', () => import('./components/Snackbar'));
Vue.component('products-view', () => import('./components/Products'));

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  VueCarousel,
  render: h => h(App)
}).$mount('#app')
