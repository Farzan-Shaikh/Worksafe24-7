import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import PageShell from '../components/layout/PageShell'
import SEOHead from '../components/SEOHead'
import GridLines from '../components/ui/GridLines'
import Reveal, { MaskedLines } from '../components/ui/Reveal'
import SocialIcons from '../components/ui/SocialIcons'
import PostCard from '../components/blog/PostCard'
import ShareLinks from '../components/blog/ShareLinks'
import { useGetPostByIdQuery, useGetPostsQuery } from '../store/api/postsApi'

const ReadingProgress = () => {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-[var(--ws-header-h)] z-40 h-[2px] origin-left bg-forest-600"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  )
}

const DetailSkeleton = () => (
  <div className="ws-shell animate-pulse py-16" aria-hidden="true">
    <div className="h-3 w-48 bg-ivory-300" />
    <div className="mt-8 h-14 w-4/5 bg-ivory-300" />
    <div className="mt-3 h-14 w-3/5 bg-ivory-300" />
    <div className="mt-14 aspect-[16/9] bg-ivory-300" />
    <div className="mx-auto mt-14 max-w-[42rem] space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-4 bg-ivory-300" style={{ width: `${92 - (i % 3) * 12}%` }} />
      ))}
    </div>
  </div>
)

const BlogDetail = () => {
  const { id } = useParams()

  // All posts for prev/next and related (cached), then the specific post (uses the same cache)
  const { data: allPosts = [] } = useGetPostsQuery()
  const { data: currentPost, isLoading: loading, error } = useGetPostByIdQuery(parseInt(id || '0'), { skip: !id })

  if (loading) {
    return (
      <PageShell className="bg-ivory-100">
        <section aria-busy="true" aria-label="Loading article">
          <DetailSkeleton />
        </section>
      </PageShell>
    )
  }

  if (error || !currentPost) {
    return (
      <PageShell>
        <section className="relative bg-ivory-200">
          <GridLines tone="ivory" />
          <div className="ws-shell relative flex min-h-[60vh] flex-col items-start justify-center gap-6 py-20">
            <h1 className="ws-display text-display-lg">{error ? 'Error Loading Article' : 'Blog Post Not Found'}</h1>
            <p className="text-forest-700/80">{error && 'status' in error ? `Error: ${error.status}` : 'An error occurred'}</p>
            <Link to="/blog" className="ws-btn-dark">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Blog
            </Link>
          </div>
        </section>
      </PageShell>
    )
  }

  const currentIndex = allPosts.findIndex((post) => post.id === currentPost.id)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  // Related: real posts from the same WordPress category, nothing invented
  const related = allPosts.filter((p) => p.id !== currentPost.id && p.category === currentPost.category).slice(0, 3)
  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://worksafe247.com/blog/${currentPost.id}`

  return (
    <PageShell className="bg-ivory-100">
      <SEOHead
        title={currentPost.title}
        description={currentPost.excerpt.slice(0, 160)}
        image={currentPost.image}
        url={`https://worksafe247.com/blog/${currentPost.id}`}
        type="article"
        author={currentPost.author}
      />
      <ReadingProgress />

      <article aria-labelledby="article-title">
        {/* Masthead */}
        <header className="relative bg-ivory-200">
          <GridLines tone="ivory" />
          <div className="ws-shell relative pt-10 sm:pt-14">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-forest-700/20 pb-5">
              <Link to="/blog" className="ws-link ws-eyebrow inline-flex items-center gap-2 text-forest-600">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                Back to Blog
              </Link>
              <p className="ws-eyebrow text-forest-500">{currentPost.category}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 pb-12 pt-10 sm:pb-16 sm:pt-14 lg:grid-cols-12 lg:gap-6 lg:pt-20">
              <h1 id="article-title" className="ws-display text-display-md lg:col-span-10">
                <MaskedLines lines={[currentPost.title]} animateOnMount />
              </h1>
              <dl className="grid grid-cols-3 gap-4 border-t border-forest-700/20 pt-5 text-sm lg:col-span-12">
                {[
                  { k: 'Author', v: currentPost.author },
                  { k: 'Published', v: currentPost.date },
                  { k: 'Reading time', v: currentPost.readTime },
                ].map((m) => (
                  <div key={m.k} className="flex flex-col gap-1.5">
                    <dt className="ws-eyebrow text-forest-500">{m.k}</dt>
                    <dd className="text-forest-700">{m.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </header>

        {/* Featured image: half on the masthead, half on the page */}
        <div className="relative bg-gradient-to-b from-ivory-200 from-50% to-ivory-100 to-50%">
          <div className="ws-shell">
            <Reveal y={16} className="overflow-hidden bg-ivory-300">
              <img
                src={currentPost.image}
                alt={currentPost.title}
                className="aspect-video w-full object-cover"
                loading="eager"
              />
            </Reveal>
          </div>
        </div>

        {/* Body */}
        <div className="ws-shell grid grid-cols-1 gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-6 lg:py-24">
          <aside className="lg:col-span-3" aria-label="Share this article">
            <div className="flex flex-col gap-4 lg:sticky lg:top-[calc(var(--ws-header-h)+2rem)]">
              <p className="ws-eyebrow text-forest-500">Share this article</p>
              <ShareLinks title={currentPost.title} url={shareUrl} orientation="column" />
            </div>
          </aside>
          <div
            className="ws-prose min-w-0 max-w-[44rem] lg:col-span-8 lg:col-start-4"
            // WordPress-rendered HTML from the existing REST API, unchanged
            dangerouslySetInnerHTML={{ __html: currentPost.content }}
          />
        </div>

        {/* Follow (the profile links that the old share bar pointed to) */}
        <div className="ws-shell">
          <div className="flex flex-col gap-4 border-t border-forest-700/20 py-8 sm:flex-row sm:items-center sm:justify-between lg:ml-[25%]">
            <p className="ws-eyebrow text-forest-500">Follow WorkSafe 24/7</p>
            <SocialIcons itemClassName="border-forest-700/25 text-forest-700 hover:bg-forest-700 hover:text-ivory-50" />
          </div>
        </div>
      </article>

      {/* Previous / next */}
      {(prevPost || nextPost) && (
        <nav aria-label="More articles" className="border-t border-forest-700/20 bg-ivory-200">
          <div className="ws-shell grid grid-cols-1 md:grid-cols-2">
            {[
              { post: prevPost, label: 'Previous', Icon: ArrowLeft, align: 'text-left' },
              { post: nextPost, label: 'Next', Icon: ArrowRight, align: 'md:text-right' },
            ].map(({ post, label, Icon, align }, i) =>
              post ? (
                <Link
                  key={label}
                  to={`/blog/${post.id}`}
                  className={`group flex flex-col gap-4 py-10 sm:py-14 ${align} ${
                    i === 1 ? 'border-t border-forest-700/20 md:items-end md:border-l md:border-t-0 md:pl-8' : 'md:pr-8'
                  }`}
                >
                  <span className="ws-eyebrow inline-flex items-center gap-2 text-forest-500">
                    {i === 0 && <Icon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-1" aria-hidden="true" />}
                    {label}
                    {i === 1 && <Icon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />}
                  </span>
                  <span className="ws-display line-clamp-2 max-w-[30rem] text-[1.25rem] leading-tight text-forest-700 transition-colors group-hover:text-forest-500 sm:text-[1.5rem]">
                    {post.title}
                  </span>
                </Link>
              ) : (
                <div key={label} className={i === 1 ? 'hidden md:block md:border-l md:border-forest-700/20' : 'hidden md:block'} />
              ),
            )}
          </div>
        </nav>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="relative bg-ivory-100">
          <GridLines tone="ivory" />
          <div className="ws-shell relative py-16 sm:py-24">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-forest-700/20 pb-6">
              <h2 id="related-title" className="ws-display text-display-sm">
                More in {currentPost.category}
              </h2>
              <Link to="/blog" className="ws-btn-line-dark">
                View All Articles
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal as="li" key={p.id} delay={i * 0.08}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}
    </PageShell>
  )
}

export default BlogDetail
