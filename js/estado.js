/**
 * Verifica si hay conexión a internet
 * @returns
 */
function verificarConexion() {
  if (navigator.onLine) {
    return;
  } else {
    mostrarModal();
  }
}
verificarConexion();

/**
 * Estructura del modal
 */
function esctructuraModal() {
  const modal = document.querySelector(".modal");

  const modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  const modalTitle = document.createElement("div");

  const modalBody = document.createElement("div");
  modalBody.classList.add(
    "modal-body",
    "d-flex",
    "justify-content-lg-center",
    "align-items-center",
    "flex-column"
  );
  const modalBodyText = document.createElement("p");
  modalBodyText.textContent = "Se perdio la conexión a internet";

  const img = document.createElement("img");
img.setAttribute("src", "img/sin-conexion.png");
img.setAttribute("alt", "Sin conexión");
img.classList.add("w-50");


  const btnClose = document.createElement("button");
  btnClose.classList.add("btn-close");

  btnClose.setAttribute("type", "button");
  btnClose.setAttribute("data-bs-dismiss", "modal");
  btnClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modalHeader.appendChild(btnClose);
  modalBody.appendChild(modalBodyText);
  modalBody.appendChild(img);
  modalHeader.appendChild(modalTitle);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);
}

/**
 * Muestra el modal
 * @returns
 */
function mostrarModal() {
  esctructuraModal();
  document.querySelector(".modal").style.display = "block";
}

/**
 * Oculta el modal
 */
function ocultarModal() {
  document.querySelector(".modal").style.display = "none";
}
