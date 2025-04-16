import useSWR from "swr";
import { getAssessments } from "@/actions/interview";
const fetcher = () => getAssessments();
export function useAssessments() {
    const {
        data,
        error,
        isLoading,
        mutate,
    } = useSWR("assessments", fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        revalidateIfStale: true,
    });

    return {
        assessments: data || [],
        isLoading,
        error,
        refresh: mutate,
    };
}
