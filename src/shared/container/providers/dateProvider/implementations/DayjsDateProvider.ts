import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
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
}

export { DayjsDateProvider };
