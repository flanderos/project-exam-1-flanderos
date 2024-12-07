// DOM-elementer
const mainPage = document.querySelector(".specificmain");
const blogBox = document.querySelector(".blogposttext");
const latestPost = document.querySelector(".latestpost");
const commentDisplay = document.querySelector(".comment");
const postDate = document.querySelector(".postdate");
const catDisplayForPost = document.querySelector(".specificcategory");
const commentButton = document.querySelector(".commentbutton");

// Konfigurasjon
const blogUrl = "https://your-blog-api-url.com/wp-json/wp/v2/posts";
const commentUrl = "https://your-blog-api-url.com/wp-json/wp/v2/comments";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const specificUrl = `${blogUrl}/${id}`;
const catUrl = `https://your-blog-api-url.com/wp-json/wp/v2/categories?post=${id}`;


async function generateSpecBlogPost() {
  try {
    const [postResponse, categoryResponse] = await Promise.all([
      fetch(specificUrl),
      fetch(catUrl),
    ]);

    if (!postResponse.ok || !categoryResponse.ok) {
      throw new Error("Failed to fetch blog post or categories.");
    }

    const post = await postResponse.json();
    const categories = await categoryResponse.json();

    renderBlogPost(post);
    renderCategories(categories);
  } catch (error) {
    console.error("Error fetching specific blog post:", error);
    blogBox.innerHTML = `<p class="error-message">Could not load the blog post. Please try again later.</p>`;
  }
}


function renderBlogPost(post) {
  const blogHeading = post.title.rendered;
  const blogText = post.content.rendered;

  document.title = blogHeading;
  blogBox.innerHTML = `
    <h1>${blogHeading}</h1>
    <div class="blogp">${blogText}</div>
  `;
}


function renderCategories(categories) {
  if (categories.length > 0) {
    const postCategory = categories[0].name;
    catDisplayForPost.innerHTML = `<span>${postCategory}</span>`;
  }
}


async function showLatestPosts() {
  try {
    const response = await fetch(`${blogUrl}?per_page=3`);
    if (!response.ok) throw new Error("Failed to fetch latest posts.");

    const posts = await response.json();
    renderLatestPosts(posts);
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    latestPost.innerHTML = `<p class="error-message">Could not load latest posts. Please try again later.</p>`;
  }
}


function renderLatestPosts(posts) {
  latestPost.innerHTML = posts
    .map(
      (post) => `
      <a href="blog.specific.html?id=${post.id}">
        <h4 class="latestspesificheading">${post.title.rendered}</h4>
      </a>
      <i class="fa-regular fa-clock"></i> <p class="date">${new Date(post.date).toLocaleDateString()}</p>
    `
    )
    .join("");
}


async function fetchComments() {
  try {
    const response = await fetch(`${commentUrl}?post=${id}`);
    if (!response.ok) throw new Error("Failed to fetch comments.");

    const comments = await response.json();
    renderComments(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    commentDisplay.innerHTML = `<p class="error-message">Could not load comments. Please try again later.</p>`;
  }
}


function renderComments(comments) {
  if (comments.length === 0) {
    commentDisplay.innerHTML = `<p>No comments yet.</p>`;
    return;
  }

  commentDisplay.innerHTML = comments
    .map(
      (comment) => `
      <div class="comment-block">
        <p><strong>${comment.author_name}</strong> - ${new Date(
        comment.date
      ).toLocaleDateString()}</p>
        <div>${comment.content.rendered}</div>
      </div>
    `
    )
    .join("");
}


function validateAndSubmitComment(event) {
  event.preventDefault();

  const commentInput = document.querySelector("#blog-post-comment");
  const nameInput = document.querySelector("#inputname");
  const emailInput = document.querySelector(".emailinput");
  const successMessage = document.querySelector(".succeeded");

  let isValid = true;


  if (nameInput.value.trim().length === 0) {
    document.querySelector("#nameerrorforcomment").style.display = "block";
    isValid = false;
  } else {
    document.querySelector("#nameerrorforcomment").style.display = "none";
  }


  if (commentInput.value.trim().length <= 9) {
    document.querySelector("#commenterrorforcomment").style.display = "block";
    isValid = false;
  } else {
    document.querySelector("#commenterrorforcomment").style.display = "none";
  }


  const isValidEmail = /\S+@\S+\.\S+/.test(emailInput.value);
  if (!isValidEmail) {
    document.querySelector("#emailerrorforcomment").style.display = "block";
    isValid = false;
  } else {
    document.querySelector("#emailerrorforcomment").style.display = "none";
  }

  if (isValid) {
    successMessage.style.display = "block";

    console.log("Kommentar sendt.");
  } else {
    successMessage.style.display = "none";
  }
}


if (commentButton) {
  commentButton.addEventListener("click", validateAndSubmitComment);
}


generateSpecBlogPost();
showLatestPosts();
fetchComments();
