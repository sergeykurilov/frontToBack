import React from 'react';

const NotFound = () => {
    return (
        <>
            <h1 className='x-large text-primary'>
                <i className="fas fa-exclamation-triangle"/>
                Page Not Found
                <p className="large">Sorry, this page doesn't exist</p>
            </h1>
        </>
    );
};

export default NotFound;