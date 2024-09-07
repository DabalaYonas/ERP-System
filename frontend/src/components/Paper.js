import React from 'react'


const textStyle = (size, weight, align, underline) => 
    ({ fontSize: `${size}px`,
    lineHeight: `1.5`,
    fontWeight: `${weight}`,
    textAlign: `${align}`,
    textDecorationLine: underline ? 'underline' : 'none',});


export default function Paper({ children, landscape }) {
  return <div
  style={{        
      width: landscape ? "29.7cm" : "21cm",
      height: landscape ? "21cm" : "29.7cm",
      padding: "20mm",
  }}
  className='bg-white overflow border border-solid shadow'>
    {children}
</div>
}

const Header = ({ children, size, weight, align="start", underline }) => {
    return <h1 
            style={textStyle(size, weight, align, underline)}>{children}</h1>
}

const Paragraph = ({children, align="start", size=18, weight=300, underline}) => {

    return <p style={textStyle(size, weight, align, underline)}>{children}</p>
}

const BlankSpace = ({ children, minWidth = 100, style="solid" }) => {
    return <div 
            className="inline-block border-b-2 flex-grow-0 border-solid border-black text-center mx-1 -mb-2"
            style={{ minWidth: `${minWidth}px`,
                    borderStyle: `${style}`}}>{children}</div>
}

const AlignVetical = ({ children, align }) => {
    return <div className='flex flex-col' style={{ alignItems: `${align}`}}>{children}</div>
}

Paper.Header = Header;
Paper.Paragraph = Paragraph;
Paper.BlankSpace = BlankSpace;
Paper.AlignVetical = AlignVetical;
