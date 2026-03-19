import { readdir } from "node:fs/promises";
import path from "node:path";
import { PostsGrid } from "@/components/shared/PostsGrid";

type Post = {
  src: string;
  alt: string;
};

// Force dynamic rendering so newly added images in `public/images/posts`
// appear after a refresh without needing a rebuild.
export const dynamic = "force-dynamic";

async function getPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), "public", "images", "posts");

  const files = await readdir(postsDirectory);

  return files
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((file) => ({
      src: `/images/posts/${file}`,
      alt: `Vbay post ${path.parse(file).name}`,
    }));
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <section className="mx-auto w-full max-w-md px-3 py-4 sm:max-w-2xl sm:px-4 sm:py-6 lg:max-w-6xl lg:px-8">
      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center sm:p-10">
          <p className="text-lg font-medium">No posts found yet.</p>
          <p className="mt-2 text-sm text-muted">
            Add images to <code>public/images/posts</code> and refresh the page.
          </p>
        </div>
      ) : (
        <PostsGrid posts={posts} />
      )}
    </section>
  );
}
