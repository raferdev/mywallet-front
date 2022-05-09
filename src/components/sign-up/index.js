import "../sign-in/styles.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [email, setEmail] = useState("");
  const [submited, setSubmited] = useState(false);
  const navigate = useNavigate();
  async function SubmitForm(event) {
    event.preventDefault();
    setSubmited(true);
    if (confirmPass !== password) {
      alert("As senhas não coincidiram, tente de novo!");
      setEmail("");
      setPassword("");
      setConfirmPass("");
      setSubmited(false);
      return;
    }
    const body = {
      name,
      password,
      email,
    };
    try {
      await axios
        .post("http://localhost:5000/sign-up", body)
        .then((res) => {
          navigate("/sign-in");
        })
        .catch((error) => {
          alert("Tivemos um problema ao envio! Tente novamente!");
          setEmail("");
          setPassword("");
          setConfirmPass("");
          setSubmited(false);
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <main className="main-login">
      <h1 className="h1-login">MyWallet</h1>
      <article className="login">
        <form onSubmit={SubmitForm}>
          <input
            className="input-login"
            type="name"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value.toString())}
            min="3"
            max="10"
            required
            disabled={submited ? true : false}
          />
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
            min="8"
            max="16"
            required
            disabled={submited ? true : false}
          />
          <input
            className="input-login"
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value.toString())}
            required
            disabled={submited ? true : false}
          />
          <div className="div-button">
            <button
              className=" login-button"
              type="submit"
              disabled={submited ? true : false}
            >
              Cadastrar
            </button>
          </div>
        </form>
        <a className="linkSignUp" href="/sign-in">
          Já tem uma conta? Entre agora!
        </a>
      </article>
    </main>
  );
}
