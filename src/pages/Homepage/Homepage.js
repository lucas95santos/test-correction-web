import React, { useEffect, useState, useRef } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
// services
import api from '../../services/api';
// form validation module
import * as Yup from 'yup';
// tooltip
import ReactTooltip from 'react-tooltip';
// lazy load
import LazyLoad from 'react-lazy-load';
// styles
import './Homepage.css';
// components
import { Navbar, MenuCollapsed, Footer, ImageLoader } from '../../components';
// icons
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
// util
import images from '../../util/images';
import advantages from '../../util/advantages';
import testIcon from '../../assets/images/svgs/test.svg';

const schema = Yup.object().shape({
  contactName: Yup.string().required('O nome é obrigatório'),
  contactEmail: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obrigatório'),
  contactSubject: Yup.string().required('O assunto é obrigatório'),
  contactMessage: Yup.string().required('A mensagem é obrigatória')
});

export function Homepage() {
  // state attributes
  const [navbarColor, setNavbarColor] = useState(false);
  const [scrollTop, setScrollTop] = useState(false);
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  // references
  const headerRef = useRef();
  const aboutSectionRef = useRef();
  const advantagesSectionRef = useRef();
  const contactSectionRef = useRef();

  const rootLink = {
    action: () => scrollToSection(headerRef)
  }

  const navbarLinks = [
    {
      id: 'about',
      name: 'Sobre o sistema',
      action: () => scrollToSection(aboutSectionRef)
    },
    {
      id: 'advantages',
      name: 'Vantagens',
      action: () => scrollToSection(advantagesSectionRef)
    },
    {
      id: 'contact',
      name: 'Fale conosco',
      action: () => scrollToSection(contactSectionRef)
    }
  ];

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1032) {
        setMenuCollapsed(false);
      }
    })
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const windowOffset = window.pageYOffset;
      setNavbarColor(windowOffset > 80);
      setScrollTop(windowOffset > 700);
    })
  }, []);

  const scrollToSection = (section) => {
    window.scroll(0, section.current.offsetTop);
  }

  const scrollToTop = () => {
    window.scroll(0, 0);
  }

  const handleSubmit = async (data) => {
    const mailContent = {
      name: data.contactName,
      email: data.contactEmail,
      subject: data.contactSubject,
      message: data.contactMessage
    };

    try {
      const { data: responseData } = await api.post('/contact', mailContent);
      toast.success(responseData.message);
    } catch (err) {
      toast.error('Não foi possível enviar a mensagem. Tente novamente.');
    }

    resetForm();
  }

  const resetForm = () => {
    const contactForm = document.getElementById('contactForm');
    contactForm.reset();
  }

  return (
    <>
      <header style={{ backgroundImage: `url(${images.header})` }} ref={headerRef}>
        <Navbar
          color={navbarColor} imagesVisible
          rootLink={rootLink}
          links={navbarLinks}
          showMenuCollapsed={() => setMenuCollapsed(!menuCollapsed)}
        />

        <MenuCollapsed
          showUp={menuCollapsed}
          showMenu={() => setMenuCollapsed(!menuCollapsed)}
          links={navbarLinks}
        />

        <div className="container header">
          <div className="header__content">
            <div className="header__image">
              <LazyLoad
                debounce={false}
              >
                <ImageLoader
                  src={testIcon}
                  alt="Header image"
                />
              </LazyLoad>
            </div>
            <div className="header__info">
              <div>
                <h1>Uma solução eficiente para a correção de provas objetivas</h1>
                <h2>
                  Com o TestCorrection você irá corrigir as suas provas de forma
                  ágil e simples. Poupe seu tempo, corrija com TestCorrection.
                  </h2>
              </div>
            </div>
          </div>

          <div className="header__footer">
            <span>Saiba mais</span>
            <FiChevronDown
              size={80}
              color="#ffffff"
              className="header__icon"
              onClick={() => scrollToSection(aboutSectionRef)}
            />
          </div>
        </div>
      </header>

      <section ref={aboutSectionRef}>
        <div className="container">
          <h3>Sobre o sistema</h3>
          <h4>Saiba como a correção de provas funciona</h4>

          <div className="about">
            <div className="about__text">
              <p>
                O Test Correction é um sistema que visa auxiliar os docentes no trabalho de correção de provas objetivas.
                A principal função do sistema é reduzir o tempo que os professores levam para realizar essa atividade,
                sem gerar erros e possibilitando um maior controle de análise sobre o desempenho de seus alunos.
              </p>

              <LazyLoad
                debounce={false}
              >
                <ImageLoader
                  src={images.teacher}
                  alt="Professora"
                />
              </LazyLoad>
            </div>

            <div className="about__image">
              <LazyLoad
                debounce={false}
                width={600}
              >
                <ImageLoader
                  src={images.answerCard}
                  alt="Gabarito"
                />
              </LazyLoad>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section ref={advantagesSectionRef}>
        <div className="container">
          <h3>Vantagens</h3>
          <h4>Veja os benefícios que você terá ao utilizar o TestCorrection</h4>

          <div className="avantages">
            {advantages.map((item, index) => (
              <div className="avantages__item" key={item.id}>
                <h5>{item.title}</h5>
                <LazyLoad
                  debounce={false}
                >
                  <ImageLoader
                    src={item.image}
                    alt={item.title}
                  />
                </LazyLoad>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      <section ref={contactSectionRef}>
        <div className="container">
          <h3>Entre em contato conosco</h3>
          <h4>Tire suas dúvidas ou envie uma sugestão</h4>

          <div className="form">
            <Form id="contactForm" schema={schema} onSubmit={handleSubmit}>
              <div className="form__line">
                <div className="form__input">
                  <Input
                    type="text"
                    name="contactName"
                    placeholder="Seu nome aqui"
                  />
                </div>

                <div className="form__input">
                  <Input
                    type="email"
                    name="contactEmail"
                    placeholder="Seu melhor e-mail"
                  />
                </div>
              </div>

              <div className="form__input">
                <Input
                  type="text"
                  name="contactSubject"
                  placeholder="Digite o assunto da mensagem aqui"
                />
              </div>

              <div className="form__textarea">
                <Input
                  name="contactMessage"
                  multiline
                  cols="30"
                  rows="6"
                  placeholder="Digite a sua mensagem aqui"
                />
              </div>

              <button
                type="submit"
              >
                Enviar
              </button>
            </Form>

            <div className="form__image">
              <LazyLoad
                debounce={false}
              >
                <ImageLoader
                  src={images.contact}
                  alt="Contato"
                />
              </LazyLoad>
            </div>
          </div>
        </div>
      </section>

      <button
        type="button"
        className="scroll-to-top"
        style={{
          visibility: scrollTop ? 'visible' : 'hidden',
          opacity: scrollTop ? 1 : 0
        }}
        onClick={() => scrollToTop()}
        data-tip="Voltar ao topo"
      >
        <FiChevronUp size={35} color="#ffffff" />
      </button>

      <ReactTooltip place="left" type="dark" effect="solid" />

      <Footer />
    </>
  );
}
