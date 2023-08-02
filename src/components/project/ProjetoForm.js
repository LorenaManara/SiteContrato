import {useEffect, useState} from 'react'

import Select from '../form/Select'
import Input from '../form/Input'
import styles from './ProjetoForm.module.css'
import SubmitButton from '../form/SubmitButton'

function ProjetoForm({handleSubmit, btnText , projectData}){

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {} )

    //promisse
    useEffect(() =>{ //hook vai servir para consultar so quando precisarmos / useEffect ultilizamos ele quando estamos solicitando dados dinamicamente
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleCategory(e){
        setProject({ ...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        },
        })
    }


    return (
        <form  onSubmit={submit} className={styles.form}>
            <Input type="text" text="Nome do Projeto" name="name" placeholder="Insira o nome do Projeto" handleOnChange={handleChange} value={project.name ? project.name : ''}/>
            
            <Input type="number" text="Orçamento do projeto" name="budget" placeholder="Insira o valor do projeto" handleOnChange={handleChange} value={project.budget ? project.budget : ''}/>
            
            <Select name="category_id" text="Selecione a categoria" options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id : ''}/>
            
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjetoForm