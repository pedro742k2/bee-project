import React, { Component, Fragment } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import "./TempNotes.css";
import "./TempNotesResponsive.css";

class TempNotes extends Component {
  constructor() {
    super();

    this.state = {
      burger_state: true,
    };
  }

  burgerMenuOptionClicked = () => {
    if (!this.state.burger_state) {
      const burger_menu = document.getElementsByClassName(
        "hamburger--stand"
      )[0];
      const nav_bar = document.getElementsByClassName("nav-bar")[0];

      const { burger_state } = this.state;

      burger_menu.classList.toggle("is-active");
      nav_bar.classList.toggle("on");

      this.setState({ burger_state: !burger_state });
    }
  };

  changeMenuState = () => {
    const burger_menu = document.getElementsByClassName("hamburger--stand")[0];
    const nav_bar = document.getElementsByClassName("nav-bar")[0];

    const { burger_state } = this.state;

    burger_menu.classList.toggle("is-active", burger_state);
    nav_bar.classList.toggle("on");

    this.setState({ burger_state: !burger_state }, () => {
      console.log(this.state.burger_state);
    });
  };

  render() {
    const { burger_state } = this.state;

    return (
      <div className="App">
        <header>
          <NavBar
            burgerMenuOptionClicked={this.burgerMenuOptionClicked}
            changeMenuState={this.changeMenuState}
          />
        </header>

        {burger_state ? (
          <Fragment>
            <main className="tempnotes-main">
              <div className="temp-titles">
                <p>Página de notas temporária</p>
                <h3>
                  Esta página tem como finalidade reportar o estado de
                  desenvolvimento do website, expondo para esse efeito correções
                  e alterações de maior importância
                </h3>

                <h3>
                  Esta apenas pode ser acedida escrevendo manualmente a rota{" "}
                  <i>/temp</i> a seguir ao URL do website e está escrita em
                  português, visto não se tratar de uma página para produção
                </h3>
              </div>

              <div className="notes-container">
                <div className="note">
                  <div className="note-title-div">
                    <h1>Adicionada responsividade a várias rotas</h1>
                    <h2>16-01-2021 / 16:10h</h2>
                  </div>
                  <span>
                    Adicionada responsividade a várias páginas no website{" "}
                    {'(Falta ainda a página "Apiary")'}
                  </span>
                </div>

                <div className="note">
                  <div className="note-title-div">
                    <h1>
                      Adicionados e configurados favicons na pasta {'"public"'}
                    </h1>
                    <h2>16-01-2021 / 15:00h</h2>
                  </div>
                  <span>
                    Adicionados e configurados para diferentes dispositivos,
                    icons para a página
                  </span>
                </div>

                <div className="note">
                  <div className="note-title-div">
                    <h1>Corrigido bug do menu de três barras</h1>
                    <h2>11-01-2021 / 21:09h</h2>
                  </div>
                  <span>
                    Foi corrigido um bug que impedia dispositivos abaixo dos 850
                    pixeis de largura acederem ao menu de ecrã inteiro,
                    especialmente destinado a estes, clinando sobre as três
                    barras do seu canto superior direito
                  </span>
                </div>

                <div className="note">
                  <div className="note-title-div">
                    <h1>Adicionada a página "Notas temporárias"</h1>
                    <h2>11-01-2021 / 20:27h</h2>
                  </div>
                  <span>
                    Adicionada esta mesma página, que unicamente pode ser
                    acedida nesta rota <span className="italic">/temp</span>
                  </span>
                </div>

                <div className="note">
                  <div className="note-title-div">
                    <h1>Adicionada a página "invalid page"</h1>
                    <h2>11-01-2021 / 15:51h</h2>
                  </div>
                  <span>
                    Adicionada uma página com a finalidade de ser exibida quando
                    o utilizador escreva uma rota inválida na URL, como por
                    exemplo
                  </span>
                  <span className="bold">
                    https://smartbeeproject.herokuapp.com/
                    <span className="italic">qualquer_coisa</span>
                  </span>
                </div>
              </div>
            </main>

            <footer>
              <Footer />
            </footer>
          </Fragment>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default TempNotes;
