import Input from "./Input"
import Button from "./Button"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Table = () => {

    // Define all the states
    const [isLoading, setIsLoading] = useState(false);
    const [texts, setTexts] = useState([]);
    const [error, setError] = useState('');
    const [data, setData] = useState({
        email: '',
        text: ''
    })

    // Define variables
    const APP_URL = 'http://localhost:8000'

    // Get all texts
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${APP_URL}/api/texts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setTexts(data);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.email !== '' && data.text !== '') {
            setIsLoading(true)
            await fetch(`${APP_URL}/api/texts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(res => res.json()).then(data => {
                setTexts(texts => [...texts, data])
                setData({
                    email: '',
                    text: ''
                })
            })
            setIsLoading(false)
        }
    }

    // Handle delete
    const handleDelete = async (id) => {
        setIsLoading(true)
        try {
            await fetch(`${APP_URL}/api/texts/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => setTexts(texts.filter(text => text.id !== id)))
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    }

    // Run fetchData function on component mount
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <form className="flex gap-3 justify-end" onSubmit={handleSubmit}>
                <Input className={'px-3 py-2 border rounded-lg'} type={'email'} placeholder={'Email'} value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                <Input className={'px-3 py-2 border rounded-lg'} type={'text'} placeholder={'Text'} value={data.text} onChange={(e) => setData({ ...data, text: e.target.value })} />
                <Button className={'px-3 py-2 border rounded-lg bg-black text-white font-bold disabled:opacity-50'} type={'submit'} disabled={isLoading}>Submit</Button>
            </form>

            <table className="border w-full mt-5">
                <thead>
                    <tr className="bg-slate-100">
                        <th className="border p-3 w-[10%]">ID</th>
                        <th className="border p-3 w-[70%]">Text</th>
                        <th className="border p-3 w-[20%]">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={3} className="text-center p-3">Loading...</td>
                        </tr>
                    ) : (
                        texts.map((text, index) => (
                            <tr key={index}>
                                <td className="border p-3">{text.id}</td>
                                <td className="border p-3">{text.text}</td>
                                <td className="border p-3 flex gap-2">
                                    <Link to={`/edit/${text.id}`}>
                                        <Button className={'px-3 py-2 border rounded-lg bg-blue-500 text-white font-bold disabled:opacity-50'} type={'button'} disabled={isLoading}>Edit</Button>
                                    </Link>
                                    <Button className={'px-3 py-2 border rounded-lg bg-red-500 text-white font-bold disabled:opacity-50'} type={'button'} onClick={() => handleDelete(text.id)} disabled={isLoading}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    )}
                    {!isLoading && texts.length === 0 && <tr><td colSpan={3} className="text-center p-3">No data</td></tr>}
                </tbody>
            </table>
        </>
    )
}
export default Table