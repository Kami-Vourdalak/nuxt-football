import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import teams from '../../data/teams.json';


 export default class Repository {

    public static  db: Database<sqlite3.Database, sqlite3.Statement>;

    static async init(): Promise<void> {
        console.log('Initializing database');
        try {
            this.db = await open({
                filename: ':memory:',
                driver: sqlite3.Database
            });

            await this.db.run('CREATE TABLE teams (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, logo TEXT NOT NULL)');

            for (const team of teams) {
                await this.db.run(`INSERT INTO teams (name, logo) VALUES ("${team.name}", "${team.img}")`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    static async open(): Promise<Database<sqlite3.Database, sqlite3.Statement>> {
        try {
            return this.db;
        } catch (error) {
            throw error;
        }
    }
}
