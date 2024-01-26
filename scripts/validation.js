const form = document.querySelector("form");
const email = document.getElementById("email");
const emailError = document.querySelector("#span-email");

const phoneError = document.querySelector("#span-phone");

const inputs = document.querySelectorAll("input");

function getDisplayError(input_type){
    switch (input_type.name) {
        case "nombre":
            return document.querySelector("#span-name");
        case "apellido":
            return document.querySelector("#span-last-name");
        case "email":
            return document.querySelector("#span-email")
        case "telefono":
            return document.querySelector("#span-phone");
        case "contraseña":
            return document.querySelector("#span-password");
        case "contraseña-confirm":    
            return document.querySelector("#span-confirm-password");
        default:
            break;
    }
}

inputs.forEach(input => {
    if(input.name!="contraseña-confirm"){
        input.addEventListener("input",(event)=>{
            const display = getDisplayError(input);
            if (input.checkValidity()) {
                display.textContent = ""; 
                display.className = "error"; 
            } else {
                showError(input,display);
            }
        })
    } else{
        input.addEventListener("input",(event)=>{
            const display = getDisplayError(input);
            const contraseña = document.querySelector("#password");
            if(input.value!=contraseña.value){
                showError(input,display);
            } else{
                display.textContent = ""; 
                display.className = "error";
            }
        })
    }
});


form.addEventListener("submit", (event) => {
    let noSubmit = false;
    inputs.forEach(input => {
        if(!input.checkValidity()){
            showError(input,getDisplayError(input));
            noSubmit = true;
        } 
    });
    if(noSubmit) event.preventDefault();
});


function showError(input_type,error_display) {
  if (input_type.validity.valueMissing) {
     error_display.textContent = "Debe llenar el campo";
  } else if (input_type.validity.typeMismatch || input_type.validity.patternMismatch) {
     error_display.textContent = `No corresponde al formato de ${input_type.name}`;
  } else if (input_type.validity.tooShort) {
    error_display.textContent = `Debe tener al menos ${email.minLength} caracteres`;
  } else if(input_type.name==="contraseña-confirm"){
    error_display.textContent = "las contraseñas no coinciden";
  }
  error_display.className = "error active";
}

