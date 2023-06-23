/**
 * Muestra los detalles de un libro.
 * @param {Object} book - El objeto que contiene los detalles del libro.
 * @returns {HTMLElement} - El elemento HTML que representa los detalles del libro.
 */
function mostrarDetalles(book) {
  const titlePrincipal = document.querySelector(".title");

  titlePrincipal.textContent = `Detalles de ${book.volumeInfo.title}`;
  const div1 = document.createElement("div");
  div1.classList.add("section");

  /**
   * Verifica si un libro está en favoritos.
   * @param {Object} book - El objeto que representa el libro.
   */
  const isBookFavorite = esFavorito(book);

  const addToFavoritesButton = document.createElement("button");
  addToFavoritesButton.textContent = isBookFavorite
    ? "Quitar de favoritos"
    : "Agregar a favoritos";
  addToFavoritesButton.classList.add(
    isBookFavorite ? "btn-quitar" : "btn-favoritos"
  );
  addToFavoritesButton.addEventListener("click", () => {
    toggleFavoritos(book);
  });

  /**
   * Alterna el estado de favorito para un libro y actualiza el contenido del botón.
   * @param {Object} book - El objeto que representa el libro.
   */
  function toggleFavoritos(book) {
    console.log(esFavorito(book));
    if (esFavorito(book)) {
      removeFromFavorites(book);
      addToFavoritesButton.classList.remove("btn-quitar");
      addToFavoritesButton.classList.add("btn-favoritos");
      addToFavoritesButton.textContent = "Agregar a favoritos";
    } else {
      addToFavorites(book);
      addToFavoritesButton.classList.remove("btn-favoritos");
      addToFavoritesButton.classList.add("btn-quitar");
      addToFavoritesButton.textContent = "Quitar de favoritos";
    }
  }

  const detailsContent = document.createElement("div");
  detailsContent.classList.add("book-details-content", "d-flex", "flex-md-row");

  const detailsImg = document.createElement("div");
  detailsImg.classList.add(
    "book-details-img",
    "d-flex",
    "gap-2",
    "flex-row",
    "justify-content-center",
    "flex-md-column",
    "gap-md-4"
  );

  const img = document.createElement("img");
  img.setAttribute("src", book.volumeInfo.imageLinks.thumbnail);
  img.setAttribute("alt", "cover img");
  img.style.maxWidth = "190px";

  const detailsInfo = document.createElement("div");
  detailsInfo.classList.add("book-details-info");

  const title = document.createElement("div");
  title.classList.add("book-details-item", "title");

  const span9 = document.createElement("span");
  span9.classList.add("fw-bold", "fs-2");
  span9.textContent = book.volumeInfo.title;

  const description = document.createElement("div");
  description.classList.add("book-details-item", "description");

  const span10 = document.createElement("p");
  span10.textContent = book.volumeInfo.description;

  const containerDetails = document.createElement("div");
  containerDetails.classList.add("book-details-item");

  const detailsItem = document.createElement("div");
  detailsItem.classList.add("book-details-item");

  const edit = document.createElement("span");
  edit.classList.add("fw-bold");
  edit.textContent = "Editor: ";

  const editInfo = document.createElement("span");
  editInfo.classList.add("text-italic");
  editInfo.textContent = book.volumeInfo.publisher;

  const div8 = document.createElement("div");
  div8.classList.add("book-details-item");

  const date = document.createElement("span");
  date.classList.add("fw-bold");
  date.textContent = "Fecha de publicación: ";

  const dateInfo = document.createElement("span");
  dateInfo.classList.add("text-italic");
  dateInfo.textContent = book.volumeInfo.publishedDate;

  const div9 = document.createElement("div");
  div9.classList.add("book-details-item");

  const author = document.createElement("span");
  author.classList.add("fw-bold");
  author.textContent = "Autor: ";

  const span16 = document.createElement("span");
  span16.textContent = book.volumeInfo.authors;
  div1.appendChild(detailsContent);
  div1.appendChild(addToFavoritesButton);
  detailsContent.appendChild(detailsImg);
  detailsImg.appendChild(img);
  detailsContent.appendChild(detailsInfo);
  detailsImg.appendChild(containerDetails);

  detailsInfo.appendChild(title);
  title.appendChild(span9);
  description.appendChild(span10);

  detailsItem.appendChild(edit);
  detailsItem.appendChild(editInfo);
  containerDetails.appendChild(detailsItem);
  containerDetails.appendChild(div8);
  containerDetails.appendChild(div9);

  detailsInfo.appendChild(description);
  div8.appendChild(date);
  div8.appendChild(dateInfo);
  div9.appendChild(author);
  div9.appendChild(span16);
  return div1;
}

// detalles.js
const detailsContainer = document.getElementById("detailsContainer");

window.addEventListener("DOMContentLoaded", showDetails);

/**
 * Muestra los detalles de un libro basado en el ID proporcionado en la URL.
 */
function showDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id");

  // Si el ID del libro está disponible, busca los detalles del libro.
  if (bookId) {
    const apiKey = "AIzaSyAE3KkcNTJbbKkfTDtx_c6d6Vqo32y7VzU";

    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      .then((response) => response.json())
      .then((data) => {
        const card = mostrarDetalles(data);
        detailsContainer.appendChild(card);
      })
      .catch((error) => {
        console.error("Error retrieving book details:", error);
      });
  } else {
    detailsContainer.textContent = "Invalid book details.";
  }
}

/**
 * Verifica si un libro está marcado como favorito.
 * @param {Object} book - El objeto que representa el libro.
 * @returns {boolean} - `true` si el libro es favorito, `false` de lo contrario.
 */
function esFavorito(book) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.some((item) => item.id === book.id);
}

/**
 * Agrega un libro a la lista de favoritos.
 * @param {Object} book - El objeto que representa el libro a agregar.
 */
function addToFavorites(book) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.push(book);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  alert("Added to Favorites!");
}

/**
 * Elimina un libro de la lista de favoritos.
 * @param {Object} book - El objeto que representa el libro a eliminar.
 */
function removeFromFavorites(book) {
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  const newFavorites = favorites.filter((item) => item.id !== book.id);
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  alert("Removed from Favorites!");
}
