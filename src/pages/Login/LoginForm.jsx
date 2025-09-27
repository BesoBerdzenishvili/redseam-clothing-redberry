import { Button, Form as BootstrapForm } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import PasswordToggleField from "../../components/PasswordToggleField ";
import "./LoginForm.css";

export default function LoginForm() {
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
    <div className="login-form-container" style={{ width: "300px" }}>
      <h1 className="login-title">Log in</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form style={{ width: 557 }}>
            {errors.general && (
              <div className="login-general-error">{errors.general}</div>
            )}

            <BootstrapForm.Group controlId="email">
              <Field
                size="lg"
                name="email"
                as={BootstrapForm.Control}
                type="email"
                placeholder="Email *"
                className="login-field"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="login-error-message"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group
              controlId="password"
              style={{ marginTop: "30px" }}
            >
              <PasswordToggleField>
                <Field
                  size="lg"
                  name="password"
                  as={BootstrapForm.Control}
                  placeholder="Password *"
                  className="login-field"
                />
              </PasswordToggleField>
              <ErrorMessage
                name="password"
                component="div"
                className="login-error-message"
              />
            </BootstrapForm.Group>

            <Button
              type="submit"
              className="login-button"
              disabled={isSubmitting}
            >
              Log in
            </Button>

            <div className="login-footer">
              Not a member?{" "}
              <Link to="/registration" className="login-link">
                Register
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
