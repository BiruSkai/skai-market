CREATE TABLE userdata (
	id int primary key,
        username varchar(15) not null ,
        password varchar not null,
        email varchar(30) not null,
        user_role varchar(10) not null,
        status varchar(10) not null,
        created_on timestamp not null default now()
        address varchar(25) not null,
        city varchar(15) not null,
        updated_on timestamp
);

CREATE TABLE products (
        id serial primary key,
        img_url varchar not null,
        title varchar(15) not null,
        category varchar(15) not null,
        description varchar(50) not null,
        quantity int not null,
        price decimal(10,2) not null,
        status varchar(15) not null
);

CREATE TABLE carts (
        id serial primary key,
        user_id int references userdata(id)
);

CREATE TABLE cart_products (
        cart_id int references carts(id),
        product_id int references products(id),
        quantity int not null default 1,
        primary key (cart_id, product_id)
);

CREATE TABLE orders (
        id serial primary key,
        user_id int references userdata(id),
        status varchar(15) not null,
        total_cost decimal(10,2) not null,
        created_on timestamp default now()
);

CREATE TABLE order_products (
        order_id int references orders(id),
        product_id int references products(id),
        quantity int default 1,
        price decimal(10,2),
        primary key (order_id, product_id)
);

CREATE TABLE main_advertisements (
        id serial primary key,
        img_url varchar not null,
        title varchar(20) not null,
        description varchar(50) not null,
        created_on timestamp default now(),
        updated_on timestamp,
        user_id varchar(3) not null
);

-- Function, Trigger
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_on = now();
RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_modified_time BEFORE UPDATE ON main_advertisements FOR EACH ROW EXECUTE PROCEDURE update_modified_column();