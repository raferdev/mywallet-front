import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [submited,setSubmited] = useState(false);
  const navigate = Navigate();
  async function SubmitForm(event) {
      event.preventDefault();
      setSubmited(true);
    const dados = {
        name,
        password,
        email
    }
    try {
        await axios.post("http://localhost:5000/sign-up", dados).then(res=>{
            navigate("/sign-in")
        }).catch(error =>{
            console.log(error)
        });
      } catch (e) {
        console.log(e);
      }
  }
  return (
    <>
      <h1>MyWallet</h1>
      <form onSubmit={SubmitForm}>
      <input type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value.toString())}
            required
            disabled={submited? true : false} />
      <input type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toString())}
            required
            disabled={submited? true : false} />
      <input type="password"
            placeholder="senha"
            value={password}
            onChange={(e) => setPassword(e.target.value.toString())}
            required
            disabled={submited ? true : false} />
      <button type="submit">Cadastrar</button>
      </form>
      <a href="/sign-in">Já tem uma conta? Entre agora!</a>
    </>
  );
}
