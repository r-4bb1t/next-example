import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { Book } from "../components/book";
import { Meal } from "../components/meal";
import { BookType, MealType } from "../constants/type";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [data, setData] = useState({ books: [], meals: [] } as {
    books: BookType[];
    meals: MealType[];
  });

  const [type, setType] = useState("book");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [authorOrRestaurant, setAuthorOrRestaurant] = useState("");

  const fetchData = useCallback(async () => {
    const result = await (
      await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/`)
    ).json();
    setData(result);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const body =
      type === "book"
        ? {
            type,
            name,
            price,
            author: authorOrRestaurant,
          }
        : {
            type,
            name,
            price,
            restaurant: authorOrRestaurant,
          };
    const result = await (
      await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/new`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    console.log(result);
  };

  return (
    <div className={styles.container}>
      {data.books.map((book) => (
        <Book book={book} key={book.id} />
      ))}
      {data.meals.map((meal) => (
        <Meal meal={meal} key={meal.id} />
      ))}

      <div className={styles.formbox}>
        <div>추가하기</div>
        <label className={styles.label}>
          종류
          <select
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="book">책</option>
            <option value="meal">음식</option>
          </select>
        </label>
        <label className={styles.label}>
          제목
          <input
            placeholder="제목"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <label className={styles.label}>
          가격
          <input
            placeholder="가격"
            type="number"
            onChange={(e) => {
              setPrice(parseInt(e.target.value));
            }}
          />
        </label>
        {type === "book" ? (
          <label className={styles.label}>
            작가
            <input
              placeholder="작가"
              onChange={(e) => {
                setAuthorOrRestaurant(e.target.value);
              }}
            />
          </label>
        ) : (
          <label className={styles.label}>
            식당
            <input
              placeholder="식당"
              onChange={(e) => {
                setAuthorOrRestaurant(e.target.value);
              }}
            />
          </label>
        )}
        <button onClick={() => handleSubmit()}>추가하기</button>
      </div>
    </div>
  );
};

export default Home;
