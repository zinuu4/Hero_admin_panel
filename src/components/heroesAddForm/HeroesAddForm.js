import {useHttp} from '../../hooks/http.hook';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { heroesFetchingError, addHero } from '../heroesList/heroesSlice';

const HeroesAddForm = () => {

    const {filters} = useSelector(state => state.filters);

    const dispatch = useDispatch();

    const {request} = useHttp();

    const [name, setName] = useState('');
    const [descr, setDescr] = useState('');
    const [element, setElement] = useState('');
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        if (name.trim() === "" || descr.trim() === "" || element.trim() === "") {
            setError("Пожалуйста заполните все поля и выберите элемент");
            return;
        } else {
            const newHero = {
            "id": uuidv4(),
            "name": name,
            "description": descr,
            "element": element
            };
        
            try {
                await request("http://localhost:3001/heroes", 'POST', JSON.stringify(newHero));
                dispatch(addHero(newHero));
            } catch (error) {
                dispatch(heroesFetchingError());
            }
        
            setName('');
            setDescr('');
            setElement('');
            setError('');
        }
        
    }
      

    const filteredElements = filters.slice(1);

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={name}
                    onInput={(e) => setName(e.target.value)}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={descr}
                    onInput={(e) => setDescr(e.target.value)}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element}
                    onChange={(e) => setElement(e.target.value)}
                    >
                    <option >Я владею элементом...</option>
                    {
                        filteredElements.map(({label, element, id}) => {
                            return <option key={id} value={element}>{label}</option>
                        })
                    }
                </select>
            </div>

            {error && <div style={{'marginBottom': '10px'}} className='text-danger'>{error}</div>}
            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;