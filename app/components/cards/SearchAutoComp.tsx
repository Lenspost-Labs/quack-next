"use client";

import { useEffect, useRef, useState } from "react";
import { QuackIconSearch } from "@/app/globals/icons/MainIcons";
import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Spinner,
} from "@nextui-org/react";
import { utilConsoleOnlyDev } from "@/app/utils";
import { apiGetSearchUsers } from "@/app/server";
import Image from "next/image";

const SearchAutoComp = () => {
  const ipRef = useRef(null);
  const [usersData, setUsersData] = useState<any>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const fnGetSuggestions = async () => {
    setSearchLoading(true);

    const searchInput = (ipRef?.current as never as HTMLInputElement)?.value;
    const response = await apiGetSearchUsers(searchInput);
    utilConsoleOnlyDev(response);
    setUsersData(response);

    setSearchLoading(false);
  };

  let timeoutId: string | number | NodeJS.Timeout | undefined;
  const fnCheckInputBoxIsTyping = () => {
    // Clear the previous timeout (if any)
    clearTimeout(timeoutId);
    // Set a new timeout for 1 second
    timeoutId = setTimeout(function () {
      // Call your function after 1 seconds of no typing
      fnGetSuggestions();
    }, 1000);
  };

  useEffect(() => {
    //   console.log(searchInput);
    // fnGetSuggestions();
  }, []);

  return (
    <div>
      {" "}
      <Autocomplete
        ref={ipRef}
        onInput={fnCheckInputBoxIsTyping}
        label="Search Users"
        className="max-w-xs"
      >
        {searchLoading && usersData.length == 0 && (
          <AutocompleteItem textValue="Loading..." key={""}>
            <Spinner />
          </AutocompleteItem>
        )}
        {usersData.map((user: any, index: any) => (
          <AutocompleteItem key={index} textValue={user.username}>
            {!searchLoading && (
              <>
                <div className="flex gap-2">
                  <div className="flex items-center">
                    <Image
                      src={user.pfp}
                      className="rounded-full"
                      width={32}
                      height={32}
                      alt=""
                    />{" "}
                  </div>
                  <div className="flex flex-col">
                    <div className="">{user.display_name}</div>
                    <div className="text-sm text-slate-600">
                      @{user.username}
                    </div>
                  </div>
                </div>
              </>
            )}
            {usersData.length == 0 && searchLoading && <Spinner />}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};

export default SearchAutoComp;
