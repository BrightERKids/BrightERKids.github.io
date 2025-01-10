document.addEventListener("DOMContentLoaded", (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const hospitalName = urlParams.get("name");

  if (hospitalName && hospitalData[hospitalName]) {
    const hospital = hospitalData[hospitalName];
    injectImage("hospital-img", hospital.Image);
    injectTextContent("hospital-name", hospitalName);
    injectTextContent("hospital-location", hospital.Address);
    injectTextContent("hospital-description", hospital.Description);
    injectTextContent("hospital-annual-visits", hospital["Annual Visits"]);
    injectTextContent("hospital-phone-number", hospital["Phone Number"]);
    injectTextContent("hospital-stars", hospital.Stars);
    injectTextContent("coordinator", hospital["Pediatric Coordinator"]);
    injectEquipment("hospital-equipment", hospital.Equipment);
    injectReviews("hospital-reviews", generateGenericReviews(hospitalName));
    injectDoctors("hospital-doctors", hospital["Pediatric Doctors"]);
    injectDiseaseCategories(
      "hospital-disease-categories",
      hospital["Disease Categories"]
    );
    injectTextContent(
      "hospital-average-patient-age",
      hospital["Average Patient Age"]
    );
  }
});

function generateGenericReviews(hospitalName) {
  return [
    `I had a wonderful experience at ${hospitalName}. The staff was very friendly and professional.`,
    `The facilities at ${hospitalName} are top-notch. I felt very well taken care of.`,
    `I highly recommend ${hospitalName} for anyone in need of medical care. They are the best!`,
    `My visit to ${hospitalName} was very pleasant. The doctors and nurses were very attentive.`,
    `I am very satisfied with the service I received at ${hospitalName}. They really care about their patients.`,
  ];
}

function injectTextContent(elementId, text) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = text;
  }
}

function injectEquipment(elementId, equipment) {
  const container = document.getElementById(elementId);
  if (container) {
    container.innerHTML = "";
    const equipmentList = equipment.join(", ");
    const p = document.createElement("p");
    p.style.textAlign = "center";

    p.textContent = equipmentList;
    container.appendChild(p);
  }
}

function injectReviews(elementId, reviews) {
  const container = document.getElementById(elementId);
  if (container) {
    container.innerHTML = "";
    reviews.forEach((review) => {
      const reviewTitle = document.createElement("p");
      const reviewBold = document.createElement("b");
      reviewBold.textContent = "Review";
      reviewTitle.appendChild(reviewBold);
      container.appendChild(reviewTitle);

      const reviewItem = document.createElement("p");
      reviewItem.textContent = review;
      container.appendChild(reviewItem);
    });
  }
}

function injectDoctors(elementId, doctors) {
  const container = document.getElementById(elementId);
  if (container) {
    container.innerHTML = "";
    for (const [doctorName, details] of Object.entries(doctors)) {
      const doctorItem = document.createElement("div");
      doctorItem.className = "doctor-item";

      const doctorLink = document.createElement("a");
      doctorLink.className = "small-button";
      doctorLink.href = `#${doctorName.replace(/\s+/g, "")}`;
      doctorLink.textContent = doctorName;
      doctorItem.appendChild(doctorLink);

      details.forEach((detail) => {
        const p = document.createElement("p");
        p.textContent = detail;
        doctorItem.appendChild(p);
      });

      container.appendChild(doctorItem);
    }
  }
}

function injectImage(elementId, imageUrl) {
  const imgElement = document.getElementById(elementId);
  if (imgElement) {
    imgElement.src = imageUrl;
  } else {
    console.error(`Element with ID ${elementId} not found`);
  }
}

const disease_dictionary = {
  Respiratory: "Asthma, Pneumonia",
  Neurological: "Seizures, Concussions",
  Skeletal: "Fractures, Dislocations",
  "Chronic Conditions": "Epilepsy, Diabetes",
  "Infectious Diseases": "Flu, Fever",
  Gastrointestinal: "Appendicitis, Dehydration",
  Cardiac: "Arrhythmias",
};
function injectDiseaseCategories(elementId, categories) {
  const container = document.getElementById(elementId);
  if (container) {
    container.innerHTML = "";
    let index = 0;

    // Apply flexbox styles directly to the container for better layout
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.width = "70%";
    container.style.margin = "auto";
    const header = document.createElement("div");

    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.width = "100%";
    header.style.alignItems = "center";

    const h2 = document.createElement("p");
    h2.innerHTML = "<b>Most commonly treated diseases</b>";
    h2.style.flex = "1";
    h2.style.padding = "5px";
    h2.style.margin = "0";
    const h2_2 = document.createElement("p");
    h2.style.borderRight = "1px solid #a6a6a6";
    h2_2.innerHTML = "<b>Examples</b>";
    h2_2.style.flex = "1";
    h2_2.style.padding = "5px";
    h2_2.style.margin = "0";
    h2_2.style.marginLeft = "20px";
    header.appendChild(h2);
    header.appendChild(h2_2);

    container.appendChild(header);
    categories.forEach((category) => {
      index += 1;
      const categoryContainer = document.createElement("div");

      categoryContainer.style.display = "flex";
      categoryContainer.style.justifyContent = "space-between";
      categoryContainer.style.width = "100%";
      categoryContainer.style.alignItems = "center";

      const p = document.createElement("p");
      p.textContent = index + ". " + category;
      p.style.flex = "1";
      p.style.padding = "5px";
      p.style.margin = "0";
      p.style.borderRight = "1px solid #a6a6a6";

      const p2 = document.createElement("p");
      p2.textContent = index + ". " + disease_dictionary[category];
      p2.style.flex = "1";
      p2.style.padding = "5px";
      p2.style.margin = "0";
      p2.style.marginLeft = "20px";
      categoryContainer.appendChild(p);
      categoryContainer.appendChild(p2);

      container.appendChild(categoryContainer);
    });
  }
}
