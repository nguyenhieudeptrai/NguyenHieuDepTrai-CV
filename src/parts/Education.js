import React, { } from 'react';
export const Education = ({ schools }) => {
    return (
        <div>
            <h3 className="uppercase font-bold text-base text-xl font-sans pb-2 border-b-2">
                Educations
            </h3>
            {schools.map(val =>
                <div key={val.name}>
                    <div className="flex ">
                        <p className="font-bold font-sans">
                            {val.name}
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
                    <div className="pl-6">
                        <div className="flex ">
                            <p className="text-gray-700 text-base">
                                Major:
                            </p>
                            <p className="ml-3 text-gray-700 text-base">
                                {val.major}
                            </p>
                        </div>

                        <div className="flex">
                            <p className="text-gray-700 text-base">
                                GPA:
                            </p>
                            <p className="ml-3 text-gray-700 text-base">
                                {val.gpa}
                            </p>
                        </div>
                        {val.description &&
                            <p className="ml-3 text-gray-700 text-base">
                                {val.description}
                            </p>
                        }
                    </div>
                    <div className="p-2">
                        {val.majorType.map(type =>
                            <span className="inline-block bg-gray-200 hover:bg-red-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                #{type}
                            </span>
                        )}
                    </div>
                    <div className="">
                        <p>
                            Certificate:
                        </p>
                        {val.certificates.map((c, index) =>
                            <div key={index}>
                                <i class="fa fa-certificate text-yellow-500" aria-hidden="true"></i>
                                <a className="ml-2 cursor-pointer text-green-500 font-bold text-base" href={c.link} target="_blank" rel="noreferrer" >{c.name}</a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )

}