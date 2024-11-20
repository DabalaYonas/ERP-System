import React from 'react'

function MyTypography({ level, children, className }) {
    const h1Style = "text-3xl font-medium text-black text-opacity-80 mb-1";
    const h2Style = "text-2xl font-medium text-black text-opacity-80";
    const h3Style = "text-xl font-medium text-black text-opacity-80";
    const h4Style = "text-lg font-medium text-black text-opacity-80";

    const Title = ({level, className}) => {
        return <>{level === 1 ? <h1 className={`${className} ${h1Style}`}>{children}</h1> 
        : level === 2 ? <h2 className={`${className} ${h2Style}`}>{children}</h2> 
        : level === 3 ? <h3 className={`${className} ${h3Style}`}>{children}</h3> 
        : level === 4 ? <h4 className={`${className} ${h4Style}`}>{children}</h4> 
        : <h1 className={`${className} ${h1Style}`}>{children}</h1>}</>
    }

  return <Title className={`cursor-default ${className}`} level={level} />
}

export default MyTypography