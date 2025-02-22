const resultDisplay = document.getElementById("display-result");
const btnDiv = document.getElementById("button-container");
const btnContents = [
    'AC', 'DE', '/', '*','7', '8', '9', '-', '4', '5', '6', '+','1', '2', '3', '.', '0', "00", '='
];

btnContents.forEach((el, i) => {
    const key = document.createElement("button");
    const condition = el === "AC" || el === "DE" || el === "=";
    const rgx = /(\+|\-|\*|\/)/;
    key.id = `key-${i}`;
    key.textContent = el;
    if(rgx.test(el)){
        key.className = "methods";
    }else{
        key.className = !condition ? `numbers num-${i}`: `operators num-${i}`;
    }
    
    key.onclick = () =>{        
        if(!condition)
            resultDisplay.textContent += `${key.textContent}`; 
        else if(condition)
            resultDisplay.textContent += `${operate(key.textContent)}`; 
            

    }


    btnDiv.appendChild(key);
});






function operate(operatorBtn){

    if(operatorBtn === '='){
         console.log(JSON.parse(resultDisplay.textContent)); 
    }
}