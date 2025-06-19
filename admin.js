import { db, auth } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const form = document.getElementById("formProducto");
const loginDiv = document.getElementById("login");

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginDiv.style.display = "none";
    form.style.display = "flex";
  } catch (error) {
    alert("Error de inicio de sesión");
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const urls = document.getElementById("imagenes").value.split(",").map(url => url.trim());
  const producto = {
    nombre: document.getElementById("nombre").value,
    precio: parseFloat(document.getElementById("precio").value),
    talla: document.getElementById("talla").value,
    imagenes: urls
  };

  await addDoc(collection(db, "productos"), producto);
  alert("Producto agregado correctamente");
  e.target.reset();
});