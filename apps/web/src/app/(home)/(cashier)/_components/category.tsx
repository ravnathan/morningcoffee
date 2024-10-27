import CategoryTemplate from "./categorytemplate"

export default function Category() {

    const categoryMenus = [
        {category_url: '/images/all.png', category_name: 'All'},
        {category_url: '/images/coffee.png', category_name: 'Coffee'},
        {category_url: '/images/juice.png', category_name: 'Juice'},
        {category_url: '/images/milk.png', category_name: 'Milk Based'},
        {category_url: '/images/dessert.webp', category_name: 'Dessert'},
        {category_url: '/images/snacks.png', category_name: 'Snacks'},
        {category_url: '/images/meals.jpg', category_name: 'Meals'},

    ]
    return (
        <div>
            <div className="flex items-center justify-evenly pt-10 flex-wrap">
                {categoryMenus.map((cat, key) => (
                    <div key={key}>
                        <CategoryTemplate
                        category_name={cat.category_name}
                        category_url={cat.category_url}/>
                    </div>
                ))}
            </div>
        </div>
    )
}