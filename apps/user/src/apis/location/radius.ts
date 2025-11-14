import { patchNoResponse } from "@core/api/instance";

export const updateSearchRadius = async (searchRadius: number): Promise<boolean> => {
  return await patchNoResponse("/api/users/radius", {
    searchRadius,
  });
};
