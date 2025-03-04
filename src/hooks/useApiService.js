
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import {
  fetchData,
  postData,
  updateData,
  patchData,
  deleteData,
} from '@/config/service'
import { handleGenericError } from '@/lib/errorHandler'

/**
 * Fetch data using React Query.
 * @param {string} endpoint - API endpoint.
 * @param {string} queryKey - Unique query key.
 */
export const useFetchData = (endpoint, queryKey) =>
  useQuery({
    queryKey: [queryKey, endpoint],
    queryFn: () => fetchData(endpoint),
    refetchOnWindowFocus: false,
  })

/**
 * Generic mutation hook with toast notifications.
 * @param {Function} mutationFn - The mutation function.
 * @param {string} queryKey - The query key to invalidate on success.
 */
const useMutationWithToast = (mutationFn, queryKey) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: (response) => {
      queryClient.invalidateQueries(queryKey)
      return response
    },
    onError: (error) => {
      const errorMessage = handleGenericError(error)
      toast.error(errorMessage)
      throw new Error(errorMessage)
    },
  })
}

// Specific Mutations
export const useCreateData = (endpoint, queryKey) =>
  useMutationWithToast((data) => postData(endpoint, data), queryKey)

export const useUpdateData = (endpoint, queryKey) =>
  useMutationWithToast((newData) => updateData(endpoint, newData), queryKey)

export const usePatchData = (endpoint, queryKey) =>
  useMutationWithToast((data) => patchData(endpoint, data), queryKey)

export const useDeleteData = (endpoint, queryKey) =>
  useMutationWithToast((data) => deleteData(endpoint, data), queryKey)
