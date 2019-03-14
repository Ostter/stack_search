import classnames from 'classnames';
import * as React from "react";
import { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import { fetchQuestionByTitle } from "./api/api";
import * as styleMappingButton from 'snake-eyes/dist/styleguide/buttons.module.css.js';
import * as styleMappingInput from 'snake-eyes/dist/styleguide/input.module.css.js';
import "snake-eyes/dist/components/main.min.css";
import "../style/app.css";

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
    const questions = data.items.map(({ title, link }: IQuestion): object => ({ title, link }));
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
     <div className="app">
      <div className="block">
        <input
          className={classnames(styleMappingInput.standardSize, "marginSearch")}
          type="text"
          value={search}
          ref={inputSearchRef}
          onChange={handleChange}
          placeholder="type question"
        />

        <button className={classnames(styleMappingButton.typeNormalCancel, "marginSearch")} onClick={findQuestions}>
          Find questions
        </button>
      </div>

      <div className="block">
        {questions.length > 0 &&
          questions.map(({ title, link }: IQuestion, index: number) => {
            return (
              <p key={index} className="result">
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
