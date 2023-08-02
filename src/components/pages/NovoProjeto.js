import {useNavigate} from 'react-router-dom'

import ProjetoForm from '../project/ProjetoForm'
import styles from './NovoProjeto.module.css'

function NovoProjeto(){

    const history = useNavigate() // hook que nos permite fazer redrectis nas paginas

    function createPost(project){
        // initialize const and services
        project.const = 0
        project.services = []

        fetch("http://localhost:5000/projects",{
            method: "POST",
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            //redirect
            history('/projects', { state: { message: 'Projeto criado com sucesso!' }})
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.novoprojeto_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar seu serviço</p>
            <ProjetoForm handleSubmit={createPost} btnText="Criar projeto"/>
        </div>
    )
}

export default NovoProjeto