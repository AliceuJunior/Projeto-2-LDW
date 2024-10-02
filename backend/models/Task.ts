import mongoose, { ObjectId, Schema, Types } from "mongoose";

const TaskSchema = new Schema({
    titulo: {
        type: String,
        trim: true,
        required: true,
        maxLength: 20
    },
    descricao: {
        type: String,
        trim: true,
        required: true
    },
    criadoEm: {
        type: Date,
        default: Date.now
    },
    venceEm: {
        type: Date,
        required: true
    },
    prioridade: {
        type: String,
        enum: {value: ["Alta", "Media", "Baixa"], message: "A prioridade só pode ser Alta, Media ou Baixa"}
    },
    status: {
        type: String,
        enum: {value: ["Pendente", "Concluida", "Atrasada"]},
        default: "Pendente"
    },
    idList: {
        type: Types.ObjectId,
        ref: 'List',
        required: [true, "A lista é obrigatória"]
    }
})

const Task = mongoose.model('Task', TaskSchema);
export {Task};