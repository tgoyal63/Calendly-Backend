import User, { IUser } from "../models/user.model";

const userService = {
  /**
   * Create a new user document
   * @param data - Data for creating a new user document
   * @returns The created user document
   */
  findOrCreateUser: async (data: {
    name: string;
    email: string;
    googleId: string;
    accessToken: string;
    refreshToken: string;
    workingHours: { start: number; end: number };
    duration: number;
  }): Promise<IUser> => {
    const existingUser = await User.findOne({ googleId: data.googleId });
    if (existingUser) {
      existingUser.name = data.name;
      existingUser.email = data.email;
      existingUser.accessToken = data.accessToken;
      existingUser.refreshToken = data.refreshToken;
      existingUser.workingHours = data.workingHours;
      existingUser.duration = data.duration;
      await existingUser.save();
      return existingUser;
    }
    const newUser = await User.create(data);
    return newUser;
  },

  findUser: async (query: string): Promise<IUser> => {
    const user = await User.findOne({
      $or: [{ email: query }, { username: query }],
    });
    if (user) return user;
    throw new Error("User not found");
  },
};

export default userService;
