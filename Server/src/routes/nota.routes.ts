import { Router } from 'express';
import { obtenerNotas, crearNota } from '../controllers/nota.controllers.ts';

const router = Router();

router.get('/', obtenerNotas);
router.post('/', crearNota);

export default router;