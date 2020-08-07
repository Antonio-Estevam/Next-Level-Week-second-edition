import {Request,Response} from 'express'

import db from '../database/connections';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface scheduleItem{
    wek_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    async index(request:Request, response:Response){
        const filters = request.query;

        const subject = filters.subject as string;
        const wek_day = filters.wek_day as string;
        const time = filters.time as string;

        if(!filters.wek_day || !filters.subject || !filters.time){
            return response.status(400).json({
                error: 'Missing filters to search classes'
                
            })
        }
        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('clases')
            .whereExists( function (){
                this.select('clases_schedule.*')
                .from('clases_schedule')
                .whereRaw('`clases_schedule`.`class_id` = `clases`.`id`')
                .whereRaw('`clases_schedule`.`wek_day` = ??',[Number(wek_day)])
                .whereRaw('`clases_schedule`.`from` <= ??',[timeInMinutes])
                .whereRaw('`clases_schedule`.`to` > ??',[timeInMinutes]);
            })
            .where('clases.subject', '=',subject)
            .join('users', 'clases.user_id', '=', 'user_id')
            .select(['clases.*', 'users.*']);

        response.json(classes);
        
    }

    async create (request:Request, response:Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost, 
            schedule    
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            
        const insertedUsersIds = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio,
        });
    
        const user_id = insertedUsersIds[0];
    
        const insertedIds = await trx('clases').insert({
            subject,
            cost,
            user_id
        })
    
        const class_id = insertedIds[0];
    
        const classSchedule = schedule.map((scheduleItem:scheduleItem) => {
            return{
                class_id,
                wek_day: scheduleItem.wek_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to),
            };
        })
    
        await trx('clases_schedule').insert(classSchedule);
    
        await trx.commit();
    
        return response.status(201).send();
        } catch (err) {
            await trx.rollback();
    
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })        
        }
        
    }
}