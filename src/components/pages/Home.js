import styles from './Home.module.css'
import porco from '../../img/savings.svg'
import LinkButton from './layout/LinkButton';

function Home(){
    return (
        <section className={styles.home_container}>
            <h1>Bem vindo<span> ao site de contratos</span></h1>
            <p>Comece a gerenciar seus projetos</p>
            <LinkButton to="novoprojeto" text="Criar projeto"/>
            <img src={porco} alt="porco ganancioso"/>
        </section>
    );
}

export default Home