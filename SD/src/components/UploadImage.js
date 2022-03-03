import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import Axios from "axios";
const API_URL = "https://test-ai.dentaldost.co";

export default function Login() {
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [smileImageUrl, setSmileImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image_width, setImage_width] = useState();
  const [image_height, setImage_height] = useState();
  const [imageClass, setImageClass] = useState();
  const [mainClass, setMainClass] = useState();
  const [loaderClass, setLoaderClass] = useState();
  const [imageHeaderClass, setImageHeaderClass] = useState();
  useEffect(() => {
    setScreenSize();
  }, []);

  const setScreenSize = () => {
    if (window.innerWidth < 768) {
      setImage_width(300);
      setImage_height(400);
      setMainClass("");
      setImageClass("image-area mt-4");
      setLoaderClass("loaderClass");
      setImageHeaderClass("imageHeaderClassMobile");
    } else {
      setImage_width(530);
      setImage_height(650);
      setMainClass("row");
      setImageClass("column");
      setLoaderClass("loaderCenterClass");
      setImageHeaderClass("imageHeaderClass");
    }
  };

  const handleClickUpload = () => {
    setIsLoading(true);
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    console.log("data", file.name);
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
          console.log("error.response", error.response);
          setIsLoading(false);
          alert(error.response.data);
          setSmileImageUrl("");
        }
        console.log(error);
      });
  };

  return (
    <div class="container py-5">
      <header class="text-white text-center">
        <h1 class="display-4" style={{ color: "#EFDAD7", fontFamily: "serif" }}>
          Design Your Smile With DentalDost
        </h1>

        <img
          src="https://bootstrapious.com/i/snippets/sn-img-upload/image.svg"
          alt=""
          width="150"
          class="mb-4"
        />
      </header>

      <div class="row py-4">
        <div class="col-lg-6 mx-auto">
          <div class="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
            <input
              id="upload"
              type="file"
              onchange="readURL(this);"
              class="form-control border-0"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label
              id="upload-label"
              for="upload"
              class="font-weight-light text-muted"
            >
              {file && file.name ? file.name : "Choose file"}
            </label>
            <div class="input-group-append">
              <label for="upload" class="btn btn-light m-0 rounded-pill px-4">
                {" "}
                <i class="fa fa-cloud-upload mr-2 text-muted"></i>
                <small class="text-uppercase font-weight-bold text-muted">
                  Choose file
                </small>
              </label>
            </div>
          </div>
          <div class="upload-button-class">
            <label class="btn btn-light m-0 rounded-pill px-4">
              <small
                class="text-uppercase font-weight-bold text-muted"
                onClick={handleClickUpload}
              >
                Upload
              </small>
            </label>
          </div>
        </div>
      </div>
      <div className={mainClass}>
        <div className={imageClass}>
          <div className={imageHeaderClass}>
            <label>BEFORE</label>
          </div>
          {imageUrl.length > 0 ? (
            <img
              width={image_width}
              height={image_height}
              src={imageUrl}
              alt="original"
            />
          ) : (
            ""
          )}
        </div>

        <div className={imageClass}>
          <div className={imageHeaderClass}>
            <label>AFTER</label>
          </div>
          {isLoading ? (
            <div className={loaderClass}>
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
