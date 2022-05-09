import "./styles.css";
import axios from "axios";
import { useState } from "react";
export default function Home() {
  const [nome, setNome] = useState("");
  const [logs, setLogs] = useState([]);
  async function getHome() {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios
        .get("http://localhost:5000/home", config)
        .then((res) => {
          const profile = res.data;
          console.log(profile);
          console.log("foi");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }
  getHome();
  return (
    <main>
      <header>
        <h2>Olá,{nome}</h2>
      </header>
      <article></article>
    </main>
  );
}
