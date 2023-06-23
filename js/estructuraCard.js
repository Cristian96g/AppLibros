/**
 * 
 * @param object book 
 * @returns 
 */
export function estructuraCard(book) {
  const card = document.createElement('div');
  card.classList.add("col-md-6", "col-lg-4", "col-xl-3", "mb-2");
  // card.classList.add('card');
  const linkContainer = document.createElement("a");
  linkContainer.classList.add("text-decoration-none");
    linkContainer.href = `detalles.html?id=${book.id}`;
  
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("book-item", "card", "flex-column", "align-items-center", "h-100");
    
    const bookItemImgDiv = document.createElement("div");
    bookItemImgDiv.classList.add("book-item-img");
    const img = document.createElement("img");
    img.classList.add("card-img-top");
    if (book.volumeInfo.imageLinks){
    img.setAttribute("src", book.volumeInfo.imageLinks.thumbnail);
    img.setAttribute("alt", book.volumeInfo.title);
  }else{
      img.setAttribute("src", "img/sin-imagen.png");
      img.setAttribute("alt", "Imagen no disponible");
  }
    
    bookItemImgDiv.appendChild(img);
    
    
    const bookItemInfoDiv = document.createElement("div");
    bookItemInfoDiv.classList.add("book-item-info", "card-body", "text-center");
    
    const a = document.createElement("a");
    a.setAttribute("href", "");
    a.classList.add("text-decoration-none");
    
    const h5 = document.createElement("h5");
    h5.classList.add("card-title", "fw-bold", "fs-5");
    h5.textContent = recortarTtitulo(book.volumeInfo.title, 30);
    
    a.appendChild(h5);
    
    const bookItemInfoItem1Div = document.createElement("div");
    
    const span1 = document.createElement("span");
    span1.classList.add("text-capitalize","span-block", "fw-bold");
    span1.textContent = "Author: ";
    
    const span2 = document.createElement("span");
    span2.textContent = book.volumeInfo.authors;
    span2.classList.add("text-capitalize","span-block", "fw-light");
    
    bookItemInfoItem1Div.appendChild(span1);
    bookItemInfoItem1Div.appendChild(span2);
    
    const bookItemInfoItem2Div = document.createElement("div");
    
    const span3 = document.createElement("span");
    span3.classList.add("text-capitalize","span-block", "fw-bold");
    span3.textContent = "Total Editions: ";
    
    const span4 = document.createElement("span");
    span4.textContent = "book.edition_count";
    span4.classList.add("text-capitalize","span-block", "fw-light");
    
    bookItemInfoItem2Div.appendChild(span3);
    bookItemInfoItem2Div.appendChild(span4);
    
    const bookItemInfoItem3Div = document.createElement("div");
    
    const span5 = document.createElement("span");
    span5.classList.add("text-capitalize","span-block", "fw-bold");
    span5.textContent = "First Publish Year: ";
    
    const span6 = document.createElement("span");
    span6.textContent =  book.volumeInfo.publishedDate;
    span6.classList.add("text-capitalize","span-block", "fw-light");
    
    bookItemInfoItem3Div.appendChild(span5);
    bookItemInfoItem3Div.appendChild(span6);
    
    bookItemInfoDiv.appendChild(a);
    bookItemInfoDiv.appendChild(bookItemInfoItem1Div);
    bookItemInfoDiv.appendChild(bookItemInfoItem2Div);
    bookItemInfoDiv.appendChild(bookItemInfoItem3Div);
    
    parentDiv.appendChild(bookItemImgDiv);
    parentDiv.appendChild(bookItemInfoDiv);
      
    linkContainer.appendChild(parentDiv);
    card.appendChild(linkContainer);
  
  
    return card;
  }
  

    /**
   * Recorta un texto dado a un número específico de caracteres agregando puntos suspensivos al final.
   * @param {string} texto - El texto a recortar.
   * @param {number} numeroCaracteres  - El número de caracteres a recortar
   * @returns {string}  El texto recortado con puntos suspensivos.
   */
    function recortarTexto(texto, numeroCaracteres) {
      if (texto) {
        return texto.slice(0, numeroCaracteres) + "...";
      } else {
        return "Sin descripción";
      }
    }
    
    /**
     * Recorta un texto dado a un número específico de caracteres agregando puntos suspensivos al final.
     * @param {string} texto - El texto a recortar.
     * @param {number} numeroCaracteres - El número de caracteres a recortar
     * @returns {string} El texto recortado con puntos suspensivos.
     */
    function recortarTtitulo(texto, numeroCaracteres) {
      if (texto) {
        return texto.slice(0, numeroCaracteres);
      } else {
        return "Sin título";
      }
    }
    