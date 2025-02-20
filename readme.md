#  Lecture Notes: React Forms
This document covers different approaches to handling forms in React, including controlled and uncontrolled components, state management, form validation, and using custom hooks for form handling.

## Controlled vs. Uncontrolled Components
<details> <summary><strong>Click to read</strong></summary>

**Controlled Components**
* React manages the form state.
* The input field is directly linked to the component state via useState.
* Every keystroke updates the state, ensuring a single source of truth.

**Example:**
```jsx
function ControlledForm() {
  const [name, setName] = React.useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```
**Advantages:**
* Easier to control and validate data.
* Ensures data consistency.
* React handles data updates.

**Disadvantages:**
* More re-renders can lead to performance issues with large forms.

## Uncontrolled Components
* Form inputs are managed by the DOM.
* Uses useRef to access input values when needed.

**Example:**
```jsx

function UncontrolledForm() {
  const nameInput = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${nameInput.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={nameInput} />
      <button type="submit">Submit</button>
    </form>
  );
}

```
**Advantages:**
* Less state management overhead.
* Good for simple, non-interactive forms.

**Disadventages:**
* Harder to validate fields dynamically.
* Does not update UI state in real-time.

</details>







## State Management in Forms
<details> <summary><strong>Click to read more</strong></summary>

**Using useState**
* Stores form data as an object.
* Updates values dynamically.


**Example:**

This hook manages a boolean toggle state.
```jsx
import { useState } from "react";

function MyForm() {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${formData.name}\nEmail: ${formData.email}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />
      <input type="email" name="email" value={formData.email} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```
**Using useReducer for Complex Forms**
* Better for large-scale applications.
* Centralized state management with a reducer function.


**Example:**
```jsx
import { useReducer } from "react";

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return { name: "", email: "" };
    default:
      return state;
  }
}

function MyForm() {
  const [state, dispatch] = useReducer(formReducer, { name: "", email: "" });

  const handleChange = (e) => {
    dispatch({ type: "SET_FIELD", field: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${state.name}\nEmail: ${state.email}`);
    dispatch({ type: "RESET_FORM" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={state.name} onChange={handleChange} />
      <input type="email" name="email" value={state.email} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Form Validation in React
<details> <summary><strong>Click to read more</strong></summary>

**Basic Validation Using JavaScript**
```js
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
```
* HTML5 Validation: Required, min/max length, patterns.
* JS Validation: Custom regex, advanced validation logic.
* Combined Approach: Use HTML5 for basic validation and JS for complex rules.

</details>

### Custom Hooks for Form Handling
<details> <summary><strong>Click to read more</strong></summary>

**Extracts logic into a reusable hook.**

**Example:**
```js
import { useState } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.name.trim()) newErrors.name = "Name is required";
    if (!values.email.trim()) newErrors.email = "Email is required";
    setErrors(newErrors);
    return newErrors;
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, handleChange, resetForm, validate };
}

export default useForm;
```
**Usage in a Component:**
```js
import useForm from "./useForm";

function MyForm() {
  const { values, errors, handleChange, resetForm, validate } = useForm({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(validate()).length > 0) return;
    alert(`Name: ${values.name}\nEmail: ${values.email}`);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={values.name} onChange={handleChange} />
      <input type="email" name="email" value={values.email} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

</details>

## Conclusion
- **Controlled components** provide better control over input.
- **Uncontrolled components** are useful for simple forms.
- **useReducer** is helpful for complex forms.
- **Custom hooks** make form handling reusable and scalable.
