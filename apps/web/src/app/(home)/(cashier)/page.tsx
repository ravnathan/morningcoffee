import Category from "./_components/category";
import CoffeeTemplate from "./_components/coffeetemplate";
import Order from "./_components/order";
import SearchBar from "./_components/searchbar";


export default function Home() {
  return (
    <div className="bg-whiteish w-full h-screen">
      <Order />
      <div className="mr-[400px]">
        <SearchBar />
        <Category />
        <div className="pt-10 mx-10">
          <CoffeeTemplate />
        </div>
      </div>
    </div>
  );
}
