import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { visibleData } from '../../actions/heroes';
import { fetchFilters, chooseActiveFilter } from '../../actions/filters';

import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {heroes} = useSelector(state => state.heroes);
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();

    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request));
    }, []);

    useEffect(() => {
        const data = filterPost(heroes, activeFilter);
        dispatch(visibleData(data));
        console.log('render');
    }, [heroes, activeFilter]);

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

    if (filtersLoadingStatus === 'loading') {
        return <Spinner/>
    } else if (filtersLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({element, label, id, className}) => {
            const activeClass = element === activeFilter ? 'active' : '';
            const elementClassName = `btn ${activeClass} ${className}`;
            return <button 
                key={id} 
                onClick={() => {dispatch(chooseActiveFilter(element))}}
                className={elementClassName}
                >{label}
            </button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;