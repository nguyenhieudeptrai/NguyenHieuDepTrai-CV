import { Tags } from 'components/Tags';
import { Title } from 'components/Title';
import React, { } from 'react';
export const Education = ({ schools }) => {
    return (
        <div>
            <Title name="Educations" />
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
                            <i className="fa fa-long-arrow-right mx-3" aria-hidden="true" />
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
                    <Tags className="p-2" tags={val.majorType} format={(tag) => tag} />
                    <div className="">
                        <p>
                            Certificate:
                        </p>
                        {val.certificates.map((c, index) =>
                            <div key={index}>
                                <i className="fa fa-certificate text-yellow-500" aria-hidden="true"></i>
                                <a className="ml-2 cursor-pointer text-green-500 font-bold text-base" href={c.link} target="_blank" rel="noreferrer" >{c.name}</a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )

}