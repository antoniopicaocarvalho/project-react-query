import SingleItem from "./SingleItem";
import { useQuery } from "@tanstack/react-query";
import customFetch from "./utils";

const Items = ({ items }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customFetch.get("/");
      return data;
    },
  });
  // console.log(data);

  if (isLoading) {
    return <p style={{ marginTop: "2rem" }}>Loading...</p>;
  }
  if (isError) {
    return <p style={{ marginTop: "2rem" }}>There was an error.</p>;
  }

  return (
    <div className="items">
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;