import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/app';
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

export const db = firebase.firestore();

const app = createApp(App)
app.use(router)
app.use(store)
app.use(vuetify)

app.mount('#app')
