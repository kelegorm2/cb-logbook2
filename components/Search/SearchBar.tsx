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
    <div className="searchBar">
      <input
        type="search"
        placeholder="Search"
        onChange={(e) => createQueryString("query", e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
