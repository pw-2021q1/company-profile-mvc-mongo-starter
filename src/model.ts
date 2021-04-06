import * as fs from "fs"
import {config} from "../conf/config"


/**
 * Data model
 */
type Model = Profile[]

let model: Model = []

class Profile {
    id: number
    name: string
    birthyear: number
    career: string
    bio: string

    constructor(id: number, name: string, birthyear: number, 
        career: string, bio: string) {
            this.id = id
            this.name = name
            this.birthyear = birthyear
            this.career = career
            this.bio = bio
        }
}

/**
 * DAO
 */
 export class ProfileDAO {
     /**
      * Insert a new profile
      * @param profile the profile
      */
     static insert(profile: Profile) {
        model.push(profile)
     }

     /**
      * List all profiles
      */
     static listAll(): Profile[] {
         return model
     }

     /**
      * Find by profile using its id
      * @param id the profile id
      */
     static findById(id: number): Profile {
         for (const profile of model) {
             if (profile.id == id) {
                 return profile
             }
         }
         throw new Error("Profile not found")
     }

     static update(profile: Profile): boolean {
         // TODO: implement update
         return true
     }

     static delete(id: number): boolean {
         // TODO: implement delete
         return true
     }
 }

 /**
  * Load model from the file system
  */
 export function load() {
    try {
        console.log("Loading model from file system...")
        model = JSON.parse(fs.readFileSync(config["model-file"]).toString())
        console.log("Model loaded")
    } catch(err) {
        console.error("Failed to load model file")
        console.error((err as Error).stack)
    }
 }

 /**
  * Save model to the file system
  */
 export function save() {
     try {
        console.log("Saving model to the file system...")
        fs.writeFileSync(config["model-file"], JSON.stringify(model))
        console.log("Model saved")
     } catch(err) {
        console.error("Failed to save model file")
        console.error((err as Error).stack)
     }
 }