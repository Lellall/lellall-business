const config = {
  development: {
    BACKEND_URL: "https://api.lellall.com",
  },
  production: {
    BACKEND_URL: "https://api.lellall.com",
  },
}

const currentEnv = process.env.NODE_ENV || "development"

export const configUrl = config[currentEnv as "development" | "production"]

export const BaseUrl = "https://api.lellall.com"
// export const { BACKEND_URL } = config[currentEnv]
// export const BACKEND_URL = (config as { [key: string]: { BACKEND_URL: string } })[currentEnv].BACKEND_URL;
