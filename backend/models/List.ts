import mongoose, { ObjectId, Schema, Types } from "mongoose";

const ListSchema = new Schema({
    nome: {
        type: String,
        trim: true,
        required: true,
    },
    iduser: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, "O usuário é obrigatório"],
        validate: {
            validator: async function(_id:ObjectId) {
                const document = await mongoose.models.User.findById(_id);
                return !!document;
            },
            message:"O usuário não existe no cadastro"
        }
    },
})