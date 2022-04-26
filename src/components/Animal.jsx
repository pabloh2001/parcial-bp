import React from "react";
import { nanoid } from "nanoid";
import {firebase} from '../firebase'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const mySwal = withReactContent(Swal)

const Animal = () => {
    const [id, setId] = React.useState('')
    const [nameAnimal, setNameAnimal] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [race, setRace] = React.useState('')
    const [weight, setWeight] = React.useState('')
    const [list, setList] = React.useState([])
    const [editMode, setEditMode] = React.useState(false)
    const image = 'https://picsum.photos/50/50'

    const saveAnimal = async (e) => {
        e.preventDefault()

        if (!nameAnimal.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo nombre paciente está vacio!'
            })
            return
        }
    
        if (!category.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo categoria doctor está vacio!'
            })
            return 
        }
    
        if (!race.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo rasa está vacio!'
            })
            return 
        }

        if (!weight.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo peso está vacio!'
            })
            return 
        }

        if (!image.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo image está vacio!'
            })
            return 
        }

        try {
            const db = firebase.firestore()
            const animal = {
                animal: nameAnimal,
                category: category,
                race: race,
                weight: weight,
                image: image
            }
            await db.collection('doctores').add(animal)
            mySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cita registrada exitosamente',
                showConfirmButton: false,
                timer: 1500
            })
            setList([
                ...list,
                {
                    id: nanoid(),
                    animal: nameAnimal,
                    category: category,
                    race: race,
                    weight: weight,
                    image: image
                }
            ])
        } catch (error) {
            console.error(error);
        }
        setNameAnimal('')
        setCategory('')
        setRace('')
        setWeight('')
        setEditMode(false)
    }

    const auxUpdate = (item) => {
        setNameAnimal(item.animal)
        setCategory(item.category)
        setRace(item.race)
        setWeight(item.weight)
        setEditMode(true)
        setId(item.id)
    }

    const updateAnimal = async e => {
        e.preventDefault()

        if (!nameAnimal.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo nombre paciente está vacio!'
            })
            return
        }
    
        if (!category.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo nombre doctor está vacio!'
            })
            return 
        }
    
        if (!race.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo fecha está vacio!'
            })
            return 
        }
    
        if (!weight.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo hora está vacio!'
            })
            return 
        }

        try {
            const db = firebase.firestore()
            await db.collection('doctores').doc(id).update({
                animal: nameAnimal,
                category: category,
                race: race,
                weight: weight,
                image: image
            })
            mySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cita actualizada',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.error(error);
        }

        setNameAnimal('')
        setCategory('')
        setRace('')
        setWeight('')
        setEditMode(false)
    }

    const cancel =()=>{
        setNameAnimal('')
        setCategory('')
        setRace('')
        setWeight('')
        setEditMode(false)
    }


    return (
        <div className='container mt-3'>
        <h1 className='text-center'>PARCIAL REACT-BP</h1>
        <hr/>
        <div className='row'>
            <div className="table-responsive">
                <h4 className="text-center">Listado de Animales</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Raza</th>
                            <th>Peso</th>
                            <th>Image</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        list.map((item) => (
                            <tr key={item.id}>
                                <td>{item.animal}</td>
                                <td>{item.category}</td>
                                <td>{item.race}</td>
                                <td>{item.weight}</td>
                                <td><img src={item.image} alt="" /></td>
                                <td>
                                    <button className='btn btn-warning btn-sm float-end' onClick={()=> auxUpdate(item)}><i className="fa-solid fa-file-pen"></i></button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <div className="container">
                <h4 className="text-center">
                    {
                        editMode ? 'Editar Animal': 'Agregar Animal'
                    }
                </h4>
                <form className="row g-3 justify-content-center" onSubmit={editMode ? updateAnimal: saveAnimal}>
                    <div className="col-md-5">
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='nombre del animal'
                            onChange={(e)=>setNameAnimal(e.target.value)}
                            value = {nameAnimal}
                        />
                    </div>
                    <div className="col-md-5">
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='categoria'
                            onChange={(e)=>setCategory(e.target.value)}
                            value = {category}
                        />
                    </div>
                    <div className="col-md-5">
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='raza'
                            onChange={(e)=>setRace(e.target.value)}
                            value = {race}
                        />
                    </div>
                    <div className="col-md-5">
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='peso'
                            onChange={(e)=>setWeight(e.target.value)}
                            value = {weight}
                        />
                    </div>
                    <div className="col-md-10">
                        {
                            !editMode? (
                                <button className='btn btn-primary btn-block' type='submit'>Agregar</button>
                            )
                            :
                            (  <>
                                <button className='btn btn-warning btn-block' type='submit'>Editar</button>
                                <button className='btn btn-dark btn-block mx-2' onClick={() => cancel()}>Cancelar</button>
                                </>
                            )
                        }
                    </div>
                                          
                </form>
            </div>
        </div>
    </div>
    )
}
export default Animal