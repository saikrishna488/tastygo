"use client"
import { userAtom } from "@/states/global_states"
import axios from "axios"
import { useAtom } from "jotai"
import { useEffect } from "react"
import toast from "react-hot-toast"

export default function Render() {
    const [user, setUser] = useAtom<any>(userAtom)


    const render = async () => {
        try {

            const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/jwt',{
                withCredentials : true
            })
            const data = res.data

            if (data.res) {
                toast.success("Welcome " + data.user.name)
                setUser(data.user)
            }

        }
        catch (err) {
            console.log(err)
            toast("Login to Order")
        }
    }

    useEffect(() => {

        if(!user.name){
            render()
        }
        
    },[])

    return null
}