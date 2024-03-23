import React from 'react';

function LazyLoadRoute(path:string) {
    return React.lazy(()=>import(path))
}

export const routes = [
    {
        path: '/', 
        element:LazyLoadRoute('./views/RidesIndex.tsx')
    }
]