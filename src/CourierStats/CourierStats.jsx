import { useState } from "react";

export default function CourierStats() {
    const [phone, setPhone] = useState("");
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCourierStats = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("https://fraudbd.com/api/check-courier-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api_key": "d7f62f8e0021d9716e94335318b3125283dc50b05658022a7dc9065b29eb9583"
                },
                body: JSON.stringify({ phone_number: phone })
            });

            const result = await response.json();
            if (!result.status) throw new Error(result.message);

            setStats(result.data);
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-gray-50 shadow-lg rounded-xl mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">📦 Courier Stats Checker</h2>

            <div className="flex mb-4 gap-2">
                <input
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={fetchCourierStats}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    {loading ? "Loading..." : "Check"}
                </button>
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {stats && (
                <div className="space-y-6">
                    {/* Total Summary Card */}
                    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Total Summary</h3>
                        <div className="flex justify-between flex-wrap gap-2">
                            <div className="p-2 bg-gray-100 rounded-md w-1/2">
                                <p className="text-gray-600 font-medium">Total Orders</p>
                                <p className="text-lg font-bold">{stats.totalSummary.total}</p>
                            </div>
                            <div className="p-2 bg-green-100 rounded-md w-1/2">
                                <p className="text-green-800 font-medium">Delivered</p>
                                <p className="text-lg font-bold">{stats.totalSummary.success}</p>
                            </div>
                            <div className="p-2 bg-red-100 rounded-md w-1/2">
                                <p className="text-red-800 font-medium">Canceled</p>
                                <p className="text-lg font-bold">{stats.totalSummary.cancel}</p>
                            </div>
                            <div className="p-2 bg-blue-100 rounded-md w-1/2">
                                <p className="text-blue-800 font-medium">Success Rate</p>
                                <p className="text-lg font-bold">{stats.totalSummary.successRate}%</p>
                            </div>
                        </div>
                    </div>

                    {/* Per Courier Cards */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Per Courier</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(stats.Summaries).map(([courier, data]) => (
                                <div
                                    key={courier}
                                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg border-l-4 border-gray-300 transition"
                                >
                                    <div className="flex items-center mb-2 gap-2">
                                        <img src={data.logo} alt={courier} className="h-8 w-8 rounded-full object-cover" />
                                        <h4 className="text-lg font-semibold text-gray-800">{courier}</h4>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span className="text-gray-600">Total: {data.total}</span>
                                        <span className="text-green-600 font-semibold">Delivered: {data.success}</span>
                                        <span className="text-red-600 font-semibold">Canceled: {data.cancel}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}