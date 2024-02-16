import {Router, Request, Response} from "express";
import {testingRepository} from "./testingRepository";

export const deleteAllController = (req: Request<any, any, any, any>, res: Response<any>) => {

    testingRepository.deleteAll();
    res.sendStatus(204);

}

