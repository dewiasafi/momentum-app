import { Activity, ActivityFilterParams, ActivityFormData, ActivityResponse } from "../types";
import { apiClient } from "../../../services/apiClient";

export const activityApi = {
    async getAll(params: ActivityFilterParams): Promise<ActivityResponse<Activity>> {
        const cleanParams = Object.fromEntries(
            Object.entries(params).filter(
                ([_, value]) => value !== undefined && value !== null && value !== ""
            )
        );

        const response = await apiClient.get<ActivityResponse<Activity>>('/activities', {
            params: cleanParams
        });

        return response.data;
    },

    async getById(id: string): Promise<ActivityResponse<Activity>> {
        const { data } = await apiClient.get<ActivityResponse<Activity>>(`/activities/${id}`);
        return data;
    },

    async create(payload: ActivityFormData): Promise<ActivityResponse<Activity>> {
        const { data } = await apiClient.post<ActivityResponse<Activity>>('/activities', payload);
        return data;
    },

    async update(id: string, payload: Partial<ActivityFormData>): Promise<ActivityResponse<Activity>> {
        const { data } = await apiClient.put<ActivityResponse<Activity>>(`/activities/${id}`, payload);
        return data;
    },

    async delete(id: string): Promise<ActivityResponse<null>> {
        const { data } = await apiClient.delete<ActivityResponse<null>>(`/activities/${id}`);
        return data;
    }
}

export const getActivities = async (
    params: ActivityFilterParams
): Promise<ActivityResponse<Activity>> => {
    const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
            ([_, value]) => value !== undefined && value !== null && value !== ""
        )
    );

    const response = await apiClient.get<ActivityResponse<Activity>>('/activities', {
        params: cleanParams
    });

    return response.data;
}