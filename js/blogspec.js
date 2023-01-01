const mainPage = document.querySelector(".specificmain");
const blogBox = document.querySelector(".blogposttext");
const rightSection = document.querySelector(".rightsection");
const commentDisplay = document.querySelector(".comment");
const latestPost = document.querySelector(".latestpost");
const latestUrl = url + "wp/v2/posts?per_page=1";
const commentUrl = url + "wp/v2/comments";
const specBlogUrl = url + "wp/v2/posts?per_page=1";
const catUrl = url + "wp/v2/categories";
const postDate = document.querySelector(".postdate");
const displayUserName = document.querySelector(".commentusername");
const commentInfo = document.querySelector(".commentinfo");
const blogUserName = document.querySelector(".blogpostusername");
const catDisplayForPost = document.querySelector(".specificcategory");
const categoryList = document.querySelector(".post-category-id");

async function generateSpecBlogPost() {
  const response = await fetch(blogUrl);
  const results = await response.json();

  for (let i = 0; i < results.length; i++) {
    let blogHeading = results[i].title.rendered;
    let blogDate = results[i].date;
    let blogText = results[i].content.rendered;

    blogBox.innerHTML = `<h1>${blogHeading}</h1><div class="blogp">${blogText}</div>`;
  }
}

generateSpecBlogPost(blogUrl);

async function showLatesPosts() {
  const response = await fetch(blogUrl);
  const results = await response.json();

  for (let i = 0; i < results.length; i++) {
    let blogHeading = results[i].title.rendered;
    let blogDate = results[i].date;

    latestPost.innerHTML += `
    <a href=""><h4 class="latestspesificheading">${blogHeading}</h4></a>
    <i class="fa-regular fa-clock"></i> <p class="date">${blogDate}</p>`;

    postDate.innerHTML = blogDate;
  }
}

showLatesPosts(latestUrl, url);

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
    console.log(results[i].name);

    let category = results[i].name;

    catDisplayForPost.innerHTML = `${category}`;
    categoryList.innerHTML += `<a href=""><li>${category}</li></a>`;
  }
}

fetchCategories(catUrl);

const searchInput = document.querySelector("#searchfield");
const searchButton = document.querySelector(".srcicon");

searchButton.addEventListener("click", showSearch);

function showSearch() {
  searchInput.style.display = "block";
  searchInput.style.transform = "translateX(0)";
}
