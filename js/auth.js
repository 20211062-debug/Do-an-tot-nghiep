
import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  ref, set, get
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

registerForm.onsubmit = async (e) => {
  e.preventDefault();

  try {
    const role = document.getElementById("role").value;

    const cred = await createUserWithEmailAndPassword(
      auth,
      regEmail.value,
      regPassword.value
    );

    await set(ref(db, "users/" + cred.user.uid), {
      email: regEmail.value,
      role: role
    });

    alert("Đăng ký thành công!");
    location.reload();

  } catch (err) {
    if (err.code === "auth/email-already-in-use")
      alert("Email đã tồn tại!");
    else
      alert(err.message);
  }
};

loginForm.onsubmit = async (e) => {
  e.preventDefault();

  try {
    const cred = await signInWithEmailAndPassword(
      auth,
      loginEmail.value,
      loginPassword.value
    );

    const snap = await get(ref(db, "users/" + cred.user.uid));
    const role = snap.val().role;

    if (role === "quanly") location.href = "quanly.html";
    else if (role === "nhanvien") location.href = "nhanvien.html";
    else location.href = "index.html";

  } catch {
    alert("Sai email hoặc mật khẩu!");
  }
};
