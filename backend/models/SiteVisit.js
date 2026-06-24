const mongoose = require("mongoose");

const siteVisitSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
      trim: true,
    },

    customerName: {
      type: String,
      default: "",
      trim: true,
    },

    propertyName: {
      type: String,
      default: "",
      trim: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    selfieImage: {
      type: String,
      default: "default.jpg",
    },

    remarks: {
      type: String,
      default: "",
    },

    visitTime: {
      type: Date,
      default: Date.now,
    },

    distance: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SiteVisit", siteVisitSchema);