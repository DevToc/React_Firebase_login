import React from 'react';

export const LoaderComponent = ({ loader = false }) => (
    loader && (
        <>
            <div className="godhan-loader" role="alert">
                <span className="loader-overlay"/>
                <span className="loader" />
            </div>
        </>
    )
)