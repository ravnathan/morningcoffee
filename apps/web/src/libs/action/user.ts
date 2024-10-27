import { UserLogin } from "@/types/user";

export const userLogin = async (data: UserLogin) => {
    const res = await fetch('http://localhost:8000/api/auth/login', {
        headers: {
            'Content-Type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })

    const response = await res.json()
    return { result: response, ok: res.ok}
}