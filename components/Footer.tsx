import type { Dict } from "@/content/ui";
import { fullName, profile, whatsappLink } from "@/content/profile";
import { Icon, type IconName } from "./Icon";
import { ThemeSelect } from "./ThemeControls";

export function Footer({ dict }: { dict: Dict }) {
  const socials = [
    profile.linkedin && { icon: "linkedin", label: "LinkedIn", href: profile.linkedin },
    profile.github && { icon: "github", label: "GitHub", href: profile.github },
    whatsappLink && { icon: "whatsapp", label: "WhatsApp", href: whatsappLink },
    profile.email && { icon: "mail", label: "E-mail", href: `mailto:${profile.email}` },
  ].filter(Boolean) as { icon: IconName; label: string; href: string }[];

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-id">
          <p className="footer-name">{fullName}</p>
          <p className="muted">{dict.footer.tagline}</p>
        </div>

        <ul className="socials" aria-label={dict.footer.follow}>
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="icon-btn"
                aria-label={s.label}
                title={s.label}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <Icon name={s.icon} size={18} />
              </a>
            </li>
          ))}
        </ul>

        <ThemeSelect dict={dict} />
      </div>
      <div className="container footer-bottom">
        <p className="muted">© {new Date().getFullYear()} {fullName}</p>
      </div>
    </footer>
  );
}
