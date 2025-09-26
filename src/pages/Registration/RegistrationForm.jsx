import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Form as BootstrapForm } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import AvatarUpload from "./AvatarUpload";
import PasswordToggleField from "../../components/PasswordToggleField ";

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
          "Content-Type": "multipart/form-data",
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
    <div style={{ width: "300px" }}>
      <h1
        style={{
          color: "#1A202C",
          fontSize: "42px",
          fontWeight: 600,
          marginBottom: "20px",
        }}
      >
        Registration
      </h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, setFieldValue, errors }) => (
          <Form style={{ width: 557 }}>
            {errors.general && (
              <div
                style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}
              >
                {errors.general}
              </div>
            )}

            <AvatarUpload setFieldValue={setFieldValue} />
            <ErrorMessage
              name="avatar"
              component="div"
              style={{ color: "red", fontSize: "12px", marginTop: 10 }}
            />

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
              <PasswordToggleField>
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
              </PasswordToggleField>
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
              <PasswordToggleField>
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
              </PasswordToggleField>
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
                marginTop: "50px",
                backgroundColor: "#FF4000",
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
                style={{ color: "#FF4000", textDecoration: "none" }}
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
