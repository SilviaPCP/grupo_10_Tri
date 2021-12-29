window.onload = function(){
let form = document.querySelector(".forma");
form.addEventListener('submit', (e) => {
    let errors = [];
    let result = confirm("¿Deseas borrar el producto?");
    if(result == true){
        form.submit();
    } else{
        e.preventDefault();
    }

});

}