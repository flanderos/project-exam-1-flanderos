const url = "https://www.andershellerud.no/wp-json/";
const blogUrlforLandingPage = url + "wp/v2/posts?per_page=3";
const footerContainer = document.querySelector(".footerdivtwo");
const mediaUrl = url + "wp/v2/media?per_page=10";
const blogUrl = url + "wp/v2/posts";
const blogUrl20 = blogUrl + "per_page=20";
const featuredPost = document.querySelector(".featuredpost");
const headerlogo = document.querySelector(".headerlogo");
const featuredImage = document.querySelector(".featuredimage");

const hamburgerIcon = document.querySelector(".hamburgericon");
const xIcon = document.querySelector(".xicon");
const navBar = document.querySelector(".navbarhome");

function showMenu() {
  navBar.classList.add("checked");
  navBar.style.transition = "0.5s";
  hamburgerIcon.style.display = "none";
  xIcon.style.display = "block";

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

hamburgerIcon.addEventListener("click", showMenu);
xIcon.addEventListener("click", hideMenu);

async function getBlogPosts() {
  const response = await fetch(url);
  const data = await response.json();

  headerlogo.innerHTML = `<h1>${data.name}</h1>`;
}

getBlogPosts(url);


let imageOne = "images/joel-jasmin-forestbird-efuwb5eBDrI-unsplash.jpg";
let imageTwo = "images/dominik-dombrowski-KNUp-YBwBSE-unsplash.jpg";
let imageThree = "images/ricardo-gomez-angel-TAhsXhWipwg-unsplash.jpg";

function preloadImages(images) {
  images.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
}

let backgroundImages = [imageOne, imageTwo, imageThree];
let index = 0;
let container = document.querySelector(".container");

function changeBackround() {
  if (container !== null) {
    container.style.opacity = 0;
    setTimeout(function () {
      container.style.backgroundImage = "url(" + backgroundImages[index] + ")";
      index = (index + 1) % backgroundImages.length;
      container.style.opacity = 1;
      setTimeout(changeBackround, 5000);
    }, 1000);
  }
}

preloadImages(backgroundImages);
changeBackround();

async function getBlogDataForIndexPage() {
  const response = await fetch(blogUrlforLandingPage);
  const results = await response.json();

  for (let i = 0; i < results.length; i++) {
    let blogHeading = results[i].title.rendered;
    let blogText = results[i].excerpt.rendered;

    if (featuredPost !== null) {
      featuredPost.innerHTML += `
      <div class="fpcontainer" id="boing">
  	    <h3 class="featuredpostheading">${blogHeading}</h3>
  	    <p class="featuredpostpreview">${blogText}</p>
  	    <a class="postonelink" href="/blog.specific.html?id=${results[i].id}">Read</a>
      </div>
    `;
    }
  }
}
getBlogDataForIndexPage(blogUrlforLandingPage);

//Scroll function

window.addEventListener("load", function () {
  const fpContainer = document.querySelector(".featuredpost");
  const leftBtn = document.querySelector(".scroll-left");
  const rightBtn = document.querySelector(".scroll-right");

  let currentPosition = 0;

  if (leftBtn) {
    leftBtn.addEventListener("click", function () {
      if (currentPosition === -900) {
        fpContainer.style.transform = "TranslateX(0px)";
        currentPosition = 0;
      } else if (currentPosition === -450) {
        fpContainer.style.transform = "TranslateX(450px)";
        currentPosition = 450;
      } else if (currentPosition === 0) {
        fpContainer.style.transform = "TranslateX(900px)";
        currentPosition = 900;
      }
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener("click", function () {
      if (currentPosition === 900) {
        fpContainer.style.transform = "TranslateX(0px)";
        currentPosition = 0;
      } else if (currentPosition === 450) {
        fpContainer.style.transform = "TranslateX(-450px)";
        currentPosition = -450;
      } else if (currentPosition === 0) {
        fpContainer.style.transform = "TranslateX(-900px)";
        currentPosition = -900;
      }
    });
  }
});
