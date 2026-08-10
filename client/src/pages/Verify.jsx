import { useSearchParams, Link } from "react-router";
import { MailCheck, CheckCircle2, XCircle } from "lucide-react";

export default function Verify() {
  const [params] = useSearchParams();
  const status = params.get("status");

  const states = {
    inbox: {
      icon: <MailCheck className="h-12 w-12 text-sky-600" />,
      title: "Check your inbox",
      body: "We've sent a verification link to your email. Open your inbox, click the link inside, and then you can close this page.",
      link: null,
    },
    success: {
      icon: <CheckCircle2 className="h-12 w-12 text-emerald-600" />,
      title: "You're verified!",
      body: "Your account is now active. You can start booking rides.",
      link: { to: "/", label: "Browse rides" },
    },
    invalid: {
      icon: <XCircle className="h-12 w-12 text-rose-600" />,
      title: "Link expired or invalid",
      body: "This verification link is no longer valid. Try signing up again to get a fresh link.",
      link: { to: "/auth", label: "Back to sign up" },
    },
    missing: {
      icon: <XCircle className="h-12 w-12 text-rose-600" />,
      title: "Something's missing",
      body: "No verification token was provided in the link.",
      link: { to: "/auth", label: "Back to sign up" },
    },
  };

  const view = states[status] || states.inbox;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mb-5 flex justify-center">{view.icon}</div>
        <h1 className="mb-2 text-2xl font-semibold text-slate-900">
          {view.title}
        </h1>
        <p className="mb-6 leading-relaxed text-slate-600">{view.body}</p>
        {view.link && (
          <Link
            to={view.link.to}
            className="inline-block rounded-lg bg-sky-600 px-5 py-2.5 font-medium text-white transition hover:bg-sky-700"
          >
            {view.link.label}
          </Link>
        )}
      </div>
    </main>
  );
}
