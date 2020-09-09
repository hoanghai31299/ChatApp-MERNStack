const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file1", file);
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log("file", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  console.log("file41", file);
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    console.log("file1", file);
    cb(null, true);
  } else {
    cb({ message: "Upsupported File Format" }, false);
  }
};

const uploads = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
});

module.exports = uploads;
