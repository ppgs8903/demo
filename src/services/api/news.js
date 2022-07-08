import request from "@/services/request";

export const queryEverything = (params) => {
  return request.get("/api/v2/everything", {
    params,
  });
};
