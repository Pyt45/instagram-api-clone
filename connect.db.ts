import pg from 'pg';

export class Connect {
    private pool: pg.Pool;
    private static instance: Connect;
    private constructor() {
        this.pool = new pg.Pool({
            user: 'postgres',
            host: '192.168.99.125',
            database: 'postgres',
            password: 'postgres',
            port: 5432,
        });
    }
    public static getInstance(): Connect {
        if (!Connect.instance)
            Connect.instance = new Connect();
        return Connect.instance;
    }
    public getPool(): pg.Pool {
        return this.pool;
    }
}