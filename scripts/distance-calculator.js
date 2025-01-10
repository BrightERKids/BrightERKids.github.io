async function findDistances() {
  const address = document.getElementById("user-address").value;
  if (address) {
    try {
      const userLocation = await geocodeAddress(address);
      const distances = [];

      for (const [hospitalName, hospital] of Object.entries(hospitalData)) {
        try {
          const hospitalLocation = await geocodeAddress(hospital.Address);
          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lon,
            hospitalLocation.lat,
            hospitalLocation.lon
          );
          console.log(distance);
          distances.push({ hospitalName, distance });
        } catch (error) {
          console.error(`Error geocoding address for ${hospitalName}:`, error);
        }
      }

      localStorage.setItem("distances", JSON.stringify(distances)); // Store distances in localStorage
      return distances;
    } catch (error) {
      console.error("Error finding distances:", error);
    }
  }
  window.location.href = "/list.html";
}

async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    address
  )}&format=json&polygon=1&addressdetails=1`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.length > 0) {
      console.log(`Geocoded location for ${address}:`, data[0]);
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    } else {
      throw new Error("Address not found");
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Radius of the Earth in miles
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in miles
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
