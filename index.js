//prepare welcome message, refer to name + button and create welcome message.
let nameInput = document.querySelector("#name");
let nameBtn = document.querySelector(".submit-name");
let intro = document.querySelector(".introduction");

function welcomeMessage() {
  let name = nameInput.value;
  intro.style.display = "none";

  let introMsg = document.createElement("h2");
  introMsg.innerText = `Welcome ${name} and good luck`;
  body.insertBefore(introMsg, toggleBtn);
}

nameBtn.addEventListener("click", welcomeMessage);

//
// Toggle button changes style of page - dark mode -light mode
let toggleBtn = document.querySelector(".toggle");
let icon = document.querySelector(".material-symbols-outlined");
let body = document.querySelector("body");
let toolTip = document.querySelector(".tooltiptext");
let sections = document.querySelectorAll(".question");

function togglePage() {
  //changes background and text color of page
  body.classList.toggle("dark-mode");
  //changes button background and text color
  submitBtn.classList.toggle("light-mode");
  nameBtn.classList.toggle("light-mode");
  toggleBtn.classList.toggle("light-mode");
  icon.classList.toggle("light-mode");
  toolTip.classList.toggle("light-mode");

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
// Radio buttons

let correctAnswers = 0;

function checkRadioAnswers() {
  let q1Input = document.querySelector("[name=question1]:checked");
  let q2Input = document.querySelector("[name=question2]:checked");
  let q3Input = document.querySelector("[name=question3]:checked");
  let q4Input = document.querySelector("[name=question4]:checked");
  let q5Input = document.querySelector("[name=question5]:checked");
  let q6Input = document.querySelector("[name=question6]:checked");

  if (!q1Input || !q2Input || !q3Input || !q4Input || !q5Input || !q6Input) {
    alert("Answer all the questions please.");
    return;
  } else {
    let radioArray = [
      q1Input.value,
      q2Input.value,
      q3Input.value,
      q4Input.value,
      q5Input.value,
      q6Input.value,
    ];

    //returns how many correct answers the user has gotten + changes the background color of each section to represent correct/wrong answer.
    radioArray.forEach((answer) => {
      if (answer === "correct") {
        correctAnswers += 1;
      }
    });
  }
}

//
// Submit button

let submitBtn = document.querySelector(".submit");

submitBtn.addEventListener("click", () => {
  checkRadioAnswers();
  console.log(correctAnswers);
});
