//Create welcome message.
const nameInput = document.querySelector("#name");
const nameBtn = document.querySelector(".submit-name");
const introLabel = document.querySelector(".intro-label");
const intro = document.querySelector(".introduction");
const nxtBtn = document.querySelectorAll(".next-page");
const div = document.querySelector(".intro-div");

function welcomeMessage() {
  const name = nameInput.value;
  introLabel.style.display = "none";
  nameBtn.style.display = "none";

  const introMsg = document.createElement("h2");
  introMsg.innerText = `Welcome ${name} and good luck!`;
  div.insertAdjacentElement("afterend", introMsg);
}

nameBtn.addEventListener("click", welcomeMessage);

//
// Toggle button changes style of page - dark mode -light mode
const toggleBtn = document.querySelector(".toggle");
const dmIcon = document.querySelector(".dm-icon");
const afIcon = document.querySelectorAll(".af-icon");
const body = document.querySelector("body");
const toolTip = document.querySelector(".tooltip-text");
const questionBorder = document.querySelectorAll(".question p");
const sections = document.querySelectorAll("section");

function togglePage() {
  //changes background and text color of page/buttons/icons
  body.classList.toggle("dark-mode");
  nameBtn.classList.toggle("light-mode");
  toggleBtn.classList.toggle("light-mode");
  dmIcon.classList.toggle("light-mode");
  toolTip.classList.toggle("light-mode");

  afIcon.forEach((icon) => icon.classList.toggle("light-mode"));
  nxtBtn.forEach((button) => button.classList.toggle("light-mode"));
  questionBorder.forEach((question) => {
    question.classList.toggle("light-mode");
  });
  sections.forEach((section) => section.classList.toggle("light-mode"));

  //to get the tooltip text to change when toggling dark mode
  if (body.classList.contains("dark-mode")) {
    toolTip.textContent = "Light Mode";
  } else {
    toolTip.textContent = "Dark Mode";
  }
}

toggleBtn.addEventListener("click", togglePage);

//
// Check Answers and give points

let score = 0;

const correctAnswers = [
  "True",
  "False",
  "Sphynx",
  "12–15 years",
  "A litter",
  "Balance and sensing environment",
  ["Meow", "Purr"],
  ["Head-butting", "Kneading"],
  ["Plain cooked chicken", "Cooked fish (boneless)"],
  ["Vision", "Touch"],
];

//
//Functions for code that is used multiple times

//put the inputs into an object.
function getInputs() {
  return {
    q1: document.querySelector("[name=question1]:checked"),
    q2: document.querySelector("[name=question2]:checked"),
    q3: document.querySelector("[name=question3]:checked"),
    q4: document.querySelector("[name=question4]:checked"),
    q5: document.querySelector("[name=question5]:checked"),
    q6: document.querySelector("[name=question6]:checked"),
    q7: Array.from(document.querySelectorAll("[name=question7]:checked")),
    q8: Array.from(document.querySelectorAll("[name=question8]:checked")),
    q9: Array.from(document.querySelectorAll("[name=question9]:checked")),
    q10: Array.from(document.querySelectorAll("[name=question10]:checked")),
  };
}

//get the values of the inputs
function userSelections(obj) {
  return [
    obj.q1.value,
    obj.q2.value,
    obj.q3.value,
    obj.q4.value,
    obj.q5.value,
    obj.q6.value,
    obj.q7.map((element) => element.value),
    obj.q8.map((element) => element.value),
    obj.q9.map((element) => element.value),
    obj.q10.map((element) => element.value),
  ];
}

//render data in the result page
function render(userArray, list, index) {
  let li = document.createElement("li");
  let span1 = document.createElement("span");
  let span2 = document.createElement("span");
  span1.innerText = `${userArray[index]}`;
  li.append(span1, span2);
  list.append(li);

  return { span1, span2 };
}

//
// Checks the user selections and gives score

