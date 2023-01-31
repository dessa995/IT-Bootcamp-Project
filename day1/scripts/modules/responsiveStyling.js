let responsiveAccordian = function () {
  let responsiveClick = document.querySelector(".main-heading-ps");
  let navbar = document.getElementById("navbar");

  if (window.innerWidth < 1000) {
    navbar.classList.remove("visable");
    navbar.classList.add("invisable");
  }

  responsiveClick.addEventListener("click", function (e) {
    e.preventDefault();
    navbar.classList.toggle("visable");
    navbar.classList.toggle("invisable");
  });
};

export { responsiveAccordian };
