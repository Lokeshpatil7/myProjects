import react from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Table } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

export default () => {
  // useEffect(() => {
  //   fetchData();
  // }, []);

  //get

  //columns input fields
  const columns = [];

  return (
    <>
      <h1>Posts</h1>
      <Form>
        <Form.Item name="title" label="" rules={[{ required: true }]}>
          <Input placeholder="Enter tutorial title" name="title" />
        </Form.Item>
      </Form>

      <h1> ==============table=============</h1>
      <Table
        //  dataSource={}
        //columns={}
        pagination={{
          pageSize: 5,
          // total: totalPages,
        }}
      ></Table>
    </>
  );
};
