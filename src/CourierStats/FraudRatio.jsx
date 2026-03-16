import React from "react";

export default function FraudRatio({ delivered, cancelled }) {

    const total = delivered + cancelled;

    const deliveredPercent = total ? (delivered / total) * 100 : 0;
    const cancelledPercent = total ? (cancelled / total) * 100 : 0;

    const isSafe = cancelledPercent < 20;

    return (
        <div className="bg-white p-5 rounded-lg shadow-md">

            <h3 className="text-lg font-semibold mb-4">
                Delivery Risk Indicator
            </h3>

            {/* Ratio Bar */}
            <div className="w-full h-6 rounded overflow-hidden flex">

                <div
                    style={{ width: `${deliveredPercent}%` }}
                    className="bg-green-500 flex items-center justify-center text-xs text-white"
                >
                    {deliveredPercent.toFixed(0)}%
                </div>

                <div
                    style={{ width: `${cancelledPercent}%` }}
                    className="bg-red-500 flex items-center justify-center text-xs text-white"
                >
                    {cancelledPercent.toFixed(0)}%
                </div>

            </div>

            {/* Stats */}
            <div className="flex justify-between mt-3 text-sm">
                <span>✅ Delivered: {delivered}</span>
                <span>❌ Cancelled: {cancelled}</span>
            </div>

            {/* Status */}
            <div className="mt-4 text-center">

                {isSafe ? (
                    <span className="px-4 py-2 rounded bg-green-100 text-green-700 font-semibold">
                        SAFE CUSTOMER
                    </span>
                ) : (
                    <span className="px-4 py-2 rounded bg-red-100 text-red-700 font-semibold">
                        HIGH RISK
                    </span>
                )}

            </div>

        </div>
    );
}