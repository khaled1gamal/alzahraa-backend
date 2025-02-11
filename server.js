// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const cloudinary = require("cloudinary").v2;

// // تحميل المتغيرات البيئية
// dotenv.config();

// // تهيئة التطبيق
// const app = express();
// app.use(express.json());
// app.use(cors());

// // إعداد Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // API لحذف الصور من Cloudinary
// app.post("/delete-image", async (req, res) => {
//   const { public_id } = req.body;

//   if (!public_id) {
//     return res.status(400).json({ error: "يجب توفير Public ID للصورة" });
//   }

//   try {
//     const result = await cloudinary.uploader.destroy(public_id);
//     res.json({ success: true, result });
//   } catch (error) {
//     res.status(500).json({ error: "حدث خطأ أثناء حذف الصورة", details: error });
//   }
// });

// // تشغيل الخادم على المنفذ 5000
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 http://localhost:${PORT}`);
// });


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
const PORT = process.env.PORT || 5000;

// ✅ إعداد الـ Middleware
app.use(cors()); // حل مشكلة CORS للسماح بطلبات من الواجهة الأمامية
app.use(express.json()); // السماح بقراءة بيانات JSON

// ✅ استخدام المسارات
app.use("/", deleteImagesRoute);

// ✅ تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 الخادم يعمل على http://localhost:${PORT}`);
});
