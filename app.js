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
    word.classList = "words"
    paragraph.appendChild(word);
    
})
