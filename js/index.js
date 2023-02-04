const url = "https://skole.vorsbrothers.no/wp-json/";
//Change here for number of featured posts on landing page
const blogUrlforLandingPage = url + "wp/v2/posts?per_page=3";
//
const mediaUrl = url + "wp/v2/media?per_page=10";
const blogUrl = url + "wp/v2/posts/";
const featuredPost = document.querySelector(".featuredpost");
const headerlogo = document.querySelector(".headerlogo");
const navBar = document.querySelector(".navbarhome");
const featuredImage = document.querySelector(".featuredimage");

async function getBlogPosts() {
  const response = await fetch(url);
  const data = await response.json();

  headerlogo.innerHTML = `<h1>${data.name}</h1>`;
}

getBlogPosts(url);

/////////////////////////

//////////////////////////

async function getBlogDataForIndexPage() {
  const response = await fetch(blogUrlforLandingPage);
  const results = await response.json();

  for (let i = 0; i < results.length; i++) {
    let blogHeading = results[i].title.rendered;
    let blogText = results[i].excerpt.rendered;
    let image = results[i].featured_media;

    const footerCont = document.querySelector(".blogfooter");
    const footerHeading = document.querySelector(".blogfooth1");
    const footerText = document.querySelector(".blogfoottext");

    featuredPost.innerHTML += `
      <div class="fpcontainer" id="boing">
  	    <h3 class="featuredpostheading">${blogHeading}</h3>
  	    <p class="featuredpostpreview">${blogText}</p>
  	    <a class="postonelink" href="/blog.specific.html?id=${results[i].id}">Read</a>
      </div>
    `;
  }
}
getBlogDataForIndexPage(blogUrlforLandingPage);

//This will be the scroll function

//This will be the scroll function

//MENUSCRIPT

const hamburgerIcon = document.querySelector(".hamburgericon");
const xIcon = document.querySelector(".xicon");

hamburgerIcon.addEventListener("click", showMenu);
xIcon.addEventListener("click", hideMenu);

function showMenu() {
  navBar.classList.add("checked");
  navBar.style.transition = "0.3s";
  hamburgerIcon.style.display = "none";

  if (hamburgerIcon.style.display === "none") {
    xIcon.style.display = "block";
  } else if (hamburgerIcon.style.display === "block") {
    xIcon.style.display = "none";
  }
}

function hideMenu() {
  navBar.classList.remove("checked");
  xIcon.style.display = "none";
  hamburgerIcon.style.display = "block";
}

async function getMediaForFeaturedPost() {
  const response = await fetch(mediaUrl);
  const results = await response.json();

  for (let i = 0; i < results.length; i++) {
    console.log(results[i].id);
    const image = results[i].id;

    featuredImage.innerHTML = `<img src = "${image}"/>`;
  }
}
getMediaForFeaturedPost(mediaUrl);
