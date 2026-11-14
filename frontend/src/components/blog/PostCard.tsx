import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { BlogPost } from '../../store/api/postsApi'

type Variant = 'feature' | 'wide' | 'tall' | 'standard'

const aspect: Record<Variant, string> = {
  // WordPress featured images are ~16:9 posters with text baked in, so every variant keeps
  // that frame (no cropped text). Layout variety comes from column spans and title sizes.
  feature: 'aspect-video',
  wide: 'aspect-video',
  tall: 'aspect-video',
  standard: 'aspect-video',
}

const titleSize: Record<Variant, string> = {
  feature: 'text-display-sm',
  wide: 'text-[1.35rem] sm:text-[1.6rem]',
  tall: 'text-[1.3rem] sm:text-[1.45rem]',
  standard: 'text-[1.2rem] sm:text-[1.3rem]',
}

export const PostMeta = ({ post, className = '' }: { post: BlogPost; className?: string }) => (
  <p className={`ws-eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-forest-500 ${className}`}>
    <span>{post.category}</span>
    <span aria-hidden="true" className="h-px w-4 bg-current opacity-60" />
    <time>{post.date}</time>
  </p>
)

/** Editorial article preview. The whole card is one link target (title link stretched). */
const PostCard = ({ post, variant = 'standard' }: { post: BlogPost; variant?: Variant }) => {
  const isFeature = variant === 'feature'

  return (
    <article
      className={`ws-photo-hover group relative flex h-full flex-col ${
        isFeature ? 'gap-8 lg:grid lg:grid-cols-12 lg:items-end lg:gap-6' : 'gap-6'
      }`}
    >
      <div className={`relative overflow-hidden bg-ivory-300 ${aspect[variant]} ${isFeature ? 'lg:col-span-7' : ''}`}>
        <img
          src={post.image}
          alt=""
          className="ws-photo h-full w-full object-cover group-hover:scale-[1.03]"
          loading={isFeature ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>

      <div className={`flex flex-1 flex-col gap-4 ${isFeature ? 'lg:col-span-5 lg:pb-2' : ''}`}>
        <PostMeta post={post} />
        <h3 className={`ws-display leading-[1.12] text-forest-700 ${titleSize[variant]}`}>
          <Link to={`/blog/${post.id}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </Link>
        </h3>
        <p className={`leading-relaxed text-forest-700/80 ${isFeature ? 'line-clamp-4' : 'line-clamp-3'}`}>{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-forest-700/15 pt-4 text-sm text-forest-700/80">
          <span>
            {post.author} <span aria-hidden="true">·</span> {post.readTime}
          </span>
          <span className="inline-flex items-center gap-1.5 text-forest-700">
            Read More
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
      {/* Focus ring for the stretched link */}
      <span aria-hidden="true" className="pointer-events-none absolute -inset-2 hidden ring-2 ring-forest-700 group-has-[a:focus-visible]:block" />
    </article>
  )
}

export default PostCard
