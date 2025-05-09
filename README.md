# Multi-Step User Update Form

This project is a full-stack web application that implements a multi-step user profile update form. It allows users to enter personal, professional, and preference details step-by-step, including uploading a profile photo, and saves the data to a backend database.

---

## Project Structure

- **Backend:** Node.js with Express, MongoDB for data storage.
- **Frontend:** React application with multiple form steps and dynamic data fetching.
- **API:** RESTful endpoints for user management and location data.

---

## Backend Setup and Working

1. **Server Setup:**

   - The backend server is built with Express.
   - It connects to a MongoDB database using Mongoose.
   - Environment variables are managed with `dotenv`.
   - The server listens on port defined by `PORT` environment variable or defaults to 5000.

2. **Routes:**

   - `/api/users`: Handles user creation, update, and username availability check.
   - `/api/locations`: Provides country, state, and city data for dynamic dropdowns.
   - Static files (uploaded profile photos) are served from the `/uploads` directory.

3. **User Management:**
   - Users can be created with profile photo upload.
   - Passwords are hashed before saving.
   - User data includes nested address fields.
   - Username availability can be checked via a dedicated endpoint.
   - Users can be updated, including password changes with current password verification.

---

## Frontend Setup and Working

1. **Multi-Step Form:**

   - The form is divided into 4 steps:
     - Step 1: Personal Info (profile photo, username, password, gender)
     - Step 2: Professional Details (profession, company name)
     - Step 3: Preferences (address, country, state, city, subscription plan, newsletter)
     - Step 4: Summary (review all entered data)

2. **State Management:**

   - React `useState` manages form data, errors, and step navigation.
   - `useEffect` hooks fetch countries, states, and cities dynamically based on user selections.

3. **Validation:**

   - Each step validates required fields before allowing navigation to the next step.
   - Username availability is checked with debounce to avoid excessive API calls.
   - Password strength is calculated and displayed.

4. **Form Submission:**
   - On final submission, form data including the profile photo is sent as multipart/form-data to the backend `/api/users` endpoint.
   - Success or error messages are displayed accordingly.

---

## API Communication

- The frontend communicates with the backend via REST API calls.
- Location data (countries, states, cities) is fetched dynamically to populate dropdowns.
- Username availability is checked in real-time during input.
- User creation and updates are handled via POST and PUT requests with form data.

---

## How to Run the Project

### Backend

1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with necessary environment variables (e.g., MongoDB URI, PORT).
4. Start the server:
   ```
   npm run dev
   ```
   or use a process manager like `nodemon` for development.

### Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open the browser at the provided local URL (usually `http://localhost:3000`).

---

## Summary of User Flow

1. User opens the multi-step form.
2. Step 1: Uploads profile photo, enters username and password.
3. Step 2: Enters professional details.
4. Step 3: Enters address and preferences, with dynamic country/state/city selection.
5. Step 4: Reviews all information in the summary.
6. Submits the form, which sends data to the backend.
7. Backend validates, hashes password, saves user data, and returns success.
8. User receives confirmation of successful profile submission.

---

## Additional Notes

- Profile photos are limited to JPG/PNG formats and max size 2MB.
- Passwords require minimum length and complexity.
- Username must be unique and contain no spaces.
- Location data is fetched from backend APIs to ensure up-to-date options.

---

This README provides a comprehensive overview of the project setup, working, and usage to help developers and users understand and run the multi-step user update form application.
