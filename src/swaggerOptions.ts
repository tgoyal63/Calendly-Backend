const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Something went wrong",
              description: "Error message",
            },
          },
        },
        User: {
          type: "object",
          description: "Schema of User to be registered",
          properties: {
            username: {
              type: "string",
              example: "tgoyal63",
              description: "Username of registered user",
            },
            email: {
              type: "string",
              example: "tgoyal63@gmail.com",
              description: "Email of registered user",
            },
            name: {
              type: "string",
              example: "Tushar Goyal",
              description: "Name of registered user",
            },
            accessToken: {
              type: "string",
              example: "ab12.a0ABC1AabcdAa1aABCDaB1CdABcDEfghdN6WUHFMk9fZH3aVNSCEThr2aBCd12abC",
              description: "Access token of registered user",
            },
            refreshToken: {
              type: "string",
              example: "ab12.a0ABC1AabcdAa1aABCDaB1CdABcDEfghdN6WUHFMk9fZH3aVNSCEThr2aBCd12abC",
              description: "Refresh token of registered user",
            },
            workingHours: {
              type: "object",
              description: "Working hours of registered user",
              properties: {
                start: {
                  type: "number",
                  example: "9",
                  description: "Start of working hours of day",
                },
                end: {
                  type: "number",
                  example: "17",
                  description: "End of working hours of day",
                },
              },
            },
            duration: {
              type: "number",
              example: "30",
              description: "Duration of each meeting in minutes",
            },
          },
        },
        Meeting: {
          type: "object",
          description: "Meeting Response",
          properties: {
            id: {
              type: "string",
              description: "Event ID of a meeting",
            },
            start: {
              type: "string",
              description: "Start time of a meeting",
            },
            end: {
              type: "string",
              description: "End time of a meeting",
            },
            title: {
              type: "string",
              description: "Summary of a meeting",
            },
            attendees: {
              type: "array",
              description: "Attendees of a meeting",
              items: {
                type: "string",
                description: "Email of a attendee of a meeting",
              },
            },
          },
        },
        Meetings: {
          type: "array",
          description: "Array of Meeting",
          items: {
            $ref: "#/components/schemas/Meeting",
          },
        },
        Availability: {
          type: "array",
          description: "Array of Availability of a user",
          items: {
            type: "object",
            description: "Time slot of availability of a user",
            properties: {
              start: {
                type: "string",
                example: "2023-06-23T09:00:00+05:30",
                description: "Start Time of a slot",
              },
              end: {
                type: "string",
                example: "2023-06-23T09:30:00+05:30",
                descirption: "End Time of a slot",
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export default options;
