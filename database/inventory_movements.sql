
-- Enum for inventory movement type
CREATE TYPE inventory_movement_type AS ENUM (
    'stock_in',      -- Receiving new stock from a supplier
    'sale',            -- Stock sold through an order
    'return',          -- Stock returned by a customer
    'adjustment_in',   -- Manual increase (e.g., found stock)
    'adjustment_out'   -- Manual decrease (e.g., damaged goods)
);

-- Table to track every movement of stock for each product
CREATE TABLE inventory_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL,
    type inventory_movement_type NOT NULL,
    -- The change in quantity. Can be positive (stock_in) or negative (sale)
    quantity_change INTEGER NOT NULL,
    reason TEXT, -- Optional reason for manual adjustments
    related_order_id UUID, -- Optional link to an order for sales/returns
    movement_date TIMESTAMPTZ DEFAULT NOW(),

    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (related_order_id) REFERENCES orders(id) ON DELETE SET NULL
);

-- Trigger function to automatically update the products.stock column
CREATE OR REPLACE FUNCTION update_product_stock()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products
    SET stock = stock + NEW.quantity_change
    WHERE id = NEW.product_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attaching the trigger to the inventory_movements table
CREATE TRIGGER inventory_movements_after_insert
    AFTER INSERT ON inventory_movements
    FOR EACH ROW
    EXECUTE FUNCTION update_product_stock();

-- Sample data: Initial stock for the Classic T-Shirt
INSERT INTO inventory_movements (product_id, type, quantity_change, reason)
VALUES
    (
        (SELECT id FROM products WHERE name = 'Classic T-Shirt'),
        'stock_in',
        150,
        'Initial stock count'
    );
