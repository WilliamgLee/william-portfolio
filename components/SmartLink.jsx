import Link from "next/link";

// Links starting with "/" and not ending in a file (.html, .pdf) are pages of this
// site, so they open in the same tab; everything else opens in a new tab.
export const isPage = (url) => url.startsWith("/") && !/\.[a-z]+$/i.test(url);

export default function SmartLink({ href, children, ...rest }) {
  if (isPage(href)) return <Link href={href} {...rest}>{children}</Link>;
  return <a href={href} target="_blank" rel="noreferrer" {...rest}>{children}</a>;
}
