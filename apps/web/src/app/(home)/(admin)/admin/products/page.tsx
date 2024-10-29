import { boong } from "@/libs/fonts";
import ProductList from "./_components/productlist";
import CreateProductCat from "./_components/createprodcat";

export default function Products() {
    return (
        <div className="p-10">
            <h1 className={`text-7xl ${boong.className} text-coffee pb-10`}>Products</h1>
            <div>
                <CreateProductCat/>
                <ProductList/>
            </div>
        </div>
    )
}