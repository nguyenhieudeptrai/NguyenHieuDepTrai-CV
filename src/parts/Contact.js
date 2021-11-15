
import React, { useState } from 'react';

import { ContactItem } from 'components/ContactItem';

export const Contact = ({ contacts }) => {
    const [value, setValue] = useState();
    return (
        <div className="w-1/3 h-full flex flex-col md:self-auto self-center ">
            <div className="flex items-center justify-end" >
                <p className="text-md text-right bold font-sans text-white mr-4 md:block hidden">
                    Contacts
                </p>
                {contacts.map(val =>
                    <ContactItem key={val.name} {...val}
                        onClick={() => {
                            setValue(val.link);
                            setTimeout(() => {
                                setValue(undefined);
                            }, 30000);
                        }}
                    />
                )}
            </div>
            {value &&
                <p className="text-white text-right font-sans underline md:block hidden">
                    {value}
                </p>}
        </div>
    )
}