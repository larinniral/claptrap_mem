import { users, type User, type InsertUser, poems, type Poem, type InsertPoem, type UpdatePoem } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getPoems(): Promise<Poem[]>;
  getPoem(id: number): Promise<Poem | undefined>;
  createPoem(poem: InsertPoem): Promise<Poem>;
  updatePoem(id: number, poem: UpdatePoem): Promise<Poem | undefined>;
  deletePoem(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private poemsList: Map<number, Poem>;
  private userCurrentId: number;
  private poemCurrentId: number;

  constructor() {
    this.users = new Map();
    this.poemsList = new Map();
    this.userCurrentId = 1;
    this.poemCurrentId = 1;
    
    // Initialize with default poems
    const initialPoems = [
      `😆 
Если нет хлеба, ешьте 
пастилу. Хотел научиться 
data science, а сочинил 
мемы 2017 года – 
всё что осталось 
от поэзии.`,
      `💡 
Иду на вы, а выйдя, 
Погасил весь свет –
Иди и смотри теперь.`,
      `👀 
Цель перемещается, и 
Снайпер за ней –
Так, каждые сутки 
Проводится работа 
и контроль.`,
      `🤖  
Как протиснуться в 
будущее, если там 
уже теснятся наши
Цифровые двойники? 
Слишком долгая
III династия Ура.`,
      `🗽
Ожидание:
– Берите столько Свободы, 
сколько сможете проглотить

Реальность:
– Она утонула`,
      `🐌  
Прорыв рывок подскок 
Подход еще подход
Прыг – под землю 
Скок – на YandexCloud.
Лифты свалились в 
лестницу в небо. 
Дворники метут 
дождь.`,
      `***
Вот бог войны и земледелия,
Весенних дождей и наводнений 
Одерживает победу над шести-
головой овцой. Вот бог войны и 
земледелия, Весенних дождей и 
наводнений справляется с семи-
головым львом. Вот бог войны и 
земледелия, Весенних дождей и 
наводнений расправляется с 
почему-то добрым драконом.
Вот бог войны и земледелия,
Весенних дождей и наводнений 
Снова сражается со львом, ужасом 
богов – великие вещи творятся,
и мне как-то проще становится, 
что ли, после пашни, то есть, 
рабочего дня.`,
      `🫰 
Денег нет, но мы есть  
Нас есть им 

А, может быть, мы – 
Красивое?`
    ];
    
    initialPoems.forEach(content => {
      this.createPoem({ content });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Poem methods
  async getPoems(): Promise<Poem[]> {
    return Array.from(this.poemsList.values());
  }
  
  async getPoem(id: number): Promise<Poem | undefined> {
    return this.poemsList.get(id);
  }
  
  async createPoem(insertPoem: InsertPoem): Promise<Poem> {
    const id = this.poemCurrentId++;
    const poem: Poem = { ...insertPoem, id };
    this.poemsList.set(id, poem);
    return poem;
  }
  
  async updatePoem(id: number, updateData: UpdatePoem): Promise<Poem | undefined> {
    const poem = this.poemsList.get(id);
    if (!poem) return undefined;
    
    const updatedPoem = { ...poem, ...updateData };
    this.poemsList.set(id, updatedPoem);
    return updatedPoem;
  }
  
  async deletePoem(id: number): Promise<boolean> {
    return this.poemsList.delete(id);
  }
}

export const storage = new MemStorage();
