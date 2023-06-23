import { estructuraCard } from "./estructuraCard.js";
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("resultsContainer");

/**
 * Agrega un listener al botón de búsqueda para realizar la búsqueda cuando se hace click.
 */
searchButton.addEventListener("click", performSearch);
/**
 * Realiza una búsqueda en la API de Google Books y muestra los resultados en la vista.
 */
function performSearch() {
  const searchTerm = searchInput.value;
  const apiKey = "AIzaSyAE3KkcNTJbbKkfTDtx_c6d6Vqo32y7VzU";

  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&projection=lite&key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      resultsContainer.innerHTML = "";

      if (data.items) {
        // Muestro los resultados en la vista
        data.items.forEach((item) => {
          const card = estructuraCard(item);
          resultsContainer.appendChild(card);
        });

        // Guardo los resultados en el localStorage
        localStorage.setItem("searchResults", JSON.stringify(data.items));
      } else {
        resultsContainer.textContent = "No results found.";
      }
    })
    .catch((error) => {
      console.error("Error performing search:", error);
    });
}

// Verificar si hay resultados guardados en el localStorage al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  const searchResults = localStorage.getItem("searchResults");
  // Si hay resultados guardados, los muestro en la vista
  if (searchResults) {
    const parsedResults = JSON.parse(searchResults);

    parsedResults.forEach((item) => {
      const card = estructuraCard(item);
      resultsContainer.appendChild(card);
    });
  }
});
