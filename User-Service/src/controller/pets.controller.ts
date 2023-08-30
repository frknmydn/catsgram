import { Request, Response } from 'express';
import { PetsService } from '../service/pets.service';// Adjust the path as needed
import { pets } from '../entity/Pets.entity';

export class PetsController {
  public petsService: PetsService;

  constructor() {
    this.petsService = new PetsService();
  }

  async getAllPets(req: Request, res: Response) {
    try {
      const allPets = await this.petsService.getAllPets();
      res.status(200).json(allPets);
      //res.status(200);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Petler alınamıyor.' });
    }
  }

  async createPet(req: Request, res: Response) {
    try {
      const petData: Partial<pets> = req.body;
      const createdPet = await this.petsService.createPet(petData);
      res.status(201).json(createdPet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Pet oluşturulamıyor.' });
    }
  }

  async getPetByID(req:Request, res:Response){
    const foundPet = await this.petsService.getPetById(req.body.pet_id);
    res.status(201).json(foundPet);
  }

  async getPetByName(req:Request, res:Response){
    const foundPet = await this.petsService.getPetByPetName(req.body.name);
    res.status(201).json(foundPet);
  }

  async updatePet(req: Request, res: Response) {
    try {
      const petId = req.params.petId; 
      const updatedData: Partial<pets> = req.body;
      const updatedPet = await this.petsService.updatePet(parseInt(petId), updatedData);

      if (!updatedPet) {
        res.status(404).json({ error: 'Pet bulunamadı.' });
      } else {
        res.status(200).json(updatedPet);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Pet güncellenemiyor.' });
    }
  }

  async deletePet(req: Request, res: Response) {
    try {
      const petId = req.params.petId; // Varsayılan olarak bu petin kimliği URL'den alınır.
      await this.petsService.deletePet(parseInt(petId));
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Pet silinemedi.' });
    }
  }

  

  
}