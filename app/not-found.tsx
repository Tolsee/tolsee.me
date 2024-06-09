import { sans } from "lib/fonts";
import Link from "next/link";
// import "./[slug]/markdown.css";

export default function NotFound() {
  return (
    <article className="markdown">
      <h1
        className={[
          sans.className,
          "text-[40px] font-black leading-[44px] text-[--title]",
        ].join(" ")}
      >
        Not found
      </h1>
      <div className="markdown mt-10">
        <p>This page doesn&apos;t exist (yet?)</p>
        <p>
          I recently rewrote the site so maybe something broke. Please{" "}
          <Link href="https://github.com/gaearon/overreacted.io/issues/796">
            complain here.
          </Link>
        </p>
        <p>
          If you&apos;re looking for translated posts, they&apos;re not on the site
          anymore but you can find{" "}
          <Link href="https://github.com/gaearon/overreacted.io/tree/archive/src/pages">
            an archive of them here.
          </Link>
        </p>
        <p>Hope you&apos;ll find what you&apos;re looking for.</p>
      </div>
    </article>
  );
}
