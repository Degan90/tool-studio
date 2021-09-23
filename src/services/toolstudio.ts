import {FunctionManager, GetFunctionRequest, ListFunctionRequest} from "@peymanmo/toolstudio-api";

export class ToolStudioClient {
	manager: FunctionManager;
	ready: boolean;
	cache: Map<string, any>;

	constructor() {
		this.ready = false;
		this.cache = new Map<string, any>();
		this.manager = new FunctionManager();
		this.manager.connect("https://api.home.toolstudio.io/web").then(() => {
			this.ready = true;
		}).catch(error => console.error(error));
	}

	async listFunctions() {
		const cachedFunctions = this.cache.get("functions");
		if (cachedFunctions) {
			return cachedFunctions;
		}
		const value = await this.manager.client.listFunctions(new ListFunctionRequest(), {});
		const items = value.getFunctionsList();
		this.cache.set("functions", items);
		return items;
	}

	async getFunction(group: string, name: string, useCache: boolean) {
		const cacheKey = `funcs/${group}/${name}`;
		if (useCache) {
			const cachedItem = this.cache.get(cacheKey);
			if (cachedItem) {
				return cachedItem;
			}
		}
		let request = new GetFunctionRequest();
		request.setGroup(group);
		request.setName(name);
		const value = await this.manager.client.getFunction(request, {});
		const item = value.getFunction();
		this.cache.set(cacheKey, item);
		return item;
	}
}

export const DefaultClient = new ToolStudioClient();
