import React, { useState } from 'react';
// components
import Modal from '../Modal';
// styles
import './AddNewStudent.css';

export function AddNewStudent(props) {
  const { open, closeModal, addStudent } = props;
  const [registration, setRegistration] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  function clearForm() {
    setRegistration("");
    setName("");
    setEmail("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    let inputErrors = [];

    if (!isEmpty(registration) && !isEmpty(name)) {
      addStudent({ registration, name, email });

      setErrors([]);
      clearForm();
    }

    if (isEmpty(registration)) {
      inputErrors.push("registration");
      setErrors(inputErrors);
    } else {
      removeElement(inputErrors, "registration");
    }

    if (isEmpty(name)) {
      inputErrors.push("name");
      setErrors(inputErrors);
    } else {
      removeElement(inputErrors, "name");
    }
  }

  function isEmpty(input) {
    return input.length === 0;
  }

  function hasError(array, element) {
    return array.indexOf(element) !== -1;
  }

  function removeElement(array, element) {
    const position = array.indexOf(element);

    if (position !== -1) {
      array.splice(position, 1);
    }
  }

  return (
    <Modal
      open={open}
      closeModal={closeModal}
      size="md"
      modalTitle="Adicionar novo aluno"
    >
      <div className="add-new-student-content">
        <form
          className="add-new-student-content__form"
          onSubmit={event => handleSubmit(event)}
          autoComplete="off"
        >
          <input
            type="text"
            name="name"
            placeholder="Nome completo"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {
            hasError(errors, "name") ?
            <span className="input-error">O nome do aluno é obrigatório</span> :
            null
          }
          <input
            type="text"
            name="registration"
            placeholder="Matrícula do aluno"
            value={registration}
            onChange={e => setRegistration(e.target.value)}
          />
          {
            hasError(errors, "registration") ?
              <span className="input-error">A matrícula do aluno é obrigatória</span> :
              null
          }
          <input
            type="email"
            name="email"
            placeholder="Email (caso tenha)"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
            className="btn-add-new-student"
            type="submit"
          >
            Adicionar
          </button>
        </form>
      </div>
    </Modal>
  );
}
