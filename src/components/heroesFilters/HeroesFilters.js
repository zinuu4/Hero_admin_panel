import { useSelector, useDispatch } from 'react-redux';

import { chooseActiveFilter } from './filtersSlice';
import { useGetFiltersQuery } from '../../api/apiSlice';

import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
    const {
        data: filters,
        isLoading,
        isFetching,
        isError
    } = useGetFiltersQuery();
    const { activeFilter } = useSelector(state => state.filters);
    const dispatch = useDispatch();

    if (isLoading || isFetching) {
        return <Spinner/>
    } else if (isError) {
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
                onClick={() => {
                    if (activeFilter !== element) {
                      dispatch(chooseActiveFilter(element));
                    }
                }}                  
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