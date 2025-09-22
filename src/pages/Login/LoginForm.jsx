import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Form as BootstrapForm } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const api = import.meta.env.VITE_API_URL;

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    try {
      const token = Cookies.get("token");

      const response = await fetch(`${api}/login`, {
        method: "POST",
        Accept: "application/json",
        body: formData,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.token) {
        Cookies.set("token", data.token, { expires: 100 });
        Cookies.set("user", JSON.stringify(data.user), { expires: 100 });

        window.location.href = "/";
      }
    } catch (error) {
      if (error instanceof Response) {
        const errorData = await error.json();
        if (errorData.errors) {
          setErrors(errorData.errors);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ width: "300px" }}>
      <h1
        style={{
          color: "#1A202C",
          fontSize: "40px",
          fontWeight: 600,
          marginBottom: "50px",
        }}
      >
        Log in
      </h1>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: 557 }}>
            <BootstrapForm.Group controlId="email">
              <Field
                size="lg"
                name="email"
                as={BootstrapForm.Control}
                type="email"
                placeholder="Email *"
                style={{
                  fontSize: 14,
                  borderRadius: "4px",
                  border: "1px solid #E2E8F0",
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red", fontSize: "12px" }}
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group
              controlId="password"
              style={{ marginTop: "30px" }}
            >
              <Field
                size="lg"
                name="password"
                as={BootstrapForm.Control}
                type="password"
                placeholder="Password *"
                style={{
                  fontSize: 14,
                  borderRadius: "4px",
                  border: "1px solid #E2E8F0",
                }}
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red", fontSize: "12px" }}
              />
            </BootstrapForm.Group>

            <Button
              type="submit"
              variant="danger"
              style={{
                width: "100%",
                marginTop: 50,
                backgroundColor: "#F56565",
                border: "none",
                borderRadius: "8px",
              }}
              disabled={isSubmitting}
            >
              Log in
            </Button>

            <div
              style={{
                textAlign: "center",
                marginTop: "25px",
                color: "#A0AEC0",
                fontSize: 14,
              }}
            >
              Not a member?{" "}
              <Link
                to="/registration"
                style={{ color: "#F56565", textDecoration: "none" }}
              >
                Register
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
