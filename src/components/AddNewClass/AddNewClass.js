import React, { useState } from 'react';
// components
import Modal from '../Modal';
// styles
import './AddNewClass.css';

export function AddNewClass(props) {
  const { open, closeModal, addClass } = props;
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [errors, setErrors] = useState([]);

  function clearForm() {
    setName("");
    setGrade("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    let inputErrors = [];

    if (!isEmpty(name) && !isEmpty(grade)) {
      addClass({ event, name, grade });

      setErrors([]);
      clearForm();
    }

    if (isEmpty(name)) {
      inputErrors.push("name");
      setErrors(inputErrors);
    } else {
      removeElement(inputErrors, "name");
    }

    if (isEmpty(grade)) {
      inputErrors.push("grade");
      setErrors(inputErrors);
    } else {
      removeElement(inputErrors, "grade");
    }
  }

  function isEmpty(input) {
    if (input === "null") {
      return true;
    }

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
      size="sm"
      modalTitle="Adicionar nova turma"
    >
      <div className="add-new-class-content">
        <form
          id="addClassForm"
          className="add-new-class-content__form"
          onSubmit={event => handleSubmit(event)}
        >
          <input
            type="text"
            name="class_name"
            placeholder="Nome da turma"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {
            hasError(errors, "name") ?
            <span className="input-error">O nome da turma é obrigatório</span> :
            null
          }

          <select
            name="grade"
            value={grade}
            onChange={e => setGrade(e.target.value)}
          >
            <option value="null">Escolha um ano</option>
            <option value="1° ano - Ensino Fundamental">
              1° ano - Ensino Fundamental
            </option>
            <option value="2° ano - Ensino Fundamental">
              2° ano - Ensino Fundamental
            </option>
            <option value="3° ano - Ensino Fundamental">
              3° ano - Ensino Fundamental
            </option>
            <option value="4° ano - Ensino Fundamental">
              4° ano - Ensino Fundamental
            </option>
            <option value="5° ano - Ensino Fundamental">
              5° ano - Ensino Fundamental
            </option>
            <option value="6° ano - Ensino Fundamental">
              6° ano - Ensino Fundamental
            </option>
            <option value="7° ano - Ensino Fundamental">
              7° ano - Ensino Fundamental
            </option>
            <option value="8° ano - Ensino Fundamental">
              8° ano - Ensino Fundamental
            </option>
            <option value="1° ano - Ensino Médio">
              1° ano - Ensino Médio
            </option>
            <option value="2° ano - Ensino Médio">
              2° ano - Ensino Médio
            </option>
            <option value="3° ano - Ensino Médio">
              3° ano - Ensino Médio
            </option>
          </select>
          {
            hasError(errors, "grade") ?
            <span className="input-error">Selecione um ano</span> :
            null
          }

          <button
            className="btn-add-new-class"
            type="submit"
          >
            Adicionar
          </button>
        </form>
      </div>
    </Modal>
  );
}