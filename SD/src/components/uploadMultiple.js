import React, { useState, useEffect } from "react";
import Axios from "axios";
import { TailSpin } from "react-loader-spinner";
// const API_URL = "http://192.168.0.161:8000";

const API_URL = "https://test-ai.dentaldost.co";

export default function Login() {
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [smileImageUrl, setSmileImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image_width, setImage_width] = useState();
  const [image_height, setImage_height] = useState();

  useEffect(() => {
    console.log("imageUrl", window.innerWidth);
    setScreenSize();
  }, []);

  const setScreenSize = () => {
    if (window.innerWidth < 768) {
      setImage_width(170);
      setImage_height(250);
    } else {
      setImage_width(500);
      setImage_height(650);
    }
  };

  const handleClickUpload = () => {
    setIsLoading(true);
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    console.log("data", file);
    let body = new FormData();
    const config = {
      "Content-Type": "multipart/form-data",
    };
    body.append("file", file);
    Axios.post(API_URL + "/imageUpload", body, config)
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          console.log("data", response.data);
          setSmileImageUrl(API_URL + "/" + response.data.path);
        }
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.statusText);
        }
        console.log(error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Smile Design</h1>
      <div className="col-sm-12 col-lg-4 mr-auto ml-auto border p-4">
        <form method="post" encType="multipart/form-data">
          <div className="form-group">
            <label>
              <strong>Upload Image</strong>
            </label>
            <div className="custom-file">
              <input
                type="file"
                name="files[]"
                multiple
                className="custom-file-input form-control"
                id="customFile"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label className="custom-file-label">Choose file</label>
            </div>
          </div>
          <div className="form-group">
            <button
              type="button"
              name="upload"
              value="upload"
              id="upload"
              className="btn btn-block btn-dark"
              onClick={handleClickUpload}
            >
              <i className="fa fa-fw fa-upload"></i> Upload
            </button>
          </div>
        </form>
      </div>

      <div className="row">
        <div className="column">
          {imageUrl.length > 0 ? (
            <img
              // className="imageCLass"
              width={image_width}
              height={image_height}
              src={imageUrl}
              alt="original"
            />
          ) : (
            ""
          )}
        </div>

        <div className="column">
          {isLoading ? (
            <div className="loaderClass">
              <TailSpin
                heigth="100"
                width="100"
                color="grey"
                ariaLabel="loading"
              />
            </div>
          ) : imageUrl.length > 0 ? (
            <img
              width={image_width}
              height={image_height}
              // className="imageCLass"
              //   src="image/png;base64,${smileImageUrl}"
              src={smileImageUrl}
              alt="smileDesign"
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
