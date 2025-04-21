const BASE_URL = 'http://127.0.0.1:4000';
const API_DATA = {
  getCars: {
    path: '/garage',
    method: 'GET',
    queryParameters: ['page' /* integer */, 'limit' /* integer */] as const,
  },
  getCar: {
    path: '/garage',
    method: 'GET',
  },
  createCar: {
    path: '/garage',
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
    dataParams: ['name', 'color'] as const,
  },
  deleteCar: {
    path: '/garage',
    method: 'DELETE',
  },
  updateCar: {
    path: '/garage',
    method: 'PUT',
    header: { 'Content-Type': 'application/json' },
    dataParams: ['name', 'color'],
  },
  startStopEngine: {
    path: '/engine',
    method: 'PATCH',
    queryParameters: ['id' /* integer */, 'status' /* string */] as const,
  },
  driveEngine: {
    path: '/engine',
    method: 'PATCH',
    queryParameters: ['id' /* integer */, 'status' /* string */] as const,
  },
};

type GetCarsQueryParameters = (typeof API_DATA.getCars.queryParameters)[number];
type GetCarsArguments = Partial<Record<GetCarsQueryParameters, number>>;

type CreateCarDataParameters = (typeof API_DATA.createCar.dataParams)[number];
type CreateCarArguments = Partial<Record<CreateCarDataParameters, string>>;

interface StartStopEngineArguments {
  id: number;
  status: 'stopped' | 'started';
}

interface CarData {
  name: string;
  color: string;
  id: number;
}

interface MovementData {
  velocity: number;
  distance: number;
}

interface ApiArguments {
  apiPath: string;
  apiMethod: string;
  apiHeaders?: Record<string, string>;
  queryParameters?: string;
  apiBody?: string;
}

export default class ServerHandler {
  constructor() {}

  public static constructParameters(values: Record<string, string | number>): string {
    const array = Object.entries(values);
    const temporaryArray = [];
    for (const item of array) {
      temporaryArray.push(`${item[0]}=${item[1]}`);
    }
    return temporaryArray.length > 1 ? temporaryArray.join('&') : temporaryArray.join('');
  }

  public static useApi<Type>(api: ApiArguments): Promise<Type> {
    return fetch(`${BASE_URL}${api.apiPath}?${api.queryParameters}`, {
      method: api.apiMethod,
      headers: api.apiHeaders,
      body: api.apiBody,
    }).then(
      (response) => {
        return response.json();
      },
      (error) => {
        throw new Error(`${error}`);
      },
    );
  }

  public static async getCars(queryParameters: GetCarsArguments = {}): Promise<CarData[]> {
    const result = await ServerHandler.useApi<CarData[]>({
      apiPath: API_DATA.getCars.path,
      apiMethod: API_DATA.getCars.method,
      queryParameters: this.constructParameters(queryParameters),
    });
    return result;
  }

  public static async getCar(id: number): Promise<CarData> {
    const result = await ServerHandler.useApi<CarData>({
      apiPath: `${API_DATA.getCars.path}/${id}`,
      apiMethod: API_DATA.getCars.method,
    });
    return result;
  }

  public static async createCar(CarData: CreateCarArguments): Promise<CarData> {
    const result = await ServerHandler.useApi<CarData>({
      apiPath: API_DATA.createCar.path,
      apiMethod: API_DATA.createCar.method,
      apiHeaders: API_DATA.createCar.header,
      apiBody: JSON.stringify(CarData),
    });
    return result;
  }

  public static async deleteCar(id: number): Promise<void> {
    await ServerHandler.useApi<void>({
      apiPath: `${API_DATA.deleteCar.path}/${id}`,
      apiMethod: API_DATA.deleteCar.method,
    });
  }

  public static async updateCar(id: number, CarData: CreateCarArguments): Promise<CarData> {
    const result = await ServerHandler.useApi<CarData>({
      apiPath: `${API_DATA.updateCar.path}/${id}`,
      apiMethod: API_DATA.updateCar.method,
      apiHeaders: API_DATA.updateCar.header,
      apiBody: JSON.stringify(CarData),
    });
    return result;
  }

  public static async startStopEngine(
    queryParameters: StartStopEngineArguments,
  ): Promise<MovementData> {
    const id = queryParameters.id;
    const status = queryParameters.status;
    const result = await ServerHandler.useApi<MovementData>({
      apiPath: API_DATA.startStopEngine.path,
      apiMethod: API_DATA.startStopEngine.method,
      queryParameters: this.constructParameters({ id, status }),
    });
    return result;
  }
}
