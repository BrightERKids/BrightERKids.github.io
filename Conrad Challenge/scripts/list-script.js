const data = {
  checkboxes: JSON.parse(localStorage.getItem("checkboxes")) || {},
};

function selectCheckbox(groupName, selectedCheckbox) {
  const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);
  if (groupName != "disease") {
    checkboxes.forEach((checkbox) => {
      if (checkbox !== selectedCheckbox) {
        checkbox.checked = false;
      }
    });
  }

  // Update the data.checkboxes object
  checkboxes.forEach((checkbox) => {
    const id = checkbox.id;
    if (id) {
      data.checkboxes[id] = checkbox.checked;
    } else {
      console.error("ID not found for checkbox:", checkbox);
    }
  });

  // Save the updated data to localStorage
  localStorage.setItem("checkboxes", JSON.stringify(data.checkboxes));

  console.log(data.checkboxes); // For debugging purposes
}

// Set the checkboxes based on the stored values
document.addEventListener("DOMContentLoaded", (event) => {
  const storedCheckboxes = JSON.parse(localStorage.getItem("checkboxes")) || {};
  Object.keys(storedCheckboxes).forEach((id) => {
    const checkbox = document.getElementById(id);
    if (checkbox) {
      checkbox.checked = storedCheckboxes[id];
    }
  });
  // Add event listeners to checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      filterEntries();
    });
  });
  if (Array.from(checkboxes).some((checkbox) => checkbox.checked)) {
    filterEntries();
  }
});

function filterEntries() {
  const distances = JSON.parse(localStorage.getItem("distances")) || [];
  const selectedCheckboxes = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  );

  const hospitalEntries = document.querySelectorAll(".hospital-row");
  hospitalEntries.forEach((entry) => {
    const hospitalName = entry.querySelector("a").textContent.trim();
    const distanceItem = distances.find(
      (item) => item.hospitalName === hospitalName
    );
    if (distanceItem) {
      const data = hospitalData[hospitalName];
      console.log(data["Disease Categories"]);
      const hospital = {
        distance: distanceItem.distance,
        age: data["Average Patient Age"],
        severity: data.severity,
        diseases: data["Disease Categories"].slice(0, 3),
      };
      if (shouldShowEntry(hospital, selectedCheckboxes)) {
        entry.style.display = "block";
      } else {
        entry.style.display = "none";
      }
    }
  });
}

function shouldShowEntry(item, selectedCheckboxes) {
  const locationCheckboxes = selectedCheckboxes.filter(
    (cb) => cb.name === "location"
  );
  const ageCheckboxes = selectedCheckboxes.filter((cb) => cb.name === "age");
  const severityCheckboxes = selectedCheckboxes.filter(
    (cb) => cb.name === "severity"
  );
  const diseaseCheckboxes = selectedCheckboxes.filter(
    (cb) => cb.name === "disease"
  );
  console.log(locationCheckboxes);
  console.log(ageCheckboxes);

  const distanceFilter =
    locationCheckboxes.length === 0 ||
    locationCheckboxes.some((checkbox) => {
      switch (checkbox.id) {
        case "10miles":
          return item.distance < 10;
        case "15miles":
          return item.distance < 15;
        case "20miles":
          return item.distance < 20;
        case "20+miles":
          return true;
        default:
          return false;
      }
    });

  const ageFilter =
    ageCheckboxes.length === 0 ||
    ageCheckboxes.some((checkbox) => {
      switch (checkbox.id) {
        case "0-2":
          return item.age >= 0 && item.age <= 2;
        case "3-7":
          return item.age >= 3 && item.age <= 7;
        case "8-11":
          return item.age >= 8 && item.age <= 11;
        case "12+":
          return item.age >= 12;
        default:
          return false;
      }
    });
  const diseaseFilter =
    diseaseCheckboxes.length === 0 ||
    diseaseCheckboxes.some((checkbox) => {
      return item.diseases.includes(checkbox.id);
    });

  return distanceFilter && ageFilter && diseaseFilter;
}

document.addEventListener("DOMContentLoaded", () => {
  const severityCheckboxes = document.querySelectorAll(
    'input[name="severity"]'
  );

  severityCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.id === "extreme" && checkbox.checked) {
        window.location.href = "911.html";
      }
    });
  });
});
