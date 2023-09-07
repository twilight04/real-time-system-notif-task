import Button from "../components/Button"
import { useState, useEffect } from "react"
import Pusher from "pusher-js"
import Navbar from "../components/Navbar"
import Table from "../components/Table"
import Input from "../components/Input"
import { Outlet } from "react-router-dom"

const RootLayout = () => {

    // Define all states
    const [isNotifOpen, setIsNotifOpen] = useState(false)
    const [notif, setNotif] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [errors, setErrors] = useState({
        fetchNotifError: false,
        readNotifError: false,
        deleteSingleNotifError: false,
        deleteAllNotifError: false
    })

    // Get all notifications
    const fetchNotif = async () => {
        await fetch(`${import.meta.env.VITE_SERVER_URL}/api/notifications`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json()).then(data => {
            setNotif(data)
            setUnreadCount(data.filter(item => !item.is_read).length)
        }).catch(error => {
            setErrors({
                ...errors,
                fetchNotifError: true
            })
        });
    }

    // Read all notifications
    const readNotif = async () => {
        await fetch(`${import.meta.env.VITE_SERVER_URL}/api/notifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json()).then(data => {
            fetchNotif()
        }).catch(error => {
            setErrors({
                ...errors,
                readNotifError: true
            })
        })
    }

    // Delete all notifications
    const deleteAllNotif = async () => {
        await fetch(`${import.meta.env.VITE_SERVER_URL}/api/notifications/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(data => {
            setNotif([])
        }).catch(error => {
            setErrors({
                ...errors,
                deleteAllNotifError: true
            })
        })
    }

    // Delete single notification
    const deleteSingleNotif = async (id) => {
        await fetch(`${import.meta.env.VITE_SERVER_URL}/api/notifications/delete/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(data => {
            setNotif(notif.filter(item => item.id !== id))
        }).catch(error => {
            setErrors({
                ...errors,
                deleteSingleNotifError: true
            })
        })
    }

    // Toggle notification
    const toggleNotif = () => {
        setIsNotifOpen(prevState => !prevState)
        if (!isNotifOpen) {
            readNotif()
        }
    }

    // Run fetchNotif function with useEffect
    useEffect(() => {
        fetchNotif()
    }, [])

    // Initialize Pusher
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
        cluster: 'ap1'
    })

    // Bind Pusher
    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function (data) {
        if (data.status === 'ok') {
            fetchNotif()
        }
    })

    return (
        <>
            <header>
                <Navbar className={'p-5 bg-black text-white flex'}>
                    <div className='relative inline-block text-left ms-auto'>
                        <Button className={'inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold'} type={'button'} onClick={() => toggleNotif()}>
                            {unreadCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ms-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                        </Button>
                        {isNotifOpen && (
                            <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-black">
                                <ul className="text-left max-h-[300px] overflow-auto">
                                    {notif.length === 0 && (
                                        <li className="font-normal border-b p-3 text-center">No notifications</li>
                                    )}
                                    {notif.map(item => (
                                        <li key={item.id} className="font-normal border-b p-3" style={{ wordWrap: 'break-word' }}>
                                            <p>{item.action}</p>
                                            <div className="flex">
                                                <Button className={'font-bold text-red-500 text-sm ms-auto'} type={'button'} onClick={() => deleteSingleNotif(item.id)}>Delete</Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                {notif.length > 0 && (
                                    <li className="font-normal border-b p-3 flex">
                                        <Button className={'font-bold text-red-500 text-sm mx-auto'} type={'button'} onClick={() => deleteAllNotif()}>Clear all notifications</Button>
                                    </li>
                                )}
                            </div>
                        )}
                    </div>
                </Navbar>
            </header>
            <main className="max-w-7xl mx-auto p-3">
                <Outlet />
            </main>
        </>
    )
}
export default RootLayout