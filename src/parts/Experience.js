import React, { } from 'react';

export const Experience = ({ experience }) => {
    return (
        <div>
            <h3 className="uppercase font-bold text-base text-xl font-sans pb-2 border-b-2">
                Experiences
            </h3>
            {experience.map(val =>
                <div key={val.name}>
                    <div className="flex ">
                        <p className="font-bold font-sans">
                            {val.companyName}
                        </p>
                        <div className="flex items-center ml-4">

                            <p className="font-bold font-sans">
                                ({val.from}
                            </p>
                            <i class="fa fa-long-arrow-right mx-3" aria-hidden="true" />
                            <p className="font-bold font-sans">
                                {val.to})
                            </p>

                        </div>

                    </div>
                    <div className="">
                        <div className="flex items-center ">
                            <i className="fa fa-map-marker text-red-500" aria-hidden="true"></i>
                            <p className="pl-2 text-gray-700 text-base">
                                {val.location}
                            </p>
                        </div>
                        <div className="flex ">
                            <p className="ml-4 text-gray-700 text-base">
                                Position:
                            </p>
                            <p className="pl-2 text-gray-700 text-base">
                                {val.type}
                            </p>
                        </div>

                        {val.description &&
                            <p className="mt-2 whitespace-pre text-gray-700 text-base">
                                {val.description}
                            </p>
                        }
                    </div>
                    <div className="p-2">
                        {val.jobs.map((job, index) =>
                            <div key={index}>
                                <span className="inline-block bg-gray-200 hover:bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    #{job.name} - {job.lang}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}