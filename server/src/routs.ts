
import express from 'express'; 
import db from './database/connections';
import convertHourToMinutes from './utils/convertHourToMinutes';

const routes = express.Router();

interface scheduleItem{
    wek_day: number;
    from: string;
    to: string;
}

routes.post('/clases', async (request,response) => {
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
    
});

export default routes;