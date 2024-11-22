//DOM elements
const resultEl = document.getElementById( 'result');
const lengthEl = document.getElementById( 'length');
const uppercaseEl = document.getElementById( 'uppercase');
const lowercaseEl = document.getElementById( 'lowercase');
const symbolsEl = document.getElementById( 'symbols');
const numbersEl = document.getElementById( 'numbers');
const generateEl = document.getElementById( 'generate');
const clipboardEl = document.getElementById( 'clipboard');




const randomFunct = {
    lower: getRandomLower,
    upper: getRandomUpper,
    symbol: getRandomSymbol,
    number: getRandomNumber
}

//Generate event listner
generateEl.addEventListener( 'click', () => {
    const length = Number(lengthEl.value);
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasSymbol = symbolsEl.checked;
    const hasNumber = numbersEl.checked;

    resultEl.innerText = generatePassword( hasLower, hasUpper, hasSymbol, hasNumber, length)
})

//Copy password to clipboard
clipboardEl.addEventListener( 'click', () => {
    const textarea = document.createElement( 'textarea');
    const password = resultEl.innerText;

    if( !password) return;


    navigator.clipboard.writeText(password)
        .then(() => alert('Password copied to clipboard'))
        .catch(() => alert('Failed to copy password'));

    // textarea.value = password;
    // document.body.appendChild(textarea);
    // textarea.select();
    // document.execCommand('copy')
    // textarea.remove();
    // alert('Password copied to clipboard')
})

//Generate password function
function generatePassword( lower, upper, symbol, number, length) {
    //initialize password variable
    //filter out uncheck types
    //loop over the length call the generator function for each type
    //add final password to the password variable

    let generatedPassword = '';

    const typesCount = upper + lower + symbol + number;

    const typesArr = [ { upper }, { lower }, { symbol }, { number }].filter(
        item =>  Object.values(item)[0]
    )

    if( typesCount === 0) return '';

    for( let i = 0; i < length; i += typesCount) {
        typesArr.forEach( type => {
          const funcName = Object.keys( type)[0];

          generatedPassword += randomFunct[funcName]();

        })
    }

    const finalPassword = generatedPassword.slice( 0, length);

    return finalPassword;
}



//Generator functions
function getRandomLower() {
    return String.fromCharCode( Math.floor( Math.random( ) * 26) + 97);
}


function getRandomUpper() {
    return String.fromCharCode( Math.floor( Math.random( ) * 26) + 65);
}


function getRandomNumber() {
    return String.fromCharCode( Math.floor( Math.random( ) * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    return symbols[ Math.floor( Math.random( ) * symbols.length)]
}

