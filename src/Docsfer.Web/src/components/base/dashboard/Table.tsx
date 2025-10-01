import type { ReactNode } from "react";

type TableProps = { children: ReactNode };

export const Table = ({ children }: TableProps) => (
  <div className="relative overflow-x-auto sm:rounded-lg">
    <table className="w-full text-sm text-left font-gabarito text-zinc-300">
      {children}
    </table>
  </div>
);

const Head = ({ children }: TableProps) => (
  <thead className="text-xs text-zinc-400 uppercase bg-zinc-700">
    {children}
  </thead>
);

const Body = ({ children }: TableProps) => <tbody>{children}</tbody>;

const Row = ({ children }: TableProps) => <tr>{children}</tr>;

const BodyRow = ({ children }: TableProps) => (
  <tr className="odd:bg-zinc-950 even:bg-zinc-900 border-b border-zinc-700">
    {children}
  </tr>
);

const HeaderCell = ({ children }: TableProps) => (
  <th scope="col" className="px-6 py-3 w-[1%]">
    {children}
  </th>
);

const BodyHeaderCell = ({ children }: TableProps) => (
  <th
    scope="row"
    className="px-6 py-4 font-medium whitespace-nowrap text-zinc-200"
  >
    {children}
  </th>
);

const Cell = ({ children }: TableProps) => (
  <td className="px-6 py-4 w-[1%] whitespace-nowrap truncate text-ellipsis relative">
    {children}
  </td>
);

Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.BodyRow = BodyRow;
Table.HeaderCell = HeaderCell;
Table.BodyHeaderCell = BodyHeaderCell;
Table.Cell = Cell;
