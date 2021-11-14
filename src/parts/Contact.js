
import React, { } from 'react';

import { ContactItem } from 'components/ContactItem';

export const Contact = ({ contacts }) => {
    return (
        <div className="flex items-center">
            <p className="text-md bold font-sans text-white mr-4">Contacts</p>
            {contacts.map(val => <ContactItem key={val.name} name={val.name} link={val.link} />)}
        </div>
    )
}