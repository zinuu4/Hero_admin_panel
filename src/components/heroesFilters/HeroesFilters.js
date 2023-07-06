import {useHttp} from '../../hooks/http.hook';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { visibleData } from '../../actions';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {heroes} = useSelector(state => state);
    const dispatch = useDispatch();

    const {request} = useHttp();

    const [filters, setFilters] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('');

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => setFilters(data))
            .catch((e) => console.log(e));
    }, []);

    useEffect(() => {
        const data = filterPost(heroes, selectedFilter);
        dispatch(visibleData(data));
    }, [heroes, selectedFilter]);

    const filterPost = (items, filter) => {
        switch (filter) {
            case 'fire':
                return items.filter(item => item.element === 'fire')
            case 'water':
                return items.filter(item => item.element === 'water')
            case 'wind':
                return items.filter(item => item.element === 'wind')
            case 'earth':
                return items.filter(item => item.element === 'earth')
            default:
                return items
        }
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {
                        filters.map(({element, label, id}) => {
                            let elementClassName;
                            let activeClass = selectedFilter === element ? ' active' : '';
                            switch (element) {
                                case 'all':
                                    elementClassName = 'btn btn-outline-dark';
                                    break;
                                case 'fire':
                                    elementClassName = 'btn btn-danger';
                                    break;
                                case 'water':
                                    elementClassName = 'btn btn-primary';
                                    break;
                                case 'wind':
                                    elementClassName = 'btn btn-success';
                                    break;
                                case 'earth':
                                    elementClassName = 'btn btn-secondary';
                                    break;
                            }
                            return <button 
                                key={id} 
                                id={id}
                                onClick={() => {
                                    setSelectedFilter(element);
                                }} 
                                className={`${elementClassName} ${activeClass}`}
                                >{label}
                            </button>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;