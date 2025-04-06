"use client"
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAtom } from 'jotai'
import { userAtom } from '@/states/global_states'

const ItemsPage = () => {
    const [items, setItems] = useState<any[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [user] = useAtom(userAtom);

    const [newItemData, setNewItemData] = useState<any>({
        name: '',
        description: '',
        price: 0,
        image: '',
        client_id: user?._id
    })

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () => {
        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/items', { client_id: user?._id })
            setItems(res.data.items)
        } catch (err) {
            toast.error('Error fetching items.')
        }
    }

    const handleDeleteItem = async (itemId: string) => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/item/${itemId}`)
            const data = res.data

            if (data.res) {
                toast.success('Item deleted successfully!')
                fetchItems()
            }


        } catch (err) {
            console.log(err)
            toast.error('Error deleting item.')
        }
    }

    const handleAddItem = async () => {
        try {

            if (newItemData.name.length > 25 || newItemData.description.length > 50 || newItemData.price > 1000) {
                if (newItemData.name.length > 25) {
                    toast.error("Name should be under 25 characters")
                }
                if (newItemData.description.length > 50) {
                    toast.error("Description should be under 50 characters")
                }
                if (newItemData.price > 1000) {
                    toast.error("Price should be under 1000rs")
                }
                return
            }
            setIsLoading(true)
            const res = await axios.post(
                process.env.NEXT_PUBLIC_BACKEND_URL + '/item',
                newItemData
            )

            const data = res.data

            if (data.res) {
                toast.success('Item added successfully!')
                fetchItems()
            }

            setNewItemData({
                name: '',
                description: '',
                price: 0,
                image: '',
                client_id: user?._id
            })
            setIsModalOpen(false)

        } catch (err) {
            toast.error('Error adding item.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setNewItemData({ ...newItemData, [name]: value })
    }

    const handleImageUpload = (e: any) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setNewItemData((prev: any) => ({ ...prev, image: reader.result as string }))
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <button
                onClick={() => window.history.back()}
                className="text-red-600 hover:underline text-sm sm:text-base"
            >
                ← Back
            </button>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-red-600">Food Items</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-md"
                >
                    Add New Item
                </button>
            </div>
            {
                items.length == 0 && (
                    <div>
                        <h4> Add your First Fodd item</h4>
                    </div>
                )
            }

            <div className="grid gap-6">
                {items.map((item) => (
                    <div key={item._id} className="bg-white rounded-xl shadow-md border p-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            <p className="text-md text-red-600 font-semibold mt-2">₹ {item.price}</p>
                            <div className="flex items-center mt-2">
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill={index < item.rating ? 'currentColor' : 'none'}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-4 h-4 text-yellow-400"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 17.27l4.95 3.73-1.26-5.45L21 9.24l-5.47-.47L12 2 8.47 8.77 3 9.24l3.31 6.31-1.26 5.45L12 17.27z"
                                        />
                                    </svg>
                                ))}
                            </div>
                            <button
                                onClick={() => handleDeleteItem(item._id)}
                                className="mt-4 bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-md"
                            >
                                Delete
                            </button>
                        </div>

                        <img
                            src={item.image_url || "https://via.placeholder.com/100"}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-md"
                        />
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-96 border-2 border-red-600">
                        <h3 className="text-xl font-semibold mb-4 text-red-600">Add New Item</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    maxLength={30}
                                    value={newItemData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:border-red-600"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={newItemData.description}
                                    maxLength={50}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:border-red-600"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={newItemData.price}
                                    onChange={handleChange}
                                    max={1000}
                                    className="w-full px-3 py-2 border rounded-md focus:border-red-600"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="w-full"
                                />
                                {newItemData.image && (
                                    <img className='w-12 h-12' src={(newItemData.image)} alt="" />
                                )}

                            </div>

                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleAddItem}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                        </svg>
                                    ) : null}
                                    {isLoading ? 'Adding...' : 'Add Item'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ItemsPage
