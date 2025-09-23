import { Command } from "cmdk";
import Fuse from "fuse.js";
import type { FuseResultMatch } from "fuse.js";
import { Search, X, FileText, Users } from "lucide-react";
import clsx from "clsx";
import type { File, Group, User } from "@/types/search";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type Props = {
  files: File[];
  onOpenFile?: (id: number) => void;
};

type Item =
  | { kind: "file"; data: File }
  | { kind: "user"; data: User }
  | { kind: "group"; data: Group };

export default function CommandPalette({ files, onOpenFile }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const searchableItems = useMemo<Item[]>(() => {
    const items: Item[] = [];
    for (const f of files) {
      items.push({ kind: "file", data: f });
      f.users?.forEach((u) => items.push({ kind: "user", data: u }));
      f.groups?.forEach((g) => items.push({ kind: "group", data: g }));
    }

    return items;
  }, [files]);

  const fuse = useMemo(() => {
    return new Fuse(searchableItems, {
      includeMatches: true,
      threshold: 0.35,
      keys: [
        { name: "data.name", weight: 0.7 },
        { name: "data.uploader", weight: 0.4 },
        { name: "data.creationDate", weight: 0.2 },
        { name: "data.modifyDate", weight: 0.2 },
        // users / groups:
        { name: "data.name", weight: 0.6 },
      ],
    });
  }, [searchableItems]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    return fuse.search(q).slice(0, 50);
  }, [fuse, q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const metaK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (metaK) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  function highlight(
    label: string,
    matches: readonly FuseResultMatch[] | undefined
  ) {
    if (!matches?.length) return label;
    const m = matches[0];
    if (!m.indices?.length) return label;

    const out: ReactNode[] = [];
    let last = 0;
    for (const [start, end] of m.indices) {
      if (start > last) out.push(label.slice(last, start));
      out.push(
        <mark key={start} className="bg-transparent underline">
          {label.slice(start, end + 1)}
        </mark>
      );
      last = end + 1;
    }
    if (last < label.length) out.push(label.slice(last));
    return <>{out}</>;
  }

  return (
    <div>
      {/* Trigger button (optional) */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
      >
        <Search className="h-4 w-4" />
        <span>Search…</span>
        <kbd className="ml-2 rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-400">
          Ctrl/Cmd + K
        </kbd>
      </button>

      {/* Dialog */}
      <div
        className={clsx(
          "fixed inset-0 z-50",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          className={clsx(
            "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={close}
        />

        <div
          className={clsx(
            "absolute left-1/2 top-24 w-[min(800px,92vw)] -translate-x-1/2 rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl transition-transform",
            open ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
          role="dialog"
          aria-modal="true"
        >
          <Command label="Search" shouldFilter={false}>
            <div className="flex items-center gap-2 border-b border-zinc-800 px-3 py-2">
              <Search className="h-4 w-4 text-zinc-500" />
              <Command.Input
                value={q}
                onValueChange={setQ}
                placeholder="Search files, users, groups…"
                className="flex-1 bg-transparent py-2 text-sm text-zinc-200 placeholder:text-zinc-500 outline-none"
                autoFocus
              />
              <button
                onClick={close}
                className="rounded p-1 text-zinc-500 hover:bg-zinc-800"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <Command.List className="max-h-[60vh] overflow-y-auto p-2">
              {!q && (
                <Command.Empty className="px-3 py-6 text-sm text-zinc-500">
                  Tip: try a file name or a user.
                </Command.Empty>
              )}
              {q && results.length === 0 && (
                <Command.Empty className="px-3 py-6 text-sm text-zinc-500">
                  No results for “{q}”.
                </Command.Empty>
              )}

              {/* Group: Files */}
              <Command.Group
                heading="Files"
                className="mb-1 px-2 pt-2 text-xs font-semibold uppercase tracking-wide text-zinc-500"
              />
              {results
                .filter((r) => r.item.kind === "file")
                .map((r, idx) => {
                  const f = (r.item as Item & { kind: "file" }).data;
                  return (
                    <Command.Item
                      key={`f-${f.id}-${idx}`}
                      value={`file:${f.name}`}
                      onSelect={() => {
                        onOpenFile?.(f.id);
                        close();
                      }}
                      className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-200 aria-selected:bg-zinc-800"
                    >
                      <FileText className="h-4 w-4 text-zinc-500" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate">
                          {highlight(f.name, r.matches)}
                        </div>
                        <div className="mt-0.5 text-xs text-zinc-500">
                          {f.modifyDate} • by {f.uploader}
                        </div>
                      </div>
                    </Command.Item>
                  );
                })}

              {/* Group: Users */}
              <Command.Group
                heading="Users"
                className="mt-2 mb-1 px-2 pt-2 text-xs font-semibold uppercase tracking-wide text-zinc-500"
              />
              {results
                .filter((r) => r.item.kind === "user")
                .map((r, idx) => {
                  const u = (r.item as Item & { kind: "user" }).data;
                  return (
                    <Command.Item
                      key={`u-${u.name}-${idx}`}
                      value={`user:${u.name}`}
                      className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-200 aria-selected:bg-zinc-800"
                    >
                      <Users className="h-4 w-4 text-zinc-500" />
                      <div className="truncate">
                        {highlight(u.name, r.matches)}
                      </div>
                    </Command.Item>
                  );
                })}

              {/* Group: Groups */}
              <Command.Group
                heading="Groups"
                className="mt-2 mb-1 px-2 pt-2 text-xs font-semibold uppercase tracking-wide text-zinc-500"
              />
              {results
                .filter((r) => r.item.kind === "group")
                .map((r, idx) => {
                  const g = (r.item as Item & { kind: "group" }).data;
                  return (
                    <Command.Item
                      key={`g-${g.name}-${idx}`}
                      value={`group:${g.name}`}
                      className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-200 aria-selected:bg-zinc-800"
                    >
                      <Users className="h-4 w-4 text-zinc-500" />
                      <div className="truncate">
                        {highlight(g.name, r.matches)}
                      </div>
                    </Command.Item>
                  );
                })}
            </Command.List>
          </Command>
        </div>
      </div>
    </div>
  );
}
