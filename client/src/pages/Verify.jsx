import { useSearchParams, Link } from "react-router";
import { MailCheck, CheckCircle2, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Verify() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const status = params.get("status");

  const states = {
    inbox: {
      icon: <MailCheck className="h-12 w-12 text-sky-600" />,
      title: t("verify.inboxTitle"),
      body: t("verify.inboxBody"),
      link: null,
    },
    success: {
      icon: <CheckCircle2 className="h-12 w-12 text-emerald-600" />,
      title: t("verify.successTitle"),
      body: t("verify.successBody"),
      link: { to: "/", label: t("verify.browseRides") },
    },
    invalid: {
      icon: <XCircle className="h-12 w-12 text-rose-600" />,
      title: t("verify.invalidTitle"),
      body: t("verify.invalidBody"),
      link: { to: "/auth", label: t("verify.backToSignUp") },
    },
    missing: {
      icon: <XCircle className="h-12 w-12 text-rose-600" />,
      title: t("verify.missingTitle"),
      body: t("verify.missingBody"),
      link: { to: "/auth", label: t("verify.backToSignUp") },
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
