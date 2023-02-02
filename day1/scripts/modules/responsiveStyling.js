let responsiveAccordian = function () {
  let responsiveClick = document.querySelector(".main-heading-ps");
  let navbar = document.getElementById("navbar");
  let navButtons = document.querySelectorAll(".nav-buttons");

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

// for (let i = 0; i < navButtons.length; i++) {
//   let navButton = navButtons[i];
//   setTimeout(() => {
//     navButton.classList.toggle("visable");
//     navButton.classList.toggle("invisable");
//   }, 200 * i);
// }
