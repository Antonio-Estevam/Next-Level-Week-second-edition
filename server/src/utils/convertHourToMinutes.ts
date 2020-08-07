export default function convertHourToMinutes(time: string){
    const [hour,minutes] = time.split(':').map(Number);
    const timeInminutes = (hour * 60) + minutes;
    
    return timeInminutes
}