const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: false, limit: "20kb" }));

// Serve the one-page frontend when running locally.
app.use(express.static(path.join(__dirname, "../public")));

function validateFeedback(body = {}) {
  const errors = {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const category = typeof body.category === "string" ? body.category.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2 || name.length > 50) errors.name = "Name must be between 2 and 50 characters.";
  else if (!/^[\p{L} .'-]+$/u.test(name)) errors.name = "Name can contain letters, spaces, apostrophes, periods, and hyphens only.";

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Please enter a valid email address.";

  if (!["Website", "Course", "Support", "Other"].includes(category)) {
    errors.category = "Please select a valid feedback category.";
  }

  if (!message) errors.message = "Please enter your feedback.";
  else if (message.length < 10 || message.length > 1000) errors.message = "Feedback must be between 10 and 1000 characters.";

  return { errors, value: { name, email, category, message } };
}

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Feedback API is running." });
});

app.post("/api/feedback", (req, res) => {
  const { errors, value } = validateFeedback(req.body);
  if (Object.keys(errors).length) {
    return res.status(400).json({
      success: false,
      message: "Please correct the highlighted fields.",
      errors
    });
  }

  // Demo app: validated feedback is acknowledged but not persisted to a database.
  return res.status(201).json({
    success: true,
    message: `Thank you, ${value.name}! Your feedback was submitted successfully.`,
    submission: {
      name: value.name,
      email: value.email,
      category: value.category
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

module.exports = { app, validateFeedback };
