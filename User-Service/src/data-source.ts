import "reflect-metadata"
import { DataSource } from "typeorm"
import { users } from "./entity/User.entity"
import { blocked_users } from "./entity/BlockedUser.entity"
import { followers } from "./entity/FollowerUser.entity"
import { followings } from "./entity/FollowingUser.entity"
import { profile_report } from "./entity/ProfileReport"
import { pets } from "./entity/Pets.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "frknmydn",
    password: "veryberrysecret",
    database: "ProfileDB",
    synchronize: true,
    logging: false,
    entities: [users, blocked_users, followers, followings, pets, profile_report],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
    
   
    
})
