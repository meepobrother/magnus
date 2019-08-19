import {
    Double,
    Float,
    Int32,
    Uint32,
    Sint32,
    Fixed32,
    Sfixed32,
    Int64,
    Uint64,
    Sint64,
    Fixed64,
    Sfixed64,
    Bool,
    String,
    Bytes,
    Empty
} from '@notadd/magnus-core';
import { Observable } from 'rxjs';

export interface SetResult {
	code: number;
	message?: string;
}
export interface SetInput {
	key: string;
	data: string;
}
export interface GetResult {
	code: number;
	message?: string;
	data: string;
}
export interface GetInput {
	key: string;
}
export interface SaveDomainResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface SaveDomainInput {
/*域id*/	id?: number;
/*域编号*/	code?: string;
/*域标题*/	title?: string;
/*域简称*/	desc?: string;
/*创建人id*/	createUserId?: string;
}
export interface GetDoaminData {
	/*域编号*/
	id: number;
	/*域编码*/
	code: string;
	/*域名称*/
	title: string;
	/*域简称*/
	desc: string;
	/*创建日期*/
	createDate: string;
	/*创建人*/
	createUserName: string;
	/*创建人id*/
	createUserId: number;
	/*状态*/
	status: number;
}
export interface GetDomainResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: GetDoaminData;
}
export interface GetDoaminInput {
/*域编号*/	id: number;
}
export interface FindDomainData {
	/*域简称*/
	desc: string;
	/*域编号*/
	id?: number;
	/*域标题*/
	title?: string;
	/*域编号*/
	code?: string;
	/*域状态*/
	status?: number;
	/*创建日期*/
	createDate?: string;
	/*创建人*/
	createUserName?: string;
	/*创建人Id*/
	createUserId?: string;
}
export interface FindDomainDataResult {
	count: number;
	list: FindDomainData[];
}
export interface FindDomainResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: FindDomainDataResult;
}
export interface FindDomainInput {
/*页码*/	page?: number;
/*尺寸*/	psize?: number;
/*标题*/	title?: string;
/*编号*/	code?: string;
}
/*伪删除域*/
export interface DeleteDomainResult {
	/*状态码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface DeleteDomainInput {
	id: number;
}
/*用户禁用*/
export interface ForbidDomainResult {
	/*状态码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface ForbidDomainInput {
/*域id*/	id: number;
	status: number;
}
export interface SaveMenuData {
	/*菜单id*/
	id: number;
	/*菜单标题*/
	title: string;
	/*列表*/
	icon: string;
	/*状态*/
	status: number;
	/*子级*/
	children?: SaveMenuData[];
}
export interface SaveMenuResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	data?: SaveMenuData;
}
export interface SaveMenuInput {
/*菜单id*/	menuId?: number;
/*状态*/	status?: number;
/*图标*/	icon?: string;
/*标题*/	title?: string;
}
export interface FindMenuResultData {
	/*菜单id*/
	id: number;
	/*菜单标题*/
	title: string;
	/*列表*/
	icon: string;
	/*状态*/
	status: number;
	/*子级*/
	children?: FindMenuResultData[];
}
export interface FindMenuResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: FindMenuResultData[];
}
export interface SystemSetting {
	set(item: SetInput): Observable<SetResult>;
	get(item: GetInput): Observable<GetResult>;
}
export interface SystemService {
	saveDomin(domin: SaveDomainInput): Observable<SaveDomainResult>;
	getDomain(entity: GetDoaminInput): Observable<GetDomainResult>;
	findDomain(entity: FindDomainInput): Observable<FindDomainResult>;
	/*伪删除域管理 
status -1 删除成功!*/
	deleteDomain(/*根据id删除啊*/entity: DeleteDomainInput): Observable<DeleteDomainResult>;
	/*域禁用
status 0为禁用 1启用成功*/
	forbidDomain(/**/entity: ForbidDomainInput): Observable<ForbidDomainResult>;
	saveMenu(menu: SaveMenuInput): Observable<SaveMenuResult>;
	findMenu(): Observable<FindMenuResult>;
}