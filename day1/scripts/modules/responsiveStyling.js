let responsiveAccordian = function () {
  let responsiveClick = document.querySelector(".main-heading-ps");
  let navbar = document.getElementById("navbar");
  let navButtons = document.querySelectorAll(".nav-buttons");

  if (window.innerWidth < 1000) {
    // navbar.classList.remove("visable");
    // navbar.classList.add("invisable");
    navbar.style.display = "none";

    responsiveClick.addEventListener("click", function (e) {
      e.preventDefault();
      if (navbar.style.display == "none") {
        console.log("Display none");
        navbar.style.display = "flex";
      } else if (navbar.style.display == "flex") {
        console.log("Display flex");
        navbar.style.display = "none";
      }

      for (let i = 0; i < navButtons.length; i++) {
        let navButton = navButtons[i];
        navButton.classList.toggle("invisable");
        setTimeout(() => {
          navButton.classList.toggle("visable");
        }, 200 * i);
      }
    });
  }
};

export { responsiveAccordian };

// for (let i = 0; i < navButtons.length; i++) {
//   let navButton = navButtons[i];
//   setTimeout(() => {
//     navButton.classList.toggle("visable");
//     navButton.classList.toggle("invisable");
//   }, 200 * i);
// }
