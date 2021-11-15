import { Tags } from 'components/Tags';
import { Title } from 'components/Title';
import React, { } from 'react';

export const Experience = ({ experience }) => {
    return (
        <div className="">
            <Title name="Experiences" />
            <div className="flex mt-2">
                <div>
                    <div className="h-full w-1 bg-gray-300 timeline rounded"></div>
                </div>
                <div className="flex flex-1 flex-col ml-4 mt-2">
                    <div className="max-h-full overflow-y-auto">
                        {experience.map((val, index) =>
                            <div key={index}>
                                <div className="flex items-center">
                                    <i className="fa fa-circle -ml-5.5 absolute text-green-500" aria-hidden="true"></i>
                                    {val.companyType === 'C' &&
                                        <i className="fa fa-building mr-2" aria-hidden="true"></i>
                                    }
                                    {val.companyType === 'F' &&
                                        <i className="fa fa-users mr-2" aria-hidden="true"></i>
                                    }
                                    {val.companyType === 'G' &&
                                        <i className="fa fa-graduation-cap mr-2" aria-hidden="true"></i>
                                    }
                                    <p className="font-bold font-sans">
                                        {val.companyName}
                                    </p>
                                    <div className="flex items-center ml-4">

                                        <p className="font-bold font-sans">
                                            ({val.from}
                                        </p>
                                        <i className="fa fa-long-arrow-right mx-3" aria-hidden="true" />
                                        <p className="font-bold font-sans">
                                            {val.to})
                                        </p>

                                    </div>

                                </div>
                                <div className="">
                                    {val.location &&
                                        <div className="flex items-center ">
                                            <i className="fa fa-map-marker text-red-500" aria-hidden="true"></i>
                                            <p className="pl-2 text-gray-700 text-base">
                                                {val.location}
                                            </p>
                                        </div>
                                    }
                                    {val.type &&
                                        <div className="flex ">
                                            <p className="ml-4 text-gray-700 text-base">
                                                Position:
                                            </p>
                                            <p className="pl-2 text-gray-700 text-base">
                                                {val.type}
                                            </p>
                                        </div>
                                    }
                                    {val.description &&
                                        <p className="mt-2 whitespace-pre text-gray-700 text-base">
                                            {val.description}
                                        </p>
                                    }
                                </div>

                                <Tags className="p-2" tags={val.jobs} format={(job) => `${job.name} - ${job.lang}`} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}