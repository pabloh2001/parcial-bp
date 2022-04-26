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
    const [image, setImage] = React.useState('')
    const [list, setList] = React.useState([])
    const [editMode, setEditMode] = React.useState(false)

    const saveDoctor = async (e) => {
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
        setImage('')
        setEditMode(false)
    }
}
export default Animal