# TastyGo 🍔🚴‍♂️ - README

## Live URLs

- **User Interface**: [https://tastygo.vercel.app/](https://tastygo.vercel.app/)
- **Partner Interface**: [https://tastygo.vercel.app/partners](https://tastygo.vercel.app/partners)

## Overview

TastyGo is a full-stack food delivery platform built from scratch. It replicates core features of applications like Zomato while introducing custom features tailored for both food partners and end-users. The project was developed using the MERN stack, with Next.js for frontend routing and server-side rendering, and Express for the backend API. We use the Next.js App Directory for organizing components, and kept our Express backend lightweight by not using controllers.

## Features

### 🍴 For Food Partners

- Add/Delete food items
- Update restaurant information
- View analytics
- View orders
- View earnings

### 👥 For Users

- Search for food items
- Explore most ordered categories
- Discover random foods
- View item details from a specific restaurant

## Technologies Used

- **Next.js (App Directory)** – for frontend routing, server-side rendering
- **Tailwind CSS** – for sleek and interactive styling
- **Lucide & React Icons** – for enhanced UI design
- **Express.js** – backend API handling
- **MongoDB** – for database operations
- **Cloudinary** – for image storage and retrieval
- **Jotai** – for global state management
- **Google Cloud Run** – for backend deployment

## Project Highlights

- Developed from scratch using modern technologies.
- Used App Directory in Next.js for organized component-based structure.
- Avoided using controllers on the backend for simplicity.
- Enabled Cloudinary to efficiently store and serve images.
- Integrated powerful UI libraries for an enhanced user experience.
- Designed with mobile-first responsive UI using Tailwind.

## Continuous Deployment

Set up on Google Cloud Run with the following:

- Dockerized backend
- Deployed with `gcloud run deploy`
- Backend listens on `PORT=8080`
- Environment variables configured for secure runtime settings

## Installation & Local Setup

```bash
# Clone the repo
git clone https://github.com/saikrishna488/tastygo.git
cd tastygo

# Install frontend dependencies
cd client
npm install
npm run dev

# Install backend dependencies
cd ../backend
npm install
npm run dev
```

## Deployment

Refer to `Google Cloud Run` deployment docs. Make sure:

- You have enabled billing
- You have Docker installed
- Proper environment variables set for `PORT`, `MONGODB_URI`, `CLOUDINARY` keys

## License

MIT License

---

🚀 **TastyGo** - From mindless scrolling to meaningful bites!