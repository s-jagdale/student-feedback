# Student Feedback — ExpressJS One-Page Application

A responsive, single-page feedback form built with **ExpressJS**. It includes server-side validation, API routes, JSON request/response handling, success/error messages, automated tests, and Netlify deployment configuration.

## Features

- One-page responsive feedback form.
- ExpressJS routes: `GET /api/health` and `POST /api/feedback`.
- Server-side validation for name, email, category, and feedback message.
- HTTP status codes: `200` health check, `201` successful submission, `400` invalid input, `404` unknown route.
- Field-level validation messages and submission success/error messages.
- Automated tests for valid, invalid, and missing input.

## Run locally

Requires Node.js 18 or later.

```bash
npm install
npm start
```

Open http://localhost:3000.

Run tests:

```bash
npm test
```

## Deploy to Netlify

1. Extract this ZIP.
2. Push the extracted project to a GitHub repository.
3. In Netlify, choose **Add new site → Import an existing project** and select the repository.
4. Netlify reads `netlify.toml`. Confirm:
   - Build command: `npm install`
   - Publish directory: `public`
   - Functions directory: `netlify/functions`
5. Deploy the site. Netlify installs the dependencies and deploys the Express API as a serverless function.

You can also drag-and-drop the folder's `public` directory for a static preview, but **the form's Express API will not work** with that method. For the complete application, deploy through Git-based deployment so Netlify builds the function.

## API examples

Valid request:

```http
POST /api/feedback
Content-Type: application/json

{
  "name": "Aditi Sharma",
  "email": "aditi@example.com",
  "category": "Course",
  "message": "The lessons are clear and useful."
}
```

Invalid requests return HTTP `400` with an `errors` object. Valid requests return HTTP `201` with a success message.

## Important note about storage

This is a deployable demonstration of ExpressJS form handling and validation. It acknowledges valid submissions but does **not** save them permanently to a database. Add a database only if persistent feedback storage is required.
