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
          console.log(token);
          localStorage.setItem("token",JSON.stringify(token))
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <h1>MyWallet</h1>
      <form onSubmit={submitForm}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toString())}
          required
          disabled={submited ? true : false}
        />
        <input
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value.toString())}
          required
          disabled={submited ? true : false}
        />
        <button type="submit">Entrar</button>
      </form>
      <a href="/home">Primeira vez? Cadastre-se!</a>
    </>
  );
}
