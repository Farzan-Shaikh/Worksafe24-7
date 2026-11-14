import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import GridLines from '../ui/GridLines'
import Reveal, { MaskedLines } from '../ui/Reveal'
import { useGetPostsQuery, type BlogPost } from '../../store/api/postsApi'
import { NEWS } from '../../data/home'

const Meta = ({ post }: { post: BlogPost }) => (
  <p className="ws-eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-forest-500">
    <span>{post.category}</span>
    <span aria-hidden="true" className="h-px w-4 bg-current opacity-60" />
    <time>{post.date}</time>
  </p>
)

const Featured = ({ post }: { post: BlogPost }) => (
  <article className="ws-photo-hover group relative flex flex-col">
    <div className="relative aspect-video overflow-hidden bg-ivory-300">
      <img
        src={post.image}
        alt=""
        className="ws-photo h-full w-full object-cover group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div className="mt-6 flex flex-col gap-4">
      <Meta post={post} />
      <h3 className="ws-display text-display-sm text-forest-700">
        <Link to={`/blog/${post.id}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>
      <p className="line-clamp-3 max-w-[42rem] leading-relaxed text-forest-700/85">{post.excerpt}</p>
      <p className="flex items-center justify-between text-sm text-forest-700/80">
        <span>By {post.author}</span>
        <span className="ws-link inline-flex items-center gap-2 text-forest-700">
          Read More <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </p>
    </div>
  </article>
)

const Compact = ({ post }: { post: BlogPost }) => (
  <article className="ws-photo-hover group relative grid grid-cols-[7rem_1fr] gap-5 border-t border-forest-700/20 py-6 sm:grid-cols-[9rem_1fr]">
    <div className="aspect-video overflow-hidden bg-ivory-300">
      <img src={post.image} alt="" className="ws-photo h-full w-full object-cover" loading="lazy" decoding="async" />
    </div>
    <div className="flex flex-col gap-3">
      <Meta post={post} />
      <h3 className="text-[1.15rem] font-medium leading-snug text-forest-700 sm:text-[1.25rem]">
        <Link to={`/blog/${post.id}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>
      <p className="mt-auto flex items-center gap-2 text-sm text-forest-700/80">
        By {post.author}
        <ArrowUpRight
          className="ml-auto h-4 w-4 text-forest-700 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </p>
    </div>
  </article>
)

const Skeleton = () => (
  <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6" aria-hidden="true">
    <div className="animate-pulse lg:col-span-7">
      <div className="aspect-[16/10] bg-ivory-300" />
      <div className="mt-6 h-3 w-40 bg-ivory-300" />
      <div className="mt-5 h-8 w-4/5 bg-ivory-300" />
      <div className="mt-4 h-4 w-full bg-ivory-300" />
      <div className="mt-2 h-4 w-2/3 bg-ivory-300" />
    </div>
    <div className="lg:col-span-5 lg:col-start-8">
      {[0, 1].map((i) => (
        <div key={i} className="grid animate-pulse grid-cols-[9rem_1fr] gap-5 border-t border-forest-700/20 py-6">
          <div className="aspect-square bg-ivory-300" />
          <div className="space-y-3">
            <div className="h-3 w-24 bg-ivory-300" />
            <div className="h-5 w-full bg-ivory-300" />
            <div className="h-5 w-3/4 bg-ivory-300" />
          </div>
        </div>
      ))}
    </div>
  </div>
)

const LatestNews = () => {
  // Same RTK Query endpoint as the Blog page (WordPress REST API), cached across pages
  const { data: allPosts = [], isLoading, error, refetch } = useGetPostsQuery()
  const [first, ...rest] = allPosts.slice(0, 3)

  return (
    <section aria-labelledby="news-title" aria-busy={isLoading} className="relative bg-ivory-100 text-forest-700">
      <GridLines tone="ivory" />
      <div className="ws-shell relative py-20 sm:py-28 lg:py-36">
        <div className="mb-12 grid grid-cols-1 gap-6 border-b border-forest-700/20 pb-10 lg:mb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="news-title" className="ws-display text-display-lg">
              <MaskedLines lines={[NEWS.title]} />
            </h2>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5 lg:pb-2">
            <Reveal className="text-lead">{NEWS.subtitle}</Reveal>
            <Link to="/blog" className="ws-btn-line-dark w-fit">
              {NEWS.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {isLoading && <Skeleton />}

        {!isLoading && error && (
          <div className="flex flex-col items-start gap-4 border-t border-forest-700/20 py-10" role="alert">
            <p>
              {'status' in error ? `Error: ${error.status}` : 'Failed to load posts'}. The latest articles could not be loaded.
            </p>
            <button type="button" onClick={() => refetch()} className="ws-btn-line-dark">
              Try again
            </button>
          </div>
        )}

        {!isLoading && !error && first && (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
            <Reveal className="lg:col-span-7">
              <Featured post={first} />
            </Reveal>
            <div className="lg:col-span-5 lg:col-start-8">
              {rest.map((post, i) => (
                <Reveal key={post.id} delay={0.1 + i * 0.1}>
                  <Compact post={post} />
                </Reveal>
              ))}
              <div className="border-t border-forest-700/20" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default LatestNews
