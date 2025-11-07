import { patchResponse } from "@core/api/instance";

export type LocationRequest = {
  latitude: string;
  longitude: string;
};

export type LocationResponse = {
  "isSuccess": boolean;
  "message": string;
};


export async function patchLocation(body: LocationRequest) {
  return await patchResponse<LocationRequest, LocationResponse>(
    "/api/users/location",
    body
  );
}
