import {useHttp} from '../../hooks/http.hook';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { heroesFetched, heroesFetchingError } from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const {heroes} = useSelector(state => state);
    const dispatch = useDispatch();

    const {request, post} = useHttp();
    const [elements, setElements] = useState([]);

    const [name, setName] = useState('');
    const [descr, setDescr] = useState('');
    const [element, setElement] = useState('');
    const [error, setError] = useState("");

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => setElements(data))
            .catch((e) => console.log(e));
    }, []);

    const postHero = async () => {
        const heroInf = {
          "id": uuidv4(),
          "name": name,
          "description": descr,
          "element": element
        };
      
        try {
            await post("http://localhost:3001/heroes", heroInf);
                dispatch(heroesFetched([...heroes, heroInf]));
        } catch (error) {
                dispatch(heroesFetchingError());
        }
      
        setName('');
        setDescr('');
        setElement('');
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (name.trim() === "" || descr.trim() === "" || element.trim() === "") {
            setError("Пожалуйста заполните все поля и выберите элемент");
            return;
        } else {
            postHero(e);
            setError('');
        }
    }
      

    const filteredElements = elements.slice(1);

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