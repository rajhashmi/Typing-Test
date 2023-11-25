let text = "The mysterious labyrinth revealed hidden treasures as adventurous explorers navigated its twisting passages, discovering ancient artifacts and unlocking the secrets of a forgotten civilization"

const paragraph = document.getElementById("paragraph");



const text_in_array = text.split(" ")
function addLetter(wordContainer, letters){
    let letter = letters.split("");
    letter.forEach((element)=>{
         wordContainer.innerHTML += `<letter>${element}</letter>`
    })
    return wordContainer
}
text_in_array.forEach((element,index)=>{
    let word = document.createElement("div");
    word.id = index;
    addLetter(word, element)
    word.style.marginLeft = "8px"
    paragraph.appendChild(word);
    
})












// let p = document.getElementById("text");
//     let splitArr = text.split(" ");
// for(let i = 0; i < splitArr.length; i++){
//     for(let j = 0; j < splitArr[i].length; j++){
//         p.textContent +=  splitArr[i][j];
//     }
//     p.textContent += " ";
// }








// const text = document.getElementById("text").innerText
// const text_in_array = text.split(" ")
// const firstLetter = text_in_array[0][0]

// let wordCounter = 0;

// window.addEventListener("keypress", (e)=>{
//     let firstLetter_lower = firstLetter.toLowerCase();
//     if(firstLetter_lower === e.key || wordCounter > 0){
//         wordCounter++
//         console.log(`${e.key} is pressed`)
//     }
// })
