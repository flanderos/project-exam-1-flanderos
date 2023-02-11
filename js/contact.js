async function getBlogPosts() {
  const response = await fetch(url);
  const data = await response.json();

  headerlogo.innerHTML = `<h1>${data.name}</h1>`;
}

getBlogPosts(url);

const emailError = document.querySelector("#emailerror");
const emailInput = document.querySelector(".emailinput");
const nameError = document.querySelector("#nameerror");
const nameInput = document.querySelector(".nameinput");
const messageError = document.querySelector("#messageerror");
const messageInput = document.querySelector(".message");
const submitButton = document.querySelector(".submitbtn");
const success = document.querySelector(".success");
const subjectError = document.querySelector("#subjecterror");
const subjectInput = document.querySelector("#subject");

submitButton.addEventListener("click", validateForm);

function validateForm(event) {
  if (event) {
    event.preventDefault();

    if (nameInput.value.trim().length > 1) {
      nameError.style.display = "none";
    } else {
      nameError.style.display = "block";
    }

    if (messageInput.value.trim().length > 1) {
      messageError.style.display = "none";
    } else {
      messageError.style.display = "block";
    }

    if (subjectInput.value.trim().length > 1) {
      subjectError.style.display = "none";
    } else {
      subjectError.style.display = "block";
    }

    if (validateEmail(emailInput.value) === true) {
      emailError.style.display = "none";
    } else {
      emailError.style.display = "block";
    }

    if (
      nameInput.value.trim().length > 0 &&
      messageInput.value.trim().length > 9 &&
      validateEmail(emailInput.value) === true &&
      subjectInput.value.trim().lenght > 1
    ) {
      success.style.display = "block";
    } else {
      success.style.display = "none";
    }
  }
}

validateForm();

submitButton.addEventListener("click", validateForm);

function validateEmail(emailInput) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(emailInput);
  return patternMatches;
}
