import React from 'react';

const ContentContainer = ({children}) => {
    return (
        <div className='max-w-6xl mx-auto'>
            {children}
        </div>
    );
};

export default ContentContainer;