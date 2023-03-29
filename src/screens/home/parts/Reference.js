import { Title } from '../components/Title';
import React, { } from 'react';
import { Link } from 'react-router-dom';

export const Reference = ({ referenceSources = [] }) => {
    return (
        <div>
            <Title name="References" />
            <div className='py-3 px-4'>
                {referenceSources.map((v, i) => (
                    <div key={i} className="mb-4">
                        &rarr;  <Link to={v.url} className='font-bold hover:underline text-sky-600'>{v.name}</Link>
                        <p className='italic ml-4'>
                            {v.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
