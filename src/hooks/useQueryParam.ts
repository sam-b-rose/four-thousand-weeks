import {
  useEffect,
  useState,
  type Dispatch,
  type StateUpdater,
} from "preact/hooks";
import { getQueryParam } from "../utils";

// Custom hook to manage state with URL parameters
export function useQueryParam(
  param: string,
  defaultValue: string,
): [string, Dispatch<StateUpdater<string>>] {
  const [value, setValue] = useState(getQueryParam(param, defaultValue));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set(param, value);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [param, value]);

  return [value, setValue];
}

export type UseQueryParam = typeof useQueryParam;
export type UseQueryParamReturnType = ReturnType<UseQueryParam>;
export type UseQueryParamValue = UseQueryParamReturnType[0];
export type UseQueryParamDispatch = UseQueryParamReturnType[1];
