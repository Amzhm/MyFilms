// useCases/show/showUseCase.ts
import { Shows } from '@/repository/Shows';
import { Show } from '@/app/Entities/Show/shows';
import { ShowDetails } from '@/app/Entities/Show/show-details';

export class ShowUseCase {
    constructor(private readonly showsRepository: Shows) {}

    async getShowDetails(id: string): Promise<ShowDetails> {
        try {
            return await this.showsRepository.getDetails(id);
        } catch (error) {
            throw new Error(`Failed to fetch show details: ${error}`);
        }
    }

    async getShowsByCategory(category: string, limit: number = 30): Promise<Show[]> {
        try {
            switch (category) {
                case 'popular':
                    return await this.showsRepository.getPopularForSlider();
                case 'on-the-air':
                    return await this.showsRepository.getOnTheAirForSlider();
                case 'top-rated':
                    return await this.showsRepository.getTopRatedForSlider();
                default:
                    throw new Error(`Invalid category: ${category}`);
            }
        } catch (error) {
            throw new Error(`Failed to fetch shows: ${error}`);
        }
    }
}