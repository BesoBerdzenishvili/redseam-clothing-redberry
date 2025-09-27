import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Form as BootstrapForm } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import AvatarUpload from "./AvatarUpload";
import PasswordToggleField from "../../components/PasswordToggleField ";
import "./RegistrationForm.css";

export default function RegistrationForm() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    avatar: null,
  };
  const api = import.meta.env.VITE_API_URL;

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
      const response = await fetch(`${api}/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({
            general: data.message || "An error occurred during registration",
          });
        }
        return;
      }

      if (data.token) {
        Cookies.set("token", data.token, { expires: null });
        window.location.href = "/login";
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="registration-form-container">
      <h1 className="registration-form-title">Registration</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, setFieldValue, errors }) => (
          <Form className="registration-form">
            {errors.general && (
              <div className="registration-form-error-general">
                {errors.general}
              </div>
            )}

            <AvatarUpload setFieldValue={setFieldValue} />
            <ErrorMessage
              name="avatar"
              component="div"
              className="registration-form-error"
            />

            <BootstrapForm.Group controlId="username">
              <Field
                size="lg"
                name="username"
                as={BootstrapForm.Control}
                type="text"
                placeholder="Username *"
                className="registration-form-input"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="registration-form-error"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group
              controlId="email"
              className="registration-form-group-email"
            >
              <Field
                size="lg"
                name="email"
                as={BootstrapForm.Control}
                type="email"
                placeholder="Email *"
                className="registration-form-input"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="registration-form-error"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group
              controlId="password"
              className="registration-form-group-password"
            >
              <PasswordToggleField>
                <Field
                  size="lg"
                  name="password"
                  as={BootstrapForm.Control}
                  type="password"
                  placeholder="Password *"
                  className="registration-form-input"
                />
              </PasswordToggleField>
              <ErrorMessage
                name="password"
                component="div"
                className="registration-form-error"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group
              controlId="password_confirmation"
              className="registration-form-group-password-confirmation"
            >
              <PasswordToggleField>
                <Field
                  size="lg"
                  name="password_confirmation"
                  as={BootstrapForm.Control}
                  type="password"
                  placeholder="Confirm Password *"
                  className="registration-form-input"
                />
              </PasswordToggleField>
              <ErrorMessage
                name="password_confirmation"
                component="div"
                className="registration-form-error"
              />
            </BootstrapForm.Group>

            <Button
              type="submit"
              variant="danger"
              size="md"
              className="registration-form-button"
              disabled={isSubmitting}
            >
              Register
            </Button>
            <div className="registration-form-footer">
              Already a member?{" "}
              <Link to="/login" className="registration-form-login-link">
                Log in
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
