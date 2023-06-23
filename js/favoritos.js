import { estructuraCard } from "./estructuraCard.js";

const favoritesContainer = document.getElementById('favoritesContainer');

window.addEventListener('DOMContentLoaded', showFavorites);

function showFavorites() {
  favoritesContainer.innerHTML = '';

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length > 0) {
    favorites.forEach(book => {
      const card = estructuraCard(book);
      console.log(card);
      favoritesContainer.appendChild(card);
    });
  } else {
    favoritesContainer.textContent = 'No se encontraron libros agregados a favoritos.';
  }
}


