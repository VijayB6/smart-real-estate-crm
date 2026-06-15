import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/siteVisit.css";

function VisitHistory() {

    const navigate = useNavigate();

    const [visits, setVisits] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchVisits();
    }, []);

    const fetchVisits = async () => {

        try {

            const response = await API.get("/site-visits");

            setVisits(response.data.data);

        } catch (error) {

            console.log(error);

        }

    };

    const filteredVisits = visits.filter((visit) => {

        return (

            visit.latitude?.toString().includes(search) ||

            visit.longitude?.toString().includes(search) ||

            visit.status?.toLowerCase().includes(search.toLowerCase())

        );

    });

    return (

        <div className="crm-page">

            <div className="history-card fade">

                <div className="crm-header">

                    <h1>📋 Site Visit History</h1>

                    <p>
                        Smart Real Estate CRM
                    </p>

                </div>

                <div className="search-box">

                    <input

                        type="text"

                        placeholder="Search by Latitude, Longitude or Status..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                </div>

                <div className="table-wrapper">

                    <table>

                        <thead>

                            <tr>

                                <th>#</th>

                                <th>Latitude</th>

                                <th>Longitude</th>

                                <th>Distance (m)</th>

                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredVisits.length > 0 ?

                                    filteredVisits.map((visit, index) => (

                                        <tr key={visit._id}>

                                            <td>{index + 1}</td>

                                            <td>{visit.latitude}</td>

                                            <td>{visit.longitude}</td>

                                            <td>{visit.distance}</td>

                                            <td>

                                                <span

                                                    className={

                                                        visit.status === "Verified"

                                                            ? "badge success"

                                                            : visit.status === "Pending"

                                                                ? "badge pending"

                                                                : "badge failed"

                                                    }

                                                >

                                                    {visit.status}

                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td colSpan="5">

                                            No Site Visit Records Found

                                        </td>

                                    </tr>

                            }

                        </tbody>

                    </table>

                </div>

                <div className="button-group">

                    <button

                        className="secondary-btn"

                        onClick={() => navigate("/")}

                    >

                        ← Back to Site Visit

                    </button>

                </div>

            </div>

        </div>

    );

}

export default VisitHistory;