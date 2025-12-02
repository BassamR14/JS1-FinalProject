//Create welcome message.
const nameInput = document.querySelector("#name");
const nameBtn = document.querySelector(".submit-name");
const introLabel = document.querySelector(".intro-label");
const intro = document.querySelector(".introduction");
const nxtBtn = document.querySelectorAll(".next-page");
const div = document.querySelector("div");

function welcomeMessage() {
  const name = nameInput.value;
  introLabel.style.display = "none";
  nameBtn.style.display = "none";

  const introMsg = document.createElement("h2");
  introMsg.innerText = `Welcome ${name} and good luck!`;
  // intro.insertBefore(introMsg, nxtBtn);
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
const sections = document.querySelectorAll(".question");

function togglePage() {
  //changes background and text color of page
  body.classList.toggle("dark-mode");
  //changes button background and text color
  // submitBtn.classList.toggle("light-mode");
  nameBtn.classList.toggle("light-mode");
  toggleBtn.classList.toggle("light-mode");
  dmIcon.classList.toggle("light-mode");
  afIcon.forEach((icon) => icon.classList.toggle("light-mode"));
  toolTip.classList.toggle("light-mode");
  nxtBtn.forEach((button) => button.classList.toggle("light-mode"));

  //to change the border color of the sections
  sections.forEach((section) => {
    section.classList.toggle("white-border");
  });

  //to get the tooltip text to change when toggling dark mode
  if (body.classList.contains("dark-mode")) {
    toolTip.textContent = "Light Mode";
  } else {
    toolTip.textContent = "Dark Mode";
  }
}

toggleBtn.addEventListener("click", togglePage);

//
// Next page button + check whether something was selected

nxtBtn.forEach((button) => {
  button.addEventListener("click", () => {
    let section = button.closest("section");
    let radioInputs = section.querySelectorAll("[type=radio]");
    let checkboxInputs = section.querySelectorAll("[type=checkbox]");

    // checks what is inside the section, then checks whether it has been selected, if not, stops function and alerts the user, if yes, goes to next page
    if (radioInputs.length > 0) {
      const selected = section.querySelector("[type=radio]:checked");

      if (!selected) {
        alert("Please select an answer");
        return;
      }
    }

    if (checkboxInputs.length > 0) {
      const selected = Array.from(
        section.querySelectorAll("[type=checkbox]:checked")
      ).map((answer) => answer.value);

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

    let currentSection = button.closest("section");
    currentSection.classList.add("hidden");

    let nextSection = button.closest("section").nextElementSibling;
    nextSection.classList.remove("hidden");
  });
});

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

//To get input values in multiple functions
function getQuizInputs() {
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

function checkAnswers() {
  // const q1Input = document.querySelector("[name=question1]:checked");
  // const q2Input = document.querySelector("[name=question2]:checked");
  // const q3Input = document.querySelector("[name=question3]:checked");
  // const q4Input = document.querySelector("[name=question4]:checked");
  // const q5Input = document.querySelector("[name=question5]:checked");
  // const q6Input = document.querySelector("[name=question6]:checked");
  // const q7Input = Array.from(
  //   document.querySelectorAll("[name=question7]:checked")
  // );
  // const q8Input = Array.from(
  //   document.querySelectorAll("[name=question8]:checked")
  // );
  // const q9Input = Array.from(
  //   document.querySelectorAll("[name=question9]:checked")
  // );
  // const q10Input = Array.from(
  //   document.querySelectorAll("[name=question10]:checked")
  // );

  // const selectedAnswers = [
  //   q1Input.value,
  //   q2Input.value,
  //   q3Input.value,
  //   q4Input.value,
  //   q5Input.value,
  //   q6Input.value,
  //   q7Input.map((element) => element.value),
  //   q8Input.map((element) => element.value),
  //   q9Input.map((element) => element.value),
  //   q10Input.map((element) => element.value),
  // ];

  const inputs = getQuizInputs();

  const selectedAnswers = [
    inputs.q1.value,
    inputs.q2.value,
    inputs.q3.value,
    inputs.q4.value,
    inputs.q5.value,
    inputs.q6.value,
    inputs.q7.map((el) => el.value),
    inputs.q8.map((el) => el.value),
    inputs.q9.map((el) => el.value),
    inputs.q10.map((el) => el.value),
  ];

  //checks radio button selections.

  for (i = 0; i < selectedAnswers.length - 4; i++) {
    if (selectedAnswers[i] === correctAnswers[i]) {
      score++;
    }
  }

  //this gives 2 points if both selected answers are correct, and still gives a point if 1 of the answers is wrong.
  // for (i = 6; i < selectedAnswers.length; i++) {
  //   for (x = 0; x < 2; x++) {
  //     if (selectedAnswers[i][x] === correctAnswers[i][x]) {
  //       score++;
  //     }
  //   }
  // }

  //checks checkbox selections

  for (i = 6; i < selectedAnswers.length; i++) {
    const user = selectedAnswers[i];
    const correct = correctAnswers[i];

    const hasWrong = user.some((ans) => !correct.includes(ans));
    const hasAtLeastOneCorrect = user.some((ans) => correct.includes(ans));

    // if the selected answer/s contains 1 wrong, continue to the next iteration of the loop.
    if (hasWrong) {
      continue;
    }

    // if at least 1 answer is correct, give a score, we know that the 2nd answer is also correct because of hasWrong.
    if (hasAtLeastOneCorrect) {
      score++;
    }
  }
}

//
// Result Page

const resultPage = document.querySelector(".result-page");

function showResult() {
  //scoreboard
  const nameH1 = document.querySelector(".scoreboard h1 span");
  const scoreH2 = document.querySelector(".scoreboard h2 span");
  const para = document.querySelector("div p");
  const image = document.querySelector("div img");

  nameH1.innerText = ` ${nameInput.value}`;
  scoreH2.innerText = ` ${score}`;

  if (score < 5) {
    para.innerText = "Fail";
    para.style.color = "red";
  } else if (score > 4 && score < 8) {
    para.innerText = "Good";
    para.style.color = "orange";
  } else {
    para.innerText = "Excellent";
    para.style.color = "green";
  }

  //showing user answers + correct answers
  const userList = document.querySelector(".user-answers");
  const correctAnswersList = document.querySelector(".correct-answers");

  const inputs = getQuizInputs();

  const selectedAnswers = [
    inputs.q1.value,
    inputs.q2.value,
    inputs.q3.value,
    inputs.q4.value,
    inputs.q5.value,
    inputs.q6.value,
    inputs.q7.map((el) => el.value),
    inputs.q8.map((el) => el.value),
    inputs.q9.map((el) => el.value),
    inputs.q10.map((el) => el.value),
  ];

  for (i = 0; i < selectedAnswers.length; i++) {
    let li = document.createElement("li");
    li.innerText = `${selectedAnswers[i]}`;
    userList.append(li);
    console.log(correctAnswers[i]);
    let li2 = document.createElement("li");
    li2.innerText = `${correctAnswers[i]}`;
    correctAnswersList.append(li2);
  }
}

// Check result button

const checkResultBtn = document.querySelector(".check-result");

checkResultBtn.addEventListener("click", () => {
  //clear correct answers.
  score = 0;

  checkAnswers();
  // console.log(score);
  showResult();

  const currentSection = checkResultBtn.closest("section");
  currentSection.classList.add("hidden");

  const nextSection = checkResultBtn.closest("section").nextElementSibling;
  nextSection.classList.remove("hidden");
});
