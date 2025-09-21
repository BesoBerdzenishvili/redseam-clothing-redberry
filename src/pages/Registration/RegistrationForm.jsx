import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Form as BootstrapForm } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function RegistrationForm() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    avatar: null,
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) errors.username = "Username is required";
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (values.password !== values.password_confirmation) {
      errors.password_confirmation = "Passwords must match";
    }
    return errors;
  };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password_confirmation);
    if (values.avatar) {
      formData.append("avatar", values.avatar);
    }

    try {
      const response = await fetch("https://fakeurl.com/api/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.token) {
        Cookies.set("token", data.token, { expires: null });
        window.location.href = "/dashboard";
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
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Registration
      </h1>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form style={{ width: 557 }}>
            <BootstrapForm.Group controlId="username">
              <Field
                size="lg"
                name="username"
                as={BootstrapForm.Control}
                type="text"
                placeholder="Username *"
                style={{
                  borderRadius: "4px",
                  border: "1px solid #E2E8F0",
                  fontSize: 14,
                }}
              />
              <ErrorMessage
                name="username"
                component="div"
                style={{ color: "red", fontSize: "12px", marginTop: 10 }}
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group
              controlId="email"
              style={{ marginTop: "25px" }}
            >
              <Field
                size="lg"
                name="email"
                as={BootstrapForm.Control}
                type="email"
                placeholder="Email *"
                style={{
                  borderRadius: "4px",
                  border: "1px solid #E2E8F0",
                  fontSize: 14,
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red", fontSize: "12px", marginTop: 10 }}
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group
              controlId="password"
              style={{ marginTop: "25px" }}
            >
              <Field
                size="lg"
                name="password"
                as={BootstrapForm.Control}
                type="password"
                placeholder="Password *"
                style={{
                  borderRadius: "4px",
                  border: "1px solid #E2E8F0",
                  fontSize: 14,
                }}
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red", fontSize: "12px", marginTop: 10 }}
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group
              controlId="password_confirmation"
              style={{ marginTop: "25px" }}
            >
              <Field
                size="lg"
                name="password_confirmation"
                as={BootstrapForm.Control}
                type="password"
                placeholder="Confirm Password *"
                style={{
                  borderRadius: "4px",
                  border: "1px solid #E2E8F0",
                  fontSize: 14,
                }}
              />
              <ErrorMessage
                name="password_confirmation"
                component="div"
                style={{ color: "red", fontSize: "12px", marginTop: 10 }}
              />
            </BootstrapForm.Group>

            <Button
              type="submit"
              variant="danger"
              size="md"
              style={{
                width: "100%",
                marginTop: "45px",
                backgroundColor: "#F56565",
                border: "none",
                borderRadius: "8px",
              }}
              disabled={isSubmitting}
            >
              Register
            </Button>
            <div
              style={{
                textAlign: "center",
                marginTop: "25px",
                color: "#A0AEC0",
                fontSize: 14,
              }}
            >
              Already a member?{" "}
              <Link
                to="/login"
                style={{ color: "#F56565", textDecoration: "none" }}
              >
                Log in
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
