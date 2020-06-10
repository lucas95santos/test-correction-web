import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import * as SchoolClassActions from '../../store/modules/schoolClass/actions';
// services
import api from '../../services/api';
// components
import { DashboardTop, AddNewClass, AddNewExam } from '../../components';
// toast
import { toast } from 'react-toastify';
// styles
import './Dashboard.css';
// icons
import { FaPlus } from 'react-icons/fa';
// images
import examSVG from '../../assets/images/svgs/exam.svg';
import correctedExamSVG from '../../assets/images/svgs/corrected_exam.svg';
// tooltip
import ReactTooltip from 'react-tooltip';
// util
import { getGradeColor } from '../../util/gradeColors';
import formatDate from '../../util/formatDate';

function Dashboard(props) {
  const { auth, schoolClasses, listAllRequest } = props;

  const [profileDropdown, setProfileDropDown] = useState(false);
  const [notificationDropdown, setNotificationDropDown] = useState(false);
  const [addNewClassOpen, setAddNewClassOpen] = useState(false);
  const [addNewExamOpen, setAddNewExamOpen] = useState(false);

  const [exams, setExams] = useState([]);

  useEffect(() => {
    listAllRequest(auth.token);
  }, []);

  useEffect(() => {
    loadExams();
  }, []);

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
        id: createSchoolClassId(name, grade),
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
      listAllRequest(auth.token);
    } catch (err) {
      console.log(err);
      toast.error('Turma já cadastrada');
    }
  }

  function createSchoolClassId(name, grade) {
    grade = grade.replace('é', 'e');
    return `${name}_${grade.replace(' ', '')}`;
  }

  function formatGrade(grade) {
    const newFormat = grade.split('-');
    newFormat[1] = newFormat[1].replace('Ensino', '');

    return newFormat;
  }

  async function loadExams() {
    try {
      const { data } = await api.get('/exams', {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      setExams(data.exams.map(exam => ({
        ...exam,
        createdAt: formatDate(exam.createdAt),
      })));
    } catch (err) {
      console.error(err);
    }
  }

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
            {exams && exams.map(exam => (
              <div
                className="card__item card__item--data"
                key={exam.id}
              >
                <div className="data__content">
                  <div className="data__image">
                    {
                      exam.status === "PENDENTE" ?
                      <img src={examSVG} alt="Exam" /> :
                      <img src={correctedExamSVG} alt="Exam" />
                    }
                  </div>
                  <div className="data__info">
                    <p className="data__title">{exam.name}</p>
                    <p className="info__item"><span>Número de questões: </span> {exam.questions_amount}</p>
                    {/* <p className="info__item"><span>Alunos participantes: </span> 30</p> */}
                    <p className="info__item"><span>Criado em: </span> {exam.createdAt}</p>
                    <p className="info__item"><span>Situação: </span>{exam.status}</p>
                  </div>
                </div>
              </div>
            ))}
            <div
              className="card__item card__item--add"
              data-tip="Adicionar nova prova"
              onClick={() => setAddNewExamOpen(true)}
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
            {schoolClasses.map(schoolClass => {
              const [gradeYear, gradeEducation] = formatGrade(schoolClass.grade);
              const createdAt = formatDate(schoolClass.createdAt);
              let grade = schoolClass.grade.replace('é', 'e');
              grade = grade.replace(' ', '');

              return (
                <Link
                  key={schoolClass.id}
                  to={`/turmas/${grade}/${schoolClass.name}`}
                  className="card__item card__item--data card__item--class"
                >
                  <div>
                    <div className="data__content">
                      <div className="data__name" style={{ background: getGradeColor(schoolClass.grade) }}>
                        <p>{schoolClass.name}</p>
                      </div>
                      <div className="data__info">
                        <p className="info__item"><span>Ano: </span> {gradeYear}</p>
                        <p className="info__item"><span>Ensino: </span> {gradeEducation}</p>
                        <p className="info__item"><span>Criada em: </span> {createdAt}</p>
                        <p className="info__item"><span>Número de alunos: </span>{schoolClass.amount_students}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
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

      <AddNewExam
        open={addNewExamOpen}
        closeModal={() => setAddNewExamOpen(false)}
        loadExams={loadExams}
      />

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
  auth: state.auth,
  schoolClasses: state.schoolClass.data
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(SchoolClassActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
