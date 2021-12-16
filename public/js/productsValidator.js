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

    let form = document.querySelector(".form");
    form.addEventListener('submit', (e) => {

        let errors = [];
        let firstName = document.querySelector('#first_name');
        let lastName = document.querySelector('#last_name');
        let email = document.querySelector('#email');
        let password = document.querySelector('#password');
        let gender = document.querySelector('#gender');
        let date = document.querySelector('#date');
        let image = document.querySelector('#image');

        if (firstName.value == '' ) {
            errors.push('El campo nombre no puede estar vacío');    
        }else {
            if(firstName.value.length < 2) {
              errors.push('El campo nombre debe ser mayor a 2 caracteres');    
            };
        };
        
        if (lastName.value == '') {
             errors.push('El campo apellido no puede estar vacío');
        }else{
            if (lastName.value.length < 2) {
                errors.push('El campo apellido debe ser mayor a 2 caracteres');    
            }
        };

        
        if (email.value == '') {
             errors.push('El campo email no puede estar vacío');
        };

        
        if (password.value == '') {
             errors.push('El campo password no puede estar vacío');
        }else{
            if (password.value.length < 8) {
                errors.push('El password debe ser mayor a 8 caracteres');    
            }
        };      
        
        if (gender.value == '') {
            errors.push('El campo género no puede estar vacío');
        };
        
        if (date.value == '') {
            errors.push('El campo fecha de nacimiento no puede estar vacío');
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