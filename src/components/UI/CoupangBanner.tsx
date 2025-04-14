'use client';

import React from 'react';
import '@/css/styles.css';

const CoupangBanner: React.FC = () => {
  return (
    <div className="banner">
      <iframe 
        src="https://ads-partners.coupang.com/widgets.html?id=842740&template=carousel&trackingCode=AF6451134&subId=&width=680&height=140&tsource=" 
        frameBorder="0" 
        scrolling="no" 
        referrerPolicy="unsafe-url">
      </iframe>
    </div>
  );
};

export default CoupangBanner; 