import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig : TypeOrmModuleOptions =  {
    type :  "postgres",
    host : process.env.DB_HOST || 'localhost',
    port : 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS ||'0000',
    database :  process.env.DB_NAME || 'nestdb',
    entities : [__dirname + '/../**/*entity.{js,ts}'],
    synchronize : true,
    
}