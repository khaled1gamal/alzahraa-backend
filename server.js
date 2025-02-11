

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const deleteImagesRoute = require("./routes/deleteImages");

// ✅ تحميل المتغيرات من `.env`
dotenv.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ✅ إنشاء التطبيق Express
const app = express();
const PORT = process.env.PORT || 5001;

// ✅ إعداد الـ Middleware
app.use(cors()); // حل مشكلة CORS للسماح بطلبات من الواجهة الأمامية
app.use(express.json()); // السماح بقراءة بيانات JSON

// ✅ استخدام المسارات
app.use("/", deleteImagesRoute);

// ✅ تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 الخادم يعمل على http://localhost:${PORT}`);
});
