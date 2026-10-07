import { getActivities } from "@/features/activities/api/activityApi";
import { ActivityFilterParams } from "@/features/activities/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const activityKeys = {
  all: ['activities'] as const,
  lists: () => [...activityKeys.all, 'list'] as const,
  list: (params: ActivityFilterParams) => [...activityKeys.lists(), params] as const,
};

export const useActivities = (params: ActivityFilterParams = {}) => {
  return useQuery({
    queryKey: activityKeys.list(params),
    queryFn: () => getActivities(params),
    placeholderData: keepPreviousData,
  });
};