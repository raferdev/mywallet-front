import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HTTP } from "../../assets/config/http.js";
import "./styles.css"
export default function NewDep() {
  const [type, setType] = useState();
  const [value, setValue] = useState();
  const [submited, setSubmited] = useState();
  const navigate = useNavigate();
  async function submitLog(event) {
    event.preventDefault();
    setSubmited(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      type,
      value,
    };
    try {
      await axios
        .post(`${HTTP}new-deposit`, body, config)
        .then((res) => {
          navigate("/home");
        })
        .catch((error) => console.log(error));
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <main className="main-new">
      <header className="header-new">
        <h2>Nova Entrada</h2>
      </header>
      <form onSubmit={submitLog}>
        <input
        className="input-new"
          type="value"
          placeholder="Valor"
          min="1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          disabled={submited ? true : false}
        ></input>
        <input
        className="input-new"
          type="type"
          placeholder="Descrição"
          value={type}
          onChange={(e) => setType(e.target.value)}
          minLength="3"
          required
          disabled={submited ? true : false}
        ></input>
        <div className="button-new-div">
        <button className="button-new" type="submit">Salvar Entrada</button>
        </div>
      </form>
    </main>
  );
}
