import {useLocation} from 'react-router-dom'

import { useState, useEffect } from 'react'

import Message from "./layout/Message"
import Container from './layout/Container'
import Loading from './layout/Loading'
import LinkButton from './layout/LinkButton'
import ProjectCard from '../project/ProjectCard'

import styles from './Projects.module.css'

function Projects(){

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''

    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`http://localhost:5000/projects`);
          const newData = await response.json();
          setProjects(newData);
          setRemoveLoading(true)
        };
        
        fetchData();
        
    }, []);

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        })
        .then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto removido com sucesso')
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to="/novoprojeto" text="Criar projeto"/>
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 && projects.map((project)=>(
                    <ProjectCard name={project.name} id={project.id} budget={project.budget} category={project.category.name} key={project.id} handleremove={removeProject}/>
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Nao ha projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}
export default Projects