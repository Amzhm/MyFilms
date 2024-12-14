// __tests__/all.test.ts

import { renderHook, act } from '@testing-library/react';
import { signIn, signOut } from 'next-auth/react';
import { MovieUseCase } from '@/useCases/movie/movieUseCase';
import { ShowUseCase } from '@/useCases/show/showUseCase';
import { LayoutUseCase } from '@/useCases/layout/layoutUseCase';
import { AuthUseCase } from '@/useCases/auth/authUseCase';
import { Movies } from '@/repository/Movies';
import { Shows } from '@/repository/Shows';
import { useSlider } from '@/hooks/useSlider';
import { useSearch } from '@/hooks/useSearch';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useAuthentication } from '@/hooks/useAuthentication';
import { Movie } from '@/app/Entities/Movie/movie';
import { MovieDetails } from '@/app/Entities/Movie/movie-details';
import { Show } from '@/app/Entities/Show/shows';
import { ShowDetails } from '@/app/Entities/Show/show-details';
import { MovieCategory } from '@/domain/movie/types';
import { RefObject } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import '@testing-library/jest-dom';

// Mocks
jest.mock('next-auth/react');
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn()
    }))
}));
jest.mock('@/contexts/AuthContext', () => ({
    useAuthContext: jest.fn()
}));

// Types pour les mocks
interface MockMoviesRepository {
    getPopular: jest.Mock;
    getNowPlaying: jest.Mock;
    getTopRated: jest.Mock;
    getDetails: jest.Mock;
    getPopularForSlider: jest.Mock;
    getTopRatedForSlider: jest.Mock;
    getNowPlayingForSlider: jest.Mock;
};


interface MockShowsRepository {
    getPopular: jest.Mock;
    getOnTheAir: jest.Mock;
    getTopRated: jest.Mock;
    getDetails: jest.Mock;
    getPopularForSlider: jest.Mock;
    getTopRatedForSlider: jest.Mock;
    getOnTheAirForSlider: jest.Mock;
};

