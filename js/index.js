const url = "https://skole.vorsbrothers.no/wp-json/";
const blogUrlforLandingPage = url + "wp/v2/posts?per_page=1";
const blogUrl = url + "wp/v2/posts?per_page=5";
const featuredPost = document.querySelector(".toppostcontainer");
const headerlogo = document.querySelector(".headerlogo");
const navBar = document.querySelector(".navbarhome");

async function getBlogPosts() {
  const response = await fetch(url);
  const data = await response.json();

  headerlogo.innerHTML = `<h1>${data.name}</h1>`;
}

getBlogPosts(url);

async function getBlogDataForIndexPage() {
  const response = await fetch(blogUrlforLandingPage);
  const results = await response.json();

  for (let i = 0; i < results.length; i++) {
    let blogHeading = results[i].title.rendered;
    let blogText = results[i].excerpt.rendered;

    const footerCont = document.querySelector(".blogfooter");
    const footerHeading = document.querySelector(".blogfooth1");
    const footerText = document.querySelector(".blogfoottext");

    featuredPost.innerHTML += `<button class="scrolleft"><i class="fa-solid fa-arrow-left"></i></button>
    <div class="featuredpost">
        <div class="featuredpostimage"></div>
  	    <h3 class="featuredpostheading">${blogHeading}</h3>
  	    <p class="featuredpostpreview">${blogText}</p>
  	    <a class="postonelink" href="/blog.specific.html">Read</a>
    </div>
    <button class="scroll-right"><i class="fa-solid fa-arrow-right"></i></button>`;
  }

  //This will be the scroll function

  const leftButton = document.querySelector(".scrolleft");
  leftButton.addEventListener("click", leftClick);

  function leftClick() {
    console.log("hello");
  }

  const rightButton = document.querySelector(".scroll-right");
  rightButton.addEventListener("click", rightClick);

  function rightClick() {
    console.log("hello");

    //This will be the scroll function
  }
}

getBlogDataForIndexPage(blogUrlforLandingPage);

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
