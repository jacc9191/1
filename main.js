import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const contenedor = document.getElementById("contenedor-productos");
const snapshot = await getDocs(collection(db, "productos"));

snapshot.forEach((doc) => {
  const p = doc.data();
  const imagenesHTML = (p.imagenes || []).map(src => `<img src="\${src}" alt="\${p.nombre}" />`).join("");
  const card = `
    <div class="card">
      \${imagenesHTML}
      <h3>\${p.nombre}</h3>
      <p>Precio: $\${p.precio.toLocaleString()}</p>
      <p>Talla: \${p.talla}</p>
    </div>
  `;
  contenedor.innerHTML += card;
});