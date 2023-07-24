import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useGetHeroesQuery } from '../../api/apiSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {
        data: heroes,
        isFetching,
        isLoading,
        isError,
    } = useGetHeroesQuery();

    const { activeFilter } = useSelector(state => state.filters);

    const filterPost = useMemo(() => {
        if (activeFilter === 'all') {
            return heroes;
        } else {
            return heroes.filter(item => item.element === activeFilter);
        }
    }, [heroes, activeFilter]);

    if (isFetching || isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    function renderHeroesList(arr) {
        if (arr?.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem id={id} key={id} {...props}/>
        })
    }

    const elements = renderHeroesList(filterPost)

    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;