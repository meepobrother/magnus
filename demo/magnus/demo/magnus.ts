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

export interface RoleGroup {
	id?: number;
	/*角色组名*/
	title?: string;
	/*角色组简介*/
	desc?: string;
	/*拥有角色*/
	roles?: Role[];
	getRoles(__selection?: string): Role[];
	/*用到此角色组的岗位*/
	stations?: Station[];
	getStations(__selection?: string): Station[];
}
/*角色表*/
export interface Role {
	/*序号*/
	id?: number;
	/*角色标识*/
	code?: string;
	/*角色名称*/
	title?: string;
	/*角色描述*/
	desc?: string;
	/*一个角色可以有多个权限*/
	rights?: SystemRight[];
	getSystemRights(__selection?: string): SystemRight[];
	/*一个角色 可以使用某个岗位的职员*/
	canUseStations?: Station[];
	/*创建时间*/
	createDate?: number;
	/*更新时间*/
	updateDate?: number;
	/*一个角色 被那几个角色组使用*/
	group?: RoleGroup;
}
/*模块来源权限*/
export interface SystemRight {
	id?: number;
	/*权限类型
页面权限、数据权限、功能权限*/
	type?: string;
	/*权限名*/
	title?: string;
	/*命名空间*/
	namespace?: string;
	/*权限代号*/
	code?: string;
	/*权限链接*/
	link?: string;
	/*来源模块*/
	fromSystem?: System;
	/*可用角色*/
	toRoles?: Role;
}
/*模块事件类型*/
export interface SystemEvent {
	id?: number;
	/*权限名*/
	title?: string;
	/*来源模块*/
	fromSystem?: System;
	/*代办事项*/
	toDoItems?: ToDoItem[];
	getToDoItems(__selection?: string): ToDoItem[];
}
/*子系统 子模块*/
export interface System {
	id?: number;
	/*模块名*/
	title?: string;
	/*系统缩略图片*/
	image?: string;
	/*首页链接*/
	link?: string;
	/*模块代号*/
	code?: string;
	/*模块权限*/
	rights?: SystemRight[];
	getSystemRights(__selection?: string): SystemRight[];
	/*模块事件*/
	events?: SystemEvent[];
	getSystemEvents(__selection?: string): SystemEvent[];
	/*代办事项*/
	toDoItems?: ToDoItem[];
	getToDoItems(__selection?: string): ToDoItem[];
	/*配置时间*/
	createDate?: number;
}
export interface ToDoItem {
	/*编号*/
	id?: number;
	/*标题*/
	title?: string;
	/*简介*/
	desc?: string;
	/*创建时间*/
	createDate?: string;
	/*来源模块*/
	fromSystem?: System;
	fromSystemId?: number;
	/*来源事件*/
	fromEvent?: SystemEvent;
	fromEventId?: number;
	/*申请人*/
	fromUser?: User;
	fromUserId?: number;
	/*处理人*/
	toUser?: User;
	toUserId?: number;
}
export interface SafetyScoreRuleInput {
	id?: number;
	/*规则名*/
	title?: string;
	/*代号*/
	code?: string;
	/*分值*/
	score?: number;
	/*是否替换*/
	isReplace?: boolean;
	/*记录*/
	logs?: SafetyScoreLogInput[];
	/*时间*/
	createDate?: number;
}
export interface SafetyScoreLogInput {
	/*编号*/
	id?: number;
	/*扣除分数*/
	score?: number;
	/*一个安全积分记录有一条用户登录日志*/
	loginLog?: UserLoginLogInput;
	/*对应规则*/
	rule?: SafetyScoreRuleInput;
	/*用户*/
	user?: UserInput;
	/*时间*/
	createDate?: number;
}
export interface UserLoginLogInput {
	/*日志编号*/
	id?: number;
	user?: UserInput;
	/*ip地址编号*/
	ip?: string;
	/*设备编号*/
	deviceId?: string;
	/*创建时间*/
	createDate?: number;
	/*一条登录日志有一个扣分日志*/
	scoreLog?: SafetyScoreLogInput;
}
export interface UserInput {
	/*用户编号*/
	id?: number;
	/*用户名*/
	username?: string;
	/*邮箱*/
	email?: string;
	/*头像*/
	avatar?: string;
	/*电话号码*/
	mobile?: string;
	/*密码*/
	password?: string;
	/*1: 账户正常 0:未绑定 -1:刚解冻 -2: 已被封*/
	status?: number;
	/*随机码*/
	randomCode?: string;
	/*密码是否被重置*/
	isRestPassword?: boolean;
	/*密码更改时间*/
	passwordDate?: number;
	/*创建时间*/
	createDate?: number;
	/*这个用户的创建人是谁*/
	createUser?: UserInput;
	/*创建人的uid*/
	createUserId?: number;
	createUsers?: UserInput[];
	/*安全分*/
	safetyScore?: number;
	/*用户的代办事项*/
	toDoItems?: ToDoItemInput[];
	/*发布者*/
	mineToDoItems?: ToDoItemInput[];
	/*用户岗位*/
	stations?: StationInput[];
	/*用户的登录记录*/
	loginLogs?: UserLoginLogInput[];
	/*用户的安全分扣分记录*/
	safetyScoreLogs?: SafetyScoreLogInput[];
	createStations?: StationInput[];
}
export interface DomainInput {
	id?: number;
	/*域标题*/
	title?: string;
	/*域编号*/
	code?: string;
	/*域状态*/
	status?: number;
	/*创建人*/
	createUser?: number;
	/*创建时间*/
	createDate?: number;
	/*部门*/
	departments?: DepartmentInput[];
}
export interface DepartmentInput {
	/*部门编号*/
	id?: number;
	/*部门名称*/
	title?: string;
	/*部门状态*/
	status?: number;
	/*是否显示*/
	shown?: boolean;
	/*上级部门*/
	parent?: DepartmentInput;
	/*创建时间*/
	createDate?: number;
	/*下级部门*/
	children?: DepartmentInput[];
	/*一个部门可以有多个岗位*/
	stations?: StationInput[];
	/*域*/
	domain?: DomainInput;
	domainId?: number;
}
export interface RoleGroupInput {
	id?: number;
	/*角色组名*/
	title?: string;
	/*角色组简介*/
	desc?: string;
	/*拥有角色*/
	roles?: RoleInput[];
	/*用到此角色组的岗位*/
	stations?: StationInput[];
}
export interface StationInput {
	/*岗位序号*/
	id?: number;
	/*岗位标题*/
	title?: string;
	/*岗位描述*/
	desc?: string;
	/*岗位标识码*/
	code?: string;
	/*岗位责任*/
	responsibilities?: string;
	/*岗位要求*/
	requirements?: string;
	/*岗位状态*/
	status?: number;
	/*创建用户*/
	createUser?: UserInput;
	/*创建日期*/
	createDate?: string;
	/*每个岗位有一个部门*/
	department?: DepartmentInput;
	/*某个岗位可以被什么角色使用*/
	canUseRoles?: RoleInput[];
	users?: UserInput[];
	/*一个岗位有一个role group*/
	roleGroup?: RoleGroupInput;
}
export interface RoleInput {
	/*序号*/
	id?: number;
	/*角色标识*/
	code?: string;
	/*角色名称*/
	title?: string;
	/*角色描述*/
	desc?: string;
	/*一个角色可以有多个权限*/
	rights?: SystemRightInput[];
	/*一个角色 可以使用某个岗位的职员*/
	canUseStations?: StationInput[];
	/*创建时间*/
	createDate?: number;
	/*更新时间*/
	updateDate?: number;
	/*一个角色 被那几个角色组使用*/
	group?: RoleGroupInput;
}
export interface SystemRightInput {
	id?: number;
	/*权限类型
页面权限、数据权限、功能权限*/
	type?: string;
	/*权限名*/
	title?: string;
	/*命名空间*/
	namespace?: string;
	/*权限代号*/
	code?: string;
	/*权限链接*/
	link?: string;
	/*来源模块*/
	fromSystem?: SystemInput;
	/*可用角色*/
	toRoles?: RoleInput;
}
export interface SystemEventInput {
	id?: number;
	/*权限名*/
	title?: string;
	/*来源模块*/
	fromSystem?: SystemInput;
	/*代办事项*/
	toDoItems?: ToDoItemInput[];
}
export interface SystemInput {
	id?: number;
	/*模块名*/
	title?: string;
	/*系统缩略图片*/
	image?: string;
	/*首页链接*/
	link?: string;
	/*模块代号*/
	code?: string;
	/*模块权限*/
	rights?: SystemRightInput[];
	/*模块事件*/
	events?: SystemEventInput[];
	/*代办事项*/
	toDoItems?: ToDoItemInput[];
	/*配置时间*/
	createDate?: number;
}
export interface ToDoItemInput {
	/*编号*/
	id?: number;
	/*标题*/
	title?: string;
	/*简介*/
	desc?: string;
	/*创建时间*/
	createDate?: string;
	/*来源模块*/
	fromSystem?: SystemInput;
	fromSystemId?: number;
	/*来源事件*/
	fromEvent?: SystemEventInput;
	fromEventId?: number;
	/*申请人*/
	fromUser?: UserInput;
	fromUserId?: number;
	/*处理人*/
	toUser?: UserInput;
	toUserId?: number;
}
export interface ToDoItemInputWhere {
	/*编号 不等于*/
	id_Not?: number;
	/*编号 在制定内，如[1,2]*/
	id_In?: number[];
	/*编号 不在制定内,如[1,2]*/
	id_NotIn?: number[];
	/*编号 小于*/
	id_Lt?: number;
	/*编号 小于等于*/
	id_Lte?: number;
	/*编号 大于*/
	id_Gt?: number;
	/*编号 大于等于*/
	id_Gte?: number;
	/*编号*/
	id?: number;
	/*标题 不等于*/
	title_Not?: string;
	/*标题 在制定内，如[1,2]*/
	title_In?: string[];
	/*标题 不在制定内,如[1,2]*/
	title_NotIn?: string[];
	/*标题 小于*/
	title_Lt?: string;
	/*标题 小于等于*/
	title_Lte?: string;
	/*标题 大于*/
	title_Gt?: string;
	/*标题 大于等于*/
	title_Gte?: string;
	/*标题 包含*/
	title_Contains?: string;
	/*标题 不包含*/
	title_NotContains?: string;
	/*标题 开头等于*/
	title_StartsWith?: string;
	/*标题 开头不等于*/
	title_NotStartsWith?: string;
	/*标题 结尾等于*/
	title_EndsWith?: string;
	/*标题 结尾不等于*/
	title_NotEndsWith?: string;
	/*标题*/
	title?: string;
	/*简介 不等于*/
	desc_Not?: string;
	/*简介 在制定内，如[1,2]*/
	desc_In?: string[];
	/*简介 不在制定内,如[1,2]*/
	desc_NotIn?: string[];
	/*简介 小于*/
	desc_Lt?: string;
	/*简介 小于等于*/
	desc_Lte?: string;
	/*简介 大于*/
	desc_Gt?: string;
	/*简介 大于等于*/
	desc_Gte?: string;
	/*简介 包含*/
	desc_Contains?: string;
	/*简介 不包含*/
	desc_NotContains?: string;
	/*简介 开头等于*/
	desc_StartsWith?: string;
	/*简介 开头不等于*/
	desc_NotStartsWith?: string;
	/*简介 结尾等于*/
	desc_EndsWith?: string;
	/*简介 结尾不等于*/
	desc_NotEndsWith?: string;
	/*简介*/
	desc?: string;
	/*创建时间 不等于*/
	createDate_Not?: string;
	/*创建时间 在制定内，如[1,2]*/
	createDate_In?: string[];
	/*创建时间 不在制定内,如[1,2]*/
	createDate_NotIn?: string[];
	/*创建时间 小于*/
	createDate_Lt?: string;
	/*创建时间 小于等于*/
	createDate_Lte?: string;
	/*创建时间 大于*/
	createDate_Gt?: string;
	/*创建时间 大于等于*/
	createDate_Gte?: string;
	/*创建时间 包含*/
	createDate_Contains?: string;
	/*创建时间 不包含*/
	createDate_NotContains?: string;
	/*创建时间 开头等于*/
	createDate_StartsWith?: string;
	/*创建时间 开头不等于*/
	createDate_NotStartsWith?: string;
	/*创建时间 结尾等于*/
	createDate_EndsWith?: string;
	/*创建时间 结尾不等于*/
	createDate_NotEndsWith?: string;
	/*创建时间*/
	createDate?: string;
	/**/
	fromSystemId_Not?: number;
	/**/
	fromSystemId_In?: number[];
	/**/
	fromSystemId_NotIn?: number[];
	/**/
	fromSystemId_Lt?: number;
	/**/
	fromSystemId_Lte?: number;
	/**/
	fromSystemId_Gt?: number;
	/**/
	fromSystemId_Gte?: number;
	fromSystemId?: number;
	/**/
	fromEventId_Not?: number;
	/**/
	fromEventId_In?: number[];
	/**/
	fromEventId_NotIn?: number[];
	/**/
	fromEventId_Lt?: number;
	/**/
	fromEventId_Lte?: number;
	/**/
	fromEventId_Gt?: number;
	/**/
	fromEventId_Gte?: number;
	fromEventId?: number;
	/**/
	fromUserId_Not?: number;
	/**/
	fromUserId_In?: number[];
	/**/
	fromUserId_NotIn?: number[];
	/**/
	fromUserId_Lt?: number;
	/**/
	fromUserId_Lte?: number;
	/**/
	fromUserId_Gt?: number;
	/**/
	fromUserId_Gte?: number;
	fromUserId?: number;
	/**/
	toUserId_Not?: number;
	/**/
	toUserId_In?: number[];
	/**/
	toUserId_NotIn?: number[];
	/**/
	toUserId_Lt?: number;
	/**/
	toUserId_Lte?: number;
	/**/
	toUserId_Gt?: number;
	/**/
	toUserId_Gte?: number;
	toUserId?: number;
	AND?: ToDoItemInputWhere[];
	OR?: ToDoItemInputWhere[];
	NOT?: ToDoItemInputWhere[];
}
export interface ToDoItemInputOrder {
	/*编号
排序可选值为ASC或者DESC*/
	id?: string;
	/*标题
排序可选值为ASC或者DESC*/
	title?: string;
	/*简介
排序可选值为ASC或者DESC*/
	desc?: string;
	/*创建时间
排序可选值为ASC或者DESC*/
	createDate?: string;
	/*来源模块
排序可选值为ASC或者DESC*/
	fromSystem?: string;
	fromSystemId?: string;
	/*来源事件
排序可选值为ASC或者DESC*/
	fromEvent?: string;
	fromEventId?: string;
	/*申请人
排序可选值为ASC或者DESC*/
	fromUser?: string;
	fromUserId?: string;
	/*处理人
排序可选值为ASC或者DESC*/
	toUser?: string;
	toUserId?: string;
}
export interface PageLimitInput {
/*页码*/	page: number;
/*每页数量*/	psize: number;
}
export interface StationInputWhere {
	/*岗位序号 不等于*/
	id_Not?: number;
	/*岗位序号 在制定内，如[1,2]*/
	id_In?: number[];
	/*岗位序号 不在制定内,如[1,2]*/
	id_NotIn?: number[];
	/*岗位序号 小于*/
	id_Lt?: number;
	/*岗位序号 小于等于*/
	id_Lte?: number;
	/*岗位序号 大于*/
	id_Gt?: number;
	/*岗位序号 大于等于*/
	id_Gte?: number;
	/*岗位序号*/
	id?: number;
	/*岗位标题 不等于*/
	title_Not?: string;
	/*岗位标题 在制定内，如[1,2]*/
	title_In?: string[];
	/*岗位标题 不在制定内,如[1,2]*/
	title_NotIn?: string[];
	/*岗位标题 小于*/
	title_Lt?: string;
	/*岗位标题 小于等于*/
	title_Lte?: string;
	/*岗位标题 大于*/
	title_Gt?: string;
	/*岗位标题 大于等于*/
	title_Gte?: string;
	/*岗位标题 包含*/
	title_Contains?: string;
	/*岗位标题 不包含*/
	title_NotContains?: string;
	/*岗位标题 开头等于*/
	title_StartsWith?: string;
	/*岗位标题 开头不等于*/
	title_NotStartsWith?: string;
	/*岗位标题 结尾等于*/
	title_EndsWith?: string;
	/*岗位标题 结尾不等于*/
	title_NotEndsWith?: string;
	/*岗位标题*/
	title?: string;
	/*岗位描述 不等于*/
	desc_Not?: string;
	/*岗位描述 在制定内，如[1,2]*/
	desc_In?: string[];
	/*岗位描述 不在制定内,如[1,2]*/
	desc_NotIn?: string[];
	/*岗位描述 小于*/
	desc_Lt?: string;
	/*岗位描述 小于等于*/
	desc_Lte?: string;
	/*岗位描述 大于*/
	desc_Gt?: string;
	/*岗位描述 大于等于*/
	desc_Gte?: string;
	/*岗位描述 包含*/
	desc_Contains?: string;
	/*岗位描述 不包含*/
	desc_NotContains?: string;
	/*岗位描述 开头等于*/
	desc_StartsWith?: string;
	/*岗位描述 开头不等于*/
	desc_NotStartsWith?: string;
	/*岗位描述 结尾等于*/
	desc_EndsWith?: string;
	/*岗位描述 结尾不等于*/
	desc_NotEndsWith?: string;
	/*岗位描述*/
	desc?: string;
	/*岗位标识码 不等于*/
	code_Not?: string;
	/*岗位标识码 在制定内，如[1,2]*/
	code_In?: string[];
	/*岗位标识码 不在制定内,如[1,2]*/
	code_NotIn?: string[];
	/*岗位标识码 小于*/
	code_Lt?: string;
	/*岗位标识码 小于等于*/
	code_Lte?: string;
	/*岗位标识码 大于*/
	code_Gt?: string;
	/*岗位标识码 大于等于*/
	code_Gte?: string;
	/*岗位标识码 包含*/
	code_Contains?: string;
	/*岗位标识码 不包含*/
	code_NotContains?: string;
	/*岗位标识码 开头等于*/
	code_StartsWith?: string;
	/*岗位标识码 开头不等于*/
	code_NotStartsWith?: string;
	/*岗位标识码 结尾等于*/
	code_EndsWith?: string;
	/*岗位标识码 结尾不等于*/
	code_NotEndsWith?: string;
	/*岗位标识码*/
	code?: string;
	/*岗位责任 不等于*/
	responsibilities_Not?: string;
	/*岗位责任 在制定内，如[1,2]*/
	responsibilities_In?: string[];
	/*岗位责任 不在制定内,如[1,2]*/
	responsibilities_NotIn?: string[];
	/*岗位责任 小于*/
	responsibilities_Lt?: string;
	/*岗位责任 小于等于*/
	responsibilities_Lte?: string;
	/*岗位责任 大于*/
	responsibilities_Gt?: string;
	/*岗位责任 大于等于*/
	responsibilities_Gte?: string;
	/*岗位责任 包含*/
	responsibilities_Contains?: string;
	/*岗位责任 不包含*/
	responsibilities_NotContains?: string;
	/*岗位责任 开头等于*/
	responsibilities_StartsWith?: string;
	/*岗位责任 开头不等于*/
	responsibilities_NotStartsWith?: string;
	/*岗位责任 结尾等于*/
	responsibilities_EndsWith?: string;
	/*岗位责任 结尾不等于*/
	responsibilities_NotEndsWith?: string;
	/*岗位责任*/
	responsibilities?: string;
	/*岗位要求 不等于*/
	requirements_Not?: string;
	/*岗位要求 在制定内，如[1,2]*/
	requirements_In?: string[];
	/*岗位要求 不在制定内,如[1,2]*/
	requirements_NotIn?: string[];
	/*岗位要求 小于*/
	requirements_Lt?: string;
	/*岗位要求 小于等于*/
	requirements_Lte?: string;
	/*岗位要求 大于*/
	requirements_Gt?: string;
	/*岗位要求 大于等于*/
	requirements_Gte?: string;
	/*岗位要求 包含*/
	requirements_Contains?: string;
	/*岗位要求 不包含*/
	requirements_NotContains?: string;
	/*岗位要求 开头等于*/
	requirements_StartsWith?: string;
	/*岗位要求 开头不等于*/
	requirements_NotStartsWith?: string;
	/*岗位要求 结尾等于*/
	requirements_EndsWith?: string;
	/*岗位要求 结尾不等于*/
	requirements_NotEndsWith?: string;
	/*岗位要求*/
	requirements?: string;
	/*岗位状态 不等于*/
	status_Not?: number;
	/*岗位状态 在制定内，如[1,2]*/
	status_In?: number[];
	/*岗位状态 不在制定内,如[1,2]*/
	status_NotIn?: number[];
	/*岗位状态 小于*/
	status_Lt?: number;
	/*岗位状态 小于等于*/
	status_Lte?: number;
	/*岗位状态 大于*/
	status_Gt?: number;
	/*岗位状态 大于等于*/
	status_Gte?: number;
	/*岗位状态*/
	status?: number;
	/*创建日期 不等于*/
	createDate_Not?: string;
	/*创建日期 在制定内，如[1,2]*/
	createDate_In?: string[];
	/*创建日期 不在制定内,如[1,2]*/
	createDate_NotIn?: string[];
	/*创建日期 小于*/
	createDate_Lt?: string;
	/*创建日期 小于等于*/
	createDate_Lte?: string;
	/*创建日期 大于*/
	createDate_Gt?: string;
	/*创建日期 大于等于*/
	createDate_Gte?: string;
	/*创建日期 包含*/
	createDate_Contains?: string;
	/*创建日期 不包含*/
	createDate_NotContains?: string;
	/*创建日期 开头等于*/
	createDate_StartsWith?: string;
	/*创建日期 开头不等于*/
	createDate_NotStartsWith?: string;
	/*创建日期 结尾等于*/
	createDate_EndsWith?: string;
	/*创建日期 结尾不等于*/
	createDate_NotEndsWith?: string;
	/*创建日期*/
	createDate?: string;
	AND?: StationInputWhere[];
	OR?: StationInputWhere[];
	NOT?: StationInputWhere[];
}
export interface StationInputOrder {
	/*岗位序号
排序可选值为ASC或者DESC*/
	id?: string;
	/*岗位标题
排序可选值为ASC或者DESC*/
	title?: string;
	/*岗位描述
排序可选值为ASC或者DESC*/
	desc?: string;
	/*岗位标识码
排序可选值为ASC或者DESC*/
	code?: string;
	/*岗位责任
排序可选值为ASC或者DESC*/
	responsibilities?: string;
	/*岗位要求
排序可选值为ASC或者DESC*/
	requirements?: string;
	/*岗位状态
排序可选值为ASC或者DESC*/
	status?: string;
	/*创建用户
排序可选值为ASC或者DESC*/
	createUser?: string;
	/*创建日期
排序可选值为ASC或者DESC*/
	createDate?: string;
	/*每个岗位有一个部门
排序可选值为ASC或者DESC*/
	department?: string;
	/*某个岗位可以被什么角色使用
排序可选值为ASC或者DESC*/
	canUseRoles?: string;
	users?: string;
	/*一个岗位有一个role group
排序可选值为ASC或者DESC*/
	roleGroup?: string;
}
export interface SafetyScoreRule {
	id?: number;
	/*规则名*/
	title?: string;
	/*代号*/
	code?: string;
	/*分值*/
	score?: number;
	/*是否替换*/
	isReplace?: boolean;
	/*记录*/
	logs?: SafetyScoreLog[];
	getSafetyScoreLogs(__selection?: string): SafetyScoreLog[];
	/*时间*/
	createDate?: number;
}
/*用户安全分扣除记录*/
export interface SafetyScoreLog {
	/*编号*/
	id?: number;
	/*扣除分数*/
	score?: number;
	/*一个安全积分记录有一条用户登录日志*/
	loginLog?: UserLoginLog;
	/*对应规则*/
	rule?: SafetyScoreRule;
	/*用户*/
	user?: User;
	/*时间*/
	createDate?: number;
}
/*用户登录日志表*/
export interface UserLoginLog {
	/*日志编号*/
	id?: number;
	user?: User;
	/*ip地址编号*/
	ip?: string;
	/*设备编号*/
	deviceId?: string;
	/*创建时间*/
	createDate?: number;
	/*一条登录日志有一个扣分日志*/
	scoreLog?: SafetyScoreLog;
}
export interface UserLoginLogInputWhere {
	/*日志编号 不等于*/
	id_Not?: number;
	/*日志编号 在制定内，如[1,2]*/
	id_In?: number[];
	/*日志编号 不在制定内,如[1,2]*/
	id_NotIn?: number[];
	/*日志编号 小于*/
	id_Lt?: number;
	/*日志编号 小于等于*/
	id_Lte?: number;
	/*日志编号 大于*/
	id_Gt?: number;
	/*日志编号 大于等于*/
	id_Gte?: number;
	/*日志编号*/
	id?: number;
	/*ip地址编号 不等于*/
	ip_Not?: string;
	/*ip地址编号 在制定内，如[1,2]*/
	ip_In?: string[];
	/*ip地址编号 不在制定内,如[1,2]*/
	ip_NotIn?: string[];
	/*ip地址编号 小于*/
	ip_Lt?: string;
	/*ip地址编号 小于等于*/
	ip_Lte?: string;
	/*ip地址编号 大于*/
	ip_Gt?: string;
	/*ip地址编号 大于等于*/
	ip_Gte?: string;
	/*ip地址编号 包含*/
	ip_Contains?: string;
	/*ip地址编号 不包含*/
	ip_NotContains?: string;
	/*ip地址编号 开头等于*/
	ip_StartsWith?: string;
	/*ip地址编号 开头不等于*/
	ip_NotStartsWith?: string;
	/*ip地址编号 结尾等于*/
	ip_EndsWith?: string;
	/*ip地址编号 结尾不等于*/
	ip_NotEndsWith?: string;
	/*ip地址编号*/
	ip?: string;
	/*设备编号 不等于*/
	deviceId_Not?: string;
	/*设备编号 在制定内，如[1,2]*/
	deviceId_In?: string[];
	/*设备编号 不在制定内,如[1,2]*/
	deviceId_NotIn?: string[];
	/*设备编号 小于*/
	deviceId_Lt?: string;
	/*设备编号 小于等于*/
	deviceId_Lte?: string;
	/*设备编号 大于*/
	deviceId_Gt?: string;
	/*设备编号 大于等于*/
	deviceId_Gte?: string;
	/*设备编号 包含*/
	deviceId_Contains?: string;
	/*设备编号 不包含*/
	deviceId_NotContains?: string;
	/*设备编号 开头等于*/
	deviceId_StartsWith?: string;
	/*设备编号 开头不等于*/
	deviceId_NotStartsWith?: string;
	/*设备编号 结尾等于*/
	deviceId_EndsWith?: string;
	/*设备编号 结尾不等于*/
	deviceId_NotEndsWith?: string;
	/*设备编号*/
	deviceId?: string;
	/*创建时间 不等于*/
	createDate_Not?: number;
	/*创建时间 在制定内，如[1,2]*/
	createDate_In?: number[];
	/*创建时间 不在制定内,如[1,2]*/
	createDate_NotIn?: number[];
	/*创建时间 小于*/
	createDate_Lt?: number;
	/*创建时间 小于等于*/
	createDate_Lte?: number;
	/*创建时间 大于*/
	createDate_Gt?: number;
	/*创建时间 大于等于*/
	createDate_Gte?: number;
	/*创建时间*/
	createDate?: number;
	AND?: UserLoginLogInputWhere[];
	OR?: UserLoginLogInputWhere[];
	NOT?: UserLoginLogInputWhere[];
}
export interface UserLoginLogInputOrder {
	/*日志编号
排序可选值为ASC或者DESC*/
	id?: string;
	user?: string;
	/*ip地址编号
排序可选值为ASC或者DESC*/
	ip?: string;
	/*设备编号
排序可选值为ASC或者DESC*/
	deviceId?: string;
	/*创建时间
排序可选值为ASC或者DESC*/
	createDate?: string;
	/*一条登录日志有一个扣分日志
排序可选值为ASC或者DESC*/
	scoreLog?: string;
}
export interface SafetyScoreLogInputWhere {
	/*编号 不等于*/
	id_Not?: number;
	/*编号 在制定内，如[1,2]*/
	id_In?: number[];
	/*编号 不在制定内,如[1,2]*/
	id_NotIn?: number[];
	/*编号 小于*/
	id_Lt?: number;
	/*编号 小于等于*/
	id_Lte?: number;
	/*编号 大于*/
	id_Gt?: number;
	/*编号 大于等于*/
	id_Gte?: number;
	/*编号*/
	id?: number;
	/*扣除分数 不等于*/
	score_Not?: number;
	/*扣除分数 在制定内，如[1,2]*/
	score_In?: number[];
	/*扣除分数 不在制定内,如[1,2]*/
	score_NotIn?: number[];
	/*扣除分数 小于*/
	score_Lt?: number;
	/*扣除分数 小于等于*/
	score_Lte?: number;
	/*扣除分数 大于*/
	score_Gt?: number;
	/*扣除分数 大于等于*/
	score_Gte?: number;
	/*扣除分数*/
	score?: number;
	/*时间 不等于*/
	createDate_Not?: number;
	/*时间 在制定内，如[1,2]*/
	createDate_In?: number[];
	/*时间 不在制定内,如[1,2]*/
	createDate_NotIn?: number[];
	/*时间 小于*/
	createDate_Lt?: number;
	/*时间 小于等于*/
	createDate_Lte?: number;
	/*时间 大于*/
	createDate_Gt?: number;
	/*时间 大于等于*/
	createDate_Gte?: number;
	/*时间*/
	createDate?: number;
	AND?: SafetyScoreLogInputWhere[];
	OR?: SafetyScoreLogInputWhere[];
	NOT?: SafetyScoreLogInputWhere[];
}
export interface SafetyScoreLogInputOrder {
	/*编号
排序可选值为ASC或者DESC*/
	id?: string;
	/*扣除分数
排序可选值为ASC或者DESC*/
	score?: string;
	/*一个安全积分记录有一条用户登录日志
排序可选值为ASC或者DESC*/
	loginLog?: string;
	/*对应规则
排序可选值为ASC或者DESC*/
	rule?: string;
	/*用户
排序可选值为ASC或者DESC*/
	user?: string;
	/*时间
排序可选值为ASC或者DESC*/
	createDate?: string;
}
/*用户表*/
export interface User {
	/*用户编号*/
	id?: number;
	/*用户名*/
	username?: string;
	/*邮箱*/
	email?: string;
	/*头像*/
	avatar?: string;
	/*电话号码*/
	mobile?: string;
	/*密码*/
	password?: string;
	/*1: 账户正常 0:未绑定 -1:刚解冻 -2: 已被封*/
	status?: number;
	/*随机码*/
	randomCode?: string;
	/*密码是否被重置*/
	isRestPassword?: boolean;
	/*密码更改时间*/
	passwordDate?: number;
	/*创建时间*/
	createDate?: number;
	/*这个用户的创建人是谁*/
	createUser?: User;
	/*创建人的uid*/
	createUserId?: number;
	createUsers?: User[];
	/*安全分*/
	safetyScore?: number;
	/*用户的代办事项*/
	toDoItems?: ToDoItem[];
	/*发布者*/
	mineToDoItems?: ToDoItem[];
	getToDoItems(where?: ToDoItemInputWhere, order?: ToDoItemInputOrder, limit?: PageLimitInput, __selection?: string): ToDoItem[];
	/*用户岗位*/
	stations?: Station[];
	getStations(where?: StationInputWhere, order?: StationInputOrder, limit?: PageLimitInput, __selection?: string): Station[];
	/*用户的登录记录*/
	loginLogs?: UserLoginLog[];
	getUserLoginLogs(where?: UserLoginLogInputWhere, order?: UserLoginLogInputOrder, limit?: PageLimitInput, __selection?: string): UserLoginLog[];
	/*用户的安全分扣分记录*/
	safetyScoreLogs?: SafetyScoreLog[];
	getSafetyScoreLogs(where?: SafetyScoreLogInputWhere, order?: SafetyScoreLogInputOrder, limit?: PageLimitInput, __selection?: string): SafetyScoreLog[];
	createStations?: Station[];
	getCreateStations(where?: StationInputWhere, order?: StationInputOrder, limit?: PageLimitInput, __selection?: string): Station[];
}
/*岗位表*/
export interface Station {
	/*岗位序号*/
	id?: number;
	/*岗位标题*/
	title?: string;
	/*岗位描述*/
	desc?: string;
	/*岗位标识码*/
	code?: string;
	/*岗位责任*/
	responsibilities?: string;
	/*岗位要求*/
	requirements?: string;
	/*岗位状态*/
	status?: number;
	/*创建用户*/
	createUser?: User;
	/*创建日期*/
	createDate?: string;
	/*每个岗位有一个部门*/
	department?: Department;
	/*某个岗位可以被什么角色使用*/
	canUseRoles?: Role[];
	users?: User[];
	getUsers(__selection?: string): User[];
	/*一个岗位有一个role group*/
	roleGroup?: RoleGroup;
}
/*域*/
export interface Domain {
	id?: number;
	/*域标题*/
	title?: string;
	/*域编号*/
	code?: string;
	/*域状态*/
	status?: number;
	/*创建人*/
	createUser?: number;
	/*创建时间*/
	createDate?: number;
	/*部门*/
	departments?: Department[];
	getDepartments(__selection?: string): Department[];
}
/*部门表*/
export interface Department {
	/*部门编号*/
	id?: number;
	/*部门名称*/
	title?: string;
	/*部门状态*/
	status?: number;
	/*是否显示*/
	shown?: boolean;
	/*上级部门*/
	parent?: Department;
	/*创建时间*/
	createDate?: number;
	/*下级部门*/
	children?: Department[];
	getChildren(__selection?: string): Department[];
	/*一个部门可以有多个岗位*/
	stations?: Station[];
	getStations(__selection?: string): Station[];
	/*域*/
	domain?: Domain;
	domainId?: number;
}