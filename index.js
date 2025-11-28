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
// Radio buttons

let correctAnswers = 0;

function checkRadioAnswers() {
  const q1Input = document.querySelector("[name=question1]:checked");
  const q2Input = document.querySelector("[name=question2]:checked");
  const q3Input = document.querySelector("[name=question3]:checked");
  const q4Input = document.querySelector("[name=question4]:checked");
  const q5Input = document.querySelector("[name=question5]:checked");
  const q6Input = document.querySelector("[name=question6]:checked");

  if (!q1Input || !q2Input || !q3Input || !q4Input || !q5Input || !q6Input) {
    alert("Answer all the questions please.");
    return;
  } else {
    const radioArray = [q1Input, q2Input, q3Input, q4Input, q5Input, q6Input];

    const radioValue = [
      q1Input.value,
      q2Input.value,
      q3Input.value,
      q4Input.value,
      q5Input.value,
      q6Input.value,
    ];

    //returns how many correct answers(points) the user has gotten
    radioValue.forEach((answer) => {
      if (answer === "correct") {
        correctAnswers += 1;
      }
    });
  }
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

  //to check that the user has picked at least one checkbox
  if (
    q7Input.length === 0 ||
    q8Input.length === 0 ||
    q9Input.length === 0 ||
    q10Input.length === 0
  ) {
    alert("Answer all questions please.");
    console.log(q7Input);
    return;
  } else {
    // to check that the hasn't picked more than 2 checkboxes
    if (
      q7Input.length > 2 ||
      q8Input.length > 2 ||
      q9Input.length > 2 ||
      q10Input.length > 2
    ) {
      alert("Max 2 choices");
      return;
    } else {
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
        if (wrongSelected === 0 && correctSelected > 0) {
          correctAnswers += 1;
        }
      });
    }
  }
}

//
// Submit button

const submitBtn = document.querySelector(".submit");

submitBtn.addEventListener("click", () => {
  //clear correct answers.
  correctAnswers = 0;

  checkRadioAnswers();
  checkCheckboxAnswers();
  console.log(correctAnswers);
});
