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
        { name: "data.fileName", weight: 0.7 },
        { name: "data.name", weight: 0.6 },
        { name: "data.uploader", weight: 0.4 },
        { name: "data.createdAt", weight: 0.2 },
        { name: "data.creationDate", weight: 0.2 },
        { name: "data.modifyDate", weight: 0.2 },
        { name: "data.userName", weight: 0.6 },
        { name: "data.email", weight: 0.4 },
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
        <mark key={start} className="bg-transparent underline text-sky-500">
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
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
      >
        <Search className="h-4 w-4" />
        <span className="text-end">Search…</span>
        <kbd className="hidden ml-2 [.os-macos_&]:block rounded bg-gray-800 px-1.5 py-0.5 text-xs text-gray-400">
          ⌘ + K
        </kbd>
        {/* thanks tailwind docs, didn't know there was an os detector in css xD */}
        <kbd className="hidden not-[.os-macos_&]:block ml-2 rounded bg-gray-800 px-1.5 py-0.5 text-xs text-gray-400">
          Ctrl + K
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
            "absolute left-1/2 top-24 w-[min(800px,92vw)] -translate-x-1/2 rounded-2xl border border-gray-800 bg-gray-900 shadow-2xl transition-transform",
            open ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
          role="dialog"
          aria-modal="true"
        >
          <Command label="Search" shouldFilter={false}>
            <div className="flex items-center gap-2 border-b border-gray-800 px-3 py-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Command.Input
                value={q}
                onValueChange={setQ}
                placeholder="Search files, users, groups…"
                className="flex-1 bg-transparent py-2 text-sm text-gray-200 placeholder:text-gray-500 outline-none"
                autoFocus
              />
              <button
                onClick={close}
                className="rounded p-1 text-gray-500 hover:bg-gray-800"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <Command.List className="max-h-[60vh] overflow-y-auto p-2">
              {!q && (
                <Command.Empty className="px-3 py-6 text-sm text-gray-500">
                  Dica: digite um nome de usuário ou arquivo
                </Command.Empty>
              )}
              {q && results.length === 0 && (
                <Command.Empty className="px-3 py-6 text-sm text-gray-500">
                  Nenhum resultado encontrado para: “{q}”.
                </Command.Empty>
              )}

              {/* Group: Files */}
              <Command.Group
                heading="Arquivos"
                className="mb-1 px-2 pt-2 text-xs font-semibold uppercase tracking-wide text-gray-500"
              />
              {results
                .filter((r) => r.item.kind === "file")
                .map((r, idx) => {
                  const f = (r.item as Item & { kind: "file" }).data;
                  const fileLabel = f.fileName ?? f.name ?? "Arquivo";
                  const modified = f.modifyDate ?? f.createdAt ?? f.creationDate ?? "—";
                  const uploader = f.uploader ?? "—";
                  return (
                    <Command.Item
                      key={`f-${f.id}-${idx}`}
                      value={`file:${fileLabel}`}
                      onSelect={() => {
                        onOpenFile?.(f.id);
                        close();
                      }}
                      className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-200 aria-selected:bg-gray-800"
                    >
                      <FileText className="h-4 w-4 text-gray-500" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate">
                          {highlight(fileLabel, r.matches)}
                        </div>
                        <div className="mt-0.5 text-xs text-gray-500">
                          {modified} • by {uploader}
                        </div>
                      </div>
                    </Command.Item>
                  );
                })}

              {/* Group: Users */}
              <Command.Group
                heading="Usuários"
                className="mt-2 border-t border-gray-600 mb-1 px-2 pt-2 text-xs font-semibold uppercase tracking-wide text-gray-500"
              />
              {results
                .filter((r) => r.item.kind === "user")
                .map((r, idx) => {
                  const u = (r.item as Item & { kind: "user" }).data;
                  const displayName =
                    u.userName ?? u.name ?? u.email ?? "Usuário";
                  return (
                    <Command.Item
                      key={`u-${displayName}-${idx}`}
                      value={`user:${displayName}`}
                      className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-200 aria-selected:bg-gray-800"
                    >
                      <Users className="h-4 w-4 text-gray-500" />
                      <div className="truncate">
                        {highlight(displayName, r.matches)}
                      </div>
                    </Command.Item>
                  );
                })}

              {/* Group: Groups */}
              <Command.Group
                heading="Grupos"
                className="mt-2 mb-1 border-t border-gray-600 px-2 pt-2 text-xs font-semibold uppercase tracking-wide text-gray-500"
              />
              {results
                .filter((r) => r.item.kind === "group")
                .map((r, idx) => {
                  const g = (r.item as Item & { kind: "group" }).data;
                  return (
                    <Command.Item
                      key={`g-${g.name}-${idx}`}
                      value={`group:${g.name}`}
                      className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-200 aria-selected:bg-gray-800"
                    >
                      <Users className="h-4 w-4 text-gray-500" />
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
