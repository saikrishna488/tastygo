"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { userAtom } from '@/states/global_states'
import toast from 'react-hot-toast'
import axios from 'axios'

const RestaurantInfo = () => {
    const [user] = useAtom(userAtom)
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress

    const [formData, setFormData] = useState<any>({
        name: '',
        description: '',
        image: null,
        menu: [],
        client_id: user._id,
        image_url: '', // Add image_url directly for preview
    })

    // Fetch restaurant data on load
    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const res = await axios.get(
                    process.env.NEXT_PUBLIC_BACKEND_URL + '/restaurant/partner/' + user?._id
                );

                const data = res.data;

                if (data.res) {
                    setFormData({
                        ...data.restaurant,
                        image_url: data.restaurant.image_url, // Store the image URL for preview
                    });

                    console.log(data.restaurant.image_url)
                }

            } catch (err) {
                console.log(err);
            }
        };

        fetchRestaurant();
    }, []);

    //checking userloggedin
    if(!user?.name){
        return null
    }

    // Handle form data changes
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle menu checkbox change
    const handleMenuChange = (e: any) => {
        const { value, checked } = e.target;
        let updatedMenu = [...formData.menu];

        if (checked) {
            if (!updatedMenu.includes(value)) {
                updatedMenu.push(value);
            }
        } else {
            updatedMenu = updatedMenu.filter((item) => item !== value);
        }

        setFormData({ ...formData, menu: updatedMenu });
    };

    // Handle form submission
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setUploading(true); // Set uploading to true when the form is submitted
        setUploadProgress(0); // Reset the progress bar

        try {
            let updatedFormData = { ...formData };

            // If there's an image, convert it to Base64
            if (formData.image) {
                const reader = new FileReader();
                reader.readAsDataURL(formData.image);

                reader.onloadend = async () => {
                    updatedFormData = {
                        ...updatedFormData,
                        image: reader.result, // Update the form data with Base64 image
                    };

                    // Simulate a delay and update the progress bar (for demonstration purposes)
                    for (let i = 0; i <= 100; i++) {
                        setTimeout(() => {
                            setUploadProgress(i);
                        }, i * 50); // Update progress bar every 50ms
                    }

                    // Send the form data to the backend
                    const res = await axios.post(
                        process.env.NEXT_PUBLIC_BACKEND_URL + '/restaurant',
                        updatedFormData,
                        {
                            headers: {
                                "Content-Type": "application/json", // Send as JSON (Base64 image)
                            },
                            onUploadProgress: (progressEvent:any) => {
                                const progress = Math.round(
                                    (progressEvent.loaded * 100) / progressEvent.total
                                );
                                setUploadProgress(progress); // Update progress bar
                            }
                        }
                    );

                    const data = res.data;

                    if (data.res) {
                        toast.success("Updated!");
                    }

                    setUploading(false); // Set uploading to false once the request is complete
                    setUploadProgress(100); // Ensure progress bar reaches 100%
                };
            } else {
                // Submit form without image (if no new image uploaded)
                const res = await axios.post(
                    process.env.NEXT_PUBLIC_BACKEND_URL + '/restaurant',
                    updatedFormData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = res.data;

                if (data.res) {
                    toast.success("Updated!");
                }

                setUploading(false); // Set uploading to false once the request is complete
                setUploadProgress(100); // Ensure progress bar reaches 100%
            }
        } catch (err) {
            toast.error("Client Error");
            setUploading(false); // Set uploading to false if there's an error
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="mb-6">
                <Link href="/partners" className="text-red-600 hover:underline text-sm">
                    &larr; Back to Dashboard
                </Link>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-6">Restaurant Information</h2>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md border">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={uploading} // Disable fields while uploading
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        disabled={uploading} // Disable fields while uploading
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Restaurant Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e: any) => setFormData({ ...formData, image: e.target.files[0] })}
                        disabled={uploading} // Disable fields while uploading
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    />
                    {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                    {formData?.image && !uploading && (
                        <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Preview"
                            className="mt-2 w-48 rounded-lg shadow"
                        />
                    )}
                    {formData?.image_url && !formData.image && !uploading && (
                        <img
                            src={formData.image_url}
                            alt="Restaurant"
                            className="mt-2 w-48 rounded-lg shadow"
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Menu (Food Types)</label>
                    <div className="flex gap-6">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value="veg"
                                checked={formData.menu.includes('veg')}
                                onChange={handleMenuChange}
                                disabled={uploading} // Disable fields while uploading
                                className="form-checkbox text-red-600"
                            />
                            <span className="ml-2 text-sm text-gray-700">Veg</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value="nonveg"
                                checked={formData.menu.includes('nonveg')}
                                onChange={handleMenuChange}
                                disabled={uploading} // Disable fields while uploading
                                className="form-checkbox text-red-600"
                            />
                            <span className="ml-2 text-sm text-gray-700">Non-Veg</span>
                        </label>
                    </div>
                </div>

                {/* Loading bar */}
                {uploading && (
                    <div className="mt-4 h-2 bg-gray-200 rounded-full">
                        <div
                            className="h-full bg-red-600 rounded-full"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md"
                    disabled={uploading} // Disable button while uploading
                >
                    {uploading ? 'Saving...' : 'Save Information'}
                </button>
            </form>
        </div>
    );
};

export default RestaurantInfo;
