import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  constructor() {}

  public getCollectionId(): string {
    const momentObj = moment();
    const hourFormat = 'hh:mm:ss';
    const dayMonthYearFormat = "MMM DD, YYYY";
    const currentDay = moment().format(dayMonthYearFormat);
    const currentDayMinusOne = moment().subtract(1, 'days').format(dayMonthYearFormat);
    const timeInHours = moment(hourFormat);
    const pm_18 = moment('18:00:00', hourFormat);
    const pm_24 = moment('23:59:59', hourFormat);
    const am_0 = moment('00:00:00', hourFormat);
    const am_7 = moment('07:00:00', hourFormat);
    if(timeInHours.isBetween(pm_18, pm_24))
    {
      return currentDay;
    }
    else if(timeInHours.isBetween(am_0, am_7))
    {
      return currentDayMinusOne;
    }
    else {
      return currentDay;
    }
  }
  }

