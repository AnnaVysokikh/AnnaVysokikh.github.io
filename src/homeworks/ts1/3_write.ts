/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

export type Category = {
  id: string;
  name: string;
  photo?: string;
};

export type Product = {
  id: string;
  name: string;
  photo: string;
  desc?: string;
  createdAt: string;
  oldPrice?: number;
  price: number;
  category: Category;
};

export type Operation = Cost | Profit;

export type Cost = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Cost';
};

export type Profit = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Profit';
};

export function getDescription(): string {
  const length: number = Math.floor(Math.random() * 100 + 100);
  let description = '';
  const characters = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    description += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return description;
}

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
export const createRandomProduct = (createdAt: string): Product => {
  const id = Math.random().toString(36).substring(7);
  const name = `Product ${id}`;
  const photo = `photo_${id}.jpg`;
  const desc = getDescription();
  const oldPrice = Math.floor(Math.random() * 100) + 100;
  const price = Number(`$${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 99)}`);
  const category: Category = {
    id: Math.random().toString(36).substring(7),
    name: `Category ${id}`,
    photo: `photoCategory_${id}.jpg`,
  };
  return { id, name, photo, desc, createdAt, oldPrice, price, category };
};

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
export const createRandomOperation = (createdAt: string): Operation => {
  const id = Math.random().toString(36).substring(7);
  const name = `Operation ${id}`;
  const desc = getDescription();
  const amount = Math.floor(Math.random() * 100) + 100;
  const category: Category = {
    id: Math.random().toString(36).substring(7),
    name: `Category ${id}`,
    photo: `photoCategory_${id}.jpg`,
  };
  const type = Math.random() < 0.5 ? 'Cost' : 'Profit';
  return { id, name, desc, createdAt, amount, category, type };
};


