import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Book } from "../components/book";
import { Meal } from "../components/meal";
import { BookType, MealType } from "../constant/type";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [data, setData] = useState({ books: [], meals: [] } as {
    books: BookType[];
    meals: MealType[];
  });

  const fetchData = useCallback(async () => {
    const result = await (
      await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/`)
    ).json();
    setData(result);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {data.books.map((book) => (
        <Book book={book} key={book.id} />
      ))}
      {data.meals.map((meal) => (
        <Meal meal={meal} key={meal.id} />
      ))}
    </div>
  );
};

export default Home;
