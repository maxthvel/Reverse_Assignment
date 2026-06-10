import { apiClient } from './client';
import type { Assignment, AssignDriverPayload } from '../types';

export const assignmentsApi = {
  assign: async (payload: AssignDriverPayload): Promise<Assignment> => {
    const { data } = await apiClient.post('/assignments', payload);
    return data.data;
  },

  unassign: async (assignmentId: string): Promise<void> => {
    await apiClient.delete(`/assignments/${assignmentId}`);
  },

  complete: async (assignmentId: string): Promise<Assignment> => {
    const { data } = await apiClient.patch(`/assignments/${assignmentId}/complete`);
    return data.data;
  },
};
