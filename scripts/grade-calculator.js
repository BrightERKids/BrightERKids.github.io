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
  const categories = [
    "specialized-staff",
    "equipment",
    "wait-times",
    "protocols",
    "environment",
    "communication",
  ];
  if (localStorage.getItem("hospitalGrades")) {
    return;
  }
  const hospitalGrades = {};
  for (const hospitalName in hospitalData) {
    if (hospitalData.hasOwnProperty(hospitalName)) {
      const categoryGrades = {
        "specialized-staff": calculateGrade("", "specialized-staff"),
        equipment: calculateGrade("", "equipment"),
        "wait-times": calculateGrade("", "wait-times"),
        protocols: calculateGrade("", "protocols"),
        environment: calculateGrade("", "environment"),
        communication: calculateGrade("", "communication"),
        overall: 0,
      };
      let totalScore = 0;
      categories.forEach((category) => {
        const grade = categoryGrades[category];
        const score = grades[grade] || 0;
        totalScore += score;
      });
      const overallScore = totalScore / categories.length;
      categoryGrades["overall"] = overallScore;
      hospitalGrades[hospitalName] = categoryGrades;
      console.log(`Grades for ${hospitalName}:`, categoryGrades);
    }
  }
  localStorage.setItem("hospitalGrades", JSON.stringify(hospitalGrades));
  console.log("Hospital grades stored in localStorage:", hospitalGrades);
});
function getRandomGrade() {
  const grades = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
    "F",
  ];
  const randomIndex = Math.floor(Math.random() * grades.length);
  return grades[randomIndex];
}

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

function calculateGrade(type) {
  switch (type) {
    case "specialized-staff":
      return getRandomGrade();
    case "equipment":
      return getRandomGrade();
    case "wait-times":
      return getRandomGrade();
    case "protocols":
      return getRandomGrade();
    case "environment":
      return getRandomGrade();
    case "communication":
      return getRandomGrade();
    default:
      return getRandomGrade();
  }
}

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