// Tests des UseCases
describe('UseCases', () => {
    describe('MovieUseCase', () => {
        const mockMovies: Movie[] = [
            {
                id: 1,
                title: 'Test Movie 1',
                overview: 'Overview 1',
                vote_average: 8.5,
                release_date: '2024-01-01',
                poster_path: '/path1.jpg'
            }
        ];

        const mockMovieDetails: MovieDetails = {
            ...mockMovies[0],
            genres: [{ id: 1, name: 'Action' }],
            runtime: 120,
            status: 'Released',
            tagline: 'Test tagline',
            credits: { cast: [], crew: [] },
            videos: [],
            images: { backdrops: [], posters: [], logos: [] }
        };

        const mockMoviesRepository: MockMoviesRepository = {
            getPopular: jest.fn(),
            getNowPlaying: jest.fn(),
            getTopRated: jest.fn(),
            getDetails: jest.fn(),
            getPopularForSlider: jest.fn(),
            getTopRatedForSlider: jest.fn(),
            getNowPlayingForSlider: jest.fn(),
        };

        const movieUseCase = new MovieUseCase(mockMoviesRepository as unknown as Movies);

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('gets movies by category successfully', async () => {
            mockMoviesRepository.getPopularForSlider.mockResolvedValue(mockMovies);
            const result = await movieUseCase.getMoviesByCategory('popular', 30);
            expect(result).toEqual(mockMovies);
        });

        it('gets movie details successfully', async () => {
            mockMoviesRepository.getDetails.mockResolvedValue(mockMovieDetails);
            const result = await movieUseCase.getMovieDetails('1');
            expect(result).toEqual(mockMovieDetails);
        });

        it('handles invalid category', async () => {
            await expect(movieUseCase.getMoviesByCategory('invalid' as MovieCategory, 30))
                .rejects
                .toThrow('Invalid category: invalid');
        });
    });

    describe('ShowUseCase', () => {
        const mockShows: Show[] = [
            {
                id: 1,
                name: 'Test Show 1',
                overview: 'Overview 1',
                vote_average: 8.5,
                first_air_date: '2024-01-01',
                poster_path: '/path1.jpg'
            }
        ];

        const mockShowDetails: ShowDetails = {
            ...mockShows[0],
            genres: [{ id: 1, name: 'Drama' }],
            number_of_episodes: 10,
            number_of_seasons: 1,
            credits: { cast: [], crew: [] },
            videos: [],
            images: { backdrops: [], posters: [] }
        };

        const mockShowsRepository: MockShowsRepository = {
            getPopular: jest.fn(),
            getOnTheAir: jest.fn(),
            getTopRated: jest.fn(),
            getDetails: jest.fn(),
            getPopularForSlider: jest.fn(),
            getTopRatedForSlider: jest.fn(),
            getOnTheAirForSlider: jest.fn(),
        };

        const showUseCase = new ShowUseCase(mockShowsRepository as unknown as Shows);

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('gets shows by category successfully', async () => {
            mockShowsRepository.getPopularForSlider.mockResolvedValue(mockShows);
            const result = await showUseCase.getShowsByCategory('popular');
            expect(result).toEqual(mockShows);
        });

        it('gets show details successfully', async () => {
            mockShowsRepository.getDetails.mockResolvedValue(mockShowDetails);
            const result = await showUseCase.getShowDetails('1');
            expect(result).toEqual(mockShowDetails);
        });
    });

    describe('LayoutUseCase', () => {
        const layoutUseCase = new LayoutUseCase();

        it('determines mobile view correctly', () => {
            expect(layoutUseCase.isMobileView(800)).toBe(true);
            expect(layoutUseCase.isMobileView(1200)).toBe(false);
        });

        it('determines sidebar collapse correctly', () => {
            expect(layoutUseCase.shouldCollapseOnMobile(true)).toBe(true);
            expect(layoutUseCase.shouldCollapseOnMobile(false)).toBe(false);
        });
    });

    describe('AuthUseCase', () => {
        const authUseCase = new AuthUseCase();
        
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('handles successful login', async () => {
            (signIn as jest.Mock).mockResolvedValueOnce({ ok: true });
            const result = await authUseCase.login({ username: 'test', password: 'test' });
            expect(result.success).toBe(true);
        });

        it('handles failed login', async () => {
            (signIn as jest.Mock).mockResolvedValueOnce({ ok: false });
            const result = await authUseCase.login({ username: 'test', password: 'wrong' });
            expect(result.success).toBe(false);
            expect(result.error).toBe('Identifiants incorrects');
        });

        it('handles login error', async () => {
            (signIn as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
            const result = await authUseCase.login({ username: 'test', password: 'test' });
            expect(result.success).toBe(false);
            expect(result.error).toBe('Erreur de connexion');
        });

        it('handles logout', async () => {
            await authUseCase.logout();
            expect(signOut).toHaveBeenCalledWith({ callbackUrl: '/login' });
        });
    });
});

// Tests des Repositories
describe('Repositories', () => {
    describe('Movies Repository', () => {
        let moviesRepository: Movies;
        let mockFetch: jest.Mock;

        beforeEach(() => {
            mockFetch = jest.fn();
            global.fetch = mockFetch as any;
            moviesRepository = new Movies();
        });

        it('fetches popular movies successfully', async () => {
            const mockResponse = {
                ok: true,
                json: () => Promise.resolve({
                    results: [{ id: 1, title: 'Test Movie' }],
                    page: 1,
                    total_pages: 10
                })
            };
            mockFetch.mockResolvedValue(mockResponse);

            const result = await moviesRepository.getPopular(1);
            expect(result.results[0].title).toBe('Test Movie');
        });

        it('handles API error', async () => {
            mockFetch.mockResolvedValue({ ok: false });
            await expect(moviesRepository.getPopular(1)).rejects.toThrow('Failed to fetch popular movies');
        });

        it('handles network error', async () => {
            mockFetch.mockRejectedValue(new Error('Network error'));
            await expect(moviesRepository.getPopular(1)).rejects.toThrow('Failed to fetch popular movies');
        });
    });

    describe('Shows Repository', () => {
        let showsRepository: Shows;
        let mockFetch: jest.Mock;

        beforeEach(() => {
            mockFetch = jest.fn();
            global.fetch = mockFetch as any;
            showsRepository = new Shows();
        });

        it('fetches popular shows successfully', async () => {
            const mockResponse = {
                ok: true,
                json: () => Promise.resolve({
                    results: [{ id: 1, name: 'Test Show' }],
                    page: 1,
                    total_pages: 10
                })
            };
            mockFetch.mockResolvedValue(mockResponse);

            const result = await showsRepository.getPopular(1);
            expect(result.results[0].name).toBe('Test Show');
        });

        it('handles API error', async () => {
            mockFetch.mockResolvedValue({ ok: false });
            await expect(showsRepository.getPopular(1)).rejects.toThrow('Failed to fetch popular shows');
        });

        it('handles network error', async () => {
            mockFetch.mockRejectedValue(new Error('Network error'));
            await expect(showsRepository.getPopular(1)).rejects.toThrow('Failed to fetch popular shows');
        });
    });
});

// Tests des Hooks
describe('Hooks', () => {
    describe('useSlider', () => {
        // Créer un mock plus complet de EventListener
        let eventListenerCallback: Function;
        const mockRef: RefObject<HTMLDivElement> = {
            current: {
                scrollLeft: 0,
                scrollWidth: 1000,
                clientWidth: 500,
                addEventListener: jest.fn((event, callback) => {
                    eventListenerCallback = callback;
                }),
                removeEventListener: jest.fn(),
                scrollBy: jest.fn(),
            } as unknown as HTMLDivElement
        };
    
        it('updates button states on scroll', () => {
            const { result } = renderHook(() => useSlider({ scrollContainerRef: mockRef }));
    
            act(() => {
                if (mockRef.current) {
                    mockRef.current.scrollLeft = 100;
                    // Utiliser la callback stockée
                    if (eventListenerCallback) {
                        eventListenerCallback();
                    }
                }
            });
    
            expect(result.current.showLeftButton).toBe(true);
        });
    });

    describe('useSearch', () => {
        const mockPush = jest.fn();
        const mockedUseRouter = useRouter as jest.Mock;
    
        beforeEach(() => {
            jest.clearAllMocks();
            mockedUseRouter.mockImplementation(() => ({ push: mockPush }));
        });

        it('initializes with empty query', () => {
            const { result } = renderHook(() => useSearch());
            expect(result.current.searchQuery).toBe('');
        });

        it('updates search query and navigates', async () => {
            const { result } = renderHook(() => useSearch());
            
            await act(async () => {
                result.current.handleSearch('test query');
            });

            expect(result.current.searchQuery).toBe('test query');
            expect(mockPush).toHaveBeenCalledWith('/dashboard/search?q=test%20query');
        });
    });

    describe('useInfiniteScroll', () => {
        const mockIntersectionObserver = jest.fn();

        beforeEach(() => {
            mockIntersectionObserver.mockReturnValue({
                observe: jest.fn(),
                unobserve: jest.fn(),
                disconnect: jest.fn()
            });
            window.IntersectionObserver = mockIntersectionObserver;
        });

        it('initializes with default values', () => {
            const mockFetch = jest.fn();
            const { result } = renderHook(() => useInfiniteScroll(mockFetch));
            expect(result.current.items).toEqual([]);
            expect(result.current.loading).toBe(true);
            expect(result.current.error).toBeNull();
        });

        it('loads data when intersecting', async () => {
            const mockData = {
                results: [{ id: 1, title: 'Test' }],
                page: 1,
                total_pages: 2
            };
            const mockFetch = jest.fn().mockResolvedValue(mockData);
            renderHook(() => useInfiniteScroll(mockFetch));

            const [[callback]] = mockIntersectionObserver.mock.calls;
            await act(async () => {
                callback([{ isIntersecting: true }]);
            });

            expect(mockFetch).toHaveBeenCalledWith(1);
        });
    });

    describe('useAuthentication', () => {
        const mockRouter = { push: jest.fn() };
        const mockAuthUseCase = {
            login: jest.fn(),
            logout: jest.fn()
        };
    
        beforeEach(() => {
            jest.clearAllMocks();
            (useRouter as jest.Mock).mockReturnValue(mockRouter);
            (useAuthContext as jest.Mock).mockReturnValue({ authUseCase: mockAuthUseCase });
        });
    
        it('initializes with default state', () => {
            const { result } = renderHook(() => useAuthentication());
            expect(result.current.isLoading).toBe(false);
            expect(result.current.error).toBe('');
        });
    
        it('handles Google login success', async () => {
            (signIn as jest.Mock).mockResolvedValueOnce({ ok: true });
            const { result } = renderHook(() => useAuthentication());
            
            await act(async () => {
                await result.current.handleGoogleLogin();
            });
    
            expect(signIn).toHaveBeenCalledWith('google', { callbackUrl: '/dashboard' });
        });
    
        it('handles Google login error', async () => {
            (signIn as jest.Mock).mockRejectedValueOnce(new Error('Failed to login'));
            const { result } = renderHook(() => useAuthentication());
            
            await act(async () => {
                await result.current.handleGoogleLogin();
            });
    
            expect(result.current.error).toBe('Erreur de connexion avec Google');
        });
    
        it('handles regular login success', async () => {
            const mockCredentials = { username: 'test', password: 'test' };
            mockAuthUseCase.login.mockResolvedValueOnce({ success: true });
            
            const { result } = renderHook(() => useAuthentication());
            
            await act(async () => {
                await result.current.handleLogin(mockCredentials);
            });
    
            expect(mockAuthUseCase.login).toHaveBeenCalledWith(mockCredentials);
            expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
        });
    });
});