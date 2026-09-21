
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { getDatabase } from
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBV4hjn3oiT9TEUzldKOloJ-W2nmNTcuRo",
  authDomain: "thucongviet-system.firebaseapp.com",
  databaseURL: "https://thucongviet-system-default-rtdb.firebaseio.com",
  projectId: "thucongviet-system",
  storageBucket: "thucongviet-system.appspot.com",
  messagingSenderId: "107022520550",
  appId: "1:107022520550:web:63249a3f68535241612b27"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
