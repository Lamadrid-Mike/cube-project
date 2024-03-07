let xAngle = 0;
let yAngle = 0;

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

const cubeRotation = function (xAngle, yAngle) {
  cube.style.transform = `rotateX(${xAngle}deg) rotateY(${yAngle}deg)`;
};

//change background function!
const earthBackground = () => {
  earth.style.background
    ? (earth.style.background = "")
    : (earth.style.background = `url("/images/good-earth.jpg")`);
};

const timeoutEffect = (seconds) => {
  seconds = seconds * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, seconds);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  playCube();
});

const changeCubeImages = function () {
  let allImagesSource = Array.from(document.querySelectorAll("body img"));

  allImagesSource.forEach((image) => {
    image.src = image.src.replace(/bad/g, "good");
  });
};

const hideSidesCube = function () {
  let allCubeSides = Array.from(document.getElementsByClassName("face"));

  earth.style.animation = "";

  allCubeSides.forEach((sides) => {
    sides.classList.remove(`${sides.id}-effect`);
    sides.style.opacity = 0;
  });
};

const playCube = function () {
  timeoutEffect(2)
    .then(() => {
      frontSideCube.style.opacity = 1;
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
      outerLayerCube.classList.add("cube-rotation");
      earth.style.animation =
        "earth-rotate 5s linear infinite, background-spin 15s infinite";
      return timeoutEffect(4);
    })
    .then(() => {
      cube.classList.add("active-hover");
      return timeoutEffect(5);
    })
    .then(() => {
      xAngle = 0;
      yAngle = 0;
      cubeRotation(xAngle, yAngle);
      cube.classList.remove("active-hover");
      outerLayerCube.classList.remove("cube-rotation");
      hideSidesCube();
      return timeoutEffect(1);
    })
    .then(() => {
      changeCubeImages();
      return timeoutEffect(2);
    })
    .then(() => {
      playCube();
    });
};
