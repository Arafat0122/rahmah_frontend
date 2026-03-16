import { useState } from "react";
import FraudRatio from "./FraudRatio";

export default function FraudPeekChecker() {
    const [phone, setPhone] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFraudData = async () => {
        if (!phone) return;

        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await fetch("http://localhost:5000/api/fraudpeek/check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ phone })
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error("FraudPeek request failed");
            }

            setData(result.data);
        } catch (err) {
            console.error(err);
            setError(err?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-gray-50 shadow-lg rounded-xl mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                🛡 FraudPeek Phone Check
            </h2>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Enter phone number (017XXXXXXXX)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={fetchFraudData}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    {loading ? "Checking..." : "Check"}
                </button>
            </div>

            {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
            )}

            {data && (
                <div className="space-y-6">

                    {/* Summary */}
                    <div className="bg-white p-4 rounded-lg shadow">

                        <FraudRatio
                            delivered={data.summary.delivered_parcels}
                            cancelled={data.summary.cancelled_parcels}
                        />

                        <h3 className="text-lg font-semibold mb-3">Summary</h3>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <p>Total Parcels: <b>{data.summary.total_parcels}</b></p>
                            <p>Delivered: <b>{data.summary.delivered_parcels}</b></p>
                            <p>Cancelled: <b>{data.summary.cancelled_parcels}</b></p>
                            <p>Delivery Rate: <b>{data.summary.delivery_rate}%</b></p>
                            <p>Return Rate: <b>{data.summary.average_return_rate}%</b></p>
                            <p>Fraud Alerts: <b>{data.summary.fraud_alerts}</b></p>
                            <p>Rating: <b>{data.summary.average_rating_score}</b></p>
                            <p>Courier Sources: <b>{data.summary.courier_sources}</b></p>
                        </div>
                    </div>

                    {/* Courier Details */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Courier Details</h3>

                        {data.couriers.map((c, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500"
                            >
                                <p className="font-semibold text-lg">{c.courier}</p>

                                <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                                    <p>Delivered: <b>{c.delivered_parcels}</b></p>
                                    <p>Cancelled: <b>{c.cancelled_parcels}</b></p>
                                    <p>Delivery Rate: <b>{c.delivery_rate}%</b></p>
                                    <p>Return %: <b>{c.return_percentage}%</b></p>
                                    <p>Fraud Reports: <b>{c.fraud_count}</b></p>
                                    <p>Rating: <b>{c.customer_rating_score}</b></p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
}