import type { ReactNode } from "react";

type TableProps = { children: ReactNode };

const Table = ({ children }: TableProps) => (
  <div className="relative overflow-x-auto sm:rounded-lg">
    <table className="w-full text-sm text-left font-gabarito text-gray-300">
      {children}
    </table>
  </div>
);

const Head = ({ children }: TableProps) => (
  <thead className="text-xs text-gray-400 uppercase bg-gray-700">
    {children}
  </thead>
);

const Body = ({ children }: TableProps) => <tbody>{children}</tbody>;

const Row = ({ children }: TableProps) => <tr>{children}</tr>;

const BodyRow = ({ children }: TableProps) => (
  <tr className="odd:bg-gray-950 even:bg-gray-800 tracking-wide border-b border-gray-700">
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
    className="px-6 py-4 font-medium whitespace-nowrap text-gray-200"
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

export default Table;
