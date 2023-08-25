import "reflect-metadata"
import { DataSource } from "typeorm"
import { user } from "./entity/User.entity"
import { blocked_users } from "./entity/BlockedUser.entity"
import { followers } from "./entity/FollowerUser.entity"
import { followings } from "./entity/FollowingUser.entity"
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
    entities: [user, blocked_users, followers, followings, pets],
    migrations: [],
    subscribers: [],
})
