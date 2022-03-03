import ReactPlayer from "react-player";
import React from "react";

export default ()=>{
     return(
         <>
         
      <ReactPlayer className="video"
      width="650px"
      height="450px"
      controls url='https://www.youtube.com/watch?v=ZHCWuNBZexs'/>
     
         </>
     )
}