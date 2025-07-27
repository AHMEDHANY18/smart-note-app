# Smart Note App

A simple Note Management System with user authentication, note CRUD operations, AI-powered summarization, and GraphQL support.

## Features

* User registration, login, and logout
* OTP-based email verification and password reset
* Upload profile picture
* Create, read, update, delete (CRUD) notes
* AI-powered note summarization via Groq (Mixtral, Llama3)
* RESTful and GraphQL APIs
* Rate limiting, CORS, Helmet security

## Prerequisites

* Node.js v14+
* MongoDB instance (local or hosted)

## Environment Variables

Create a `.env` file in the project root with the following keys:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/smart-note-app
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE=YourEmailServiceProvider
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
GROQ_API_KEY=your_groq_api_key_here
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AHMEDHANY18/smart-note-app.git
   cd smart-note-app
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

## Running the App

```bash
npm start
```

By default, the server runs on `http://localhost:3000` and GraphQL on `/graphql`.

---

## REST API Endpoints

All REST endpoints are prefixed with `/api/v1`.

### Authentication

| Method | Endpoint                          | Description                               | Body                                                  |
| ------ | --------------------------------- | ----------------------------------------- | ----------------------------------------------------- |
| POST   | `/api/v1/auth/register`           | Register new user & send verification OTP | `{ fullname, email, password, recoveryEmail, phone }` |
| POST   | `/api/v1/auth/verify-otp`         | Verify OTP, activate account              | `{ otpToken, otpCode }`                               |
| POST   | `/api/v1/auth/login`              | Login user, revoke old OTPs               | `{ emailOrPhone, password }`                          |
| POST   | `/api/v1/auth/logout`             | Logout user (revoke JWT)                  | Header `authorization: <token>`                       |
| POST   | `/api/v1/auth/forget-password`    | Send OTP to reset password                | `{ email }`                                           |
| POST   | `/api/v1/auth/reset-password`     | Reset password                            | `{ otpToken, otpCode, newPassword }`                  |
| PATCH  | `/api/v1/auth/upload-profile-pic` | Upload user profile picture               | Form-Data field `profilePic` (file)                   |

### Notes

| Method | Endpoint                      | Description           | Body / Params                                      |
| ------ | ----------------------------- | --------------------- | -------------------------------------------------- |
| POST   | `/api/v1/notes`               | Create a new note     | `{ title, content, category? }`                    |
| GET    | `/api/v1/notes`               | Get all user notes    | Query `?page=1&limit=10&search=owner`              |
| GET    | `/api/v1/notes/:id`           | Get single note by ID | Path `:id`                                         |
| PUT    | `/api/v1/notes/:id`           | Update note by ID     | Path `:id`, Body `{ title?, content?, category? }` |
| DELETE | `/api/v1/notes/:id`           | Delete note by ID     | Path `:id`                                         |
| POST   | `/api/v1/notes/:id/summarize` | Summarize note via AI | Path `:id`, Header `authorization`                 |

> **Header** for protected routes:
>
> ```
> Authorization: <JWT token>
> ```

---

## GraphQL API

**Endpoint:** `POST /graphql`

### Schema Highlights

```graphql
# Query
getNotes(page: Int, limit: Int, search: String): NoteListResponse

# Types
type Note { _id: ID!, title: String!, content: String!, category: Category, ownerId: User, createdAt: String, updatedAt: String }
type Category { _id: ID!, name: String!, description: String, createdAt: String, updatedAt: String }
type User { _id: ID!, fullname: String!, email: String!, phone: String }

type PaginationInfo { total: Int, page: Int, pages: Int }
type NoteListResponse { data: [Note], pagination: PaginationInfo }
```

### Example Query

```graphql
query GetNotes($page: Int, $limit: Int, $search: String) {
  getNotes(page: $page, limit: $limit, search: $search) {
    data { _id title content ownerId { fullname } category { name } }
    pagination { total page pages }
  }
}
```

---

## Testing

* Use Postman or Insomnia to test REST endpoints.
* Use GraphQL Playground at `http://localhost:3000/graphql` for queries and mutations.

---

## Security & Performance

* **Helmet** for secure headers
* **CORS** enabled
* **Rate limiter**: 100 requests/minute
* **Validation** via Joi
* **Lean queries** and **pagination** for performance

---

## License

MIT
