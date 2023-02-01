let responsiveAccordian = function () {
  let responsiveClick = document.querySelector(".main-heading-ps");
  let navbar = document.getElementById("navbar"),
    fadeInInterval,
    fadeOutInterval;
  let navbarHeiht = navbar.offsetHeight;
  console.log(navbarHeiht);

  if (window.innerWidth < 1000) {
    navbar.classList.remove("visable");
    navbar.classList.add("invisable");

    responsiveClick.addEventListener("click", function (e) {
      e.preventDefault();
      navbar.classList.toggle("visable");
      navbar.classList.toggle("invisable");
    });
  }
};

export { responsiveAccordian };

// responsiveClick.addEventListener("click", function () {
//   clearInterval(fadeInInterval);
//   clearInterval(fadeOutInterval);

//   navbar.fadeOut = function (timing) {
//     var newValue = 1;
//     navbar.style.height = 200;
//     navbar.style.opacity = 1;

//     fadeOutInterval = setInterval(function () {
//       if (newValue > 0) {
//         newValue -= 10;
//       } else if (newValue < 0) {
//         navbar.style.height = 0;
//         navbar.style.opacity = 0;
//         clearInterval(fadeOutInterval);
//       }

//       elem.style.opacity = newValue;
//     }, timing);
//   };

//   elem.fadeOut(10);
// });

/*
if (navbarHeiht == 20) {
      navbar.style.opacity = 0;
      navbar.style.display = "flex";
      navbar.style.overflow = "hidden";
      navbar.style.height = 0;
      responsiveClick.addEventListener("click", function (e) {
        e.preventDefault();

        clearInterval(fadeInInterval);
        clearInterval(fadeOutInterval);

        navbar.fadeIn = function (timing) {
          var newValue = 0;

          // navbar.style.display = "flex";
          // navbar.style.height = 0;

          fadeInInterval = setInterval(function () {
            if (newValue < 190) {
              newValue += 10;
            } else if (newValue === 190) {
              clearInterval(fadeInInterval);
            }

            navbar.style.height = `${newValue}px`;
            navbarHeiht = newValue;
            navbar.style.opacity = 1;
          }, timing);
        };
        console.log(navbarHeiht);
        navbar.fadeIn(10);
      });
    } else {
      responsiveClick.addEventListener("click", function () {
        clearInterval(fadeInInterval);
        clearInterval(fadeOutInterval);

        navbar.fadeOut = function (timing) {
          var newValue = 190;
          navbar.style.height = 190;
          navbar.style.opacity = 1;

          fadeOutInterval = setInterval(function () {
            if (newValue > 0) {
              newValue -= 10;
            } else if (newValue < 0) {
              navbar.style.height = 0;
              navbar.style.opacity = 0;
              clearInterval(fadeOutInterval);
            }

            navbarHeiht = 20;
            navbar.style.opacity = 0;
            navbar.style.height = newValue;
          }, timing);
        };

        navbar.fadeOut(10);
      });
    }
*/

/*
responsiveClick.addEventListener("click", function (e) {
    e.preventDefault();
    navbar.classList.toggle("visable");
    navbar.classList.toggle("invisable");

    navbar.animate(
      [{ transform: "opacity(0) easeIn" }, { transform: "opacity(1) easeIn" }],
      {
        duration: 2000,
        iterations: 1,
      }
    );
  });
*/
