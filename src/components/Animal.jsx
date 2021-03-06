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
    const [color, setColor] = React.useState('')
    const [type, setType] = React.useState('')
    const [list, setList] = React.useState([])
    const [editMode, setEditMode] = React.useState(false)
    
    let image = 'https://picsum.photos/100/100?image='
    const valor = () =>{
        return Math.floor(Math.random()*(599-100+1)+100)
    }

    React.useEffect(()=>{
        const getData = async () =>{
            try{
                const db = firebase.firestore()
                const data = await db.collection('animales').get()
                const array = data.docs.map(item =>(
                    {
                        id:item.id, ...item.data()
                    }
                ))
                setList(array)

            }catch(error){
                console.error(error)
            }
        }
        getData()

    })

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

        if (!color.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo color está vacio!'
            })
            return 
        }

        if (!type.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo tipo está vacio!'
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
                color: color,
                type: type,
                image: image+valor()
            }
            await db.collection('animales').add(animal)
            mySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Animal registrado exitosamente',
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
                    color: color,
                    type: type,
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
        setColor('')
        setType('')
        setEditMode(false)
    }

    const auxUpdate = (item) => {
        setNameAnimal(item.animal)
        setCategory(item.category)
        setRace(item.race)
        setWeight(item.weight)
        setColor(item.color)
        setType(item.type)
        setEditMode(true)
        setId(item.id)
    }

    const updateAnimal = async e => {
        e.preventDefault()

        if (!nameAnimal.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo nombre está vacio!'
            })
            return
        }
    
        if (!category.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo categoria está vacio!'
            })
            return 
        }
    
        if (!race.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo raza está vacio!'
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

        if (!color.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo color está vacio!'
            })
            return 
        }

        if (!type.trim()) {
            mySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El campo tipo está vacio!'
            })
            return 
        }

        try {
            const db = firebase.firestore()
            await db.collection('animales').doc(id).update({
                animal: nameAnimal,
                category: category,
                race: race,
                weight: weight,
                color: color,
                type: type,
                image: image
            })
            mySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Animal actualizado',
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
        setColor('')
        setType('')
        setEditMode(false)
    }

    const cancel =()=>{
        setNameAnimal('')
        setCategory('')
        setRace('')
        setWeight('')
        setColor('')
        setType('')
        setEditMode(false)
    }

    const deleteAnimal = async (id) =>{
        try{
            const db = firebase.firestore()
            await db.collection('animales').doc(id).delete()
            const aux = list.filter(item => item.id !== id)
            setList(aux)
        }catch(error){
            console.error(error)
        }
    }

    const confirmDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, Eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteAnimal(id)
                Swal.fire(
                    'Eliminado!',
                    'El animal ha sido eliminado.',
                    'success'
                )
            }
        })
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
                                <td>{item.color}</td>
                                <td>{item.type}</td>
                                <td><img src={item.image} alt="" /></td>
                                <td>
                                <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=> confirmDelete(item.id)}><i className="fa-solid fa-trash-can"></i></button>
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
                    <div className="col-md-5">
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='color'
                            onChange={(e)=>setColor(e.target.value)}
                            value = {color}
                        />
                    </div>
                    <div className="col-md-5">
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='tipo'
                            onChange={(e)=>setType(e.target.value)}
                            value = {type}
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