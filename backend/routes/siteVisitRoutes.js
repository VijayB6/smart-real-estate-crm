const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  createSiteVisit,
  getAllVisits,
  getVisitById,
  deleteVisit
} = require("../controllers/siteVisitController");

router.post(
  "/",
  upload.single("selfieImage"),
  createSiteVisit
);


router.get("/", getAllVisits);

router.get("/:id", getVisitById);


router.delete("/:id", deleteVisit);

module.exports = router;