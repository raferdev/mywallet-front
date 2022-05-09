import "./styles.css";
export default function SignIn() {
  return (
    <>
      <h1>MyWallet</h1>
      <input placeholder="E-mail"/>
      <input placeholder="Senha" />
      <button>Entrar</button>
      <a href="/home">Primeira vez? Cadastre-se!</a>
    </>
  );
}
