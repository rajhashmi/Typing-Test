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
let time = 20;
let keyboardIsActive = false;

const text_in_array = text.split(" ");
function addLetter(wordContainer, letters, index) {
  let letter = letters.split("");
  letter.forEach((element, index2) => {
    words_in_array.at(index).push(element);
    wordContainer.innerHTML += `<letter id = "${
      index + element + index2
    }">${element}</letter>`;
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

function setPipePosition(positions, isSpace) {
  const left = Math.floor(positions.left);
  const height = Math.floor(positions.height);
  const top = Math.floor(positions.top);

  if (isSpace) {
    pipe.style.left = `${left - 4}px`;
  } else {
    pipe.style.left = `${left + 8}px`;
  }
  pipe.style.height = `${height}px`;
  pipe.style.top = `${top + 2}px`;
  pipe.style.visibility = "visible";
}

function notSmallerThanZero() {
  if (j < 0) {
    j = 0;
  } else if (i < 0) {
    i = 0;
  }
}
function getElementLocation(index1, letter, index2, keyPress) {
  const gettingElement = document.getElementById(index1 + letter + index2);
  const gettingElement_Location = gettingElement.getBoundingClientRect();
  setPipePosition(gettingElement_Location, keyPress);
}
function get_Wrong_Letter() {
  const mistake = document.getElementById("mistake");
  const wrong_Letter = document.querySelectorAll(".wrongLetter");
  mistake_counter = wrong_Letter.length;
  mistake.textContent = mistake_counter;
}
function startTyping(keyPress) {
  notSmallerThanZero();
  const array_Length = words_in_array[i].length - 1;
  const letter_compare1 = words_in_array[i][j];

  if (keyPress == " " || (j === array_Length && keyPress != "Backspace")) {
    if (j === array_Length) {
      getElementLocation(i, letter_compare1, j);
      i++;
      j = 0;
    } else if (j < array_Length) {
      document.getElementById(i + letter_compare1 + j).classList =
        "wrongLetter";
      i++;
      j = 0;
      getElementLocation(i, words_in_array[i][j], j, "space");
    }
  } else if (keyPress == "Backspace") {
    j--;
    const previous_Element = words_in_array[i][j];
    document
      .getElementById(i + previous_Element + j)
      .classList.remove("rightLetter", "wrongLetter");
    getElementLocation(i, previous_Element, j, "Backspace");
  } else if (keyPress == letter_compare1) {
    getElementLocation(i, letter_compare1, j);
    document.getElementById(i + letter_compare1 + j).classList = "rightLetter";
    j++;
  } else if (letter_compare1 !== keyPress && keyPress !== undefined) {
    document.getElementById(i + letter_compare1 + j).classList = "wrongLetter";
    getElementLocation(i, letter_compare1, j);
    j++;
  }
  get_Wrong_Letter();
}

function startTimer() {
  if (time > 0) {
    const intervalId = setInterval(() => {
      time--;
      document.getElementById("seconds").textContent = `${time}s`;

      if (time === 0) {
        clearInterval(intervalId);
        alert("time! up 🖐️");
        pipe.style.visibility = "hidden";
        window.removeEventListener("keydown", keydownHandler);
      }
    }, 1000);
  }
}
function keydownHandler(e) {
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
window.addEventListener("keydown", keydownHandler);

document.addEventListener("touchstart", async () => {
  await toggleVisualKeyboard(true);
});

document.addEventListener("click", async () => {
  await toggleVisualKeyboard(false);
});

async function toggleVisualKeyboard(show = true) {
  try {
    if (show) {
      // Show the visual keyboard and set it to overlay content:
      await navigator.virtualKeyboard.show();
      navigator.virtualKeyboard.overlaysContent = true;
    } else {
      // Hide the visual keyboard:
      await navigator.virtualKeyboard.hide();
    }
  } catch (error) {
    console.error("Error toggling virtual keyboard:", error);
  }
}
