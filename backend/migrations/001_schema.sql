-- Create tm_ingredient table
CREATE TABLE IF NOT EXISTS tm_ingredient (
    uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    cause_alergy BOOLEAN DEFAULT FALSE,
    type INTEGER DEFAULT 0, -- 0: none, 1: veggie, 2: vegan
    status INTEGER DEFAULT 1, -- 0: inactive, 1: active
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Create unique index on name (excluding soft deleted records)
CREATE UNIQUE INDEX IF NOT EXISTS idx_tm_ingredient_name_unique
ON tm_ingredient (name)
WHERE deleted_at IS NULL;

-- Create tm_item table
CREATE TABLE IF NOT EXISTS tm_item (
    uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status INTEGER DEFAULT 1, -- 0: inactive, 1: active
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Create unique index on name (excluding soft deleted records)
CREATE UNIQUE INDEX IF NOT EXISTS idx_tm_item_name_unique
ON tm_item (name)
WHERE deleted_at IS NULL;

-- Create tm_item_ingredient junction table
CREATE TABLE IF NOT EXISTS tm_item_ingredient (
    uuid_item UUID NOT NULL,
    uuid_ingredient UUID NOT NULL,
    PRIMARY KEY (uuid_item, uuid_ingredient),
    FOREIGN KEY (uuid_item) REFERENCES tm_item(uuid) ON DELETE CASCADE,
    FOREIGN KEY (uuid_ingredient) REFERENCES tm_ingredient(uuid) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tm_item_ingredient_item ON tm_item_ingredient(uuid_item);
CREATE INDEX IF NOT EXISTS idx_tm_item_ingredient_ingredient ON tm_item_ingredient(uuid_ingredient);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_tm_ingredient_updated_at BEFORE UPDATE ON tm_ingredient
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tm_item_updated_at BEFORE UPDATE ON tm_item
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

