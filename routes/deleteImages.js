const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

// ✅ إعداد Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ✅ مسار API لحذف صور متعددة من Cloudinary
router.post("/delete-images", async (req, res) => {
  try {
    const { publicIds } = req.body;
    
    
    console.log("✅ قائمة public_id المستلمة:", publicIds); // 🔹 تحقق من البيانات

    if (!publicIds || !Array.isArray(publicIds) || publicIds.length === 0) {
      return res.status(400).json({ error: "يجب إرسال قائمة valid public_id" });
    }

    // ✅ حذف الصور فقط إذا كانت `publicIds` صحيحة
    const deletePromises = publicIds.map((id) =>
      cloudinary.uploader.destroy(id)
    );
    await Promise.all(deletePromises);

    res.json({ message: "تم حذف جميع الصور بنجاح" });
  } catch (error) {
    console.error("خطأ أثناء حذف الصور:", error);
    res.status(500).json({ error: "حدث خطأ أثناء حذف الصور" });
  }
});

module.exports = router;
