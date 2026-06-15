import React, { useState } from "react";

function LocationCapture({ setLatitude, setLongitude }) {

    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("");

    const getLocation = () => {

        if (!navigator.geolocation) {

            alert("Geolocation is not supported by your browser.");

            return;
        }

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const lat = position.coords.latitude.toFixed(6);
                const lng = position.coords.longitude.toFixed(6);

                setLatitude(lat);
                setLongitude(lng);

                setLocation(`${lat}, ${lng}`);

                setStatus("success");

            },

            () => {

                setStatus("error");

                alert("Unable to fetch location.");

            }

        );

    };

    return (

        <div className="capture-card">

            <button
                className="primary-btn"
                onClick={getLocation}
            >
                📍 Capture Current Location
            </button>

            {
                location &&
                <div className="info-card">

                    <p><strong>Latitude :</strong> {location.split(",")[0]}</p>

                    <p><strong>Longitude :</strong> {location.split(",")[1]}</p>

                    <p className="success">
                        ✅ GPS Verified Successfully
                    </p>

                </div>
            }

            {
                status === "error" &&
                <p className="failed">
                    ❌ Unable to fetch location.
                </p>
            }

        </div>

    );

}

export default LocationCapture;