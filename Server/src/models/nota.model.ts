import { Schema, model } from 'mongoose';

const NotaSchema = new Schema({
    titulo: { type: String, required: true },
    contenido: { type: String, required: true }
});

export default model('Nota', NotaSchema);