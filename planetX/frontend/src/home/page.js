import React, { useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the entered date
    console.log("User entered date:", date);
    // TODO: Call NASA APOD API or navigate to results page with this date
  };

  return (
    <div>
      <h1>Welcome to Planet X</h1>
      <p>Your gateway to exploring the universe!</p>

      {/* Form area */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="dateInput">Enter a date (YYYY-MM-DD) to search:</label>
        <br />
        <input
          type="date"
          id="dateInput"
          name="dateInput"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      <h2>What is Planet X?</h2>
      <p>
        Planet X is the gateway that contains all the universe inside our app!
        You can see the astronomy of the universe, along with the Mars images
        taken by NASA rovers.
      </p>

      <p>
        Feel free to explore the following sections to learn more about our
        solar system and beyond:
      </p>

      <ul>
        <li>
          <Link to="/asteroid">Asteroids</Link>
          <div>
            <p>[IMAGE PLACEHOLDER]</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </li>
        <li>
          <Link to="/events">Events</Link>
          <div>
            <p>[IMAGE PLACEHOLDER]</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </li>
        <li>
          <Link to="/planet">Planets</Link>
          <div>
            <p>[IMAGE PLACEHOLDER]</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </li>
        <li>
          <Link to="/rover">Our Rovers</Link>
          <div>
            <p>[IMAGE PLACEHOLDER]</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </li>
        <li>
          <Link to="/quiz">Quizzes</Link>
          <div>
            <p>[IMAGE PLACEHOLDER]</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
