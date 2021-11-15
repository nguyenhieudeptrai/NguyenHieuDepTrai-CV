import { Title } from 'components/Title';
import React, { } from 'react';

export const Skill = ({ myself, softwares, others }) => {
    return (
        <div>
            <Title name="Skills" />
            <div className="flex pt-4">
                <div className="flex flex-1 flex-col">
                    <p className="font-roboto font-bold border-b-2 border-green-800 w-4/5">Myself</p>
                    <div>
                        {myself && myself.map(val =>
                            <p key={val} className="flex items-center">
                                <i className="fa fa-circle text-sm mr-2 text-yellow-500 " aria-hidden="true"></i>
                                {val}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-1 flex-col">
                    <p className="font-roboto font-bold border-b-2 border-green-800 w-4/5">Softwares</p>
                    <div>
                        {softwares && softwares.map(val =>
                            <p key={val} className="flex items-center">
                                <i className="fa fa-circle text-sm mr-2 text-yellow-500 " aria-hidden="true"></i>
                                {val}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-1 flex-col">
                    <p className="font-roboto font-bold border-b-2 border-green-800 w-4/5">Others</p>
                    <div>
                        {others && others.map(val =>
                            <p key={val} className="flex items-center">
                                <i className="fa fa-circle text-sm mr-2 text-yellow-500 " aria-hidden="true"></i>
                                {val}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}