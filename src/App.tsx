import * as React from "react";
import { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import { fetchQuestionByTitle } from "./api/api";
import * as style from "../style/app.module.css";

interface IQuestion {
  title: string;
  link: string;
}

const App = (): ReactElement<Node> => {
  const [questions, setQuestion] = useState([]);
  const [search, setSearch] = useState();

  const inputSearchRef = useRef<HTMLInputElement>(null);

  useEffect(
    (): void => {
      if (inputSearchRef && inputSearchRef.current) {
        inputSearchRef.current.focus();
      }
    }
  );

  const findQuestions = async () => {
    const data = await fetchQuestionByTitle(search);
    const questions = data.items.map(
      ({ title, link }: IQuestion): object => ({ title, link })
    );
    setQuestion(questions);
  };

  const handleChange = (): void => {
    if (inputSearchRef && inputSearchRef.current) {
      setSearch(inputSearchRef.current.value);
    }
  };

  const decodeHTML = (html: string): string => {
    const txt = document.createElement("textarea") as HTMLTextAreaElement;
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className={style.app}>
      <div className={style.block}>
        <input
          className={style.whiteInput}
          type="text"
          value={search}
          ref={inputSearchRef}
          onChange={handleChange}
          placeholder="type question"
        />

        <button className={style.whiteButton} onClick={findQuestions}>
          Find questions
        </button>
      </div>

      <div className="block">
        {questions.length > 0 &&
          questions.map(({ title, link }: IQuestion, index: number) => {
            return (
              <p key={index} className={style.result}>
                <a href={link} target="_blank">
                  {decodeHTML(title)}
                </a>
              </p>
            );
          })}
      </div>
    </div>
  );
};

export default App;
