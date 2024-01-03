import { useContext } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { loginUser, loginInfo, updateLoginInfo, isLoginLoading, loginError } =
    useContext(AuthContext);

  return (
    <Form onSubmit={loginUser}>
      <Row
        style={{ height: "100vh", justifyContent: "center", paddingTop: "10%" }}
      >
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Login</h2>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, email: e.target.value })
              }
            ></Form.Control>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, password: e.target.value })
              }
            ></Form.Control>
            <Button variant="primary" type="submit">
              {isLoginLoading ? "Login your account" : "Login"}
            </Button>
            {loginError?.error && (
              <Alert variant="danger">
                <p>{loginError?.message}</p>
              </Alert>
            )}
            <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;
