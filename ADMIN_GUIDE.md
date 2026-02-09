# Azriella Store - Admin System Documentation

## 🎉 **Setup Complete!**

Your Azriella store now has a complete admin system with authentication, database support, and product management.

---

## 🚀 **Quick Start**

### 1. **Database Setup (MongoDB Atlas - Recommended)**

#### Option A: MongoDB Atlas (Free Cloud Database)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Click "Connect" → "Connect your application"
5. Copy your connection string
6. Create `.env.local` in your project root:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$8ZqCjQfZKdOcK9xQWG0OyOKJ9XN8p9VKH3zU5YZLxHYqQX9KfIJMO
NODE_ENV=development
```

#### Option B: Use JSON Files (No Database Needed)
- If you don't set `MONGODB_URI`, the system automatically uses JSON files
- Products: `data/products.json`
- Orders: `data/orders.json`

---

### 2. **Admin Login**

**Default Credentials:**
- Username: `admin`
- Password: `azriella-admin-2026`

**Change Password:**
1. Generate a new hash:
```javascript
// In Node.js or browser console
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('your-new-password', 10);
console.log(hash);
```
2. Update `ADMIN_PASSWORD_HASH` in `.env.local`

---

## 📋 **Features**

### **Admin Dashboard** (`/admin`)
- ✅ Secure login with session management
- ✅ Product management (Create, Read, Update, Delete)
- ✅ Order viewing and management
- ✅ Image upload support
- ✅ Azriella-branded UI

### **API Routes**

#### Products API (`/api/products`)
```javascript
// GET - Fetch all products
GET /api/products

// POST - Create new product (requires auth)
POST /api/products
Body: Product object

// PUT - Update product (requires auth)
PUT /api/products
Body: Product object

// DELETE - Delete product (requires auth)
DELETE /api/products?id=product_id
```

#### Orders API (`/api/orders`)
```javascript
// GET - Fetch all orders (requires auth)
GET /api/orders

// POST - Create order (public - from checkout)
POST /api/order
Body: Order object
```

#### Upload API (`/api/upload`)
```javascript
// POST - Upload image (requires auth)
POST /api/upload
Body: FormData with 'file' field
Returns: { url: "/images/filename.jpg" }
```

#### Auth API (`/api/auth`)
```javascript
// POST - Login
POST /api/auth
Body: { username: "admin", password: "password" }

// POST - Logout
POST /api/auth
Body: { action: "logout" }
```

---

## 🗄️ **Database Schema**

### Products Collection
```typescript
{
  id: string;
  slug: string;
  title: string;
  priceCents: number;
  currency: "CAD";
  gender: "unisex" | "boys" | "girls" | "men" | "women";
  ageRange: "newborn" | "0-24m" | "2-8" | "9-14" | "adult";
  sizes: string[];
  category: "kids" | "adults";
  collection: string;
  tags: string[];
  image: string;
  description: string;
}
```

### Orders Collection
```typescript
{
  id: string;
  createdAtISO: string;
  email: string;
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  items: CartItem[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
}
```

---

## 🔒 **Security**

### Current Implementation
- **Password Hashing**: bcryptjs with salt rounds
- **Session Cookies**: HTTP-only, secure in production
- **API Protection**: Authentication required for admin operations
- **File Upload Validation**: Type and size restrictions

### Production Recommendations
1. **Use Environment Variables** for all secrets
2. **Enable HTTPS** (automatic on Vercel/Netlify)
3. **Change Default Password** immediately
4. **Set Strong Password** (12+ characters)
5. **Consider JWT** for enhanced security
6. **Add Rate Limiting** to prevent brute force
7. **Use CSP Headers** for XSS protection

---

## 📤 **Image Upload**

### Current Setup
- Images saved to `/public/images/`
- Max size: 5MB
- Allowed formats: JPEG, PNG, WebP
- Auto-generated unique filenames

### For Production
Consider using a cloud storage service:
- **Cloudinary** (free tier available)
- **AWS S3** (scalable)
- **Vercel Blob** (integrated)
- **Uploadcare** (easy setup)

---

## 🚀 **Deployment**

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production
```env
MONGODB_URI=your_production_mongodb_uri
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD_HASH=your_bcrypt_hash
NODE_ENV=production
```

---

## 🛠️ **Development**

### Start Development Server
```bash
npm run dev
```

### Access Admin
```
http://localhost:3000/admin
```

### Test APIs
Use Postman or curl:
```bash
# Login
curl -X POST http://localhost:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"azriella-admin-2026"}'

# Get products
curl http://localhost:3000/api/products
```

---

## 📊 **Data Migration**

### From JSON to MongoDB
```javascript
// Run this script after connecting to MongoDB
const { MongoClient } = require('mongodb');
const products = require('./data/products.json');
const orders = require('./data/orders.json');

async function migrate() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('azriella-store');
  
  await db.collection('products').insertMany(products);
  await db.collection('orders').insertMany(orders);
  
  console.log('Migration complete!');
  client.close();
}

migrate();
```

---

## 🎨 **Customization**

### Brand Colors (Already Set)
- Pink: `#E91E8C`
- Navy: `#1E2A5E`

### Add New Product Fields
1. Update `lib/types.ts`
2. Update form in `app/admin/page.tsx`
3. Update database schema

---

## 📞 **Support**

### Common Issues

**"Database not configured"**
- Add `MONGODB_URI` to `.env.local` OR
- Remove it to use JSON files

**"Invalid credentials"**
- Check username and password
- Verify `ADMIN_PASSWORD_HASH` in `.env.local`

**Image upload fails**
- Check `/public/images/` folder exists
- Verify file permissions

---

## ✅ **Next Steps**

1. ✅ Set up MongoDB Atlas (or use JSON files)
2. ✅ Create `.env.local` file
3. ✅ Change default admin password
4. ✅ Test admin login at `/admin`
5. ✅ Add your first product
6. ✅ Configure image upload (optional)
7. ✅ Deploy to production

---

## 📚 **Resources**

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vercel Deployment](https://vercel.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

**Built with ❤️ for Azriella**
