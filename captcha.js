let code = document.getElementById("code");
const refreshButton = document.querySelector('.refreshButton');
const submitButton = document.querySelector('.submitButton');
const input = document.querySelector('#input');


window.addEventListener ('load' , () => {
    code.textContent = crearCodigoCaptcha() ;
}) ;
refreshButton.addEventListener ('click' , () => {
    code.textContent = crearCodigoCaptcha() ;
}) ;

function crearCodigoCaptcha()  {
    let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', '0','1','2','3','4','5','6','7','8','9'];
    let a = letters[Math.floor(Math.random() * letters.length)] ;
    let b = letters[Math.floor(Math.random() * letters.length)] ;
    let c = letters[Math.floor(Math.random() * letters.length)] ;
    let d = letters[Math.floor(Math.random() * letters.length)] ;
    let e = letters[Math.floor(Math.random() * letters.length)] ;
    let f = letters[Math.floor(Math.random() * letters.length)] ;
    let g = letters[Math.floor(Math.random() * letters.length)] ;
    let code = a + b + c + d + e + f + g ;
    return code ;
}
submitButton.addEventListener ('click', () => {
    let inputValue = input.value;
    if(inputValue === '') {
        alert('inserta texto');
    }
    else if(inputValue == code.textContent) {
        alert('correcto');
    }
    else{
        alert("incorrecto");
    }
    
})