const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  createSiteVisit,
  getAllVisits,
  getVisitById,
  approveVisit,
  rejectVisit,
  deleteVisit
} = require("../controllers/siteVisitController");

// Employee submits visit
router.post(
  "/",
  upload.single("selfieImage"),
  createSiteVisit
);

// Admin gets all visits
router.get("/", getAllVisits);

// Admin gets one visit
router.get("/:id", getVisitById);

// Admin approves visit
router.put("/:id/approve", approveVisit);

// Admin rejects visit
router.put("/:id/reject", rejectVisit);

// Admin deletes visit
router.delete("/:id", deleteVisit);

module.exports = router;