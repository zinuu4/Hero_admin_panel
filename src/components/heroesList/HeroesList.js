import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroDeleted, fetchHeroes } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {filteredHeroes, heroesLoadingStatus} = useSelector(state => state.heroes);
    const dispatch = useDispatch();

    const {request} = useHttp();

    const [heroes, setHeroes] = useState([]);

    useEffect(() => {
        setHeroes(renderHeroesList(filteredHeroes));
    }, [filteredHeroes])

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err));
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    function renderHeroesList(arr) {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem id={id} key={id} onDelete={onDelete} {...props}/>
        })
    }

    return (
        <ul>
            {heroes}
        </ul>
    )
}

export default HeroesList;