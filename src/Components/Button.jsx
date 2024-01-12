import React, { Children } from 'react'

export default function Button({
    Childern,
    type='button',
    bgColor = '',
    textcolor = '',
    className = '',
    ...props
}){
    return (
        <button className={`button-89 ${bgColor} ${textcolor} {className}`} {...props}>
            {Children}
        </button>
    )

}