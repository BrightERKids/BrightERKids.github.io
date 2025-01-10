document.addEventListener("DOMContentLoaded", (event) => {
  const reviewSection = document.getElementById("star-container");
  const stars = reviewSection.querySelectorAll(".fa-star");
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      const value = index + 1;
      stars.forEach((s, i) => {
        if (i < value) {
          s.classList.add("star-checked");
        } else {
          s.classList.remove("star-checked");
        }
      });
    });
  });
});
