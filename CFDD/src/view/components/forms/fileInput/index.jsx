import React, { useState } from "react";

import { Upload, Button } from "antd";
import { RiAttachment2, RiDeleteBin7Fill } from "react-icons/ri";
import { useEffect } from "react";

export default function FileInput({
  placeholder,
  label,
  onChange,
  accept,
  value,
  marginBottom
}) {
  const [fileName, setFileName] = useState(
    value && !value.name ? value.split("/").pop() : ""
  );
  useEffect(() => {
    setFileName(
      value && !value.name
        ? value.split("/").pop()
        : value?.name
        ? value?.name
        : ""
    );
  }, [value]);

  return (
    <div>
      <div style={{marginTop: "20px", marginBottom : `${marginBottom}`}}>
        <label>{label}</label>
      </div>
      {fileName ? (
        <div className="ant-upload-list-text-container">
          <div className="ant-upload-list-item ant-upload-list-item-uploading ant-upload-list-item-list-type-text">
            <div className="ant-upload-list-item-info">
              <span className="ant-upload-span">
                <span className="ant-upload-list-item-name" title={fileName}>
                  {fileName}
                </span>
                <span className="ant-upload-list-item-card-actions">
                  <Button
                    title="Remove file"
                    onClick={() => {
                      onChange(null);
                      setFileName("");
                    }}
                  >
                    <RiDeleteBin7Fill />
                  </Button>
                </span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <Upload
          showUploadList={false}
          accept={accept}
          customRequest={(e) => {
            onChange(e.file);
            // setFileName(e.file.name);
          }}
        >
          <Button
            type="default"
            style={{ width: "100%" }}
            icon={<RiAttachment2 className="remix-icon" />}
          >
            {placeholder}
          </Button>
        </Upload>
      )}
    </div>
  );
}
