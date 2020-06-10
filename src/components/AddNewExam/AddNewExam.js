import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
// services
import api from '../../services/api';
// components
import Modal from '../Modal';
import Tabs from '../Tabs';
import Accordion from '../Accordion';
// icons
import { FiArrowRight, FiArrowLeft, FiCheck } from 'react-icons/fi';
// styles
import './AddNewExam.css';


function AddNewExam(props) {
  const { open, closeModal, auth, loadExams } = props;
  const [currentTab, setCurrentTab] = useState(0);
  const [exam, setExam] = useState({ id: 0, name: '' });
  const [examName, setExamName] = useState('');
  const [questionsAmount, setQuestionsAmount] = useState(0);
  const [description, setDescription] = useState([]);
  const [answersAmount, setAnswersAmount] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [correctAnswerDescription, setCorrectAnswerDescription] = useState([]);
  const [questionValue, setQuestionValue] = useState([]);
  const [disabled, setDisabled] = useState(true);

  // para monitorar a primeira etapa
  useEffect(() => {
    goToStep2();
  }, [questionsAmount, examName]);

  function goToStep2() {
    if (questionsAmount > 0 && examName !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function goToStep3() {

  }

  function onChangeDescription(index, value) {
    const descriptions = [...description];
    descriptions[index] = value;

    setDescription(descriptions);
  }

  function onChangeAnswersAmount(index, value) {
    const answers = [...answersAmount];
    answers[index] = value;

    setAnswersAmount(answers);
  }

  function onChangeCorrectAnswer(index, value) {
    const answers = [...correctAnswer];
    answers[index] = value;

    setCorrectAnswer(answers);
  }

  function onChangeCorrectAnswerDescription(questionIndex, key, value) {
    const answers = [...correctAnswerDescription];

    answers[questionIndex] = {
      ...answers[questionIndex],
      [key]: value
    };

    setCorrectAnswerDescription(answers);
  }

  function onChangeQuestionValue(index, value) {
    const values = [...questionValue];
    values[index] = value;

    setQuestionValue(values);
  }

  function generateAnswerLetter(index) {
    const letters = ['A', 'B', 'C', 'D', 'E'];
    return letters[index];
  }

  function renderCorrectAnswer(questionIndex, amount) {
    const answers = [];

    for (let i = 0; i < amount; i++) {
      answers.push(
        <div className="answers__group">
          <input
            type="radio"
            id={`${generateAnswerLetter(i)}OfQuestion${questionIndex + 1}`}
            name={`correctAnswerOfQuestion${questionIndex + 1}`}
            value={i}
            onChange={e => onChangeCorrectAnswer(questionIndex, e.target.value)}
          />
          <label
            for={`${generateAnswerLetter(i)}OfQuestion${questionIndex + 1}`}
          >
            {generateAnswerLetter(i)}
          </label>
          <textarea
            type="text"
            name={`descriptionOfCorrectAnswerOfQuestion${questionIndex + 1}`}
            placeholder="Descrição da resposta aqui"
            value={correctAnswerDescription[questionIndex] ? correctAnswerDescription[questionIndex][generateAnswerLetter(i)] : null}
            onChange={
              e => onChangeCorrectAnswerDescription(questionIndex, generateAnswerLetter(i), e.target.value)
            }
          />
        </div>
      );
    }

    return answers;
  }

  function renderExamDefinition() {
    return (
      <div className="exam-definition">
        <div className="exam-definition__info">
          <span>Importante!</span>
          <p>
            - Preencha corretamente os dados da prova em cada etapa.<br />
            - Não se esqueça de revisar todas as informações antes de finalizar
            a criação da prova.<br />
            <strong>- No campo abaixo informe quantas questões a prova terá.</strong>
          </p>
        </div>
        <div className="exam-definition__content">
          <span>Nome da prova</span>
          <input
            type="text"
            name="examName"
            value={examName}
            onChange={e => setExamName(e.target.value)}
          />
          <span>Quantidade de questões</span>
          <input
            className="exam-definition__input"
            type="number"
            name="questionsAmount"
            min="0"
            value={questionsAmount}
            onChange={e => setQuestionsAmount(e.target.value)}
          />
        </div>
        <div className="exam-definition__footer">
          <button
            className={`btn-next ${disabled ? 'btn--disabled' : null}`}
            disabled={disabled}
            onClick={() => createExam()}
          >
            Próximo
            <FiArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  function renderExamFulfillment() {
    const accordions = [];

    for (let questionIndex = 0; questionIndex < questionsAmount; questionIndex++) {
      accordions.push(
        <Accordion
          idAccordion={`question${questionIndex + 1}`}
          header={`Questão ${questionIndex + 1}`}
          body={(
            <div className="question">
              <span>Descrição da questão:</span>
              <textarea
                type="text"
                name="description"
                placeholder="Digite a descrição da questão aqui"
                value={description[questionIndex]}
                onChange={e => onChangeDescription(questionIndex, e.target.value)}
              />
              <div className="question__info">
                <div className="question__alternatives">
                  <span>Número de alternativas:</span>
                  <select
                    name={`answersAmount${questionIndex}`}
                    className="question__input"
                    value={answersAmount[questionIndex]}
                    onChange={e => onChangeAnswersAmount(questionIndex, e.target.value)}
                  >
                    <option value="null">Selecionar...</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
                <div className="question__value">
                  <span>Valor da questão:</span>
                  <input
                    className="question__input"
                    type="text"
                    name="questionValue"
                    value={questionValue[questionIndex]}
                    onChange={e => onChangeQuestionValue(questionIndex, e.target.value)}
                  />
                </div>
              </div>
              <div className="question__answers">
                <span>Respostas:</span>
                <div className="answers">
                  {renderCorrectAnswer(questionIndex, answersAmount[questionIndex])}
                </div>
              </div>
            </div>
          )}
        />
      );
    }

    return (
      <div className="exam-fulfillment">
        <div>
          <div className="exam-fulfillment__exam-name">
            <span>
              <span className="exam-name__label">Nome da prova: </span>{exam && exam.name}
            </span>
            <span>
              <span className="exam-name__label">Código da prova: </span>
              {exam && formatExamId(exam.id)}
            </span>
          </div>
          {accordions}
        </div>
        <div className="exam-fulfillment__footer">
          <button
            className={`btn-prev ${disabled ? 'btn--disabled' : null}`}
            disabled={disabled}
            onClick={() => setCurrentTab(currentTab - 1)}
          >
            <FiArrowLeft size={16} />
            Anterior
          </button>
          <button
            className={`btn-next ${disabled ? 'btn--disabled' : null}`}
            disabled={disabled}
            onClick={() => persistQuestions()}
          >
            Próximo
            <FiArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  function formatExamId(examId) {
    const result = examId / 1000;
    return String(result.toFixed(3)).replace('.', '');
  }

  async function createExam() {
    try {
      const { data: createdExam } = await api.post('/exams', {
        name: examName,
        questions_amount: questionsAmount
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });

      setExam(createdExam);
      setCurrentTab(currentTab + 1);
    } catch (err) {
      console.error(err);
    }
  }

  function persistQuestions() {
    const questions = [];

    for (let i = 0; i < questionsAmount; i++) {
      questions.push(
        {
          id: `exam${exam.id}_question${i + 1}`,
          description: description[i],
          answersAmount: answersAmount[i],
          answers: correctAnswerDescription[i] ? Object.values(correctAnswerDescription[i]) : null,
          correctAnswer: correctAnswer[i],
          score: questionValue[i]
        }
      );
    }

    localStorage.setItem(`ts-exam${exam.id}-questions`, JSON.stringify(questions));
    setCurrentTab(currentTab + 1);
  }

  function addQuestionsToExam() {
    const questions = JSON.parse(localStorage.getItem(`ts-exam${exam.id}-questions`));

    if (questions) {
      questions.forEach(question => {
        createQuestion(question);
      });

      localStorage.removeItem(`ts-exam${exam.id}-questions`);
      closeModal();
      loadExams();
      toast.success('Prova criada com sucesso!');
    }
  }

  async function createQuestion(question) {
    const questionFormatted = {
      id: question.id,
      description: question.description,
      answers_amount: parseInt(question.answersAmount),
      answers: question.answers,
      correct_answer: parseInt(question.correctAnswer),
      score: question.score,
      exam_id: exam.id
    }

    try {
      await api.post('/questions', questionFormatted, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });

      console.log('Questão criada com sucesso');
    } catch (err) {
      console.error(err);
    }
  }

  function renderExamReview() {
    const questions = JSON.parse(localStorage.getItem(`ts-exam${exam.id}-questions`));

    if (!questions) return null;

    return (
      <div className="exam-review">
        <h3 className="exam-review__title">Revise os dados da prova antes de finalizar</h3>
        <div className="exam-review__info">
          <span><span className="exam-name__label">Nome da prova: </span>{exam && exam.name}</span>
          <span><span className="exam-name__label">Código da prova: </span>{exam && formatExamId(exam.id)}</span>
        </div>
        <div className="exam-review__questions">
          {questions.map((question, index) => (
            <div className="exam-review__question" key={index}>
              <span className="exam-review__question__title">Questão {index + 1} - {question.score} ponto(s)</span>
              <span>{question.description}</span>
              <div className="exam-review__question__answers">
                <span>Respostas</span>
                {question.answers.map((answer, position) => (
                  <span key={position} id="question__answer">
                    <span className="alternative">{generateAnswerLetter(position).toLowerCase()}) </span>
                    {answer}
                    {
                      question.correctAnswer == position ?
                      <FiCheck size={18} color="#43a047" /> :
                      ''
                    }
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="exam-review__footer">
          <button
            className="btn-prev"
            onClick={() => setCurrentTab(currentTab - 1)}
          >
            Corrigir preenchimento
          </button>
          <button
            className="btn-next"
            onClick={() => addQuestionsToExam()}
          >
            Finalizar
          </button>
        </div>
      </div>
    );
  }

  return (
    <Modal
      open={open}
      closeModal={closeModal}
      size="lg"
      modalTitle="Adicionar prova"
    >
      <div className="add-new-exam">
        <Tabs
          activeTab={currentTab}
          selectTab={setCurrentTab}
          selectors={[
            'Definição',
            'Preenchimento',
            'Revisão'
          ]}
          content={[
            renderExamDefinition(),
            renderExamFulfillment(),
            renderExamReview()
          ]}
        />
      </div>
    </Modal>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AddNewExam);
