# AI Usage

This document is a transparent account of how AI tools were used to build this project. I planned, understood, and orchestrated the project from scratch, and I can explain every part of the code. The tools were used to accelerate scaffolding, to learn a framework I had not used before, to debug, and to design the interface. Where AI generated something, I read it, tested it, and made sure I understood it before keeping it.

## Tools Used

| Tool | What I used it for |
| --- | --- |
| Figma | Initial planning. Mapping out all the requirements visually, commenting assumptions and key details, and thinking through the user journeys before any code. |
| Claude | Discussing approach and scope, learning NestJS concepts, walking through syntax and decorators, debugging, generating the phone validation regex, setting up Docker, and producing documentation. |
| Google Gemini | A second perspective while learning the MVC-style architecture used by NestJS. |
| Claude Design | Defining a clean, minimalist UI style aligned with the OpenAgent brand, and designing the admin contacts page. |
| Claude Code | Implementing a component-based frontend architecture from the designs, including the shared root layout and the admin components. |
| Google Antigravity (IDE) | Intelligent autocompletion, useful for small additions while writing code. |

## How and Why I Used Each Tool

### Planning (Figma)

Before writing any code I used Figma to map out the full picture visually. I laid out the requirements, annotated my assumptions, and worked through what was in scope and out of scope. This included the public user journey, the admin journey, and how each action maps to the backend. This planning is what gave me a clear vision for the build, particularly on the frontend.

The planning board is available here: https://www.figma.com/design/Zg0PzXx7rZc76d7kC5rRth/Manbir-Project?node-id=0-1&t=36TupDNlQVVxFLey-1

### Approach and scope (Claude)

I started by talking through my thought process with Claude. This was a brain-dumping and discussion exercise to settle what was in scope, what was out of scope, what assumptions were reasonable, and what additions made sense. From that I determined the order of work: backend and database first, test the backend, then build the frontend.

### Learning NestJS (crash course videos, Claude, Gemini)

I had not worked with NestJS before. I watched crash course videos on the key concepts, then used Claude and Gemini to go deeper on the controller, service, and module separation. I had used this kind of architecture at university, so this was a refresher rather than learning from zero. I used Claude specifically to walk through the NestJS decorators and to understand the prebuilt `class-validator` validation decorators, which are standard, good-practice usage in the NestJS ecosystem.

### Scaffolding and setup (Claude, Antigravity)

I used Claude to help with the CLI commands for scaffolding both the NestJS and Next.js projects and for setting up the database connection and syntax. Google Antigravity provided autocompletion that was useful for small add-ons as I wrote.

### Debugging (Claude)

I used Claude to help understand issues as they came up. The most notable was a problem with the PATCH request. When marking a contact as verified, the request was rejected because of the `isVerified` property. The cause was that my strict validation (`forbidNonWhitelisted`) rejected any field not present in the DTO, and `isVerified` had deliberately been left out of the create DTO so a user could not set their own verification status on creation. The fix was to explicitly add `isVerified` as an optional boolean to the update DTO, so the verify action was permitted while creation stayed locked down. Understanding this also clarified the security reasoning behind keeping the two DTOs separate.

### Frontend design and build (Claude Design, Claude Code)

I took an AI-first approach on the frontend because I had a clear vision from the planning stage. Before designing, I tested the responsiveness and inspected the code of the live OpenAgent contact page to confirm which form fields were required. The note field is a good example: I initially assumed it was optional, but it is required on the live site, so I matched that.

I then used Claude Design to define a clean, minimalist UI matching the OpenAgent brand, and I directed the interactions and customer experience deliberately:

- The form sits before the additional contact options, with typography sized for a clear hierarchy and a clear call to action.
- The phone number is surfaced above the form and stays above it on mobile, because a customer is likely to want a phone call for an immediate response and should see that option first. The remaining contact details follow.
- The form has a clear AU phone indicator, which the live page lacks. I also removed redundant phone-number information that appeared in both the header and the form on the original, consolidating it into one clear call to action.
- A navigation bar and footer were added for completeness. The nav links are pseudo-links that do not navigate anywhere, included to show the intended structure of a complete site.

