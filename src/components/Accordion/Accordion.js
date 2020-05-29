import React, { useState } from 'react';
// icons
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
// styles
import './Accordion.css';

export default function Accordion({ idAccordion, header, body }) {
  const [openBody, setOpenBody] = useState(false);

  return (
    <div className="accordion" id={idAccordion}>
      <div
        className="accordion__header"
        style={{
          borderBottomLeftRadius: !openBody ? 4 : 0,
          borderBottomRightRadius: !openBody ? 4 : 0,
        }}
        onClick={() => setOpenBody(!openBody)}
      >
        {header}
        {openBody ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
      </div>
      <div
        className={
          `accordion__body ${!openBody ?
            'collapsed' :
            null}`
        }
      >
        {body}
      </div>
    </div>
  );
}
