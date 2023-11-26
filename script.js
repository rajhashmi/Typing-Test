let text =
  "the mysterious labyrinth revealed hidden treasures as adventurous explorers navigated its twisting passages, discovering ancient artifacts and unlocking the secrets of a forgotten civilization";

const paragraph = document.getElementById("paragraph");
const first_letter = text.at(0);
let word_Counter = 0;
let words_in_array = [];
let i = 0;
let j = 0;
let mistake_counter = 0;

const pipe = document.createElement("samp");
pipe.textContent = "|";
pipe.classList = "pipe";

const text_in_array = text.split(" ");
function addLetter(wordContainer, letters, index) {
  let letter = letters.split("");
  letter.forEach((element, index2) => {
    words_in_array.at(index).push(element);
    wordContainer.innerHTML += `<letter id = "${index + element + index2}">${element}</letter>`;
  });
  words_in_array.at(index).push(" ");

  if (index < text_in_array.length - 1) {
    const spaceElement = document.createElement("pre");
    spaceElement.textContent = ` `;
    spaceElement.id = `space${index}`;
    wordContainer.appendChild(spaceElement);
    //   console.log(spaceElement);
  }
  return wordContainer;
}

text_in_array.forEach((element, index) => {
  let word = document.createElement("div");
  word.id = index;
  words_in_array.push([]);
  addLetter(word, element, index);
  word.classList = "words";
  paragraph.appendChild(word);
});

function startTyping(keyPress) {
    const array_Length = words_in_array[i].length - 2;
    const array_Length2 = words_in_array[i];
    const letter_compare1 = words_in_array[i][j];
    const letter_compare2 = document.getElementById(i + letter_compare1 + j);
  
    console.log(i, j, array_Length);
  
    if (keyPress === " ") {
      if (j < array_Length || j > array_Length) {
        i++;
        j = 0;
        document.getElementById(`space${i}`).appendChild(pipe);
      } else if (j === array_Length) {
        i++;
        j = 0;
        document.getElementById(`space${i}`).appendChild(pipe);
      }
    } else if (letter_compare1 === keyPress) {
      letter_compare2.appendChild(pipe);
      letter_compare2.style.color = "white";
      j++;
    } else if (letter_compare1 !== keyPress) {
      letter_compare2.appendChild(pipe);
      letter_compare2.style.color = "#ca4754";
      mistake_counter++;
      j++;
    }
  }
  
window.addEventListener("keydown", (e) => {
  const keyPress = e.key;
  if (keyPress === first_letter || word_Counter > 0) {
    word_Counter++;
    startTyping(keyPress);
  }
});

 