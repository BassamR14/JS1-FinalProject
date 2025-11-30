//Create welcome message.
const nameInput = document.querySelector("#name");
const nameBtn = document.querySelector(".submit-name");
const introLabel = document.querySelector(".intro-label");
const intro = document.querySelector(".introduction");
const nxtBtn = document.querySelectorAll(".next-page");

function welcomeMessage() {
  const name = nameInput.value;
  introLabel.style.display = "none";
  nameBtn.style.display = "none";

  const introMsg = document.createElement("h2");
  introMsg.innerText = `Welcome ${name} and good luck!`;
  intro.insertBefore(introMsg, nxtBtn);
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
// Next page button

nxtBtn.forEach((button) => {
  button.addEventListener("click", () => {
    let currentSection = button.closest("section");
    currentSection.classList.add("hidden");

    let nextSection = button.closest("section").nextElementSibling;
    nextSection.classList.remove("hidden");
  });
});

//
// Check if all inputs are filled

function checkInputs() {
  const q1Input = document.querySelector("[name=question1]:checked");
  const q2Input = document.querySelector("[name=question2]:checked");
  const q3Input = document.querySelector("[name=question3]:checked");
  const q4Input = document.querySelector("[name=question4]:checked");
  const q5Input = document.querySelector("[name=question5]:checked");
  const q6Input = document.querySelector("[name=question6]:checked");
  const q7Input = Array.from(
    document.querySelectorAll("[name=question7]:checked")
  );
  const q8Input = Array.from(
    document.querySelectorAll("[name=question8]:checked")
  );
  const q9Input = Array.from(
    document.querySelectorAll("[name=question9]:checked")
  );
  const q10Input = Array.from(
    document.querySelectorAll("[name=question10]:checked")
  );

  //checks if radio inputs are null, if checkbox length is 0, i.e. if nothing was selected
  if (
    !q1Input ||
    !q2Input ||
    !q3Input ||
    !q4Input ||
    !q5Input ||
    !q6Input ||
    q7Input.length === 0 ||
    q8Input.length === 0 ||
    q9Input.length === 0 ||
    q10Input.length === 0
  ) {
    alert("Answer all questions please.");
    return false;
  }

  // checks if more than 2 boxes were checked
  if (
    q7Input.length > 2 ||
    q8Input.length > 2 ||
    q9Input.length > 2 ||
    q10Input.length > 2
  ) {
    alert("Max 2 choices");
    return false;
  }

  return true;
}

//
// Radio buttons

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

function checkAnswers() {
  const q1Input = document.querySelector("[name=question1]:checked");
  const q2Input = document.querySelector("[name=question2]:checked");
  const q3Input = document.querySelector("[name=question3]:checked");
  const q4Input = document.querySelector("[name=question4]:checked");
  const q5Input = document.querySelector("[name=question5]:checked");
  const q6Input = document.querySelector("[name=question6]:checked");
  const q7Input = Array.from(
    document.querySelectorAll("[name=question7]:checked")
  );
  const q8Input = Array.from(
    document.querySelectorAll("[name=question8]:checked")
  );
  const q9Input = Array.from(
    document.querySelectorAll("[name=question9]:checked")
  );
  const q10Input = Array.from(
    document.querySelectorAll("[name=question10]:checked")
  );

  const selectedAnswers = [
    q1Input.value,
    q2Input.value,
    q3Input.value,
    q4Input.value,
    q5Input.value,
    q6Input.value,
    q7Input.map((element) => element.value),
    q8Input.map((element) => element.value),
    q9Input.map((element) => element.value),
    q10Input.map((element) => element.value),
  ];

  // console.log(selectedAnswers, correctAnswers);

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
// Result Message

// function showResult() {
//   let div = document.createElement("div");
//   div.classList.add("result");
//   let para = document.createElement("p");

//   if (score < 5) {
//     para.innerHTML = `Score: ${score}/10. You have brought shame to your family. `;
//     // para.style.color = "red";
//     div.style.backgroundColor = "#dc3545";
//   } else if (score > 4 && score < 8) {
//     para.innerHTML = `Score: ${score}/10. You have done well enough. `;
//     // para.style.color = "orange";
//     div.style.backgroundColor = "orange";
//   } else {
//     para.innerHTML = `Score: ${score}/10. You have pleased the gods. `;
//     // para.style.color = "green";
//     div.style.backgroundColor = "#28a745";
//   }

//   body.append(div);
//   div.append(para);
// }

//
// Submit button

// const submitBtn = document.querySelector(".submit");

// submitBtn.addEventListener("click", () => {
//   //clear correct answers.
//   score = 0;

//   //to make sure all inputs are filled then run the other functions.
//   if (!checkInputs()) {
//     return;
//   }

//   checkAnswers();
//   console.log(score);
//   // showResult();
// });
