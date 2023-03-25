import { Detail } from '../components/Detail';
import { Tags } from '../components/Tags';
import { Title } from '../components/Title';
import React, { useState } from 'react';

export const Experience = ({ experience }) => {
    const [isCollapse, setExtenseAll] = useState(false);
    const onCollapse = () => {
        setExtenseAll(!isCollapse);
    }
    return (
        <div>
            <div className='sticky top-0 flex items-center border-b-2 bg-white z-10'>
                <Title name="Experiences" className='flex-1 border-b-0' />
                <button className='py-3 px-4' >
                    <label htmlFor="extenseInput" className="flex items-center cursor-pointer mb-4 md:mb-0">
                        <span className="mr-2 font-bold">Extense all</span>
                        <div className="relative extenseAll">
                            <input id="extenseInput" type="checkbox" className="hidden"
                                checked={isCollapse}
                                onChange={onCollapse}
                            />
                            <div className="toggle__line w-12 h-6 bg-gray-200 rounded-full shadow-inner"></div>
                            <div className="toggle__dot absolute w-5 h-5 bg-white rounded-full shadow inset-y-0 left-0"></div>
                        </div>
                    </label>
                </button>
            </div>
            <div className="px-6 py-4 flex mt-2">
                <div>
                    <div className="h-full w-1 bg-gray-300 timeline rounded"></div>
                </div>
                <div className="flex flex-1 flex-col ml-4 mt-2">
                    <div className="max-h-full">
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
                                    <div className="flex items-center ml-2">
                                        <p className="font-bold font-sans">
                                            ({val.from}
                                        </p>
                                        <i className="fa fa-long-arrow-right mx-3" aria-hidden="true" />
                                        <p className="font-bold font-sans">
                                            {val.to})
                                        </p>

                                    </div>

                                </div>
                                <div>
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
                                        <p className="mt-2 whitespace-pre-wrap text-gray-700 text-base ">
                                            {val.description}
                                        </p>
                                    }
                                </div>
                                <Tags className="p-2" tags={val.jobs} format={(job) => `${job.name} - ${job.lang}`} />
                                <Detail detailContent={val.details} className="ml-4" isCollapse={isCollapse} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}