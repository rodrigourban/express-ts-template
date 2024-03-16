import { DataSource, EntityTarget, ObjectLiteral, Repository} from 'typeorm'

let typeORMDB: DataSource;

export function useTypeORM (entity: EntityTarget<ObjectLiteral>): Repository<ObjectLiteral> {
    if(!typeORMDB) {
        throw new Error('TypeORM has not been initialized!')
    }

    return typeORMDB.getRepository(entity)
}

async function typeORMConnect():Promise<void> {
    const dataSource = new DataSource({
        type: 'postgres',
        url: process.env.PGSQL_URI,
        entities: [`${__dirname}/entity/*.entity.js`,`${__dirname}/entity/*.entity.ts`], // entry point for your entitys files,
        synchronize: true, // automatically migrate, not recommended in prod.
    })

    typeORMDB = await dataSource.initialize();
}

export default typeORMConnect;