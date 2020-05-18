import React, { useState } from 'react';
// components
import { DashboardTop, AddNewClass } from '../../components';
// styles
import './Dashboard.css';
// icons
import { FaPlus, FaUserGraduate } from 'react-icons/fa';
// images
import examSVG from '../../assets/images/svgs/exam.svg';
import correctedExamSVG from '../../assets/images/svgs/corrected_exam.svg';
// tooltip
import ReactTooltip from 'react-tooltip';

export default function Dashboard() {
  const [profileDropdown, setProfileDropDown] = useState(false);
  const [notificationDropdown, setNotificationDropDown] = useState(false);
  const [addNewClassOpen, setAddNewClassOpen] = useState(false);

  function handleClickOut() {
    if (profileDropdown) {
      setProfileDropDown(false);
    }

    if (notificationDropdown) {
      setNotificationDropDown(false);
    }
  }

  const students = [
    {
      name: 'João Carlos',
      registration: '2016.1907.013-8',
      class: 'C',
      grade: '8',
      educationLevel: 'Ensino Fundamental',
      educationLevelInitials: 'EF'
    },
    {
      name: 'Ana Carolina',
      registration: '2016.1998.033-4',
      class: 'B',
      grade: '1',
      educationLevel: 'Ensino Médio',
      educationLevelInitials: 'EM'
    },
    {
      name: 'Ana Carolina',
      registration: '2016.1998.033-4',
      class: 'B',
      grade: '1',
      educationLevel: 'Ensino Médio',
      educationLevelInitials: 'EM'
    },
    {
      name: 'Ana Carolina',
      registration: '2016.1998.033-4',
      class: 'B',
      grade: '1',
      educationLevel: 'Ensino Médio',
      educationLevelInitials: 'EM'
    },
    {
      name: 'Ana Carolina',
      registration: '2016.1998.033-4',
      class: 'B',
      grade: '1',
      educationLevel: 'Ensino Médio',
      educationLevelInitials: 'EM'
    }
  ]

  return (
    <div className="dashboard" onClick={() => handleClickOut()}>
      <DashboardTop
        profileDropdownOpen={profileDropdown}
        profileDropdownOnclose={setProfileDropDown}
        notificationDropdownOpen={notificationDropdown}
        notificationDropdownOnClose={setNotificationDropDown}
        notificationAmount={0}
      />

      <div className="dashboard__title">
        <h1>Painel de Controle</h1>
      </div>

      <div className="dashboard__content">
        <div className="card exams">
          <div className="card__title">
            <h1>Provas</h1>
          </div>
          <div className="card__body">
            <div
              className="card__item card__item--exam"
            >
              <div className="exam__content">
                <div className="exam__image">
                  <img src={correctedExamSVG} alt="Exam"/>
                </div>
                <div className="exam__info">
                  <p className="exam__title">Prova 1</p>
                  <p className="info__item"><span>Quantidade de questões: </span> 10</p>
                  <p className="info__item"><span>Quantidade de alunos: </span> 30</p>
                  <p className="info__item"><span>Data de aplicação: </span> 03/05/2020</p>
                  <p className="info__item"><span>Situação: </span>Corrigida</p>
                </div>
              </div>
            </div>
            <div
              className="card__item card__item--exam"
            >
              <div className="exam__content">
                <div className="exam__image">
                  <img src={examSVG} alt="Exam"/>
                </div>
                <div className="exam__info">
                  <p className="exam__title">Prova 2</p>
                  <p className="info__item"><span>Quantidade de questões: </span> 10</p>
                  <p className="info__item"><span>Quantidade de alunos: </span> 30</p>
                  <p className="info__item"><span>Data de aplicação: </span> 03/05/2020</p>
                  <p className="info__item"><span>Situação: </span>Aguardando correção</p>
                </div>
              </div>
            </div>
            <div
              className="card__item card__item--add"
              data-tip="Adicionar nova prova"
            >
              <div className="add-sign">
                <FaPlus size={18} color="#dc7037" />
              </div>
            </div>
          </div>
        </div>
        <div className="card students">
          <div className="card__title">
            <h1>Alunos</h1>
          </div>
          <div className="card__body card__body--table">
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Matrícula</th>
                    <th>Série</th>
                    <th className="text-center">Turma</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr>
                      <td>{student.name}</td>
                      <td>{student.registration}</td>
                      <td>{`${student.grade}° - ${student.educationLevel}`}</td>
                      <td className="text-center">{student.class.toUpperCase()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button type="button" className="card__button btn-small">
              <FaPlus size={12} />
              Ver todos
            </button>

            <button type="button" className="card__button card__button--add btn-small">
              <FaUserGraduate size={13} />
              Adicionar aluno
            </button>
          </div>
        </div>
        <div className="card classes">
          <div className="card__title">
            <h1>Turmas</h1>
          </div>
          <div className="card__body">
            <div
              className="card__item card__item--add card__item--class"
              data-tip="Adicionar nova turma"
              onClick={() => setAddNewClassOpen(true)}
            >
              <div className="add-sign">
                <FaPlus size={18} color="#dc7037" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddNewClass
        open={addNewClassOpen}
        closeModal={() => setAddNewClassOpen(false)}
      />

      <ReactTooltip place="bottom" type="dark" effect="solid" />
    </div>
  );
}
