import { AppDataSource } from '../data-source';
import { pets } from '../entity/Pets.entity'; // Adjust the path as needed

export class PetsService {
  async getAllPets(): Promise<pets[]> {
    const finds = AppDataSource.manager.find(pets);
    return finds;

  }

  async createPet(petData: Partial<pets>): Promise<pets> {
    const newPet = await AppDataSource.manager.save(pets, petData); // pets tablosunu temsil eden repository'yi alın
    
    return newPet;
  }

  /*
  async getPetById(petId: number): Promise<pets | undefined> {
    // Implement logic to fetch a pet by its ID from the database
  }

  async createPet(petData: Partial<pets>): Promise<pets> {
    // Implement logic to create a new pet in the database
  }
  */
}