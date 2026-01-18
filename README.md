# TechGet Ultra - E-Commerce Product Catalog

Modern product browsing application with clean design, full authentication, and admin capabilities.  
Built using **Next.js 16 (App Router)** + **MongoDB** + **NextAuth.js** with responsive UI and smooth user experience.

## ✨ Features Implemented

- Modern, multi-section landing page  
- Complete authentication system using **NextAuth.js v4**  
  - Credentials login (email + password)  
  - Registration support  
  - Optional Google OAuth ready configuration  
- Protected admin panel for adding new products (`/admin/add-product`)  
- Public product listing page with cards (`/products`)  
- Detailed single product view (`/products/[id]`)  
- User profile page – view & update basic information (`/profile`)  
- Basic role-based route protection  
- MongoDB database for products, users, and purchase records  
- Beautiful toast notifications using `react-hot-toast`  
- Responsive & mobile-first design  
- Loading skeletons for better UX  
- Custom font family: Bai Jamjuree  

## 📂 Project Structure – Key Directories

```
src/
├── app/
│   ├── admin/add-product/          # Protected admin product creation
│   ├── api/
│   │   ├── auth/[...nextauth]/     # NextAuth.js core route
│   │   ├── products/               # List, single, create products
│   │   ├── purchases/              # Purchase-related endpoints
│   │   └── users/                  # Profile & role management
│   ├── login/                      # Login page
│   ├── register/                   # Registration page
│   ├── products/
│   │   ├── [id]/                   # Single product detail
│   │   └── page.jsx                # All products listing
│   ├── profile/                    # Protected user profile
│   └── orders/                     # Orders page (placeholder)
├── components/
│   ├── Cards/ProductCard.jsx
│   ├── Forms/
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   └── ProfileForm.jsx
│   ├── Hero.jsx
│   ├── Navbar.jsx
│   └── StoreFeatures.jsx
├── lib/db/
│   ├── dbConnect.js
│   ├── products.js
│   ├── users.js
│   └── purchases.js
├── context/AuthContext.jsx         # Optional custom auth context
└── hooks/useUserRole.js
```

## 🚀 Tech Stack

- **Framework**          → Next.js 16 (App Router)  
- **Authentication**     → NextAuth.js ^4.24  
- **Database**           → MongoDB  
- **Styling**            → Tailwind CSS + Custom Font (Bai Jamjuree)  
- **Notifications**      → react-hot-toast  
- **Icons**              → react-icons  
- **Loading States**     → react-loader-spinner  
- **Image Carousel**     → Swiper ^12  

## 📋 Routes Summary

| Path                     | Access Level           | Description                                    |
|--------------------------|------------------------|------------------------------------------------|
| `/`                      | Public                 | Main landing page (Hero + multiple sections)   |
| `/products`              | Public                 | All products grid/listing                      |
| `/products/[id]`         | Public                 | Single product detailed view                   |
| `/login`                 | Public                 | Login page                                     |
| `/register`              | Public                 | User registration page                         |
| `/profile`               | Protected              | User profile view & edit                       |
| `/admin/add-product`     | Protected (Admin only) | Admin form to create new products              |
| `/orders`                | Protected              | Orders history (currently placeholder)         |
| `/api/auth/*`            | System                 | NextAuth.js authentication endpoints           |
| `/api/products`          | Public GET / Protected POST | Products CRUD operations               |
| `/api/users/profile`     | Protected              | Get & update user profile                      |

## ⚡ Quick Start

### Prerequisites

- Node.js 18 or higher  
- MongoDB (local instance or MongoDB Atlas)

### Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/mdnurnabirana/TechGet
cd TechGet
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create and configure environment variables

```bash
cp .env.example .env.local
```

Fill in the following required values in `.env.local`:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster...
NEXTAUTH_SECRET=your-very-long-random-secret-string-here
NEXTAUTH_URL=http://localhost:3000
```

Optional – Google OAuth (if you want social login):

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. Start development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open http://localhost:3000 in your browser.

## 🔐 Default Login Credentials (Credentials Provider)

For quick testing and demonstration:

```
Email:    adminone@gmail.com
Password: 123456
```