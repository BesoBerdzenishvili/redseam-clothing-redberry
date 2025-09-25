import { Button, Form as BootstrapForm } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const api = import.meta.env.VITE_API_URL;

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    try {
      const token = Cookies.get("token");

      const response = await fetch(`${api}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({
            general: data.message || "An error occurred during login",
          });
        }
        return;
      }

      if (data.token) {
        Cookies.set("token", data.token, { expires: 100 });
        Cookies.set("user", JSON.stringify(data.user), { expires: 100 });
        window.location.href = "/";
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred. Please try again." });
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
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form style={{ width: 557 }}>
            {errors.general && (
              <div
                style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}
              >
                {errors.general}
              </div>
            )}

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
                  marginBottom: 5,
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
                  marginBottom: 5,
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
                backgroundColor: "#FF4000",
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
                style={{ color: "#FF4000", textDecoration: "none" }}
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
