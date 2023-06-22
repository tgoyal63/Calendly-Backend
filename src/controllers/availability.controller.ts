import { Request, Response } from "express";
import { calculateAvailabilities } from "../utils/common.utils";
import { getBusySlots } from "../utils/google-calendar.utils";
import { IUser } from "../models/user.model";
import userService from "../services/user.service";

const availabilityController = {
  getAvailability: async (req: Request, res: Response) => {
    try {
      if (!req.params.userId && !req.user)
        return res
          .status(400)
          .send({ message: "Email or username is required" });
      if (req.params.userId) {
        const user: IUser = await userService.findUser(
          req.params.userId.toString()
        );
        req.user = user;
      }
      const { meetingDate } = req.query as { meetingDate: string };
      if (!meetingDate) {
        return res
          .status(400)
          .send({ message: "Meeting date is required in query" });
      }
      if (meetingDate < new Date().toISOString().split("T")[0]) {
        return res
          .status(400)
          .send({ message: "Meeting date should be in future." });
      }
      const user: IUser = req.user as IUser;
      const busySlots = await getBusySlots(meetingDate, user.workingHours);

      const availabilities = await calculateAvailabilities(
        user.workingHours,
        busySlots,
        user.duration,
        meetingDate
      );
      if (availabilities.length === 0) {
        return res
          .status(404)
          .send({ message: "No availabilities found for the provided date." });
      }
      return res.status(200).send(availabilities);
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        return res.status(500).send({ message: error.message });
      else
        return res.status(500).send({ message: "Failed to get availability." });
    }
  },
};

export default availabilityController;
