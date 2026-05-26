# Full Stack Blog Website Backend

A production-ready blog backend built with **Node.js**, **Express.js**, **TypeScript**, and **PostgreSQL**.  
This project provides authentication, blog management, comments, image uploads, security features, caching, and a scalable REST API architecture.

---

# 🚀 Features

## Authentication & Authorization
- User registration & login
- JWT authentication
- Password hashing with bcrypt
- Email verification
- Password reset functionality
- Social authentication (Google/GitHub) *(optional)*
- Protected routes & middleware
- Role-based access control

---

## Blog Management
- Create blog posts
- Update blog posts
- Delete blog posts
- Fetch all blog posts
- Fetch single blog post
- Draft & publish system
- Markdown support
- SEO-friendly slugs
- Categories & tags
- Search & filtering

---

## Comment System
- Add comments
- Edit comments
- Delete comments
- Nested replies (sub-comments)
- Comment pagination

---

## Media Uploads
- Image upload support
- Image resizing/optimization
- File validation
- Local/cloud storage support

---

## Security
- Input validation
- Rate limiting
- Secure HTTP headers
- CORS configuration
- SQL injection protection
- XSS protection
- Environment variable validation

---

## Performance
- Redis caching
- Session storage
- Optimized database queries
- Pagination & infinite scrolling support

---

# 🛠 Tech Stack

## Backend
- Node.js
- Express.js
- TypeScript

## Database
- PostgreSQL
- postgres.js

## Validation & Security
- Zod
- bcrypt
- JWT
- Envalid

## Caching & Sessions
- Redis

## Logging & Utilities
- Morgan
- dotenv

---

# 📂 Project Structure

```bash
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── validators/
├── types/
├── database/
├── app.ts
└── server.ts