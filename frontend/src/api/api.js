// export const API = `http://localhost:5000`;
export const API = `https://multi-step-user-update-form.onrender.com`;


export async function fetchCountries() {
  try {
    const res = await fetch(`${API}/api/locations/countries`);
    if (!res.ok) throw new Error("Failed to fetch countries");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchStates(countryId) {
  try {
    const res = await fetch(`${API}/api/locations/states/${countryId}`);
    if (!res.ok) throw new Error("Failed to fetch states");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchCities(stateId) {
  try {
    const res = await fetch(`${API}/api/locations/cities/${stateId}`);
    if (!res.ok) throw new Error("Failed to fetch cities");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function checkUsernameAvailability(username) {
  if (username.length < 4 || username.length > 20 || /\s/.test(username)) {
    return null;
  }
  try {
    const res = await fetch(
      `${API}/api/users/check-username?username=${username}`
    );
    if (!res.ok) throw new Error("Username check failed");
    const data = await res.json();
    return data.isAvailable;
  } catch (error) {
    console.error(error);
    return null;
  }
}
