import moment from "moment-timezone";

const isSlotBusy = (slot: any, busySlots: any) => {
  for (const busySlot of busySlots) {
    if (
      (busySlot.start <= slot.start && slot.start < busySlot.end) ||
      (busySlot.start < slot.end && slot.end <= busySlot.end) ||
      (slot.start <= busySlot.start && busySlot.end <= slot.end)
    )
      return true;
  }
  return false;
};

const calculateAvailabilities = (
  workingHours: { start: number; end: number },
  busySlots: any,
  meetingDuration: number,
  meetingDate: string
) => {
  const startTime = moment.tz(
    `${meetingDate} ${workingHours.start < 10 ? "0" : ""}${
      workingHours.start
    }:00`,
    "Asia/Kolkata"
  );
  const endTime = moment.tz(
    `${meetingDate} ${workingHours.end}:00`,
    "Asia/Kolkata"
  );

  const currentTime = moment.tz("Asia/Kolkata");

  if (startTime.isBefore(currentTime)) {
    const diffInMinutes = currentTime.diff(startTime, "minutes");
    const minutesToAdd =
      Math.ceil(diffInMinutes / meetingDuration) * meetingDuration;
    startTime.add(minutesToAdd, "minutes");
  }
  let slotStart = startTime;
  let slotEnd = moment(slotStart).add(meetingDuration, "minutes");

  let availableSlots = [];

  while (slotEnd <= endTime) {
    let slot = {
      start: moment.tz(slotStart, "Asia/Kolkata").format(),
      end: moment.tz(slotEnd, "Asia/Kolkata").format(),
    };
    if (!isSlotBusy(slot, busySlots)) availableSlots.push(slot);

    slotStart = moment(slotStart).add(meetingDuration, "minutes");
    slotEnd = moment(slotStart).add(meetingDuration, "minutes");
  }

  return availableSlots;
};

export { calculateAvailabilities };
