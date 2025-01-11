import Order from '../models/Order.js';
import Menu from '../models/Menu.js';

export const placeOrder = async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Items array is required' });
    }

    try {
        let totalAmount = 0;

        for (const item of items) {
            const menuItem = await Menu.findById(item.menuItemId);

            if (!menuItem) {
                return res.status(404).json({ message: `Menu item not found ${item.menuItemId}` });
            }

            if (!menuItem.availability) {
                return res.status(400).json({ message: `Menu item not available: ${menuItem.name}` });
            }

            totalAmount += menuItem.price * (item.quantity || 1);
        }

        const newOrder = new Order({
            userId: req.user._id,  // Ensure _id is available here
            items,
            totalAmount,
            status: 'Pending',
        });

        await newOrder.save();

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getUserOrders = async (req, res) => {

    try {

        const orders = await Order.find({ userId: req.user._id }).populate('items.menuItemId', 'name price');

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};