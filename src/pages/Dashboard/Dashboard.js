import React, { useState } from 'react';
// redux
import { connect } from 'react-redux';
// services
import api from '../../services/api';
// components
import { DashboardTop, AddNewClass } from '../../components';
// toast
import { toast } from 'react-toastify';
// styles
import './Dashboard.css';
// icons
import { FaPlus, FaUserGraduate } from 'react-icons/fa';
// images
import examSVG from '../../assets/images/svgs/exam.svg';
import correctedExamSVG from '../../assets/images/svgs/corrected_exam.svg';
// tooltip
import ReactTooltip from 'react-tooltip';

function Dashboard({ auth }) {
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

  async function addClass({ name, grade }) {
    try {
      await api.post('/classes', {
        name,
        grade
      },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        }
      );

      setAddNewClassOpen(false);
      toast.success('Nova turma cadastrada com sucesso');
    } catch (err) {
      console.log(err);
      toast.error('Turma já cadastrada');
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
  ];

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
              className="card__item card__item--data"
            >
              <div className="data__content">
                <div className="data__image">
                  <img src={correctedExamSVG} alt="Exam" />
                </div>
                <div className="data__info">
                  <p className="data__title">Prova 1</p>
                  <p className="info__item"><span>Quantidade de questões: </span> 10</p>
                  <p className="info__item"><span>Alunos participantes: </span> 30</p>
                  <p className="info__item"><span>Data de aplicação: </span> 03/05/2020</p>
                  <p className="info__item"><span>Situação: </span>Corrigida</p>
                </div>
              </div>
            </div>
            <div
              className="card__item card__item--data"
            >
              <div className="data__content">
                <div className="data__image">
                  <img src={examSVG} alt="Exam" />
                </div>
                <div className="data__info">
                  <p className="data__title">Prova 2</p>
                  <p className="info__item"><span>Quantidade de questões: </span> 10</p>
                  <p className="info__item"><span>Alunos participantes: </span> 30</p>
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
        <div className="card classes">
          <div className="card__title">
            <h1>Turmas</h1>
          </div>
          <div className="card__body">
            <div
              className="card__item card__item--data card__item--class"
            >
              <div className="data__content">
                <div className="data__name">
                  <p>B</p>
                </div>
                <div className="data__info">
                  <p className="info__item"><span>Ano: </span> 3°</p>
                  <p className="info__item"><span>Ensino: </span> Médio</p>
                  <p className="info__item"><span>Criada em: </span> 03/05/2020</p>
                  <p className="info__item"><span>Quantidade de alunos: </span>30</p>
                </div>
              </div>
            </div>
            <div
              className="card__item card__item--data card__item--class"
            >
              <div className="data__content">
                <div className="data__name">
                  <p>C</p>
                </div>
                <div className="data__info">
                  <p className="info__item"><span>Ano: </span> 8°</p>
                  <p className="info__item"><span>Ensino: </span> Fundamental</p>
                  <p className="info__item"><span>Criada em: </span> 03/05/2020</p>
                  <p className="info__item"><span>Quantidade de alunos: </span>40</p>
                </div>
              </div>
            </div>
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
        addClass={addClass}
      />

      <ReactTooltip place="bottom" type="dark" effect="solid" />
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Dashboard);
