window.onload = () => {
    const app = document.getElementById("root");
    const container = document.createElement("div");
//    const image = document.createElement("img")
    container.setAttribute("class", "container");
    app.appendChild(container);

    // Aqui debemos agregar nuestro fetch
    fetch('http://localhost:3032/api/products/')
      .then(function(response){
        return response.json();
      })

      .catch(function(error){
         alert(error);
      })

      .then(function(productos){
        let data = productos.data;

       data.forEach((product) => {
        //EL ULTIMO PRDUCTO CREADO

         const card = document.createElement("div");
         card.setAttribute("class", "card");
  
         const h1 = document.createElement("h1");
         h1.textContent = product.product_name;
  
         const p = document.createElement("p");
         p.textContent = `Precio: ${product.price}`;
  
         const discount = document.createElement("p");
         discount.textContent = `descuento: ${product.discount}`;
         
         const image = document.createElement("img");
         image.src = `/images/products/${product.image}`;
  
         container.appendChild(card);
          card.appendChild(h1);
          card.appendChild(p);
          card.appendChild(discount);
          card.appendChild(image);
          

        // if (movie.genre !== null) {
        //  const genero = document.createElement("p");
        //  genero.textContent = `Genero: ${movie.genre.name}`;
        // card.appendChild(genero);
       // }
       
  
        // const favoritas = document.createElement("p");
        // favoritas.innerHTML = this.favoritas(product.product_id);
        // card.appendChild(favoritas)
      });
    })
  };
    