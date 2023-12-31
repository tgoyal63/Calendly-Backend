import { google } from "googleapis";
import moment from "moment-timezone";

export const getCalendarEvents = async (auth: any) => {
  const calendar = google.calendar({ version: "v3", auth });
  // Upcoming events
  const response = await calendar.events.list({
    calendarId: "primary",
    singleEvents: true,
    orderBy: "startTime",
    timeMin: moment().toISOString(),
    timeZone: "Asia/Kolkata",
  });
  if (response.data.items) {
    const filteredItems = response.data.items.filter((item: any) => {
      return item.summary?.startsWith("Meeting with");
    });
    return filteredItems;
  }
  return [];
};
export const insertCalendarEvent = async (
  event: any,
  auth: any
) => {
  const calendar = google.calendar({ version: "v3", auth });
  const response = await calendar.events.insert({
    calendarId: "primary",
    requestBody: event,
    conferenceDataVersion: 0,
    sendUpdates: "all",
  });
  return response.data;
};
export const getBusySlots = async (
  meetingDate: string,
  workingHours: { start: number; end: number },
  auth: any
) => {
  const timeMin = moment
    .tz(
      `${meetingDate} ${workingHours.start < 10 ? "0" : ""}${
        workingHours.start
      }:00`,
      "Asia/Kolkata"
    )
    .format();
  const timeMax = moment
    .tz(`${meetingDate} ${workingHours.end}:00`, "Asia/Kolkata")
    .format();
  const calendar = google.calendar({ version: "v3", auth });
  const { data } = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      timeZone: "Asia/Kolkata",
      items: [{ id: "primary" }],
    },
  });
  return data.calendars?.primary.busy || [];
};
