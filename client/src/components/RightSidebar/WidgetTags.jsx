import React from 'react';

const WidgetTags = () => {

  const tags = ['c','css','c++','express', 'java','javascript','mern','mongodb','mysql','next.js','nodejs','php','python','reactjs']

  return (
    <div className='widget-tags'>
      <h3>Watched tags</h3>
      <div className='widget-tags-div'>
        {
            tags.map((tag)=>{
                return (<p key={tag}>{tag}</p>);
            })
        }
      </div>
    </div>
  );
}

export default WidgetTags;
