import {useHttp} from '../../hooks/http.hook';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroesLoadingStatus, filteredHeroes} = useSelector(state => state);
    const dispatch = useDispatch();

    const {request, onDelete} = useHttp();

    const [id, setId] = useState('');

    useEffect(() => {
        const deleteHero = async () => {
            if (id.length > 2) {
                try {
                    await onDelete(`http://localhost:3001/heroes/${id}`);
                        // dispatch(heroesFetching());
                    const data = await request("http://localhost:3001/heroes");
                        dispatch(heroesFetched(data));
                } catch (error) {
                        dispatch(heroesFetchingError());
                }
            }
        }

        deleteHero();
    }, [id])

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem setId={setId} id={id} key={id} {...props}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;