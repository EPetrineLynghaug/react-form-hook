import { useState, useRef } from "react";

export default function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  // Save the initial values in a ref so they don't change on re-render.
  const initialValuesRef = useRef(initialValues);

  // Basic field validator – you can extend this as needed
  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
      error = `${name} is required`;
    }
    // Example: additional email validation
    if (name === "email" && value) {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(value)) {
        error = "Invalid email address";
      }
    }
    return error;
  };

  // Handle changes on input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the data object
    setValues((prev) => ({ ...prev, [name]: value }));
    // Immediately validate the field and update errors
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleSubmit = (e, callback) => {
    e.preventDefault();
    // Validate every field in the data object
    const validationErrors = {};
    for (let field in values) {
      validationErrors[field] = validateField(field, values[field]);
    }
    setErrors(validationErrors);

    // If no errors, execute the callback (e.g., submit the data)
    const hasErrors = Object.values(validationErrors).some((error) => error);
    if (!hasErrors) {
      callback();
    }
  };

  // Reset form values and errors to the initial state.
  const resetForm = () => {
    setValues(initialValuesRef.current);
    setErrors({});
  };

  return { values, errors, handleChange, handleSubmit, resetForm };
}
