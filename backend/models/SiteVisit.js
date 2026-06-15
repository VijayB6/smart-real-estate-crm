const mongoose = require("mongoose");

const siteVisitSchema = new mongoose.Schema({

    leadId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lead",
        required:true
    },

    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    latitude:{
        type:Number,
        required:true
    },

    longitude:{
        type:Number,
        required:true
    },

    selfieImage:{
        type:String,
        required:true
    },

    visitTime:{
        type:Date,
        default:Date.now
    },

    distance:{
        type:Number,
        default:0
    },

    status:{
        type:String,
        default:"Site Visit Completed"
    }

},{
    timestamps:true
});

module.exports = mongoose.model(
    "SiteVisit",
    siteVisitSchema
);