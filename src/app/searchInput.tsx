"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const Input = ({ name }: { name: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const createQueryString = useCallback(
    (val: string, name: string) => {
      console.log(val);
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
