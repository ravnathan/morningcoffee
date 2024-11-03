'use client'

import ProductForm from "./_components/productform";
import AppWrapper from "./_components/productformwrapper";

export default function CreateProduct() {
    return (
        <div>
            <AppWrapper>
                <ProductForm/>
            </AppWrapper>
        </div>
    )
}