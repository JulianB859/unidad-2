let db;

window.onload = function () {
  const request = indexedDB.open("UsuariosDB", 1);

  request.onerror = function () {
    console.error("No se pudo abrir la base de datos");
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Base de datos abierta con éxito");
  };

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains("usuarios")) {
      db.createObjectStore("usuarios", { keyPath: "email" });
    }
  };
};

function guardarUsuario() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;

  const transaction = db.transaction(["usuarios"], "readwrite");
  const store = transaction.objectStore("usuarios");

  const usuario = { nombre, email };
  const request = store.add(usuario);

  request.onsuccess = () => {
    alert("Usuario guardado correctamente");
  };

  request.onerror = () => {
    alert("Error al guardar usuario. ¿Ya existe?");
  };
}

function listarUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  lista.innerHTML = "";

  const transaction = db.transaction(["usuarios"], "readonly");
  const store = transaction.objectStore("usuarios");
  const request = store.openCursor();

  request.onsuccess = function (event) {
    const cursor = event.target.result;
    if (cursor) {
      const item = document.createElement("li");
      item.textContent = `${cursor.value.nombre} - ${cursor.value.email}`;
      lista.appendChild(item);
      cursor.continue();
    } else {
      if (!lista.hasChildNodes()) {
        lista.innerHTML = "<li>No hay usuarios almacenados</li>";
      }
    }
  };
}
