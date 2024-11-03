export const getCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}category`, {
        headers: {
            'Content-Type' : 'application/json'
        },
        method: 'GET'
    })
    
    return res.json()
}
