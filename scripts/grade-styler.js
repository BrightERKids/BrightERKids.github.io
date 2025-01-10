const categories = [
  "specialized-staff",
  "equipment",
  "wait-times",
  "protocols",
  "environment",
  "communication",
];

document.addEventListener("DOMContentLoaded", () => {
  const grades = {
    "A+": 4.3,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    "D-": 0.7,
    F: 0.0,
  };

  // Get the hospital name from the HTML by ID
  const hospitalNameElement = document.getElementById("hospital-name");
  const hospitalName = hospitalNameElement.textContent.trim();
  console.log(`Hospital Name: ${hospitalName}`);

  // Retrieve the grades from localStorage
  const hospitalGrades = JSON.parse(localStorage.getItem("hospitalGrades"));
  const categoryGrades = hospitalGrades[hospitalName];
  console.log(`Category Grades:`, categoryGrades);

  // Update the HTML elements with the retrieved grades
  categories.forEach((category) => {
    const grade = categoryGrades[category];
    const gradeElement = document.getElementById(category);
    if (gradeElement) {
      gradeElement.textContent = grade;
      gradeElement.style.background = getBackgroundColor(grade);
      console.log(`Updated ${category} with grade ${grade}`);
    } else {
      console.error(`Element with ID ${category} not found`);
    }
  });

  // Convert the overall score to a letter grade and update the overall rating
  const overallScore = categoryGrades["overall"];
  const overallGrade = getOverallGrade(overallScore);
  console.log(overallGrade);

  const overallRatingElement = document.getElementById("overall-rating");
  overallRatingElement.textContent = overallGrade;
  overallRatingElement.style.background = getBackgroundColor(overallGrade);
  console.log(`Updated overall rating with grade ${overallGrade}`);

  // Sort hospitals by overall grade
  const sortedHospitals = Object.keys(hospitalGrades).sort((a, b) => {
    return hospitalGrades[b]["overall"] - hospitalGrades[a]["overall"];
  });

  // Find the position of the current hospital
  const hospitalPosition = sortedHospitals.indexOf(hospitalName) + 1;
  const positionElement = document.getElementById("hospital-position");
  if (positionElement) {
    positionElement.textContent = `#${hospitalPosition} hospital in your area`;
  }
});

function getOverallGrade(score) {
  if (score >= 4.3) return "A+";
  if (score >= 4.0) return "A";
  if (score >= 3.7) return "A-";
  if (score >= 3.3) return "B+";
  if (score >= 3.0) return "B";
  if (score >= 2.7) return "B-";
  if (score >= 2.3) return "C+";
  if (score >= 2.0) return "C";
  if (score >= 1.7) return "C-";
  if (score >= 1.3) return "D+";
  if (score >= 1.0) return "D";
  if (score >= 0.7) return "D-";
  return "F";
}

function getBackgroundColor(grade) {
  switch (grade[0]) {
    case "A":
      return "#7cf8e2";
    case "B":
      return "#60c6ff";
    case "C":
      return "#f6f297";
    case "D":
      return "#fd7fce";
    case "F":
      return "#f87890";
    default:
      return "#ffffff";
  }
}
