import "./styles.css";
import {ReactComponent as AddSvg} from "./../../assets/svg/add.svg"
import {ReactComponent as RemoveSvg} from "./../../assets/svg/remove.svg"
import {ReactComponent as LogoutSvg} from "./../../assets/svg/logout.svg"
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Home() {
  const [nome, setNome] = useState("");
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getHome() {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        await axios
          .get("https://my-wallet-project-backend.herokuapp.com/home", config)
          .then((res) => {
            const profile = res.data;
            setNome(profile.name);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (e) {
        console.log(e);
      }
    }
    getHome();
  }, []);
  useEffect(() => {
    async function getLogs() {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        await axios
          .get("https://my-wallet-project-backend.herokuapp.com/logs", config)
          .then((res) => {
            const logsData = res.data;
            setLogs(logsData);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (e) {
        console.log(e);
      }
    }
    getLogs();
  }, []);
  async function Logout() {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.get("https://my-wallet-project-backend.herokuapp.com/logout", config).then(res=>{
        localStorage.removeItem("token");
        navigate("/sign-in")
      })
    } catch(e) {
      console.log(e)
    }
  }
  return (
    <main className="main-home">
      <div className="logout" onClick={Logout}><LogoutSvg/></div>
      <header className="header-home">
        <h2>Olá, {nome?nome[0].toUpperCase()+nome.slice(1):""}</h2>
      </header>
      <article className="logs-article">
        <div>
          {logs.hist ? (
            logs.hist.map((reg,index) => {
              let classType = ""
              if(reg.operation==="in") {
                classType = "green"
              }
              if(reg.operation==="out") {
                classType = "red"
              }
              return (
                <div key={index} className="logs">
                  <h4>{reg.date}</h4>
                  <h3>{reg.type}</h3>
                  <h2 className={classType}>{reg.value}</h2>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <h3 className="saldo">Saldo</h3> <h4 className="valor">{logs.storage}</h4>
      </article>
      <div className="divButton">
        
        <Link to="/home/new-deposit">
          <div className="newIn">
          <AddSvg/><h4>Nova Entrada</h4></div>
        </Link>
        <Link to="/home/new-payment">
          <div className="newOut">
          <RemoveSvg/><h4>Nova Saída</h4></div>
        </Link>
      </div>
    </main>
  );
}
