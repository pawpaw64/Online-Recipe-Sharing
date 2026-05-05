import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import type { ApiResponse } from '@/types/api'
import type { Recipe } from '@/features/recipes/types'

export function useRecipes() {
  return useQuery({
    queryKey: ['recipes', 'hero'],
    queryFn: async () => {
      const res = await api.get<ApiResponse<Recipe[]>>('/recipes', { params: { limit: 10 } })
      //get request to /recipes endpoint with a limit of 10 recipes, the response is typed with ApiResponse and Recipe types, the data from the response is returned?
      return res.data.data
    },
  })
}
//custom hook to fetch recipes, used in hero section and popular recipes section
//tanstack query is used for data fetching and caching, axios is used for making API requests, the API response is typed with ApiResponse and Recipe types
//query key is set to ['recipes', 'hero'] to identify this query in the cache, the query function makes a GET request to /recipes endpoint with a limit of 10 recipes and returns the data from the response