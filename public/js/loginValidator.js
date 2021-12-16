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
        let email = document.querySelector('#email');
        let password = document.querySelector('#password');
        
        if (email.value == '') {
             errors.push('El campo correo electónico no puede estar vacío');
        };
        
        if (password.value == '') {
             errors.push('El campo password no puede estar vacío');
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
             alert('Validando en la base de datos')
            form.submit();
         }

    });
}