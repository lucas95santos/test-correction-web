import React, { useState, useEffect } from 'react';
// redux
import { connect } from 'react-redux';
// components
import { DashboardTop } from '../../components';
// services
import api from '../../services/api';
import history from '../../services/history';
// icons
import { FiPlus, FiX, FiMail, FiEdit } from 'react-icons/fi';
// styles
import './SchoolClass.css';
// util
import { getGradeColor } from '../../util/gradeColors';

function SchoolClass({ auth }) {
  const [profileDropdown, setProfileDropDown] = useState(false);
  const [notificationDropdown, setNotificationDropDown] = useState(false);
  const [schoolClass, setSchoolClass] = useState(null);

  const { pathname } = history.location;

  useEffect(() => {
    loadSchoolClass();
  }, []);

  function handleClickOut() {
    if (profileDropdown) {
      setProfileDropDown(false);
    }

    if (notificationDropdown) {
      setNotificationDropDown(false);
    }
  }

  async function loadSchoolClass() {
    try {
      const response = await api.get(`/classes/${formatURI(pathname, false)}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      setSchoolClass(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  function formatURI(uri) {
    const cleanUri = uri.replace('/turmas/', '');
    const [grade, schoolClass] = cleanUri.split('/');

    return `${schoolClass}_${grade}`;
  }

  function formatGrade() {
    return schoolClass.grade.replace('-', ' ano do ');
  }

  if (!schoolClass) return null;

  return (
    <div className="school-class" onClick={() => handleClickOut()}>
      <DashboardTop
        profileDropdownOpen={profileDropdown}
        profileDropdownOnclose={setProfileDropDown}
        notificationDropdownOpen={notificationDropdown}
        notificationDropdownOnClose={setNotificationDropDown}
        notificationAmount={0}
      />

      <div className="school-class__title">
        <div>
          <h1>{`Turma ${schoolClass.name} - ${formatGrade()}`}</h1>
          <div
            className="school_class__color"
            style={{ background: getGradeColor(schoolClass.grade) }}
          />
        </div>
        <div>
          <p><span>Números de alunos matriculados:</span> {schoolClass.amount_students}</p>
          <p><span>Criada em:</span> 22/05/2020</p>
        </div>
      </div>

      <div className="school-class__content">
        {schoolClass.students.length <= 0 &&
          <p style={{ marginBottom: 32 }}>Essa turma ainda não possui alunos cadastrados</p>
        }
        {schoolClass.students.length > 0 && (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Matrícula</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {schoolClass.students.map(student => (
                  <tr>
                    <td>{student.registration}</td>
                    <td>{student.name}</td>
                    <td>{student.email ? student.email : 'Não possui'}</td>
                    <td>
                      <div className="table__actions">
                        <FiX size={18} color="#d32f2f" title="Remover aluno" />
                        <FiEdit size={18} color="#dc7037" title="Editar informações" />
                        <FiMail size={18} color="#39374f" title="Enviar e-mail" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button type="button" className="school-class__add-button btn-success">
          <FiPlus size={16} />
          Cadastrar novo aluno
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(SchoolClass);