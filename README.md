# OpenAgent Tech Test - Contact Management

A full-stack contact management application built for the OpenAgent Junior Software Engineer tech test. It consists of a public "Contact Us" page where customers can submit an enquiry, and an admin page where staff can view, verify, and delete submitted contacts.

The project is split into two independent applications:

- `client/` - the frontend, built with Next.js, TypeScript, and Tailwind CSS
- `server/` - the backend API, built with NestJS, TypeScript, and TypeORM with a SQLite database

The project began with a planning stage in Figma, mapping the requirements, user journeys, and assumptions before any code was written. That board is available [here](https://www.figma.com/design/Zg0PzXx7rZc76d7kC5rRth/Manbir-Project?node-id=0-1&t=36TupDNlQVVxFLey-1).

## Features

- Public Contact Us page with a validated submission form (first name, last name, email, Australian phone number, and a required note)
- Thank You confirmation that greets the customer by their first name after a successful submission
- Admin page at `/admin` listing all submitted contacts, newest first, in a responsive card layout
- Mark a contact as verified (the action disables once a contact is verified)
- Delete a contact
- Validation on both the frontend (for immediate user feedback) and the backend (as the source of truth)
- Responsive layout with a shared header and footer across all pages

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS |
| Backend | NestJS, TypeScript |
| ORM | TypeORM |
| Database | SQLite |
| API testing | Postman |

## Project Structure

```
openagent-test-manbir/
  client/                 Next.js frontend
    app/                  App Router pages and root layout
    lib/                  shared frontend helpers (API base URL)
  server/                 NestJS backend
    src/
      contacts/           contacts module (controller, service, entity, DTOs)
      app.module.ts       root module, database connection
      main.ts             app bootstrap, CORS, global validation
  README.md
  AI_USAGE.md             detailed account of AI tool usage
```

## Getting Started

### Running with Docker (recommended)

This is the simplest way to run the whole application. It requires Docker Desktop installed and running.

From the project root:

```bash
docker compose up --build
```

This builds and starts both apps together. Once running:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:3001`

The SQLite database is persisted to a volume, so submitted contacts survive container restarts. Use `--build` whenever the code or dependencies change. For subsequent runs of the same version, `docker compose up` is enough.

To stop the containers, press Ctrl+C, or run `docker compose down` from another terminal.

### Running locally without Docker

#### Prerequisites

- Node.js v18 or above
- npm

#### Backend

```bash
cd server
npm install
npm run start:dev
```

The API runs on `http://localhost:3001`. On first start, TypeORM automatically creates the SQLite database file and the `contact` table from the entity definition, so there is no manual database setup.

#### Frontend

In a separate terminal:

```bash
cd client
npm run dev
```

The app runs on `http://localhost:3000`. Both the frontend and backend need to be running at the same time for the app to work end to end.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/contacts` | Create a new contact |
| GET | `/contacts` | List all contacts, newest first |
| PATCH | `/contacts/:id` | Update a contact (used to mark as verified) |
| DELETE | `/contacts/:id` | Delete a contact |

## Validation

Validation runs at two layers, each with a distinct purpose.

The backend is the source of truth. It uses `class-validator` decorators on the DTOs, enforced globally through a NestJS `ValidationPipe`. The pipe is configured with `whitelist` and `forbidNonWhitelisted`, so only known fields are accepted and any unexpected property is rejected. All five fields are required.

The frontend provides immediate inline feedback before submission so the user does not need a server round trip to learn a field is wrong. This layer is for user experience, not security, because a client can always be bypassed.

### Australian phone number handling

Phone numbers receive particular attention. The UI shows a fixed `+61` prefix, so the user only types the national portion. A common real-world issue is that people add a leading `0` even when a `+61` prefix is present, which would produce an invalid number. The frontend strips leading zeros and whitespace before sending the request. The backend then validates the assembled value against a strict regular expression that accepts both mobile and landline formats with optional country code spacing. The regex is documented inline in the create DTO.

## Assumptions

These assumptions were made where the requirements left room for interpretation. They are explained in more depth in `AI_USAGE.md`.

- **The note field is required.** The brief lists it as "Additional info/Note" without stating whether it is mandatory. The live OpenAgent contact page treats it as required, so the same was assumed here.
- **Contacts are stored as individual entries.** There is no account system, so a single person submitting multiple enquiries produces multiple separate entries. What "verified" means across duplicate submissions from one person is left undefined by the brief.
- **Delete is a hard delete.** The brief says to remove the contact from the list. With no mention of an audit trail or archive, a hard delete was chosen as the simplest faithful interpretation. A production system would likely retain a log for auditing.
- **The contacts list is an admin view, served at `/admin`.** Viewing all submitted contacts is a staff task rather than a public one, so it lives on a separate route from the public contact page.
- **No authentication on the admin page.** The brief does not require it. In production this route would be protected. This is noted as a known limitation and is the first thing I would add with more time.
- **The verification process is a simple status toggle.** The brief does not define what verification entails, so it is implemented as a status change with no downstream side effects. In a real system this would likely tie into a CRM to track a pipeline.

## Known Limitations and Future Work

Given more time, the priorities would be:

- **Automated tests.** The backend API in particular would benefit from a suite of test cases covering the create, list, update, and delete endpoints, including validation edge cases.
- **Admin authentication.** The `/admin` route should be a protected, authenticated page.
- **Richer confirmation experience.** Rather than redirecting to a separate Thank You page, the form area could be replaced in place with a confirmation, useful resources, and a stated response time, so the customer can keep reading the other contact information.
- **A more detailed enquiry form.** Adding an enquiry type would allow routing high-intent leads into a dedicated funnel.
- **SEO and analytics.** Meta titles and descriptions for visibility, and event tracking (form start, form completion, call-to-action clicks) for insight into customer behaviour.
- **API rate limiting.** A sensible security measure that was out of scope for this exercise.

## AI Tool Usage

AI tools were used throughout this project. A full and transparent account of which tools were used, why, and which parts of the solution were generated versus written or designed myself is in [AI_USAGE.md](./AI_USAGE.md).