function checkAnswers() {
  const inputs = getInputs();
  const selectedAnswers = userSelections(inputs);

  //checks radio button selections.

  for (let i = 0; i < selectedAnswers.length - 4; i++) {
    if (selectedAnswers[i] === correctAnswers[i]) {
      score++;
    }
  }

  //checks checkbox selections

  //this gives 2 points if both selected answers are correct, and still gives a point if 1 of the answers is wrong.
  // for (i = 6; i < selectedAnswers.length; i++) {
  //   for (x = 0; x < 2; x++) {
  //     if (selectedAnswers[i][x] === correctAnswers[i][x]) {
  //       score++;
  //     }
  //   }
  // }

  for (let i = 6; i < selectedAnswers.length; i++) {
    const user = selectedAnswers[i];
    const correct = correctAnswers[i];

    const hasWrong = user.some((ans) => !correct.includes(ans));
    const hasCorrect = user.some((ans) => correct.includes(ans));

    // if the selected answer/s contains 1 wrong, continue to the next iteration of the loop.
    if (hasWrong) {
      continue;
    }

    // if at least 1 answer is correct, give a score, we know that the 2nd answer is also correct because of hasWrong.
    if (hasCorrect) {
      score++;
    }
  }
}

//
// Result Page

const resultPage = document.querySelector(".result-page");

function showResult() {
  //scoreboard
  const nameH1 = document.querySelector(".scoreboard h1");
  const nameH1Span = document.querySelector(".scoreboard h1 span");
  const scoreH2 = document.querySelector(".scoreboard h2 span");
  const para = document.querySelector("div p");

  scoreH2.innerText = ` ${score}`;

  console.log(nameInput.value);

  if (nameInput.value === "") {
    nameH1.classList.add("hidden");
  } else {
    nameH1Span.innerText = ` ${nameInput.value}`;
  }

  if (score < 5) {
    para.innerText = "Fail";
    para.style.color = "#dc3545";
  } else if (score > 4 && score < 8) {
    para.innerText = "Good";
    para.style.color = "#FF8C42";
  } else {
    para.innerText = "Excellent";
    para.style.color = "#28a745";
  }

  //showing user answers + correct answers
  const userList = document.querySelector(".user-answers");
  const correctAnswersList = document.querySelector(".correct-answers");

  const inputs = getInputs();
  const selectedAnswers = userSelections(inputs);

  for (let i = 0; i < selectedAnswers.length - 4; i++) {
    const { span1, span2 } = render(selectedAnswers, userList, i);

    if (selectedAnswers[i] === correctAnswers[i]) {
      span1.style.color = "#28a745";
    } else {
      span1.style.color = "#dc3545";
      span2.innerText = `Correct answer: ${correctAnswers[i]}`;
    }
  }

  for (let i = 6; i < selectedAnswers.length; i++) {
    const { span1, span2 } = render(selectedAnswers, userList, i);

    const user = selectedAnswers[i];
    const correct = correctAnswers[i];

    const hasWrong = user.some((ans) => !correct.includes(ans));
    const hasCorrect = user.some((ans) => correct.includes(ans));

    if (!hasWrong && hasCorrect) {
      span1.style.color = "#28a745";
    } else {
      span1.style.color = "#dc3545";
      span2.innerText = `Correct answers: ${correctAnswers[i]}`;
    }
  }
}

//
// Next page button + check whether something was selected + shows result after the last button

nxtBtn.forEach((button, index) => {
  button.addEventListener("click", () => {
    let currentSection = button.closest("section");
    let radioInputs = currentSection.querySelectorAll("[type=radio]");
    let checkboxInputs = currentSection.querySelectorAll("[type=checkbox]");

    // checks what is inside the section, then checks whether it has been selected, if not, stops function and alerts the user, if yes, goes to next page
    if (radioInputs.length > 0) {
      const selected = currentSection.querySelector("[type=radio]:checked");

      if (!selected) {
        alert("Please select an answer");
        return;
      }
    }

    if (checkboxInputs.length > 0) {
      const selected = currentSection.querySelectorAll(
        "[type=checkbox]:checked"
      );

      // to make sure no more than 2 checkboxes are selected
      if (selected.length > 2) {
        alert("Max 2 choices");
        return;
      }

      if (selected.length === 0) {
        alert("Please select 1-2 answer/s");
        return;
      }
    }

    const isLast = index === nxtBtn.length - 1;

    if (isLast) {
      score = 0;

      checkAnswers();
      showResult();
    }

    currentSection.classList.add("hidden");

    let nextSection = button.closest("section").nextElementSibling;
    nextSection.classList.remove("hidden");
  });
});
