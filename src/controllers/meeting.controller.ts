import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/user.model";
import { calculateAvailabilities } from "../utils/common.utils";
import {
  getBusySlots,
  insertCalendarEvent,
  getCalendarEvents,
} from "../utils/google-calendar.utils";

const meetingController = {
  scheduleMeeting: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { start, end, guestEmail, guestName } = req.body;
      const user: IUser = req.user as IUser;
      const meetingDate = new Date(start).toISOString().split("T")[0];
      const busySlots = await getBusySlots(meetingDate, user.workingHours, {
        access_token: user.accessToken,
        refresh_token: user.refreshToken,
      });
      const availabilities = await calculateAvailabilities(
        user.workingHours,
        busySlots,
        user.duration,
        meetingDate
      );
      if (availabilities.length === 0) {
        return res
          .status(400)
          .send({ message: "User is not available in the provided time" });
      }
      for (const availability of availabilities) {
        if (availability.start === start && availability.end === end) {
          const event = {
            summary: `Meeting with ${guestName}`,
            start: { dateTime: start, timeZone: "Asia/Kolkata" },
            end: { dateTime: end, timeZone: "Asia/Kolkata" },
            attendees: [{ email: guestEmail }, { email: user.email }],
            conferenceData: {
              createRequest: {
                conferenceSolutionKey: { type: "hangoutsMeet" },
              },
            },
          };
          const eventData = await insertCalendarEvent(event, {
            access_token: user.accessToken,
            refresh_token: user.refreshToken,
          });
          const response = {
            id: eventData.id,
            start: eventData.start?.dateTime,
            end: eventData.end?.dateTime,
            title: eventData.summary,
            attendees: eventData.attendees?.map((attendee) => attendee.email),
          };
          return res.status(201).send(response);
        }
      }
      return res
        .status(400)
        .send({ message: "User is not available in the provided time" });
    } catch (error) {
      next(error);
    }
  },

  getMeetings: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: IUser = req.user as IUser;
      const meetings = await getCalendarEvents({
        access_token: user.accessToken,
        refresh_token: user.refreshToken,
      });
      if (!meetings || meetings.length === 0) {
        return res.status(404).send({ message: "No meetings found." });
      }
      const filteredMeetings = meetings.map((meeting) => {
        return {
          id: meeting.id,
          start: meeting.start?.dateTime,
          end: meeting.end?.dateTime,
          title: meeting.summary,
          attendees: meeting.attendees?.map((attendee) => attendee.email),
        };
      });
      return res.status(200).send(filteredMeetings);
    } catch (error) {
      next(error);
    }
  },
};

export default meetingController;
