import { useState } from "react";

function App() {
  const [data, setData] = useState([
    {
      type: "Fruit",
      name: "Apple",
    },
    {
      type: "Vegetable",
      name: "Broccoli",
    },
    {
      type: "Vegetable",
      name: "Mushroom",
    },
    {
      type: "Fruit",
      name: "Banana",
    },
    {
      type: "Vegetable",
      name: "Tomato",
    },
    {
      type: "Fruit",
      name: "Orange",
    },
    {
      type: "Fruit",
      name: "Mango",
    },
    {
      type: "Fruit",
      name: "Pineapple",
    },
    {
      type: "Vegetable",
      name: "Cucumber",
    },
    {
      type: "Fruit",
      name: "Watermelon",
    },
    {
      type: "Vegetable",
      name: "Carrot",
    },
  ]);

  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);

  const handleClick = (item) => {
    // delete from data
    setData((prevData) => prevData.filter((i) => i !== item));

    // type
    const setTypeTarget = item.type === "Fruit" ? setFruits : setVegetables;

    // push to fruit or vegetable
    setTypeTarget((prevTypeTarget) => [...prevTypeTarget, item]);

    const timeoutId = setTimeout(() => {
      // delete in 5s
      setTypeTarget((prevTypeTarget) =>
        prevTypeTarget.filter((i) => i !== item),
      );
      // push to data

      setData((prevData) =>
        !prevData.includes(item) ? [...prevData, item] : prevData,
      );
    }, 5000);

    // Return a cleanup function to clear timeout when needed
    return () => clearTimeout(timeoutId);
  };

  const handleClickDelete = (item) => {
    const typeTarget = item.type === "Fruit" ? fruits : vegetables;
    const setTypeTarget = item.type === "Fruit" ? setFruits : setVegetables;

    setTypeTarget(
      typeTarget.filter((typeTarget) => item.name !== typeTarget.name),
    );

    setData((prevData) => [...prevData, item]);
  };

  return (
    <div className="w-9/12 mx-auto flex justify-center item-center gap-5 mt-10">
      <div className=" flex flex-col gap-3">
        {data.map((data) => (
          <button
            className="w-60 text-2xl py-3 border-2 hover:bg-gray-700"
            onClick={() => handleClick(data)}
            value={data.name}
            key={data.name}
          >
            {data.name}
          </button>
        ))}
      </div>
      <div className="border-2 w-60 h-[95vh] flex flex-col items-center">
        <p className="w-full py-3 text-center bg-gray-700">Fruit</p>
        {fruits.map((fruit) => (
          <button
            className="text-2xl py-3 border-2 my-2 w-[90%]"
            key={fruit.name}
            onClick={() => {
              handleClickDelete(fruit);
            }}
          >
            {fruit.name}
          </button>
        ))}
      </div>
      <div className="border-2 w-60 flex flex-col items-center">
        <p className="w-full py-3 text-center bg-gray-700">Vegetable</p>
        {vegetables.map((vegetable) => (
          <button
            className="text-2xl py-3 border-2 my-2 w-[90%]"
            key={vegetable.name}
            onClick={() => {
              handleClickDelete(vegetable);
            }}
          >
            {vegetable.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
