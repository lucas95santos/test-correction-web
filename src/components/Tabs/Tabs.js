import React from 'react';
// styles
import './Tabs.css';

export default function Tabs(props) {
  const { selectors, content, activeTab } = props;

  return (
    <div className="tabs">
      <div className="tabs__selectors">
        {selectors.map((selector, index) => (
          <div
            className={`selector ${index === activeTab ? 'selector--active' : null}`}
            key={index}
            // onClick={() => selectTab(index)}
          >
            <span>{index+1}</span>
            {selector}
          </div>
        ))}
      </div>
      <div className="tabs__content">
        {content[activeTab]}
      </div>
    </div>
  );
}
