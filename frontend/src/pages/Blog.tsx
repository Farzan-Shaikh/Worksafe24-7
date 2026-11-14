import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import PageShell from '../components/layout/PageShell'
import PageHero from '../components/layout/PageHero'
import SEOHead from '../components/SEOHead'
import GridLines from '../components/ui/GridLines'
import Reveal from '../components/ui/Reveal'
import PostCard from '../components/blog/PostCard'
import { useGetPostsQuery } from '../store/api/postsApi'

/**
 * Layout rhythm for posts after the featured one: a 7/5 pair, then three equal columns, repeated.
 * Spans are for the 12-column desktop grid; tablet uses 2 columns, mobile 1.
 */
const RHYTHM = [
  { span: 'lg:col-span-7', variant: 'wide' as const },
  { span: 'lg:col-span-5', variant: 'tall' as const },
  { span: 'lg:col-span-4', variant: 'standard' as const },
  { span: 'lg:col-span-4', variant: 'standard' as const },
  { span: 'lg:col-span-4', variant: 'standard' as const },
]

const SkeletonCard = ({ tall = false }: { tall?: boolean }) => (
  <div className="animate-pulse" aria-hidden="true">
    <div className={`bg-ivory-300 ${tall ? 'aspect-[4/5]' : 'aspect-[4/3]'}`} />
    <div className="mt-6 h-3 w-40 bg-ivory-300" />
    <div className="mt-4 h-6 w-4/5 bg-ivory-300" />
    <div className="mt-3 h-4 w-full bg-ivory-300" />
  </div>
)

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  // Same RTK Query endpoint and cache as before (WordPress REST API)
  const { data: blogPosts = [], isLoading: loading, error, refetch } = useGetPostsQuery()

  // Same matching rule as the previous page: title or excerpt, case-insensitive
  const filteredPosts = useMemo(() => {
    const q = searchTerm.toLowerCase()
    return blogPosts.filter((post) => post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q))
  }, [blogPosts, searchTerm])

  const [featured, ...rest] = filteredPosts

  return (
    <PageShell>
      <SEOHead
        title="News & Articles"
        description="Stay updated with the latest insights, trends, and innovations in safety technology and services"
        url="https://worksafe247.com/blog"
      />

      <PageHero
        titleLines={['News & Articles']}
        size="xl"
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Blog' }]}
        actions={
          <div role="search" className="flex flex-col gap-3">
            <label htmlFor="blog-search" className="ws-eyebrow text-forest-500">
              Search
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-forest-600" aria-hidden="true" />
              <input
                id="blog-search"
                type="search"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ws-field pl-8 pr-8 [&::-webkit-search-cancel-button]:hidden"
                autoComplete="off"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                  className="absolute right-0 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center text-forest-600 hover:text-forest-800"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <p className="ws-figure text-xs text-forest-500" aria-live="polite">
              {!loading && !error && `${filteredPosts.length} of ${blogPosts.length} articles`}
            </p>
          </div>
        }
      >
        <p>Stay updated with the latest insights, trends, and innovations in safety technology and services</p>
      </PageHero>

      <section aria-label="Articles" aria-busy={loading} className="relative bg-ivory-100">
        <GridLines tone="ivory" />
        <h2 className="sr-only">Articles</h2>
        <div className="ws-shell relative py-16 sm:py-24 lg:py-28">
          {loading && (
            <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-12">
              <div className="md:col-span-2 lg:col-span-12">
                <SkeletonCard />
              </div>
              <div className="lg:col-span-7"><SkeletonCard /></div>
              <div className="lg:col-span-5"><SkeletonCard tall /></div>
            </div>
          )}

          {!loading && error && (
            <div role="alert" className="flex flex-col items-start gap-5 border-y border-forest-700/20 py-12">
              <p className="ws-eyebrow text-alert">Error Loading Articles</p>
              <p className="text-lead">{'status' in error ? `Error: ${error.status}` : 'Failed to load posts'}</p>
              <button type="button" onClick={() => refetch()} className="ws-btn-line-dark">
                Try again
              </button>
            </div>
          )}

          {!loading && !error && filteredPosts.length === 0 && (
            <div className="flex flex-col items-start gap-5 border-y border-forest-700/20 py-14">
              <p className="ws-display text-display-sm">No Articles Found</p>
              <p className="text-forest-700/80">Try adjusting your search or filter criteria</p>
              {searchTerm && (
                <button type="button" onClick={() => setSearchTerm('')} className="ws-btn-line-dark">
                  Clear search
                </button>
              )}
            </div>
          )}

          {!loading && !error && featured && (
            <>
              <Reveal key={`f-${featured.id}`} className="border-b border-forest-700/20 pb-16 lg:pb-24">
                <PostCard post={featured} variant="feature" />
              </Reveal>

              {rest.length > 0 && (
                <ul className="grid grid-cols-1 gap-x-6 gap-y-16 pt-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-24 lg:pt-24">
                  {rest.map((post, i) => {
                    const slot = RHYTHM[i % RHYTHM.length]
                    return (
                      <Reveal as="li" key={post.id} delay={(i % 3) * 0.08} className={slot.span}>
                        <PostCard post={post} variant={slot.variant} />
                      </Reveal>
                    )
                  })}
                </ul>
              )}
            </>
          )}
        </div>
      </section>
    </PageShell>
  )
}

export default Blog
