import React from 'react';
import Navigation from './Diabetes/naviagation';

function Disease({appointment,pressed}) {
    return (
        <Navigation appointment={appointment} pressed={pressed}></Navigation>
    );
}

export default Disease;