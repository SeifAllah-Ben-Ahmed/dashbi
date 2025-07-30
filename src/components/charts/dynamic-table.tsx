"use client";
import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DynamicTableProps {
  data: Record<string, string>[];
}

const ROW_HEIGHT = 48; // Height of each row in pixels
const BUFFER_SIZE = 10; // Extra rows to render outside visible area

export const DynamicTable = ({ data = [] }: DynamicTableProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(500);
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  // Get dynamic headers from data
  const headers = useMemo(() => {
    if (data.length === 0) return [];
    const firstItem = data[0];
    return Object.keys(firstItem).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
    }));
  }, [data]);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / ROW_HEIGHT) - BUFFER_SIZE
    );
    const endIndex = Math.min(
      data.length - 1,
      startIndex + Math.ceil(containerHeight / ROW_HEIGHT) + BUFFER_SIZE * 2
    );
    return { startIndex, endIndex };
  }, [scrollTop, containerHeight, data.length]);

  // Get visible data
  const visibleData = useMemo(() => {
    return data.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [data, visibleRange]);

  const formatCellValue = useCallback(
    (value: string | number | Date, key: string) => {
      if (value === null || value === undefined) return "-";

      // Handle Date objects or date strings
      if (key.includes("date") || value instanceof Date) {
        const date = value instanceof Date ? value : new Date(value);
        return isNaN(date.getTime())
          ? String(value)
          : date.toLocaleDateString("fr-FR");
      }

      // Handle price/currency fields
      if (
        key.includes("prix") ||
        key.includes("montant") ||
        key.includes("price") ||
        key.includes("amount")
      ) {
        return String(value);
      }

      return String(value);
    },
    []
  );

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Update container height on resize
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-500 border rounded-lg">
        Aucune donnée à afficher
      </div>
    );
  }

  const totalHeight = data.length * ROW_HEIGHT;
  const offsetY = visibleRange.startIndex * ROW_HEIGHT;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div
        ref={containerRef}
        className="h-[500px] overflow-auto"
        onScroll={handleScroll}
      >
        {/* Virtual scrolling container */}
        <div style={{ height: totalHeight, position: "relative" }}>
          <div
            style={{
              transform: `translateY(${offsetY}px)`,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <Table ref={tableRef}>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow>
                  {headers.map((header) => (
                    <TableHead
                      key={header.key}
                      className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap bg-white"
                    >
                      {header.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {visibleData.map((row, index) => {
                  const actualIndex = visibleRange.startIndex + index;
                  return (
                    <TableRow
                      key={row.id || actualIndex}
                      className="hover:bg-gray-50 transition-colors duration-150"
                      style={{ height: ROW_HEIGHT }}
                    >
                      {headers.map((header) => (
                        <td
                          key={header.key}
                          className="px-4 py-2 text-sm text-gray-900 whitespace-nowrap"
                        >
                          {formatCellValue(row[header.key], header.key)}
                        </td>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Status indicator */}
      <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t">
        Affichage {visibleRange.startIndex + 1}-
        {Math.min(visibleRange.endIndex + 1, data.length)} sur {data.length}{" "}
        lignes
      </div>
    </div>
  );
};
