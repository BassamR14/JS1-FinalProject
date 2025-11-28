//Create welcome message.
const nameInput = document.querySelector("#name");
const nameBtn = document.querySelector(".submit-name");
const intro = document.querySelector(".introduction");

function welcomeMessage() {
  const name = nameInput.value;
  intro.style.display = "none";

  const introMsg = document.createElement("h2");
  introMsg.innerText = `Welcome ${name} and good luck!`;
  body.insertBefore(introMsg, toggleBtn);
}

nameBtn.addEventListener("click", welcomeMessage);

//
// Toggle button changes style of page - dark mode -light mode
const toggleBtn = document.querySelector(".toggle");
const icon = document.querySelector(".material-symbols-outlined");
const body = document.querySelector("body");
const toolTip = document.querySelector(".tooltip-text");
const sections = document.querySelectorAll(".question");

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

  //checks if radio inputs are null, if checkbox length is 0
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

  //
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

let correctAnswers = 0;

function checkRadioAnswers() {
  const q1Input = document.querySelector("[name=question1]:checked");
  const q2Input = document.querySelector("[name=question2]:checked");
  const q3Input = document.querySelector("[name=question3]:checked");
  const q4Input = document.querySelector("[name=question4]:checked");
  const q5Input = document.querySelector("[name=question5]:checked");
  const q6Input = document.querySelector("[name=question6]:checked");

  const radioArray = [q1Input, q2Input, q3Input, q4Input, q5Input, q6Input];

  //returns how many correct answers(points) the user has gotten
  radioArray.forEach((input) => {
    if (input.value === "correct") {
      correctAnswers += 1;
      input.closest(".question").style.backgroundColor = "green";
    } else {
      input.closest(".question").style.backgroundColor = "red";
    }
  });
}

//
//Checkboxes

function checkCheckboxAnswers() {
  //turned into arrays so some() could be used.
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

  //so if they picked 1 or 2
  const checkboxArray = [q7Input, q8Input, q9Input, q10Input];

  //returns how many correct answers the user got i.e. returns points.
  checkboxArray.forEach((input) => {
    //this wouldn't work if the user picked 1 correct and 1 wrong.
    // if (input.some((answer) => answer.value === "correct")) {
    //   console.log(input);
    //   correctAnswers += 1;
    // }

    //find out how many correct answers were selected
    const correctSelected = input.filter(
      (answer) => answer.value === "correct"
    ).length;

    //find out how many wrong answers were selected
    const wrongSelected = input.filter(
      (answer) => answer.value === "wrong"
    ).length;

    //to get a point
    if (wrongSelected === 0 && correctSelected > 0 && input.length <= 2) {
      correctAnswers += 1;
      input[0].closest(".question").style.backgroundColor = "green";
    } else {
      input[0].closest(".question").style.backgroundColor = "red";
    }
  });
}

//
// Submit button

const submitBtn = document.querySelector(".submit");

submitBtn.addEventListener("click", () => {
  //clear correct answers.
  correctAnswers = 0;

  //to make sure all inputs are filled then run the other functions.
  if (!checkInputs()) {
    return;
  }

  checkRadioAnswers();
  checkCheckboxAnswers();
  console.log(correctAnswers);
});