Using Claude Code, I implemented a component-based architecture with a shared root layout for consistency. Even though AI did the implementation, reusability and consistency were priorities of mine, because a clean structure is far easier to debug, edit, and extend.

For the admin page (`/admin`), I used Claude Design to create the contacts list. I treat viewing contact details as an admin task rather than a customer access point, which is why it is a separate route. My first attempt reused the same style guide to build a table, but a table did not present the information readably for admins, especially on mobile. I switched to a card layout in a responsive grid. I removed a customer search feature as out of scope at this stage. Once I was happy with the design and had tested it, I had Claude Code implement the page using the same root layout and shared components, and create a dedicated admin components directory.

I deliberately chose not to add a pending and verified count or a dashboard view at the top, because that extended functionality and I prioritised getting the core features right.

### Phone validation regex (Claude)

I had AI generate the Australian phone number regex on the backend. I knew the common failure points for phone-number validation. A key one is that people add a leading `0` even when a `+61` prefix is shown in the UI. To handle this and keep the experience smooth, the backend has strict rules on which numbers are accepted, and the frontend strips leading zeros and whitespace before sending the request. Numbers could be further normalised into a uniform storage format, but acceptance is governed by the strict regex.

### Database choice (Claude)

I discussed the trade-offs of SQLite versus PostgreSQL with Claude and concluded SQLite was the right choice given the scope and practicality of this exercise. It needs no separate server process, which also keeps the setup simpler.

### Docker setup (Claude)

I used Claude to help set up Docker, since I had used Docker before but not configured a project from scratch. This covered a Dockerfile for each app, the `docker-compose.yml` that builds and runs both together, and the `.dockerignore` files. I understood and verified each piece rather than copying blindly. One issue we worked through was that `better-sqlite3` is a native module that fails to compile on the lightweight Alpine base image because it lacks the build tools, which was resolved by installing them in the backend Dockerfile. I also set up a volume mount so the SQLite database persists across container restarts, and confirmed this by submitting a contact, restarting the containers, and checking the data survived.

## What I Wrote, Designed, or Directed Myself

- All planning, scope decisions, and assumptions.
- The overall architecture and order of work.
- The decision to separate the admin view onto its own route, and the reasoning behind it.
- The entire customer-experience design direction: form placement, phone-first layout on mobile, typography hierarchy, removal of redundant information, and the call-to-action treatment.
- The validation strategy across both layers, including the security reasoning for separate create and update DTOs.
- The decision to require the note field, based on inspecting the live OpenAgent site.
- The choice of SQLite, the choice of a card layout over a table for the admin page, and the scoping out of search, authentication, and a dashboard.
- All manual testing.

## What AI Generated

- CLI scaffolding commands.
- The Australian phone regex (to my specification of the cases it needed to handle).
- The component-based frontend implementation and admin page implementation, from my designs and direction.
- The Docker configuration (Dockerfiles, compose file, dockerignore files), which I then understood and verified.
- Small autocompletions while coding.
- This documentation, from my detailed account of the process.

## Testing

I tested the API endpoints manually with Postman, covering creation, listing, updating, and deletion, including deliberately invalid input to confirm the validation rejects it. I tested the create, verify, and delete flows through the UI and compared the database state before and after each action to confirm correctness.

## A Note on Methodology

I want to be transparent that this was an AI-assisted build, and I took an AI-first approach on the frontend in particular because I had a clear vision and put measures in place to keep the result testable, validated, and built on a clean component architecture.

The brief's statement on AI usage was the most ambiguous part of the exercise for me. The functional requirements are direct and clear. The guidance on AI was less so, and I would have valued an explicit statement on whether AI-first development is appropriate. I can explain my code, and I do not want to be disadvantaged for using several modern tools to deliver this. I understood, planned, and orchestrated the project myself, and used these tools to move faster and to learn.

## Time Taken

Roughly 10 hours. A meaningful portion of that was learning the NestJS framework and carefully working through what should be in and out of scope, because I wanted to deliver against the requirements while making sound, well-reasoned assumptions.
