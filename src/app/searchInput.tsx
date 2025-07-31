"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
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
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

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
      router.push(`?${query}`);
    });
  };
  return (
    <div className="relative flex items-center gap-1.5">
      <Select onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue
            value={searchParams.get(name) ?? ""}
            placeholder={`Select ${name}`}
          />
        </SelectTrigger>
        <SelectContent>
          {data.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <SpinnerPinwheelDemo isPending={isPending} />
    </div>
  );
};
import { LoaderPinwheel } from "lucide-react";

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
