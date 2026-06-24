const SiteVisit = require("../models/SiteVisit");
const calculateDistance = require("../services/locationService");

// Create Site Visit
exports.createSiteVisit = async (req, res) => {
  try {
    const {
      employeeName,
      customerName,
      propertyName,
      latitude,
      longitude,
      remarks,
    } = req.body;

    const propertyLatitude = 11.6643;
    const propertyLongitude = 78.1460;

    const distance = calculateDistance(
      Number(latitude),
      Number(longitude),
      propertyLatitude,
      propertyLongitude
    );

    const siteVisit = await SiteVisit.create({
      employeeName,
      customerName,
      propertyName,
      latitude,
      longitude,
      remarks,

      selfieImage: req.file
        ? req.file.filename
        : "default.jpg",

      visitTime: new Date(),

      distance,

      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Site Visit Created Successfully",
      data: siteVisit,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Visits
exports.getAllVisits = async (req, res) => {
  try {
    const visits = await SiteVisit.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: visits.length,
      data: visits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Visit
exports.getVisitById = async (req, res) => {
  try {
    const visit = await SiteVisit.findById(req.params.id);

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: visit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Approve Visit
exports.approveVisit = async (req, res) => {
  try {
    const visit = await SiteVisit.findByIdAndUpdate(
      req.params.id,
      {
        status: "Approved",
      },
      {
        new: true,
      }
    );

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Visit Approved",
      data: visit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reject Visit
exports.rejectVisit = async (req, res) => {
  try {
    const visit = await SiteVisit.findByIdAndUpdate(
      req.params.id,
      {
        status: "Rejected",
      },
      {
        new: true,
      }
    );

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Visit Rejected",
      data: visit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Visit
exports.deleteVisit = async (req, res) => {
  try {
    const visit = await SiteVisit.findById(req.params.id);

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit Not Found",
      });
    }

    await SiteVisit.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Visit Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};