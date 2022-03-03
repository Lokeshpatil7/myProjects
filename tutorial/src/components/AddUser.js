import React from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
export default () => {
  return (
    <Form>
      <FormGroup>
        <Label>Name</Label>
        <Input type="test" placeholder="Enter name"></Input>
      </FormGroup>
      <Button type="submit">Submit</Button>
      <Link to="/" className="btn btn-danger ml-2">
        Cancle
      </Link>
    </Form>
  );
};
