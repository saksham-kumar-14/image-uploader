import "./index.css";
import React, { useState , useEffect } from "react";
import { storage } from "./firebase"
import { ref , uploadBytes , listAll , getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const App = () => {

  const [image, setImage] = useState();
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const imagesListRef = ref(storage, "images/");
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  function uploadImage(e){
    e.preventDefault();
    if(image===undefined){
      alert("Select an image from your storage first!")
      return;
    }
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    uploadBytes(imageRef, image).then((res)=>{
      getDownloadURL(res.ref).then((url)=>{
        setImageList([ ...imageList, url ])
      })
      alert("Image Uploaded");
    }).catch(()=>{
      alert("An error occured while uploading the image..")
    })

  }

  return(
    <div className="parentDiv">
      <div>
        <h1>Image Uploader</h1>
      </div>
      <input
      onChange={(e)=>{
        setImage(e.target.files[0])
      }}
      type="file"></input>
      <button onClick={uploadImage}>Upload</button>
      <button onClick={()=>{
        console.log(imageList)
      }}>BTN</button>

      <div>
        {imageList.map((e,index)=>{
          return(
            <div key={"uploaded-image-"+index}>
              <img className="uploadedImage" src={e}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App;