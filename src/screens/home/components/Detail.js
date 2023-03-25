import React, { useState } from 'react';

export const Detail = ({ isCollapse, detailContent = [], className = "" }) => {
    const [viewDetail, setViewDetail] = useState(false);
    return (
        <div className={`${className}`}>
            <div className={`${(viewDetail || isCollapse) ? "block" : "hidden"}`}>
                {detailContent?.map((content, index) =>
                    <div key={index} className="mb-2">
                        <div className="font-bold">
                            + <span className="underline">{content.title}</span>:
                        </div>
                        <div className="ml-4">
                            {content.lines?.map((line, index) => (
                                <p key={`l${index}`} className="">
                                    - {line}
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <button className={` border-2 rounded-md px-3 mb-2 ${isCollapse ? "bg-gray-200" : "hover:border-black "}`}
                onClick={() => setViewDetail(!viewDetail)}
            >
                <span className="mr-2">{(viewDetail || isCollapse) ? "Collapse" : "View detail"}</span>
                {(viewDetail || isCollapse) ?
                    <i className="fa fa-angle-up" aria-hidden="true" /> :
                    <i className="fa fa-angle-down" aria-hidden="true" />
                }
            </button>
        </div>
    )
}