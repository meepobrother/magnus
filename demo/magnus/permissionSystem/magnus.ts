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

export interface SystemRightDataInput {
	id: number;
	title: string;
	type: string;
	code: string;
	children?: SystemRightDataInput[];
}
export interface SaveSystemInput {
	id: number;
	title: string;
	code: string;
	rights?: SystemRightDataInput[];
}
/*保存或者编辑系统权限的返回信息*/
export interface AddSystemRightResult {
	code: number;
	message: string;
}
export interface AddSystemRightInput {
/*角色id*/	roleId: number;
	rightId: number;
	status: number;
}
/*保存系统权限*/
export interface SaveSystemResult {
	code: number;
	message: string;
}
/*取系统权限*/
export interface GetActionPermissionData {
	id: number;
	type: string;
	title: string;
	code: string;
	children: GetActionPermissionData[];
}
/*取系统权限*/
export interface GetPermissionResult {
	data?: GetActionPermissionData;
	code: number;
	message: string;
}
export interface PermissionService {
	checkInstall(entity: SaveSystemInput): Observable<Empty>;
	addOrRemoveSystemRight(entity: AddSystemRightInput): Observable<AddSystemRightResult>;
	SaveSystem(entity: SaveSystemInput): Observable<SaveSystemResult>;
	getPermission(): Observable<GetPermissionResult>;
}