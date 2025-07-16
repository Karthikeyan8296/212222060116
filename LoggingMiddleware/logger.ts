type Stack = "frontend" | "backend";
type Level = "debug" | "info" | "warn" | "error" | "fatal";

type FrontendPackage =
  | "api"
  | "auth"
  | "config"
  | "middleware"
  | "utils"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style";

interface LogParams {
  token: string;
  stack: Stack;
  level: Level;
  package: FrontendPackage;
  message: string;
}

export const logEvent = async ({
  token,
  stack,
  level,
  package: logPackage,
  message,
}: LogParams): Promise<void> => {
  try {
    const response = await fetch(
      "http://20.244.56.144/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stack,
          level,
          package: logPackage,
          message,
        }),
      }
    );

    const data = await response.json();
    console.log("log sent:", data);
  } catch (error) {
    console.error("failed to send log:", error);
  }
};
