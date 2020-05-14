import React from 'react';
// components
import Modal from '../Modal';
// styles
import './AddNewClass.css';

export function AddNewClass(props) {
  const { open, closeModal } = props;

  return (
    <Modal
      open={open}
      closeModal={closeModal}
      size="sm"
      modalTitle="Adicionar nova turma"
    >
      <div className="add-new-class-content">
        <form
          className="add-new-class-content__form"
          onSubmit={e => e.preventDefault()}
        >
          <input
            type="text"
            name="class_name"
            placeholder="Nome da turma"
          />

          <select name="grade">
            <option value="null" selected disabled>Escolha um ano</option>
            <option value="1f">1° ano - Ensino Fundamental</option>
            <option value="2f">2° ano - Ensino Fundamental</option>
            <option value="3f">3° ano - Ensino Fundamental</option>
            <option value="4f">4° ano - Ensino Fundamental</option>
            <option value="5f">5° ano - Ensino Fundamental</option>
            <option value="6f">6° ano - Ensino Fundamental</option>
            <option value="7f">7° ano - Ensino Fundamental</option>
            <option value="8f">8° ano - Ensino Fundamental</option>
            <option value="1em">1° ano - Ensino Médio</option>
            <option value="2em">2° ano - Ensino Médio</option>
            <option value="3em">3° ano - Ensino Médio</option>
          </select>

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
