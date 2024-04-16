let xAngle = 0;
let yAngle = 0;
let cubeCycle = false;
let textCubeCycle = true;

let cube = document.getElementById("cube");
let outerLayerCube = document.getElementById("outer__layer-cube");
let earth = document.getElementById("earth");
let leftSideCube = document.getElementById("left");
let backSideCube = document.getElementById("back");
let rightSideCube = document.getElementById("right");
let topSideCube = document.getElementById("top");
let bottomSideCube = document.getElementById("bottom");
let topImageFront = document.getElementById("top__front-image");
let frontSideCube = document.getElementById("front");
let cubeText = document.getElementById("cube__text");
let frontImageCube = document.getElementById("front__image-face");
let textContainer = document.getElementById("cube__text-container");
let footer = document.getElementById("footer__container");

const cubeRotation = function (xAngle, yAngle) {
  cube.style.transform = `rotateX(${xAngle}deg) rotateY(${yAngle}deg)`;
};

const timeoutEffect = (seconds) => {
  seconds = seconds * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, seconds);
  });
};

const changeCubeImages = function () {
  let allImagesSource = Array.from(document.querySelectorAll("body img"));

  allImagesSource.forEach((image) => {
    const pattern = /bad/g;
    const imageSource = image.src;

    if (pattern.test(imageSource)) {
      image.src = image.src.replace(pattern, "good");
    } else {
      image.src = image.src.replace(/good/g, "bad");
    }
  });
};

const hideSidesCube = function () {
  let allCubeSides = Array.from(document.getElementsByClassName("face"));

  allCubeSides.forEach((sides) => {
    sides.classList.remove(`${sides.id}-effect`);
    sides.style.opacity = 0;
  });
};

let firstCubeText = [
  [
    "What We Can Do This Decade",
    "Will Determine Quality of Life",
    "For 8 Billion People on the Planet.",
  ],

  [
    "Only by Working Together Can We Succeed.",
    "40+ Groundbreaking & Transformative",
    "Sustainability & CSR Programs & Initiatives",
    "For Individuals, Influencers & Institutions.",
  ],
];

const textSlideShow = function (array, delay) {
  let index = 0;
  delay = delay * 1000;

  const intervalId = setInterval(() => {
    const text = array[index];
    textContainer.insertAdjacentHTML(
      "beforeend",
      `<h1 class="cube__text">${text}</h1>`
    );
    index++;
    if (index === array.length) {
      clearInterval(intervalId);
    }
  }, delay);
};

const deleteTextSlide = function () {
  let text = textContainer.getElementsByTagName("h1");
  for (let i = text.length - 1; i >= 0; i--) {
    textContainer.removeChild(text[i]);
  }
};

//true will be good to bad gif, and good image background
//false will be bad to good gif, and bad image background
addEventListener("DOMContentLoaded", function () {
  const playCube = function () {
    cubeCycle
      ? (earth.style.background = `url("/images/bad-to-good-earth.gif") 0px 0px / cover`)
      : (earth.style.background = `url("/images/good-to-bad-earth.gif") 0px 0px / cover`);
    earth.style.animation = "background-spin 35s linear infinite";
    earth.style.opacity = 1;
    timeoutEffect(2)
      .then(() => {
        frontSideCube.style.opacity = 1;
        frontSideCube.classList.add("front-effect");
        return timeoutEffect(2);
      })
      .then(() => {
        yAngle += 90;
        cubeRotation(xAngle, yAngle);
      })
      .then(() => {
        leftSideCube.style.opacity = 1;
        leftSideCube.classList.add("left-effect");
        return timeoutEffect(2);
      })
      .then(() => {
        yAngle += 90;
        cubeRotation(xAngle, yAngle);
      })
      .then(() => {
        backSideCube.style.opacity = 1;
        backSideCube.classList.add("back-effect");
        return timeoutEffect(2);
      })
      .then(() => {
        yAngle += 90;
        cubeRotation(xAngle, yAngle);
      })
      .then(() => {
        rightSideCube.style.opacity = 1;
        rightSideCube.classList.add("right-effect");
        return timeoutEffect(2);
      })
      .then(() => {
        xAngle -= 90;
        yAngle += 90;
        cubeRotation(xAngle, yAngle);
      })
      .then(() => {
        topSideCube.style.opacity = 1;
        topSideCube.classList.add("top-effect");
        return timeoutEffect(2);
      })
      .then(() => {
        xAngle += 180;
        cubeRotation(xAngle, yAngle);
      })
      .then(() => {
        bottomSideCube.style.opacity = 1;
        bottomSideCube.classList.add("bottom-effect");
        return timeoutEffect(2);
      })
      .then(() => {
        xAngle += -60;
        yAngle += 0;
        cubeRotation(xAngle, yAngle);
        topImageFront.style.transform = "rotate(180deg)";
        return timeoutEffect(1);
      })
      .then(() => {
        cubeCycle
          ? (earth.style.background = `url("/images/good-earth.jpg") 0px 0px / cover`)
          : (earth.style.background = `url("/images/bad-earth.jpg") 0px 0px / cover`);
        outerLayerCube.classList.add("cube-rotation");
        earth.style.animation =
          "earth-rotate 5s linear infinite, background-spin 35s linear infinite";
        return timeoutEffect(5);
      })
      .then(() => {
        cube.classList.add("active-hover");
        return timeoutEffect(9);
      })
      .then(() => {
        earth.style.opacity = 0;
        earth.style.animation = "background-spin 35s linear infinite";
        hideSidesCube();
        xAngle = 0;
        yAngle = 0;
        cubeRotation(xAngle, yAngle);
        cube.classList.remove("active-hover");
        outerLayerCube.classList.remove("cube-rotation");
        return timeoutEffect(1);
      })
      .then(() => {
        changeCubeImages();
        textSlideShow(firstCubeText[Math.round(Math.random())], 2);
        cubeCycle = !cubeCycle;
        topImageFront.style.transform = "";
        return timeoutEffect(10);
      })
      .then(() => {
        footer.style.opacity = 1;
        deleteTextSlide();
        earth.style.animation = "";
        return timeoutEffect(1);
      })
      .then(() => {
        playCube();
      });
  };
  playCube();
});
