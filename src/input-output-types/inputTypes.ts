import {SortDirection} from "mongodb";

export type ParamsType = {id:string};

export type HelperQueryType = {
    searchNameTerm: string|null;
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: SortDirection,
}
