'use client'

import { useEffect, useState } from "react"
import { getCategories } from "@/libs/action/home"
import CategoryTemplate from "./CategoryTemplate";

export default function Category() {
    const [data, setData] = useState<any>(null);

    const fetchData = async() => {
        try {
            const dat = await getCategories();
            setData(dat);
        } catch (error) {
            console.log(error);   
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="flex items-center justify-evenly pt-10 flex-wrap">
                {data?.categories?.map((cat: any, key: number) => (
                    <div key={key}>
                        <CategoryTemplate
                            category_name={cat.name}
                            category_url={cat.image}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
