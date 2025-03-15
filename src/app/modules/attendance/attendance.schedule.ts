import cron from "node-cron"
import { TDays } from "../classroom/classroom.interface"
import { Attendance } from "./attendance.model"

const activeCronJobs:{[key:string]:cron.ScheduledTask} = {}

export const updateClassCountSchedule = (classroomId:string, endTime:string, classDays:TDays[])=>{
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const cronExpression = `${endMinute} ${endHour} * * *`;

    if (activeCronJobs[classroomId]) {
        console.log(`🛑 Stopping previous job for class ${classroomId}`);
        activeCronJobs[classroomId].stop();
        delete activeCronJobs[classroomId];
    }

    const newJob = cron.schedule(cronExpression, async()=>{
        const now = new Date();
        const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
        if(classDays.includes(currentDay as TDays)){
            console.log(`🔔 Class ${classroomId} is ending at ${endTime}`)
            try {
                await Attendance.updateMany({classroom:classroomId},
                    [
                        {
                            $set:{
                                absent:{ $subtract:[{$add:["$classes", 1]}, {$add:["$present", "$late"]}] },
                                classes:{$add:["$classes", 1]}
                            }
                        }
                    ]
                )
                console.log(`🔔 Class ${classroomId} updated`)
            } catch (error) {
                console.log(error)
            }
        }
    })

    activeCronJobs[classroomId] = newJob;
    console.log(`🚀 New job scheduled for class ${classroomId}`);
}

