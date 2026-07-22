# Luma

A browser-based image cropping tool built for preparing high-quality photos for printing. Upload multiple images, crop each one to a popular print size, preview the results, and export print-ready files—all without uploading your photos to a server.

---

## ✨ Features

- 📸 Upload up to **10 images** at once
- ✂️ Interactive image cropping
- 🖼️ Popular print sizes
  - 4 × 6
  - 5 × 7
  - 8 × 10
  - 8 × 12
  - 10 × 10
  - 10 × 13
  - 11 × 14
  - 12 × 12
  - 12 × 16
  - 16 × 20
  - 18 × 24
  - 20 × 24
  - 24 × 36

- 🔄 Image rotation
- 🔍 Zoom controls
- 👀 Live crop previews
- 💾 Crop settings saved for every image
- 📥 Download high-resolution print-ready images
- 🔒 Everything runs locally in your browser

---

## 🛠️ How It Works

### 1. Upload

Upload up to **10 images** from your computer.

Each image is stored locally with its:

- Original image URL
- Width
- Height

No images are uploaded to any server.

---

### 2. Edit

Each image can be:

- Cropped
- Zoomed
- Rotated
- Assigned a print size

When confirmed, the editor stores:

- Selected print size
- Cropped area
- Preview image

This allows you to switch between images without losing your edits.

---

### 3. Download

When **Download** is pressed:

1. The original image is loaded.
2. The saved crop is applied.
3. The image is resized to the selected print dimensions.
4. A high-quality JPEG is generated.
5. The image is downloaded.

Because the export always uses the **original image**, quality is preserved throughout the editing process.

---

## 🖼️ Image Processing

Instead of permanently modifying uploaded images during editing, the application stores crop information and regenerates the final image only during export.

Benefits include:

- Better image quality
- Lower memory usage
- Faster editing
- Easy re-editing
