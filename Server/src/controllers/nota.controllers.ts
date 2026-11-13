import type { Request, Response } from 'express';
import Nota from '../models/nota.model.ts';

export const obtenerNotas = async (req: Request, res: Response) => {
    try {
        const notas = await Nota.find();
        res.json(notas); // GET: Devuelve todas las notas
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener las notas', error });
    }
};

export const crearNota = async (req: Request, res: Response) => {
    try {
        const { titulo, contenido } = req.body;
        const nuevaNota = new Nota({ titulo, contenido });
        
        await nuevaNota.save(); // POST: Guarda en MongoDB
        res.status(201).json(nuevaNota);
    } catch (error) {
        res.status(400).json({ msg: 'Error al crear la nota', error });
    }
};