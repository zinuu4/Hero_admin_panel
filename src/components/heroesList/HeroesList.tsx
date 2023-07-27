import React, { useMemo } from "react";
import { useAppSelector } from "../../hooks/useAppState";

import { useGetHeroesQuery } from "../../api/apiSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

import { Hero } from "../../types/types";

const HeroesList: React.FC = () => {
  const { data: heroes, isFetching, isLoading, isError } = useGetHeroesQuery();

  const { activeFilter } = useAppSelector((state) => state.filters);

  const filterPost = useMemo(() => {
    if (activeFilter === "all") {
      return heroes ?? [];
    } else {
      if (heroes) {
        return heroes.filter((item) => item.element === activeFilter);
      }
    }
  }, [heroes, activeFilter]);

  if (isFetching || isLoading) {
    return <Spinner />;
  } else if (isError) {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  function renderHeroesList(arr: Hero[]) {
    if (arr?.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, name, description, element }) => {
      return (
        <HeroesListItem
          id={id}
          key={id}
          name={name}
          description={description}
          element={element}
        />
      );
    });
  }

  const elements = filterPost && heroes ? renderHeroesList(filterPost) : null;

  return <ul>{elements}</ul>;
};

export default HeroesList;
