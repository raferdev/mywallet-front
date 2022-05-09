import "./styles.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submited, setSubmited] = useState(false);
  const navigate = useNavigate();
  async function submitForm(event) {
    event.preventDefault();
    setSubmited(true);
    const dados = {
      email,
      password,
    };
    try {
      await axios
        .post("http://localhost:5000/sign-in", dados)
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem("token", JSON.stringify(token));
          navigate("/home");
        })
        .catch((error) => {
          alert("Tivemos um problema ao envio! Tente novamente!");
          setEmail("");
          setPassword("");
          setSubmited(false);
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <main className="main-login ">
      <article className="login">
        <h1 className="h1-login">MyWallet</h1>
        <form onSubmit={submitForm}>
          <input
            className="input-login"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toString())}
            required
            disabled={submited ? true : false}
          />
          <input
            className="input-login"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value.toString())}
            required
            disabled={submited ? true : false}
          />
          <div className="div-button">
            <button
              className="login-button"
              type="submit"
              disabled={submited ? true : false}
            >
              Entrar
            </button>
          </div>
        </form>
        <a className="linkSignUp" href="/sign-up">
          Primeira vez? Cadastre-se!
        </a>
      </article>
    </main>
  );
}
