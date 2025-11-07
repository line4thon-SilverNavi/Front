import { patchNoResponse } from "@core/api/instance";

export type LocationRequest = {
  latitude: string;
  longitude: string;
};


export async function patchLocation(body: LocationRequest) {
  return await patchNoResponse<LocationRequest>(
    "/api/users/location",
    body
  );
}
