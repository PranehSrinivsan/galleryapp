import React, { useEffect, useState } from "react";
import {getImages} from './api';
import './App.css';

const App = () => {
  const[imagelist , setImageList]=useState([])
  const[next , setNext]=useState(null);

  useEffect(()=>{
    const fetchData = async()=>{
      const responseJSON = await getImages();
      setImageList(responseJSON.resources);
      setNext(responseJSON.next_cursor);
    }

    fetchData();
  } ,[])

  const handleLoadMore = async ()=>{
    const responseJSON = await getImages(next);
    setImageList((cImagelist)=>[
      ...cImagelist , ...responseJSON.resources
    ]);
    setNext(responseJSON.next_cursor);
  }

  return(
    <>
    <div className="image-grid">
      {imagelist.map(
        (image) => (<img src={image.url} alt={image.public_id} ></img>)
      )}
    </div>
    <footer className="footer">
      <center>
      {next && (<button onClick={handleLoadMore}> Load More </button>)}
      </center>
    </footer>
    </>
  )
}

export default App