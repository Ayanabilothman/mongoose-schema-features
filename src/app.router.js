import globalErrorHandler from "./../utils/globalErrorHandler.js";
import authRouter from "./modules/auth/auth.router.js";

export const appRouter = (express, app) => {
  app.use(express.json());
  app.use("/auth", authRouter);

  app.all("*", (req, res, next) =>
    next(new Error("Page not found!", { cause: 404 }))
  );

  app.use(globalErrorHandler);
};
