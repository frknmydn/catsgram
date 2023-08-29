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
}