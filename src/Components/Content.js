import {React, useState, useRef} from "react";



function Content({setLibraryStatus, libraryStatus, data}){

  return(
    <div className={`content1 ${libraryStatus?'content1Active':' '}`}>


    </div>
  );
}
export default Content;
