import React, { useState, useEffect } from 'react';
// components
import Modal from '../Modal';
import Tabs from '../Tabs';
import Accordion from '../Accordion';
// icons
import { FiArrowRight } from 'react-icons/fi';
// styles
import './AddNewExam.css';

export default function AddNewExam(props) {
  const { open, closeModal } = props;
  const [currentTab, setCurrentTab] = useState(0);
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
  }, [questionsAmount]);

  function goToStep2() {
    if (questionsAmount > 0) {
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
            value={generateAnswerLetter(i)}
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
            onClick={() => setCurrentTab(currentTab + 1)}
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
        {accordions}
        <div className="exam-fulfillment__footer">
          <button
            className={`btn-next ${disabled ? 'btn--disabled' : null}`}
            disabled={disabled}
            onClick={() => persistData()}
          >
            Próximo
            <FiArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  function persistData() {
    const questions = [];

    for (let i = 0; i < questionsAmount; i++) {
      questions.push(
        {
          id: `question${i+1}`,
          description: description[i],
          answersAmount: answersAmount[i],
          answers: correctAnswerDescription[i],
          correctAnswer: correctAnswer[i],
          score: questionValue[i]
        }
      );
    }

    console.log(questions);

    // setCurrentTab(currentTab + 1);
  }

  function renderExamReview() {
    return (
      <div className="exam-review"></div>
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
