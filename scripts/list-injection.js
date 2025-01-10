document.addEventListener("DOMContentLoaded", (event) => {
  injectHospitalList("hospital-list");
});

function injectHospitalList(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = "";

    // Retrieve the grades from localStorage
    const hospitalGrades = JSON.parse(localStorage.getItem("hospitalGrades"));

    // Sort hospitals by overall grade
    const sortedHospitals = Object.keys(hospitalData).sort((a, b) => {
      return hospitalGrades[b]["overall"] - hospitalGrades[a]["overall"];
    });

    // Inject hospitals in sorted order
    sortedHospitals.forEach((hospitalName) => {
      const hospital = hospitalData[hospitalName];
      const hospitalRow = document.createElement("div");
      hospitalRow.className = "hospital-row";

      const hospitalLink = document.createElement("a");
      hospitalLink.className = "button";
      hospitalLink.href = `/hospital.html?name=${encodeURIComponent(
        hospitalName
      )}`;
      hospitalLink.textContent = hospitalName;
      hospitalRow.appendChild(hospitalLink);

      const descriptionTitle = document.createElement("p");
      const descriptionBold = document.createElement("b");
      descriptionBold.textContent = "Description";
      descriptionTitle.appendChild(descriptionBold);
      hospitalRow.appendChild(descriptionTitle);

      const descriptionText = document.createElement("p");
      descriptionText.textContent = hospital.Description;
      hospitalRow.appendChild(descriptionText);

      container.appendChild(hospitalRow);
    });
  }
}
