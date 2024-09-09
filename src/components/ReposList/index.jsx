import { useEffect, useState } from "react";

import styles from "./ReposList.module.css";

const ReposList = ({ nomeUsuario }) => {
  const [repos, setRepos] = useState([]);
  const [estaCarregando, setEstaCarregando] = useState(true);
  const [deuErro, setDeuErro] = useState(false);
  useEffect(() => {
    setEstaCarregando(true);
    setDeuErro(false);
    fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Usuario não encontrado");
        }
        return res.json();
      })
      .then((resJSON) => {
        setTimeout(() => {
          setEstaCarregando(false);
          setRepos(resJSON);
        }, 3000);
      })
      .catch((e) => {
        setEstaCarregando(false);
        setDeuErro(true);
      });
  }, [nomeUsuario]);
  return (
    <div className="container">
      {estaCarregando ? (
        <h1>Carregando...</h1>
      ) : deuErro ? (
        <p>
          Desculpe mas não conseguimos encontrar o usuario <b>{nomeUsuario} </b>
          no GitHub
        </p>
      ) : (
        <ul className={styles.list}>
          {repos.map(({ id, name, language, html_url }) => (
            <li className={styles.listItem} key={id}>
              <div className={styles.listItemName}>
                <b>Nome:</b> {name}
              </div>
              <div className={styles.listItemLanguage}>
                <b>Linguagem:</b> {language}
              </div>

              <div>
                <a
                  className={styles.listItemLink}
                  target="_blank"
                  href={html_url}
                >
                  Visitar no GitHUB
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default ReposList;
