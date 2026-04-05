export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-violet-300/80">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Preferences</h1>
        <p className="mt-2 text-sm text-slate-400">
          Adjust themes, timer defaults, notifications, and graphics preferences.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {["Appearance", "Timer", "Notifications", "Graphics"].map((setting) => (
          <div
            key={setting}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl"
          >
            <h2 className="text-lg font-semibold text-white">{setting}</h2>
            <p className="mt-2 text-sm text-slate-400">Settings panel placeholder</p>
          </div>
        ))}
      </div>
    </div>
  );
}