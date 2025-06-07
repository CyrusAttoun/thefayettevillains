// Post type for use throughout the app
export type Post = {
    image?: string;
    title: string;
    description: string;
    author: string;
    date: string;
    upvotes: number;
    comments: number;
    area: string;
    areaIcon: any; // FontAwesome icon type
    price?: string;
};
