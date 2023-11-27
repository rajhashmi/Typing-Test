let text =
  "in a quiet field, a little stream flows among green hills sunlight paints patterns on the grass as it filters through the leaves a colorful butterfly dances from one flower to another, adding brightness to the peaceful setting. ";

const paragraph = document.getElementById("paragraph");
const pipe = document.getElementById("pipe");
const first_letter = text.at(0);
let word_Counter = 0;
let words_in_array = [];
let i = 0;
let j = 0;
let mistake_counter = 0;
let testStarted = false;
let time = 100;


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
    spaceElement.id = `${index} ${letter.length}`;
    wordContainer.appendChild(spaceElement);
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

function setPipePosition(positions,isSpace){

  const left = Math.floor(positions.left)
  const height = Math.floor(positions.height)
  const top = Math.floor(positions.top);

  if(isSpace){
    pipe.style.left =`${left - 4}px`
    
  }else{
    
    pipe.style.left =`${left + 8}px`
  }

  pipe.style.height = `${height}px`
  
  pipe.style.top = `${top + 2}px`
  pipe.style.visibility = "visible"
  }


function startTyping(keyPress) {
      if(j < 0){
        j=0
      }else if(i<0){
        i = 0
      }
    
    const array_Length = words_in_array[i].length - 1;
    const array_Length2 = words_in_array[i];
    const letter_compare1 = words_in_array[i][j];

    if(keyPress == " " || j === array_Length && keyPress != "Backspace"){
      if(j === array_Length){
        const space_Element = document.getElementById(i+letter_compare1+j).getBoundingClientRect();
        setPipePosition(space_Element)
        i++;
        j = 0;
      }else if (j < array_Length){
        document.getElementById(i + letter_compare1 + j).style.color = "#ca4754";
        console.log(i);
        mistake_counter++;

        i++
        j = 0;
        const jump_word = document.getElementById(i+  words_in_array[i][j]+j).getBoundingClientRect()
        setPipePosition(jump_word,"jumpword")
      }
    }else if( keyPress == "Backspace"){
        j--
      const previous_Element = words_in_array[i][j]
      const previous_Element_position = document.getElementById(i+previous_Element+j).getBoundingClientRect()
      setPipePosition(previous_Element_position,"backspace")
      document.getElementById(i+previous_Element+j).style.color = "rgba(255, 255, 255,0.3)";
    }else if(keyPress == letter_compare1){
      const rightKey = document.getElementById(i + letter_compare1 + j)
      const rightKey_position = rightKey.getBoundingClientRect();
      setPipePosition(rightKey_position)
      rightKey.style.color = "white";
      j++
    }else if (letter_compare1 !== keyPress && keyPress !== undefined) {
      const mistake = document.getElementById("mistake")
      document.getElementById(i + letter_compare1 + j).style.color = "#ca4754";
      const wrong_keyword_position = document.getElementById(i + letter_compare1 + j).getBoundingClientRect()
      setPipePosition(wrong_keyword_position)
      mistake_counter++;
        j++;
      mistake.textContent = mistake_counter
        console.log(mistake_counter);
    }


  }
  
function startTimer() {
  if (time > 0) {
    const intervalId = setInterval(() => {
      console.log(time);
      time--;
      document.getElementById("seconds").textContent = `${time}s`

      if (time === 0) {
        clearInterval(intervalId);
       alert("time! up 🖐️")
       pipe.style.visibility = "hidden"
        window.removeEventListener("keydown", keydownHandler)
      }
    }, 1000);
  }
}
function keydownHandler(e){

  const keyPress = e.key;
  if (keyPress === first_letter || word_Counter > 0) {
    if (!testStarted) {
      testStarted = true;
      startTimer();
    }
    word_Counter++;
    startTyping(keyPress);
  }
}
window.addEventListener("keydown", keydownHandler)