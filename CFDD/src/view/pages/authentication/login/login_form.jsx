import React, { useState } from "react";
import { Card, Row, Col, Form, Input, Button, notification } from "antd";
import { Link } from "react-router-dom";
import { AuthService } from "../../../../api/Auth";
import { useHistory } from "react-router-dom";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";

import dhir_dhir from "../../../../assets/images/pages/login/dhir_dhir_emblem.png";
import loginhr from "../../../../assets/images/pages/login/login_hr.png";

import "./login.css";

export default function LoginForm() {
  const history = useHistory();
  const [form] = Form.useForm();
  //const [errorMessage, setErrorMessage] = useState();

  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    AuthService.login({
      email: values.email,
      password: values.password,
      user_type: "SUPER_ADMIN",
    })
      .then((response) => {
        console.log(response);
        // Success logic
        if (response && response.jwt_token) {
          sessionStorage.setItem("token", response.jwt_token);
          sessionStorage.setItem("currentUserRole", response.user_role);
          setLoading(false);
          switch (response.user_role) {
            case "SUPER_ADMIN":
              history.push("/dashboard");
              break;
            case "GROUP_ADMIN":
              history.push("/dashboard");
              break;
            case "ENTITY_ADMIN":
              history.push("/onboarding-unit");
              break;
          }
          window.location.reload();
        }
      })
      .catch((error) => {
        notification.open({
          message: "Error",
          description:
            error.response.status === 401
              ? error.response.data.data
              : "Something went wrong",
          icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
          closeIcon: (
            <RiCloseFill
              className="remix-icon da-text-color-black-80"
              size={24}
            />
          ),
        });
        setLoading(false);
      });
  };

  return (
    <div>
      <Card
        style={{
          width: 500,
          marginLeft: "55%",
          top: "10%",
          position: "absolute",
        }}
      >
        <img src={loginhr} className="login_hr" alt="hr" />
        <Row className="da-h-100" align="middle" justify="center">
          <Col className="da-px-sm-8 da-pt-24 da-pb-48">
            <div>
              <img src={dhir_dhir} alt="" />
            </div>
            <p className="da-mt-sm-0 da-mt-8 da-text-color-black-60">
              Welcome back, please login to your account.
            </p>

            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                residence: ["zhejiang", "hangzhou", "xihu"],
                prefix: "86",
              }}
              scrollToFirstError
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  className="full-width"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            <Col className="da-form-info">
              <span className="da-text-color-black-80 da-caption da-mr-4">
                Don’t you have an account?
              </span>

              <Link
                className="da-text-color-primary-1 da-caption"
                to="/pages/authentication/register"
              >
                Create an account
              </Link>
            </Col>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
