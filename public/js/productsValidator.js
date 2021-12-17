window.onload = function(){
    // let titulo = document.querySelector('.moviesAddTitulo')
    // let formulario = document.querySelector('#formulario');
    // let article = document.querySelector('article');
    // titulo.innerHTML = 'AGREGAR PELÍCULA';
    // titulo.classList.add('titulo');
    // article.classList.add('fondoTransparente');
    // formulario.classList.add('fondoCRUD');

    //------DESDE AQUÍ CONTINÚE CON LAS VALIDACIONES DEL FORMULARIO //
    //-------------------DE REGISTRO DE PELÍCULAS------------------//    
    
    let form = document.querySelector(".forma");    
    form.addEventListener('submit', (e) => {    
        let errors = [];
        let productName = document.querySelector('#product_name');
        let price = document.querySelector('#price');
        let discount = document.querySelector('#discount');
        let category = document.querySelector('#category');
        let description = document.querySelector('#description');
        let color = document.querySelector('#color');
        let size = document.querySelector('#size');
        let image = document.querySelector('#image');


        if (productName.value == '' ) {
            errors.push('El campo nombre de producto no puede estar vacío');    
        }else {
            if(productName.value.length < 5) {
              errors.push('El campo nombre de producto debe ser mayor a 5 caracteres');    
            };
        };
        
        if (price.value == '') {
             errors.push('El precio no puede estar vacío');
        };
        
        if (discount.value == '') {
             errors.push('El campo descuento no puede estar vacío');
        };

        
        if (category.value == 'Elige categoria') {
             errors.push('Debes seleccionar una categoría');
        };      
        
        if (description.value == '') {
            errors.push('La descripción no puede estar vacía');
        }else{
            if(description.value.length < 20) {
                errors.push('La descripción debe ser mayor a 20 caracteres');    
              };
        };
        
        if (color.value == '') {
            errors.push('El campo color no puede estar vacío');
        };
        
        if (size.value == '') {
            errors.push('La talla no puede estar vacío');
        };

        if (image.value == '') {
            errors.push('El campo imagen no puede estar vacío');
        }else{
    
            let extVal = ".png, .gif, .jpg, jpeg";
            let fileName = image.value;
            let extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
            let extensionValida = extVal.indexOf(extension);
            if (extensionValida < 0){
                errors.push('El campo imagen debe ser una imagen jpg, gif o png')
            }
        };
        
        
        // //Aquí controlo que es lo que debo hacer si hay o no errores en el formulario

         if (errors.length > 0) {
             e.preventDefault();
             let ulErrors = document.querySelector('.errores');
             ulErrors.classList.add('alert-warning');
             ulErrors.innerHTML = '';
             for (let i = 0; i < errors.length; i++) {
                 ulErrors.innerHTML += `<li >  ${errors[i]} </li>`;
             };
         }else{
             alert('La validación fué exitosa')
            form.submit();
         }
    });
}