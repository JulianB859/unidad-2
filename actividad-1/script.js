function guardarSession() {
  const nombre = document.getElementById('nombreInput').value;
  sessionStorage.setItem('nombreUsuario', nombre);
  alert("Guardado en sessionStorage.");
}

function guardarLocal() {
  const nombre = document.getElementById('nombreInput').value;
  localStorage.setItem('nombreUsuario', nombre);
  alert("Guardado en localStorage.");
}

function mostrarDatos() {
  const session = sessionStorage.getItem('nombreUsuario');
  const local = localStorage.getItem('nombreUsuario');
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = `
    <p><strong>SessionStorage:</strong> ${session || 'Sin datos'}</p>
    <p><strong>LocalStorage:</strong> ${local || 'Sin datos'}</p>
  `;
}

function limpiar() {
  sessionStorage.clear();
  localStorage.clear();
  document.getElementById('resultado').innerHTML = "Almacenamientos limpiados.";
}
