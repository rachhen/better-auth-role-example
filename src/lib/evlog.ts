import { createFsDrain } from "evlog/fs";
import { createEvlog } from "evlog/next";

export const { withEvlog, useLogger, log, createError } = createEvlog({
  service: "better-auth-role-example",
  drain: createFsDrain(),
});
