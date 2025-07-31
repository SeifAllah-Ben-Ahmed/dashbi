"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const Input = ({ name, data }: { name: string; data: string[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const createQueryString = useCallback(
    (val: string, name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, val);

      return params.toString();
    },
    [searchParams]
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = createQueryString(e.target.value, e.target.name);
    router.push(`?${query}`);
  };

  return <input name={name} onChange={handleChange} />;
};

export const SelectFilter = ({
  name,
  data,
}: {
  name: string;
  data: string[];
}) => {
  const [key, setKey] = useState(+new Date());

  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const router = useRouter();
  const createQueryString = useCallback(
    (val: string, name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, val);

      return params.toString();
    },
    [searchParams]
  );
  const handleChange = (value: string) => {
    const query = createQueryString(value.trim(), name);
    startTransition(() => {
      setSelectedValue(value || " ");
      router.push(`?${query}`);
    });
  };
  return (
    <div className="relative flex items-center gap-1.5">
      <Select key={key} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${name}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={" "}>{""}</SelectItem>
          {data.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Clear filter button */}
      {(searchParams.get(name)?.trim() ?? "") !== "" && (
        <>
          <Button
            aria-label={`Clear ${name} filter`}
            variant="outline"
            size="icon"
            className="text-destructive"
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.delete(name);
              startTransition(() => {
                router.push(`?${params.toString()}`);
                setKey(+new Date()); // Reset key to re-render Select
                // setSelectedValue(null); // Clear selected value
              });
            }}
          >
            <XIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
          </Button>
        </>
      )}
      <SpinnerPinwheelDemo isPending={isPending} />
    </div>
  );
};
import { LoaderPinwheel, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SpinnerPinwheelDemo({
  isPending,
}: {
  isPending?: boolean;
}) {
  return (
    <LoaderPinwheel
      className={`animate-spin ${
        isPending ? "text-blue-500" : "text-transparent"
      }`}
    />
  );
}
