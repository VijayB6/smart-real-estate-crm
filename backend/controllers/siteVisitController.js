const SiteVisit = require("../models/SiteVisit");
const calculateDistance = require("../services/locationService");


exports.createSiteVisit = async (req, res) => {
  try {

    const {
      leadId,
      employeeId,
      latitude,
      longitude
    } = req.body;

    // Demo Property Location
    const propertyLatitude = 11.6643;
    const propertyLongitude = 78.1460;

    const distance = calculateDistance(
      Number(latitude),
      Number(longitude),
      propertyLatitude,
      propertyLongitude
    );

    

    const siteVisit = await SiteVisit.create({
      leadId,
      employeeId,
      latitude,
      longitude,
      selfieImage: req.file
        ? req.file.filename
        : "default.jpg",
      visitTime: new Date(),
      distance,
      status: "Site Visit Completed"
    });

    res.status(201).json({
      success: true,
      message: "Site Visit Saved Successfully",
      data: siteVisit
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Get All Visits
exports.getAllVisits = async (req, res) => {

  try {

    const visits = await SiteVisit.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: visits.length,
      data: visits
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


exports.getVisitById = async (req, res) => {

  try {

    const visit = await SiteVisit.findById(
      req.params.id
    );

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit Not Found"
      });
    }

    res.status(200).json({
      success: true,
      data: visit
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


exports.deleteVisit = async (req, res) => {

  try {

    const visit = await SiteVisit.findById(
      req.params.id
    );

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit Not Found"
      });
    }

    await SiteVisit.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Visit Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};