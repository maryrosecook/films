document.addEventListener("DOMContentLoaded",
  function showFilmDataOnClick() {
    [].slice.call(document.getElementsByClassName("show-film-info"))
      .map(function(element) {
        element.addEventListener("click", function () {
          this.querySelector(".film-info").style.display = "block";
        });
      });
  });
