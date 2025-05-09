// hooks/useResourcing.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import {
  fetchResourcingData,
  postResourcingData,
  updateResourcingData,
  patchResourcingData,
  deleteResourcingData,
} from '@/config/service'
import { handleGenericError } from '@/lib/errorHandler'

/**
 * Fetch data using React Query for Resourcing API.
 * @param {string} endpoint - API endpoint.
 * @param {string} queryKey - Unique query key.
 */
export const useFetchResourcingData = (endpoint, queryKey) =>
  useQuery({
    queryKey: [queryKey, endpoint],
    queryFn: () => fetchResourcingData(endpoint),
    refetchOnWindowFocus: false,
  })

/**
 * Generic mutation hook with toast notifications.
 * @param {Function} mutationFn - The mutation function.
 * @param {string} queryKey - The query key to invalidate on success.
 */
const useResourcingMutation = (mutationFn, queryKey) => {
  // const queryClient = useQueryClient()

  // return useMutation({
  //   mutationFn,
  //   onSuccess: (response) => {
  //     queryClient.invalidateQueries(queryKey)
  //     return response
  //   },
  //   onError: (error) => {
  //     const errorMessage = handleGenericError(error)
  //     toast.error(errorMessage)
  //     throw new Error(errorMessage)
  //   },
  // })

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: (response) => {
      queryClient.invalidateQueries(queryKey)
      return response
    },
    onError: (error) => {
      console.error('Error in mutation:', error)
      const errorMessage = handleGenericError(error)

      // toast.error(errorMessage)
      // throw new Error(errorMessage)
    },
  })
}

// Specific Mutations
export const useCreateResourcingData = (endpoint, queryKey) =>
  useResourcingMutation((data) => postResourcingData(endpoint, data), queryKey)

export const useUpdateResourcingData = (endpoint, queryKey) =>
  useResourcingMutation(
    (data) => updateResourcingData(endpoint, data),
    queryKey,
  )

export const usePatchResourcingData = (endpoint, queryKey) =>
  useResourcingMutation((data) => patchResourcingData(endpoint, data), queryKey)

export const useDeleteResourcingData = (endpoint, queryKey) =>
  useResourcingMutation(() => deleteResourcingData(endpoint), queryKey)
