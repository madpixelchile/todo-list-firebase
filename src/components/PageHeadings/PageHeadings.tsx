
import React, { FC, ReactNode } from "react";

interface PageHeadingsProps{
    children: ReactNode | string,
    className: string 
}

export const PageHeadings:FC<PageHeadingsProps> = ( { children = '', className = '' } ) => {
    return (
        <h1 className={`text-3xl font-bold mb-3 ml-5 ${className}`}>{ children }</h1>
    )
}

