import React from 'react';

const Avatar = ({children,backgroundColor,px,py,color,fontSize,borderRadius}) => {
   
    const style = {
        backgroundColor,
        padding:`${py} ${px}`,
        color:color || 'black',
        borderRadius,
        fontSize,
        textAlign:"center",
        cursor:"pointer",
        textDecoration:"none"
    }
  
    return (
    <div style={style}>
      {children}
    </div>
  );
}

export default Avatar;
