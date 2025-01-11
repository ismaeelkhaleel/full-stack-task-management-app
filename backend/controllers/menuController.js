import Menu from '../models/Menu.js';  // Assuming Menu model is already created

// Get all menu items
export const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find({availability:true});
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getMyMenuItems = async (req, res) => {

    try {
        
      const items = await Menu.find({ createdBy: req.user._id }); // Fetch only items added by the logged-in user
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Add a new menu item
export const addMenuItem = async (req, res) => {
    const { name, category, price, availability } = req.body;

    try {
        if (!name || !category || !price || !availability) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        const newMenuItem = new Menu({
            name,
            category,
            price,
            availability: availability ?? 'true',
            createdBy: req.user._id,  // Ensure the menu item is tied to the authenticated user
        });

        await newMenuItem.save();

        res.status(201).json({ message: 'Menu item added successfully', menuItem: newMenuItem });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

// Update an existing menu item
export const updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { name, category, price, availability } = req.body;

    try {
        const menuItem = await Menu.findById(id);

        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        // Check if the authenticated user is the creator of the menu item
        if (menuItem.createdBy.toString() !== req.user._id) {
            return res.status(403).json({ message: 'Unauthorized to update this menu item' });
        }

        menuItem.name = name ?? menuItem.name;
        menuItem.category = category ?? menuItem.category;
        menuItem.price = price ?? menuItem.price;
        menuItem.availability = availability ?? menuItem.availability;

        await menuItem.save();

        res.status(200).json({ message: 'Menu item updated successfully', menuItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a menu item
export const deleteMenuItem = async (req, res) => {
    const { id } = req.params;

    try {
        const menuItem = await Menu.findById(id);

        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        // Check if the authenticated user is the creator of the menu item
        if (menuItem.createdBy.toString() !== req.user._id) {
            return res.status(403).json({ message: 'Unauthorized to delete this menu item' });
        }

        await Menu.findByIdAndDelete(id);

        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
