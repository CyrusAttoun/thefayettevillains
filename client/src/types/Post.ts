// Post type for use throughout the app
export type Post = {
    id: number;
    image?: string;
    title: string;
    description: string;
    author: string;
    date: string;
    upvotes: number;
    comments: number;
    area: string;
    areaIcon: string; // Now a string key from backend (e.g., 'faTag')
    price?: string | null;
    location?: string;
    badge?: string;
};
