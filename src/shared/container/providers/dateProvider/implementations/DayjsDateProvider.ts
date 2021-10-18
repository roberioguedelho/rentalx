import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { injectable } from "tsyringe";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

@injectable()
class DayjsDateProvider implements IDateProvider {
    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }

    compareInDays(start_date: Date, end_date: Date): number {
        return dayjs(this.covertToUTC(end_date)).diff(
            this.covertToUTC(start_date),
            "days"
        );
    }

    dateNow(): Date {
        return dayjs().toDate();
    }

    compareInHours(start_date: Date, end_date: Date): number {
        return dayjs(this.covertToUTC(end_date)).diff(
            this.covertToUTC(start_date),
            "hours"
        );
    }

    covertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hour").toDate();
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }
}

export { DayjsDateProvider };
