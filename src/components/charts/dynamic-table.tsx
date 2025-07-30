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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardFooter } from "../ui/card";
import { cn } from "@/lib/utils";

interface DynamicTableProps {
  data: Record<string, Date | string | number>[];
  isGrid?: boolean; // Optional prop to render in grid layout
}

const ROW_HEIGHT = 48; // Height of each row in pixels
const BUFFER_SIZE = 10; // Extra rows to render outside visible area

export const DynamicTable = ({ data = [], isGrid }: DynamicTableProps) => {
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
    <Card className="overflow-hidden h-full w-full">
      <CardContent
        ref={containerRef}
        className={cn(!isGrid && "h-[500px] overflow-auto")}
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
              <TableHeader>
                <TableRow>
                  {headers.map((header) => (
                    <TableHead key={header.key}>{header.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {visibleData.map((row, index) => {
                  const actualIndex = visibleRange.startIndex + index;
                  return (
                    <TableRow
                      key={row.id?.toString() || actualIndex}
                      style={{ height: ROW_HEIGHT }}
                    >
                      {headers.map((header) => (
                        <TableCell key={header.key}>
                          {formatCellValue(row[header.key], header.key)}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>

      {/* Status indicator */}
      <CardFooter className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t">
        Affichage {visibleRange.startIndex + 1}-
        {Math.min(visibleRange.endIndex + 1, data.length)} sur {data.length}{" "}
        lignes
      </CardFooter>
    </Card>
  );
};
