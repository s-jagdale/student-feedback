const form = document.getElementById("feedbackForm");
const result = document.getElementById("result");
const button = document.getElementById("submitButton");
const message = document.getElementById("message");
const counter = document.getElementById("counter");

message.addEventListener("input", () => {
  counter.textContent = `${message.value.length} / 1000`;
});

function clearErrors() {
  ["name", "email", "category", "message"].forEach((field) => {
    document.getElementById(`${field}Error`).textContent = "";
    document.getElementById(field).classList.remove("invalid");
  });
}
function showErrors(errors = {}) {
  Object.entries(errors).forEach(([field, text]) => {
    const input = document.getElementById(field);
    const error = document.getElementById(`${field}Error`);
    if (input && error) {
      input.classList.add("invalid");
      error.textContent = text;
    }
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrors();
  result.className = "result";
  result.textContent = "";
  button.disabled = true;
  button.querySelector("span").textContent = "Submitting...";

  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) {
      showErrors(data.errors);
      result.className = "result failure";
      result.textContent = data.message || "Please check your input and try again.";
    } else {
      result.className = "result success";
      result.textContent = data.message;
      form.reset();
      counter.textContent = "0 / 1000";
    }
  } catch (_error) {
    result.className = "result failure";
    result.textContent = "Unable to reach the server. Please try again.";
  } finally {
    button.disabled = false;
    button.querySelector("span").textContent = "Submit feedback";
  }
});
