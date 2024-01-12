import React, { useId } from 'react'

function Select(
    {
        label,
        options,
        className = '',
        ...props
    }, ref) {

    const id = useId()
    return (
        <div className="Options">
            {label && <label htmlFor={id}>
                {label}
            </label>}

            <select
                {...props}
                id={id}
                className={`Select ${className}`}
                ref={ref}
            >
                {options?.map((option) => (<option key={option} value={option}>
                    {option}
                </option>))}

            </select>
        </div>
    )
}

export default React.forwardRef(Select)