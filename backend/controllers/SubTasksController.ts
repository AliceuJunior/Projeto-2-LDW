import { Request, Response } from "express";
import {SubTasks} from "../models/SubTasks";

class TaskController {
    public async create(req: Request, res: Response): Promise<void> {
        const { nome, email } = req.body;
        if (!nome && !email) {
            res.status(401).json({ erro: "Forneça o e-mail e senha" });
        }else{
        try {
            const response = await SubTasks.create({ nome, email});
            res.status(200).json(response);
        } catch (e: any) {
                res.send({ message: e });
            }
        }
    }


    public async SubTasks(_: Request, res: Response): Promise<void> {
        res.send(await SubTasks.find(
            {},
            {},
            {
                sort: { nome: 1 }
            }
        ));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const response = await SubTasks.findByIdAndDelete(id);
        if (response) {
            res.json(response);
        }
        else {
            res.json({ message: "Registro inexistente" });
        }
    }

    public async updatemail(req: Request, res: Response): Promise<void> {
        const { id, email } = req.body;
        try {
            const response = await SubTasks.findByIdAndUpdate(
                id,
                { email },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (response) {
                res.status(200).json(response);
            }
            else {
                res.status(404).json({ message: "Registro inexistente" });
            }
        } catch (e: any) {
            if (e.code === 11000) {
                res.status(409).send({ message: `O e-mail ${email} já está em uso` });
            } else if (e.errors?.email) {
                res.status(400).send({ message: e.errors.email.message });
            } else {
                res.status(500).send({ message: "Erro no servidor" });
            }
        }
    }

    public async updatenome(req: Request, res: Response): Promise<void> {
        const { id, nome } = req.body;
        try {
            const response = await SubTasks.findByIdAndUpdate(
                id,
                { nome },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (response) {
                res.json(response);
            }
            else {
                res.json({ message: "Registro inexistente" });
            }
        } catch (e: any) {
           
            if (e.errors?.mail) {
                res.send({ message: e.errors.nome.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }
}

export default new TaskController();