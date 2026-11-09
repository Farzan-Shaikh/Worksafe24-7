import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// WordPress Post Interface
interface WordPressPost {
    id: number;
    title: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    featured_media: number;
    categories: number[];
    date: string;
    author: number;
    slug: string;
    acf?: {
        custom_author?: string;
    };
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
        }>;
        'wp:term'?: Array<
            Array<{
                name: string;
            }>
        >;
        author?: Array<{
            name: string;
        }>;
    };
}

// Formatted Blog Post Interface
export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    date: string;
    author: string;
    readTime: string;
}

// Utility functions
const stripHtml = (html: string): string => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

const calculateReadTime = (text: string): string => {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Transform WordPress post to our BlogPost format
const transformPost = (post: WordPressPost): BlogPost => {
    return {
        id: post.id,
        slug: post.slug,
        title: stripHtml(post.title.rendered),
        excerpt: stripHtml(post.excerpt.rendered),
        content: post.content.rendered,
        image:
            post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
            '/images/Gmother.png',
        category:
            post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized',
        date: formatDate(post.date),
        author: post.acf?.custom_author || post._embedded?.author?.[0]?.name || 'Admin',
        readTime: calculateReadTime(
            stripHtml(post.content.rendered || post.excerpt.rendered)
        ),
    };
};

// Create RTK Query API
export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://zimaxxtech.com/wp-app/wp-json/wp/v2'
    }),
    // Keep data cached for 1 hour (3600 seconds)
    keepUnusedDataFor: 3600,
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        // Get all posts - this will be called once and cached
        getPosts: builder.query<BlogPost[], void>({
            query: () => '/posts?_embed&per_page=100',
            transformResponse: (response: WordPressPost[]) => {
                return response.map(transformPost);
            },
            providesTags: ['Posts'],
        }),

        // Get post by ID - uses cached data if available
        getPostById: builder.query<BlogPost | undefined, number>({
            queryFn: async (id, api): Promise<{ data: BlogPost } | { error: { status: number; data: string } }> => {
                // Try to get from cache first
                const state = api.getState() as any;
                const cachedPosts = state.postsApi?.queries?.['getPosts(undefined)']?.data as BlogPost[] | undefined;

                if (cachedPosts) {
                    const post = cachedPosts.find((p: BlogPost) => p.id === id);
                    if (post) {
                        return { data: post };
                    }
                }

                // If not in cache, fetch all posts (this will cache them for future use)
                await api.dispatch(
                    postsApi.endpoints.getPosts.initiate()
                );

                // Re-check cache after fetching
                const updatedState = api.getState() as any;
                const updatedPosts = updatedState.postsApi?.queries?.['getPosts(undefined)']?.data as BlogPost[] | undefined;

                if (updatedPosts) {
                    const post = updatedPosts.find((p: BlogPost) => p.id === id);
                    return post ? { data: post } : { error: { status: 404, data: 'Post not found' } };
                }

                return { error: { status: 500, data: 'Failed to fetch posts' } };
            },
            providesTags: (_result, _error, id) => [{ type: 'Posts', id }],
        }),

        // Get post by slug - uses cached data if available
        getPostBySlug: builder.query<BlogPost | undefined, string>({
            queryFn: async (slug, api): Promise<{ data: BlogPost } | { error: { status: number; data: string } }> => {
                // Try to get from cache first
                const state = api.getState() as any;
                const cachedPosts = state.postsApi?.queries?.['getPosts(undefined)']?.data as BlogPost[] | undefined;

                if (cachedPosts) {
                    const post = cachedPosts.find((p: BlogPost) => p.slug === slug);
                    if (post) {
                        return { data: post };
                    }
                }

                // If not in cache, fetch all posts
                await api.dispatch(
                    postsApi.endpoints.getPosts.initiate()
                );

                // Re-check cache after fetching
                const updatedState = api.getState() as any;
                const updatedPosts = updatedState.postsApi?.queries?.['getPosts(undefined)']?.data as BlogPost[] | undefined;

                if (updatedPosts) {
                    const post = updatedPosts.find((p: BlogPost) => p.slug === slug);
                    return post ? { data: post } : { error: { status: 404, data: 'Post not found' } };
                }

                return { error: { status: 500, data: 'Failed to fetch posts' } };
            },
            providesTags: (_result, _error, slug) => [{ type: 'Posts', id: slug }],
        }),
    }),
});

// Export hooks for usage in components
export const {
    useGetPostsQuery,
    useGetPostByIdQuery,
    useGetPostBySlugQuery,
} = postsApi;
