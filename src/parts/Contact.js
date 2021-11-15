
import React, { useState } from 'react';

import { ContactItem } from 'components/ContactItem';

export const Contact = ({ contacts }) => {
    const [value, setValue] = useState();
    return (
        <div className="w-1/3">
            <div className="flex items-center justify-end" >
                <p className="text-md text-right bold font-sans text-white mr-4">
                    Contacts
                </p>
                {contacts.map(val =>
                    <ContactItem key={val.name} {...val}
                        onClick={() => {
                            setValue(val.link);
                            setTimeout(() => {
                                setValue(undefined);
                            }, 10000);
                        }}
                    />
                )}
            </div>
            {value &&
                <p className="text-white text-right font-sans underline ">
                    {value}
                </p>}
        </div>
    )
}