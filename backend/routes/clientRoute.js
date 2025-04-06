import express from 'express'
const router = express.Router()
import restaurantModel from '../models/restaurantModel.js'
import itemModel from '../models/itemModel.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cloudinary from '../config/cloudinary.js'

dotenv.config()


router.post('/restaurant', async (req, res) => {
    try {
        const { name, description, client_id, image, menu } = req.body

        console.log(process.env.CLOUDINARY_API_SECRET)

        if (!name || !description || !client_id || !menu) {
            return res.status(400).json({
                res: false,
                msg: "Incomplete request"
            })
        }

        let uploadedImage = null

        // Upload image to Cloudinary
        if (image) {
            uploadedImage = await cloudinary.uploader.upload(image, {
                folder: 'restaurants'
            })
        }


        const restaurant = await restaurantModel.findOne({ client_id })

        if (restaurant) {
            // Update existing restaurant
            restaurant.name = name
            restaurant.description = description
            restaurant.menu = menu
            restaurant.image_url = image ? uploadedImage.secure_url : restaurant.image_url
            await restaurant.save()

            return res.status(200).json({
                res: true,
                msg: "Restaurant updated successfully",
                restaurant
            })
        }

        // Create new restaurant
        const newRestaurant = await restaurantModel.create({
            name,
            description,
            client_id,
            menu,
            image_url: image && uploadedImage.secure_url
        })

        return res.status(201).json({
            res: true,
            msg: "Restaurant added successfully",
            restaurant: newRestaurant
        })

    } catch (err) {
        console.error('Error:', err)
        return res.status(500).json({
            res: false,
            msg: "Server error"
        })
    }
})

router.get('/restaurant/partner/:id', async (req, res) => {

    try {

        const { id } = req.params;

        if (!id) {
            return res.status(401).json({
                res: false,
                msg: "incomplete data"
            })
        }

        const restaurant = await restaurantModel.findOne({client_id:id})
        if (!restaurant) {
            return res.status(404).json({
                res: false,
                msg: "Not found"
            })
        }

        return res.status(200).json({
            res: true,
            msg: "req successful",
            restaurant,
        })

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            res: false,
            msg: "server error"
        })
    }
})

// for users
router.get('/restaurant/:id', async (req, res) => {

    try {

        const { id } = req.params;

        if (!id) {
            return res.status(401).json({
                res: false,
                msg: "incomplete data"
            })
        }

        const restaurant = await restaurantModel.findById(id)
        if (!restaurant) {
            return res.status(404).json({
                res: false,
                msg: "Not found"
            })
        }

        const items = await itemModel.find({client_id:restaurant.client_id})

        return res.status(200).json({
            res: true,
            msg: "req successful",
            restaurant,
            items
        })

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            res: false,
            msg: "server error"
        })
    }
})


router.post('/item', async (req, res) => {

    try {

        const { name, client_id, price, description, image } = req.body

        if (!name || !client_id || !price || !description || !image) {
            return res.status(401).json({
                res: false,
                msg: "Incomplete request"
            })
        }

        const restaurant = await restaurantModel.findOne({client_id})

        let uploadedImage = null

        // Upload image to Cloudinary
        if (image) {
            uploadedImage = await cloudinary.uploader.upload(image, {
                folder: 'items'
            })
        }

        const item = await itemModel.create({ name, client_id, price, description, image_url : image && uploadedImage.secure_url, restaurant_name: restaurant.name })

        return res.status(200).json({
            res: true,
            msg: "Item added",
            item
        })

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            res: false,
            msg: "server error"
        })
    }
})

//delete item
router.delete("/item/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                res: false,
                msg: "Item ID is required"
            });
        }

        const item = await itemModel.findByIdAndDelete(id);

        if (!item) {
            return res.status(404).json({
                res: false,
                msg: "Item not found"
            });
        }

        return res.status(200).json({
            res: true,
            msg: "Item deleted successfully",
            deletedItem: item
        });

    } catch (err) {
        console.error("Delete Error:", err);
        return res.status(500).json({
            res: false,
            msg: "Server error while deleting item"
        });
    }
});


//get all items
router.get('/items', async (req, res) => {
    try {

        const lastId = req.query.lastId && mongoose.Types.ObjectId.isValid(req.query.lastId)
            ? new mongoose.Types.ObjectId(req.query.lastId)
            : null;
        const filter = lastId ? { _id: { $gt: lastId } } : {}
        const lastDocument = await itemModel.findOne().sort({ _id: -1 });


        if (lastDocument._id.equals(lastId)) {
            return res.status(200).json({
                res: false,
                msg: "Empty stack",
            })
        }
        const items = await itemModel.find(filter).sort({ _id: 1 }).limit(10)


        return res.status(200).json({
            res: true,
            msg: "req ok",
            items,
            lastId: items.length ? items[items.length - 1]._id : null
        })

    }
    catch (err) {
        console.log(err)

        return res.status(500).json({
            res: false,
            msg: "server error"
        })
    }
})

//get user specific items
router.post('/items', async (req, res) => {
    try {

        const { client_id } = req.body


        if (!client_id) {
            return res.status(401).json({
                res: false,
                msg: "incomplete request",
            })
        }

        const items = await itemModel.find({ client_id })


        return res.status(200).json({
            res: true,
            msg: "req ok",
            items,
        })

    }
    catch (err) {
        console.log(err)

        return res.status(500).json({
            res: false,
            msg: "server error"
        })
    }
})

// get specific item
router.get("/item/:id", async (req, res) => {
    try {

        const { id } = req.params

        if (!id) {
            return res.status(401).json({
                res: false,
                msg: "incomplete request"
            })
        }

        const item = await itemModel.findById(id)

        if (!item) {
            return res.status(401).json({
                res: false,
                msg: "Item not found"
            })
        }

        return res.status(200).json({
            res: true,
            msg: "item found",
            item
        })

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            res: false,
            msg: "server error"
        })
    }
})

router.get("/restaurants", async (req, res) => {
    try {

        const restaurants = await restaurantModel.find({}).limit(20);

        return res.status(200).json({
            res: true,
            msg: "req successful",
            restaurants
        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            res: false,
            msg: "server error"
        })
    }
})

router.get("/dishes/:dish", async (req, res) => {

    try {

        const { dish } = req.params;

        if (!dish) {
            return res.status(401).json({
                res: false,
                msg: "dish not found"
            })
        }

        const dishes = await itemModel.find({ name: {$regex: dish, $options: 'i'} })

        return res.status(200).json({
            res: true,
            msg: "req successful",
            dishes
        })


    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            res: false,
            msg: "server error"
        })
    }
})


export default router;