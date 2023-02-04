const mainPage = document.querySelector(".specificmain");
const blogBox = document.querySelector(".blogposttext");
const rightSection = document.querySelector(".rightsection");
const commentDisplay = document.querySelector(".comment");
const latestPost = document.querySelector(".latestpost");
const latestUrl = url + "wp/v2/posts?per_page=3";
const commentUrl = url + "wp/v2/comments/";
const specBlogUrl = url + "wp/v2/posts?per_page=1";
const catUrl = url + "wp/v2/categories";
const postDate = document.querySelector(".postdate");
const displayUserName = document.querySelector(".commentusername");
const commentInfo = document.querySelector(".commentinfo");
const blogUserName = document.querySelector(".blogpostusername");
const catDisplayForPost = document.querySelector(".specificcategory");
const categoryList = document.querySelector(".post-category-id");

//WORK HERE NOW
/* const jacketSpecificContainer = document.querySelector(".flex-container2"); */

const title = document.querySelector("title");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const specificUrl = url + "wp/v2/posts/" + id;

async function generateSpecBlogPost() {
  const response = await fetch(specificUrl);
  const results = await response.json();

  let blogHeading = results.title.rendered;
  let blogDate = results.date;
  let blogText = results.content.rendered;
  let blogCreator = results._links.author;

  title.innerText = blogHeading;

  blogBox.innerHTML = `<h1>${blogHeading}</h1><div class="blogp">${blogText}</div>`;
}

generateSpecBlogPost(specificUrl);

//WORK HERE NOW

async function showLatesPosts() {
  const response = await fetch(blogUrl);
  const results = await response.json();

  for (let i = 0; i < results.length; i++) {
    let blogHeading = results[i].title.rendered;
    let blogDate = results[i].date;

    console.log(results[i]);

    latestPost.innerHTML += `
    <a href="blog.specific.html?id=${results[i].id}"><h4 class="latestspesificheading">${blogHeading}</h4></a>
    <i class="fa-regular fa-clock"></i> <p class="date">${blogDate}</p>`;

    postDate.innerHTML = blogDate;
  }
}

showLatesPosts(specificUrl, url);

/* async function postComments() {}

postComments(); */

async function fetchComments() {
  const response = await fetch(commentUrl);
  const results = await response.json();

  for (let i = 0; i < results.length; i++) {
    let comments = results[i].content.rendered;
    let userName = results[i].author_name;
    let timePosted = results[i].date;

    commentDisplay.innerHTML += `${comments}`;
    displayUserName.innerHTML = `${userName}`;
    commentInfo.innerHTML = `${timePosted}`;
    blogUserName.innerHTML = `${userName}`;
  }
}

fetchComments(commentUrl);

async function fetchCategories() {
  const response = await fetch(catUrl);
  const results = await response.json();

  for (let i = 0; i < results.length; i++) {
    let category = results[i].name;

    catDisplayForPost.innerHTML = `${category}`;
    categoryList.innerHTML += `<a href=""><li>${category}</li></a>`;
  }
}

fetchCategories(catUrl);

//////////////

const searchInput = document.querySelector("#searchfield");
const searchButton = document.querySelector(".srcicon");

function showSearch() {
  searchInput.style.display = "block";
  searchInput.style.transform = "translateX(0)";
}

searchButton.addEventListener("click", showSearch);

///////////////

// VALIDATE FORM

const commentInput = document.querySelector("#blog-post-comment");
const commentError = document.querySelector("#commenterrorforcomment");
const nameInput = document.querySelector("#inputname");
const nameError = document.querySelector("#nameerrorforcomment");
const emailInput = document.querySelector(".emailinput");
const emailError = document.querySelector("#emailerrorforcomment");
const successMessage = document.querySelector(".succeeded");
const commentButton = document.querySelector(".commentbutton");

commentButton.addEventListener("click", validateForm);

function validateForm(event) {
  event.preventDefault();

  if (nameInput.value.trim().length > 0) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }

  if (commentInput.value.trim().length > 0) {
    commentError.style.display = "none";
  } else {
    commentError.style.display = "block";
  }

  if (validateEmail(emailInput.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (
    nameInput.value.trim().length > 0 &&
    commentInput.value.trim().length > 9 &&
    validateEmail(emailInput.value) === true
  ) {
    successMessage.style.display = "block";
  } else {
    successMessage.style.display = "none";
  }
}

validateForm();

commentButton.addEventListener("click", validateForm);

function validateEmail(emailInput) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(emailInput);
  return patternMatches;
}

// VALIDATE FORM

// IMAGE HOVER

const figure = document.querySelector(".blogp");

function enlargeImage() {
  console.log("Yes!");
}

figure.addEventListener("click", enlargeImage);
// IMAGE HOVER
