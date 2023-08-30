import express from 'express'
import { PetsController } from '../controller/pets.controller';
import { checkUserType } from '../middleware/currentUser';
const router = express.Router();

const petsController = new PetsController();

router.get("/",petsController.getAllPets.bind(petsController));
router.post('/', petsController.createPet.bind(petsController));
router.put("/:/id", petsController.updatePet.bind(petsController));
router.delete("/:id",petsController.deletePet.bind(petsController));
export default router;