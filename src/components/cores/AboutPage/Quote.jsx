import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='text-white'>
        We are passionate about revolutionizing the way we learn. Our
        innovative platform
        <HighlightText text={" combines technology"}/>
        <span className='text-brown-300'>
            {" "}
            , expertise
        </span>
        , and community to create an 
        <span className='text-brown-300'>
            {" "}
             unparalleled educational experience.
        </span>
    </div>
  )
}

export default Quote