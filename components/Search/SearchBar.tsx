import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const query = searchParams.get("query");

  const createQueryString = useDebouncedCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  return (
    <div>
      <input
        type="search"
        placeholder="Search"
        className="border border-gray-200 dark:border-gray-700 rounded-md text-sm p-0 w-50 focus:outline-none focus:ring-2 focus:border-transparent"
        onChange={(e) => createQueryString("query", e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
