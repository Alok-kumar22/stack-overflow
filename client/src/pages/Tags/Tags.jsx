import React from 'react';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import TagList from './TagList';
import './Tags.css';
const Tags = () => {

    const tagList = [
        {
            id:1,
            tagName:"javaScript",
            tagDesc: "for question regarding programming in ECMAScript(JavaScript)"
        },{
            id:2,
            tagName:"python",
            tagDesc:"Python is a multi-paradigm,dynamically typed,multipurpose programming language"
        }
    ]
  return (
    <div className='home-container-1'>
        <LeftSidebar />
        <div className='home-container-2'>
            <h1 className='tags-h1'>Tags</h1>
            <p className='tags-p'>A Tag is a keyword or label that categorize your question with other , similar questions</p>
            <p className='tags-p'>Using the right tags makes it easier for others to find and answer your question</p>
            <div className='tags-list-container'>
               {
                tagList.map((tag)=>{
                    return <TagList tag={tag} key = {tagList.id} />
                })
               }
            </div>
        </div>
    </div>
  );
}

export default Tags;
