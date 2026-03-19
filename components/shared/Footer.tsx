import Link from "next/link";
import { CONTACT_INFO, getEmailMailtoHref, getPhoneTelHref, SOCIAL_LINKS } from "@/constants/siteInfo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ href, icon: Icon, iconLabel }) => (
              <a
                key={iconLabel}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-foreground transition hover:bg-black/5"
                aria-label={iconLabel}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <div className="text-center sm:text-right">
            <p className="text-sm text-muted">
              Call:{" "}
              <a
                href={getPhoneTelHref(CONTACT_INFO.phone)}
                className="font-medium text-foreground hover:underline"
              >
                {CONTACT_INFO.phone}
              </a>
              <span className="text-muted">{" "}|{" "}</span>
              Email:{" "}
              <a
                href={getEmailMailtoHref(CONTACT_INFO.email)}
                className="font-medium text-foreground hover:underline"
              >
                {CONTACT_INFO.email}
              </a>
            </p>
            <p className="mt-2 text-sm text-muted">
              Powered by{" "}
              <Link href="/" className="font-medium text-foreground hover:underline">
                Vbay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
