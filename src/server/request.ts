import axios from "axios";
import CONFIG from "@config/index";
export interface RequestParams {
  url: string;
  body?: any;
  params?: { [key: string]: any };
  header?: { [key: string]: any };
}

interface RequestResponse<T> {
  code: number;
  message: number;
  data: T;
}

export interface RequestItemsResponse<T> {
  code: number;
  message: number;
  data: T[];
  pageNum: number;
  pageSize: number;
  totalSize: number;
}

enum RES_CODE {
  SUCC = 2000,
}

export class RequestUtils {
  private getActivityRequestDomain() {
    return CONFIG.base_url;
  }

  private obj2String(obj: Record<string, any>, idx = 0): string {
    const arr: Array<string[]> = [];
    for (const item in obj) {
      arr[idx++] = [item, obj[item]];
    }
    return new URLSearchParams(arr).toString();
  }

  public async get<T>(requestParams: RequestParams): Promise<T> {
    const host = this.getActivityRequestDomain();
    requestParams.url = host + requestParams.url;
    const { url, params } = requestParams;
    const param = {
      url: url,
      method: "GET",
      params: {
        ...params,
      },
    };
    const path =
      param.url + (params ? `?${this.obj2String(param.params)}` : "");
    const { data: originData } = await axios.get<RequestResponse<T>>(path);
    const { code, data, message } = originData;

    // get request status
    if (code === RES_CODE.SUCC) {
      return data;
    }
    throw new Error(`api fetch error:${message}`);
  }

  public async post<T>(requestParams: RequestParams): Promise<T | T[]> {
    const host = this.getActivityRequestDomain();
    requestParams.url = host + requestParams.url;
    const { url, params, body } = requestParams;
    const param = {
      url: url,
      method: "POST",
      params: {
        ...params,
      },
    };
    const path = param.url + `?${this.obj2String(param.params)}`;

    const { data: originData } = await axios.post(path, body);

    // get request status
    if (originData.code === RES_CODE.SUCC) {
      return originData;
    }
    throw new Error("api fetch error");
  }
}
