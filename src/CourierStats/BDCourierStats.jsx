import { useState } from "react";

export default function BDCourierStats() {
    const [phone, setPhone] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCourierData = async () => {
        if (!phone) return;
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await fetch(
                "http://localhost:5000/api/bdcourier/check-courier",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ phone }),
                }
            );

            const result = await response.json();
            if (!result || result.status !== "success") {
                throw new Error(result?.error || "Failed to fetch data");
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
                📦 BD Courier Checker
            </h2>

            <div className="flex mb-4 gap-2">
                <input
                    type="text"
                    placeholder="Enter phone number (e.g., 017XXXXXXXX)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={fetchCourierData}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    {loading ? "Loading..." : "Check"}
                </button>
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {data && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        Courier Info for {data.phone}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.couriers.map((courier) => (
                            <div
                                key={courier.name}
                                className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 border-l-4 border-gray-300 hover:shadow-lg transition"
                            >
                                <img
                                    src={courier.logo}
                                    alt={courier.name}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {courier.name}
                                    </p>
                                    <p
                                        className={`font-medium ${
                                            courier.status === "active"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {courier.status.charAt(0).toUpperCase() +
                                            courier.status.slice(1)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}