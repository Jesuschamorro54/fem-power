import { environment } from "src/environments/environment"

export const UrlLambdaApi = environment.urlAPI;

export interface Portfolio {
    name: string
    user_id: string
    id: string
    count_collaborators: number
    count_publications: number
    count_sponsors: number
    cover: string
    likes: number
    created_at: string
    description: string
    fundation_id: string
}
