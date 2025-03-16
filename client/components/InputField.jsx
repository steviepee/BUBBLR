import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';

function InputField({
  objValue,
  handleChange,
  formValues,
  setFormValues,
  handleAddClick,
  createDividedList,
  postForm,
  closeForm,
}) {
  const {
    label,
    value,
    collection,
    helperText,
  } = objValue;
  const [showError, setShowError] = useState(false);
  const handleEnter = (element) => {
    const { key } = element;
    if (key === 'Enter') {
      handleAddClick(element);
    }
  };

  const checkNameVal = () => {
    if (!formValues.name) {
      setShowError(true);
    } else {
      postForm();
    }
  };

  return (
    <Container>
      <input
        label={label}
        id={collection}
        value={value}
        // helperText={helperText}
        onChange={(element) => handleChange(element)}
        onKeyUp={handleEnter}
        // error={label === 'Name' ? showError : false}
        // autoFocus
      />
      {label === 'Name' ? null : (
        <Button onClick={handleAddClick}>{`+ ${label}`}</Button>
      )}
      <Button variant='contained' onClick={postForm} size='small'>
        Add Hangover info
      </Button>
      <Button variant='contained' onClick={closeForm} size='small'>
        Cancel
      </Button>
    </Container>
  );
}

export default InputField;
