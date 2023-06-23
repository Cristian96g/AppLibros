import { estructuraCard } from "./estructuraCard.js";


/**
  *Verifica si hay resultados guardados en el localStorage al cargar la página 
 */
window.addEventListener("load", () => {
  const storedRandomBooks = localStorage.getItem("randomBooks");
  // Si hay resultados guardados, los muestro en la vista
  if (storedRandomBooks) {
    const randomBooks = JSON.parse(storedRandomBooks);
    mostrarResultados(randomBooks);
  }
});

// Obtiene una referencia al botón por su ID
const generateButton = document.getElementById("btn-generate");

// Asocia un evento de clic al botón
generateButton.addEventListener("click", generateNewResults);
// Función para generar nuevos resultados de libros al azar

function generateNewResults() {
  // Obtén una clave de API de Google Books
  const apiKey = "AIzaSyAE3KkcNTJbbKkfTDtx_c6d6Vqo32y7VzU";

  // Realiza una solicitud a la API de Google Books para obtener una lista de libros al azar
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=*&maxResults=40&key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Obtén una selección aleatoria de 4 libros de la respuesta
      const books = data.items;
      const randomBooks = getRandomBooks(books, 4);
      localStorage.setItem("randomBooks", JSON.stringify(randomBooks));
      /**
       * Si no hay libros aleatorios, muestra el texto de la descripcion
       */
      if (randomBooks.length === 0) {
        textoDescripcion();
      } else {
        const descripcion = document.getElementById("descripcion-aleatorios");
        descripcion.innerHTML = "";
      }
      mostrarResultados(randomBooks);
    })
    .catch((error) => {
      console.log("Error al obtener los libros:", error);
    });
}

// Función para obtener una selección aleatoria de libros
function getRandomBooks(books, count) {
  const shuffled = books.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function mostrarResultados(randomBooks) {
  const booksContainer = document.getElementById("containerLibro");
  booksContainer.innerHTML = "";
  randomBooks.forEach((book) => {
    const libros = estructuraCard(book);
    booksContainer.appendChild(libros);
  });
}

/**
 * Texto descripcion al ingresar a la pagina
 */
function textoDescripcion() {
  const descripcion = document.getElementById("descripcion-aleatorios");

  const contenedorTexto = document.createElement("div");
  contenedorTexto.classList.add("col-12", "texto-aleatorio");

  const parrafo = document.createElement("p");
  parrafo.textContent =
    "Bienvenido a la sección de libros aleatorios, donde cada clic es una oportunidad para descubrir joyas literarias. Aquí encontrarás una amplia selección de libros de diversos géneros y temas.";
  contenedorTexto.appendChild(parrafo);
  descripcion.appendChild(contenedorTexto);
}

textoDescripcion();
