import Input from "./components/Input"
import Button from "./components/Button"
import { useState, useEffect } from "react"
import { Link, useNavigate, useLoaderData } from "react-router-dom"

export async function loader({ params }) {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/texts/${params.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return { data: data }
    } catch (error) {
        return { data: error.message }
    }
}

const EditPage = () => {

    const { data } = useLoaderData()

    const [text, setText] = useState(data.text)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (text !== '') {
            setIsLoading(true)
            await fetch(`${import.meta.env.VITE_SERVER_URL}/api/texts/${data.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text })
            }).then(res => res.json()).then(data => {
                navigate('/')
            })
            setIsLoading(false)
        }
    }

    return (
        <form className="flex p-2 flex-col items-center gap-2" onSubmit={handleSubmit}>
            <Input type={"text"} placeholder={"Text"} value={text} onChange={e => setText(e.target.value)} className={'w-full border px-3 py-2 rounded-lg'} />
            <div className="flex gap-2">
                <Link to={"/"}>
                    <Button type={"button"} className={'px-3 py-2 border rounded-lg font-bold'}>Cancel</Button>
                </Link>
                <Button type={"submit"} className={'px-3 py-2 border rounded-lg bg-black text-white font-bold disabled:opacity-50'} disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update"}
                </Button>
            </div>
        </form>
    )
}
export default EditPage