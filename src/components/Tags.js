import React, { } from 'react';

export const Tags = ({ tags, format, className = "" }) => {

    return (
        <div className={`flex flex-wrap ${className}`}>
            {tags.map((tag, index) =>
                <div key={index}>
                    <span className="block bg-gray-200 hover:bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #{format(tag)}
                    </span>
                </div>
            )}
        </div>
    )
}