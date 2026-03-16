import { X } from 'lucide-react';
import React from 'react';

const FilterTag = ({ label, onClear, color = "bg-white text-slate-700 border-slate-200 shadow-sm" }) => {
    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${color}`}>
            {label}
            <button
                onClick={onClear}
                className="hover:bg-slate-100 rounded-full p-0.5 transition-colors"
            >
                <X size={12} strokeWidth={3} />
            </button>
        </div>
    );
};

export default FilterTag;