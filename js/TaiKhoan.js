import { auth, db } from "./db.config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  ref, set, get
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// ===== UI =====
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const errorMsg = document.getElementById("errorMsg");

const toRegister = document.getElementById("toRegister");
const toLogin = document.getElementById("toLogin");
const title = document.getElementById("title");

// ===== INPUT =====
const regEmail = document.getElementById("regEmail");
const regPassword = document.getElementById("regPassword");
const regConfirm = document.getElementById("regConfirm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

// ===== SWITCH FORM =====
toRegister.onclick = () => {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
  toRegister.classList.add("hidden");
  toLogin.classList.remove("hidden");
  title.innerText = "Đăng ký";
  errorMsg.innerText = "";
};

toLogin.onclick = () => {
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
  toLogin.classList.add("hidden");
  toRegister.classList.remove("hidden");
  title.innerText = "Đăng nhập";
  errorMsg.innerText = "";
};

// ===== REGISTER =====
registerForm.onsubmit = async e => {
  e.preventDefault();
  try {
    if (regPassword.value !== regConfirm.value)
      throw new Error("Mật khẩu không khớp");

    const cred = await createUserWithEmailAndPassword(
      auth,
      regEmail.value,
      regPassword.value
    );

    await set(ref(db, "users/" + cred.user.uid), {
      email: regEmail.value,
      role: "user",
      createdAt: new Date().toISOString()
    });

    errorMsg.style.color = "green";
    errorMsg.innerText = "Đăng ký thành công!";

    setTimeout(() => location.reload(), 1000);

  } catch (err) {
    errorMsg.style.color = "red";
    errorMsg.innerText = err.message;
  }
};

// ===== LOGIN =====
loginForm.onsubmit = async e => {
  e.preventDefault();
  try {
    const cred = await signInWithEmailAndPassword(
      auth,
      loginEmail.value,
      loginPassword.value
    );

    const snap = await get(ref(db, "users/" + cred.user.uid));
    const role = snap.exists() ? snap.val().role : "user";

    localStorage.setItem("role", role);

    location.href =
      role === "admin" ? "quanly.html" :
      role === "nhanvien" ? "nhanvien.html" :
      "index.html";

  } catch {
    errorMsg.style.color = "red";
    errorMsg.innerText = "Sai email hoặc mật khẩu";
  }
};
