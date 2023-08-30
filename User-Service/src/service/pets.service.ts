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

  
  async getPetById(petId: number): Promise<pets | undefined> {
    try{
        const petRepository = AppDataSource.manager.getRepository(pets);
        const foundPet = petRepository.findOneBy({
            pet_id:petId
        })
        return foundPet;
    }
    catch(error){
        console.log(error);
    }
  }

  async getPetByPetName(petName: string): Promise<pets | undefined>{
    try{
        const petRepository = AppDataSource.manager.getRepository(pets);
        const foundPet = petRepository.findOneBy({
            name: petName
        });
        return foundPet
    }
    catch(error){
        throw error;
    }
  }

  async updatePet(petId: number, updatedData: Partial<pets>): Promise<pets | undefined> {
    try {
      const petRepository = AppDataSource.manager.getRepository(pets);
      const existingPet = await petRepository.findOneBy({
        pet_id: petId
      });

      if (!existingPet) {
        return undefined; 
      }

      
      const updatedPet = Object.assign(existingPet, updatedData);
      await petRepository.save(updatedPet);
      
      return updatedPet;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  async deletePet(petId: number): Promise<void> {
    try {
      const petRepository = AppDataSource.manager.getRepository(pets);
      const existingPet = await petRepository.findOneBy({
        pet_id:petId
      });

      if (!existingPet) {
        return; // Silinecek pet bulunamazsa hiçbir şey yapmayın veya uygun bir hata işleme yapabilirsiniz.
      }

      await petRepository.remove(existingPet);
    } catch (error) {
      console.error(error);
      throw error; // Hata işleme veya günlükleme gereksinimlerinize göre hata fırlatabilirsiniz.
    }
  }

  
  
}