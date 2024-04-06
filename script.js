let xAngle = 0;
let yAngle = 0;
let cubeCycle = false;

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

const cubeRotation = function (xAngle, yAngle) {
  cube.style.transform = `rotateX(${xAngle}deg) rotateY(${yAngle}deg)`;
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

//true will be good to bad gif, and good image background
//false will be bad to good gif, and bad image background

addEventListener("DOMContentLoaded", function () {
  const playCube = function () {
    cubeCycle
      ? (earth.style.background = `url("/images/bad-to-good-earth.gif") 0px 0px / cover`)
      : (earth.style.background = `url("/images/good-to-bad-earth.gif") 0px 0px / cover`);
    earth.style.animation = "background-spin 30s linear infinite";
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
          "earth-rotate 5s linear infinite, background-spin 30s linear infinite";
        return timeoutEffect(5);
      })
      .then(() => {
        cube.classList.add("active-hover");
        return timeoutEffect(9);
      })
      .then(() => {
        earth.style.opacity = 0;
        earth.style.animation = "background-spin 30s linear infinite";
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
        cubeCycle = !cubeCycle;
        topImageFront.style.transform = "";
        cubeText.style.opacity = 1;
        return timeoutEffect(3);
      })
      .then(() => {
        earth.style.animation = "";
        cubeText.style.opacity = 0;
        return timeoutEffect(1);
      })
      .then(() => {
        playCube();
      });
  };
  playCube();
});
