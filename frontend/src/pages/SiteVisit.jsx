import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import LocationCapture from "../components/LocationCapture";
import CameraCapture from "../components/CameraCapture";

import "../styles/siteVisit.css";

function SiteVisit() {

    const navigate = useNavigate();

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [image, setImage] = useState(null);

    const submitVisit = async () => {

        try {

            if (!latitude || !longitude) {
                alert("Please capture your GPS location.");
                return;
            }

            if (!image) {
                alert("Please upload your selfie.");
                return;
            }

            const formData = new FormData();

            formData.append(
                "leadId",
                "6850abcd1234567890123456"
            );

            formData.append(
                "employeeId",
                "6850abcd1234567890123457"
            );

            formData.append(
                "latitude",
                latitude
            );

            formData.append(
                "longitude",
                longitude
            );

            formData.append(
                "selfieImage",
                image
            );

            const response = await API.post(
                "/site-visits",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert(response.data.message);

        }
        catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                error.message
            );
        }

    };

    return (

        <div className="crm-page">

            <div className="crm-card fade">

                <div className="crm-header">

                    <h1>🏢 Smart Real Estate CRM</h1>

                    <p>
                        Site Visit Verification Module
                    </p>

                </div>

                <div className="card-section">

                    <h2>📍 GPS Verification</h2>

                    <LocationCapture
                        setLatitude={setLatitude}
                        setLongitude={setLongitude}
                    />

                    {
                        latitude &&

                        <div className="info-card">

                            <p>
                                <strong>Latitude :</strong>
                                {latitude}
                            </p>

                            <p>
                                <strong>Longitude :</strong>
                                {longitude}
                            </p>

                            <p className="success">
                                ✔ GPS Captured Successfully
                            </p>

                        </div>

                    }

                </div>

                <div className="card-section">

                    <h2>📷 Employee Selfie</h2>

                    <CameraCapture
                        setImage={setImage}
                    />

                    {
                        image &&

                        <div className="info-card">

                            <p>

                                Selected Image :

                                <br />

                                <strong>

                                    {image.name}

                                </strong>

                            </p>

                        </div>

                    }

                </div>

                <div className="button-group">

                    <button
                        className="primary-btn"
                        onClick={submitVisit}
                    >
                        Submit Site Visit
                    </button>

                    <button
                        className="secondary-btn"
                        onClick={() => navigate("/history")}
                    >
                        View Visit History
                    </button>

                </div>

            </div>

        </div>

    );

}

export default SiteVisit;