import { PropsWithChildren, useState } from 'react';
import { Film, Star, Play, Tv, List } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export const AppSidebar = ({ children }: PropsWithChildren) => {
    const [activeItem, setActiveItem] = useState<string>('');  // Suivi de l'élément actif

    // Fonction pour définir l'élément actif au clic
    const handleItemClick = (item: string) => {
        setActiveItem(item);
    };

    return (
        <Sidebar className="bg-gray-200 text-black" style={{ gridArea: 'sidebar' }}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-gray-700 font-semibold"></SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* Discover Button */}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <button
                                        className={`flex items-center p-3 w-full hover:bg-gray-300 rounded transition-colors ${activeItem === 'discover' ? 'bg-gray-400' : ''}`}
                                        onClick={() => handleItemClick('discover')}
                                    >
                                        <Film className="w-5 h-5 mr-2" />
                                        Discover
                                    </button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {/* Movies Section */}
                            <SidebarGroupLabel className="mt-6 text-gray-700 font-semibold">Movies</SidebarGroupLabel>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <button
                                        className={`flex items-center p-3 w-full hover:bg-gray-300 rounded transition-colors ${activeItem === 'popularMovies' ? 'bg-gray-400' : ''}`}
                                        onClick={() => handleItemClick('popularMovies')}
                                    >
                                        <Star className="w-5 h-5 mr-2" />
                                        Popular
                                    </button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <button
                                        className={`flex items-center p-3 w-full hover:bg-gray-300 rounded transition-colors ${activeItem === 'nowPlaying' ? 'bg-gray-400' : ''}`}
                                        onClick={() => handleItemClick('nowPlaying')}
                                    >
                                        <Play className="w-5 h-5 mr-2" />
                                        Now Playing
                                    </button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <button
                                        className={`flex items-center p-3 w-full hover:bg-gray-300 rounded transition-colors ${activeItem === 'topRatedMovies' ? 'bg-gray-400' : ''}`}
                                        onClick={() => handleItemClick('topRatedMovies')}
                                    >
                                        <Star className="w-5 h-5 mr-2" />
                                        Top Rated
                                    </button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {/* TV Shows Section */}
                            <SidebarGroupLabel className="mt-6 text-gray-700 font-semibold">TV Shows</SidebarGroupLabel>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <button
                                        className={`flex items-center p-3 w-full hover:bg-gray-300 rounded transition-colors ${activeItem === 'popularTv' ? 'bg-gray-400' : ''}`}
                                        onClick={() => handleItemClick('popularTv')}
                                    >
                                        <List className="w-5 h-5 mr-2" />
                                        Popular
                                    </button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <button
                                        className={`flex items-center p-3 w-full hover:bg-gray-300 rounded transition-colors ${activeItem === 'onTheAir' ? 'bg-gray-400' : ''}`}
                                        onClick={() => handleItemClick('onTheAir')}
                                    >
                                        <Tv className="w-5 h-5 mr-2" />
                                        On The Air
                                    </button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <button
                                        className={`flex items-center p-3 w-full hover:bg-gray-300 rounded transition-colors ${activeItem === 'topRatedTv' ? 'bg-gray-400' : ''}`}
                                        onClick={() => handleItemClick('topRatedTv')}
                                    >
                                        <Star className="w-5 h-5 mr-2" />
                                        Top Rated
                                    </button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            {children}
        </Sidebar>
    );
};
