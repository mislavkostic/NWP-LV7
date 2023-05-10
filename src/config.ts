import dotenv from "dotenv";

dotenv.config();

function getEnvironmentVariable(environmentVariable: string): string {
  ///get env variable that is requested for example PORT
  const requestedVariable = process.env[environmentVariable];
  //if there is no variable defined in .env file, throw an error
  if (!requestedVariable) throw new Error(`${environmentVariable} environment variable couldn't be found!`);
  return requestedVariable;
}

export const config = {
  PORT: getEnvironmentVariable("PORT"),
  MONGO_ATLAS_URI: getEnvironmentVariable("MONGO_ATLAS_URI"),
  TOKEN_SECRET_STRING: getEnvironmentVariable("TOKEN_SECRET_STRING"),
};
