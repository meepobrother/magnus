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

export interface RoleGroupInput {
	relations?: string[];
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
export interface RoleInput {
	relations?: string[];
	/*序号*/
	id?: number;
	/*角色标识*/
	code?: string;
	/*角色名称*/
	title?: string;
	/*status*/
	status?: number;
	/*角色描述*/
	desc?: string;
	/*一个角色可以有多个权限*/
	rights?: SystemRightInput[];
	/*一个角色 可以使用某个岗位的职员*/
	canUseStations?: StationInput[];
	/*创建时间*/
	createDate?: string;
	/*更新时间*/
	updateDate?: string;
	/*一个角色 被那几个角色组使用*/
	group?: RoleGroupInput;
	groupId?: number;
	parent?: RoleInput;
	parentId?: number;
	children?: RoleInput[];
	/*创建人*/
	createUser?: UserInput;
	createUserId?: string;
	mutualRoleIds?: number[];
	basicRoleIds?: number[];
}
export interface SystemRightInput {
	relations?: string[];
	id?: number;
	/*子*/
	children?: SystemRightInput[];
	/*父*/
	parent?: SystemRightInput;
	/*权限类型
页面权限、数据权限、功能权限*/
	type?: string;
	/*权限名*/
	title?: string;
	/*权限代号*/
	code?: string;
	/*权限链接*/
	link?: string;
	/*来源模块*/
	fromSystem?: SystemInput;
	fromSystemId?: number;
	/*可用角色*/
	toRoles?: RoleInput[];
}
export interface SystemEventInput {
	relations?: string[];
	id?: number;
	/*权限名*/
	title?: string;
	/*来源模块*/
	fromSystem?: SystemInput;
	/*代办事项*/
	toDoItems?: ToDoItemInput[];
}
export interface SystemInput {
	relations?: string[];
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
	createDate?: string;
}
export interface ToDoItemInput {
	relations?: string[];
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
	fromUserId?: string;
	/*处理人*/
	toUser?: UserInput;
	toUserId?: string;
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
	createDate?: string;
}
export interface SafetyScoreLogInput {
	relations?: string[];
	/*编号*/
	id?: number;
	/*扣除分数*/
	score?: number;
	/*一个安全积分记录有一条用户登录日志*/
	loginLog?: UserLoginLogInput;
	/*对应规则*/
	rule?: SafetyScoreRuleInput;
	ruleId?: number;
	/*用户*/
	user?: UserInput;
	userId?: number;
	/*时间*/
	createDate?: string;
}
export interface UserLoginLogInput {
	relations?: string[];
	/*日志编号*/
	id?: number;
	user?: UserInput;
	userId?: string;
	/*ip地址编号*/
	ip?: string;
	/*设备编号*/
	deviceId?: string;
	/*创建时间*/
	createDate?: string;
	/*一条登录日志有一个扣分日志*/
	scoreLog?: SafetyScoreLogInput;
}
export interface DomainInput {
	relations?: string[];
	id?: number;
	/*域标题*/
	title?: string;
	/*域编号*/
	code?: string;
	/*域状态*/
	status?: number;
	/*域简称*/
	desc?: string;
	/*创建人*/
	createUser?: UserInput;
	createUserId?: string;
	/*创建时间*/
	createDate?: string;
	/*部门*/
	departments?: DepartmentInput[];
}
export interface UserInput {
	relations?: string[];
	/*用户编号*/
	id?: string;
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
	/*1: 账户正常 0:禁用 -1:刚解冻 3: 刚注册*/
	status?: number;
	/*随机码*/
	randomCode?: string;
	/*密码是否被重置*/
	isRestPassword?: boolean;
	/*密码更改时间*/
	passwordDate?: string;
	/*创建时间*/
	createDate?: string;
	/*这个用户的创建人是谁*/
	createUser?: UserInput;
	/*创建人的uid*/
	createUserId?: string;
	createUsers?: UserInput[];
	/*安全分*/
	safetyScore?: number;
	/*用户的代办事项*/
	toDoItems?: ToDoItemInput[];
	/*发布者*/
	mineToDoItems?: ToDoItemInput[];
	/*用户岗位*/
	stations?: StationInput[];
	deparents?: DepartmentInput[];
	/*用户的登录记录*/
	loginLogs?: UserLoginLogInput[];
	/*用户的安全分扣分记录*/
	safetyScoreLogs?: SafetyScoreLogInput[];
	createStations?: StationInput[];
	departments?: DepartmentInput[];
	createDepartments?: DepartmentInput[];
	createDomains?: DomainInput[];
	createRoles?: RoleInput[];
}
export interface StationInput {
	relations?: string[];
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
	createUserId?: string;
	/*创建日期*/
	createDate?: string;
	/*每个岗位有一个部门*/
	department?: DepartmentInput;
	departmentId?: number;
	/*某个岗位可以被什么角色使用*/
	canUseRoles?: RoleInput[];
	users?: UserInput[];
	/*一个岗位有一个role group*/
	roleGroup?: RoleGroupInput;
	roleGroupId?: number;
}
export interface DepartmentInput {
	relations?: string[];
	/*部门编号*/
	id?: number;
	/*部门名称*/
	title?: string;
	/*部门状态*/
	status?: number;
	/*是否显示*/
	shown?: boolean;
	/*图标*/
	icon?: string;
	/*上级部门*/
	parent?: DepartmentInput;
	parentId?: number;
	/*创建时间*/
	createDate?: string;
	/*下级部门*/
	children?: DepartmentInput[];
	/*一个部门可以有多个岗位*/
	stations?: StationInput[];
	/*域*/
	domain?: DomainInput;
	domainId?: number;
	users?: UserInput[];
	createUser?: UserInput;
	createUserId?: string;
}
export interface DepartmentInputWhere {
	/*部门编号 不等于*/
	id_Not?: number;
	/*部门编号 在制定内，如[1,2]*/
	id_In?: number[];
	/*部门编号 不在制定内,如[1,2]*/
	id_NotIn?: number[];
	/*部门编号 小于*/
	id_Lt?: number;
	/*部门编号 小于等于*/
	id_Lte?: number;
	/*部门编号 大于*/
	id_Gt?: number;
	/*部门编号 大于等于*/
	id_Gte?: number;
	/*部门编号*/
	id?: number;
	/*部门名称 不等于*/
	title_Not?: string;
	/*部门名称 在制定内，如[1,2]*/
	title_In?: string[];
	/*部门名称 不在制定内,如[1,2]*/
	title_NotIn?: string[];
	/*部门名称 小于*/
	title_Lt?: string;
	/*部门名称 小于等于*/
	title_Lte?: string;
	/*部门名称 大于*/
	title_Gt?: string;
	/*部门名称 大于等于*/
	title_Gte?: string;
	/*部门名称 包含*/
	title_Contains?: string;
	/*部门名称 不包含*/
	title_NotContains?: string;
	/*部门名称 开头等于*/
	title_StartsWith?: string;
	/*部门名称 开头不等于*/
	title_NotStartsWith?: string;
	/*部门名称 结尾等于*/
	title_EndsWith?: string;
	/*部门名称 结尾不等于*/
	title_NotEndsWith?: string;
	/*部门名称*/
	title?: string;
	/*部门状态 不等于*/
	status_Not?: number;
	/*部门状态 在制定内，如[1,2]*/
	status_In?: number[];
	/*部门状态 不在制定内,如[1,2]*/
	status_NotIn?: number[];
	/*部门状态 小于*/
	status_Lt?: number;
	/*部门状态 小于等于*/
	status_Lte?: number;
	/*部门状态 大于*/
	status_Gt?: number;
	/*部门状态 大于等于*/
	status_Gte?: number;
	/*部门状态*/
	status?: number;
	/*图标 不等于*/
	icon_Not?: string;
	/*图标 在制定内，如[1,2]*/
	icon_In?: string[];
	/*图标 不在制定内,如[1,2]*/
	icon_NotIn?: string[];
	/*图标 小于*/
	icon_Lt?: string;
	/*图标 小于等于*/
	icon_Lte?: string;
	/*图标 大于*/
	icon_Gt?: string;
	/*图标 大于等于*/
	icon_Gte?: string;
	/*图标 包含*/
	icon_Contains?: string;
	/*图标 不包含*/
	icon_NotContains?: string;
	/*图标 开头等于*/
	icon_StartsWith?: string;
	/*图标 开头不等于*/
	icon_NotStartsWith?: string;
	/*图标 结尾等于*/
	icon_EndsWith?: string;
	/*图标 结尾不等于*/
	icon_NotEndsWith?: string;
	/*图标*/
	icon?: string;
	/**/
	parentId_Not?: number;
	/**/
	parentId_In?: number[];
	/**/
	parentId_NotIn?: number[];
	/**/
	parentId_Lt?: number;
	/**/
	parentId_Lte?: number;
	/**/
	parentId_Gt?: number;
	/**/
	parentId_Gte?: number;
	parentId?: number;
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
	domainId_Not?: number;
	/**/
	domainId_In?: number[];
	/**/
	domainId_NotIn?: number[];
	/**/
	domainId_Lt?: number;
	/**/
	domainId_Lte?: number;
	/**/
	domainId_Gt?: number;
	/**/
	domainId_Gte?: number;
	domainId?: number;
	/**/
	createUserId_Not?: string;
	/**/
	createUserId_In?: string[];
	/**/
	createUserId_NotIn?: string[];
	/**/
	createUserId_Lt?: string;
	/**/
	createUserId_Lte?: string;
	/**/
	createUserId_Gt?: string;
	/**/
	createUserId_Gte?: string;
	/**/
	createUserId_Contains?: string;
	/**/
	createUserId_NotContains?: string;
	/**/
	createUserId_StartsWith?: string;
	/**/
	createUserId_NotStartsWith?: string;
	/**/
	createUserId_EndsWith?: string;
	/**/
	createUserId_NotEndsWith?: string;
	createUserId?: string;
	AND?: DepartmentInputWhere[];
	OR?: DepartmentInputWhere[];
	NOT?: DepartmentInputWhere[];
}
export interface DepartmentInputOrder {
	relations?: string;
	/*部门编号
排序可选值为ASC或者DESC*/
	id?: string;
	/*部门名称
排序可选值为ASC或者DESC*/
	title?: string;
	/*部门状态
排序可选值为ASC或者DESC*/
	status?: string;
	/*是否显示
排序可选值为ASC或者DESC*/
	shown?: string;
	/*图标
排序可选值为ASC或者DESC*/
	icon?: string;
	/*上级部门
排序可选值为ASC或者DESC*/
	parent?: string;
	parentId?: string;
	/*创建时间
排序可选值为ASC或者DESC*/
	createDate?: string;
	/*下级部门
排序可选值为ASC或者DESC*/
	children?: string;
	/*一个部门可以有多个岗位
排序可选值为ASC或者DESC*/
	stations?: string;
	/*域
排序可选值为ASC或者DESC*/
	domain?: string;
	domainId?: string;
	users?: string;
	createUser?: string;
	createUserId?: string;
}
export interface PageLimitInput {
/*页码*/	page?: number;
/*每页数量*/	psize?: number;
}
export interface UserInputWhere {
	/*用户编号 不等于*/
	id_Not?: string;
	/*用户编号 在制定内，如[1,2]*/
	id_In?: string[];
	/*用户编号 不在制定内,如[1,2]*/
	id_NotIn?: string[];
	/*用户编号 小于*/
	id_Lt?: string;
	/*用户编号 小于等于*/
	id_Lte?: string;
	/*用户编号 大于*/
	id_Gt?: string;
	/*用户编号 大于等于*/
	id_Gte?: string;
	/*用户编号 包含*/
	id_Contains?: string;
	/*用户编号 不包含*/
	id_NotContains?: string;
	/*用户编号 开头等于*/
	id_StartsWith?: string;
	/*用户编号 开头不等于*/
	id_NotStartsWith?: string;
	/*用户编号 结尾等于*/
	id_EndsWith?: string;
	/*用户编号 结尾不等于*/
	id_NotEndsWith?: string;
	/*用户编号*/
	id?: string;
	/*用户名 不等于*/
	username_Not?: string;
	/*用户名 在制定内，如[1,2]*/
	username_In?: string[];
	/*用户名 不在制定内,如[1,2]*/
	username_NotIn?: string[];
	/*用户名 小于*/
	username_Lt?: string;
	/*用户名 小于等于*/
	username_Lte?: string;
	/*用户名 大于*/
	username_Gt?: string;
	/*用户名 大于等于*/
	username_Gte?: string;
	/*用户名 包含*/
	username_Contains?: string;
	/*用户名 不包含*/
	username_NotContains?: string;
	/*用户名 开头等于*/
	username_StartsWith?: string;
	/*用户名 开头不等于*/
	username_NotStartsWith?: string;
	/*用户名 结尾等于*/
	username_EndsWith?: string;
	/*用户名 结尾不等于*/
	username_NotEndsWith?: string;
	/*用户名*/
	username?: string;
	/*邮箱 不等于*/
	email_Not?: string;
	/*邮箱 在制定内，如[1,2]*/
	email_In?: string[];
	/*邮箱 不在制定内,如[1,2]*/
	email_NotIn?: string[];
	/*邮箱 小于*/
	email_Lt?: string;
	/*邮箱 小于等于*/
	email_Lte?: string;
	/*邮箱 大于*/
	email_Gt?: string;
	/*邮箱 大于等于*/
	email_Gte?: string;
	/*邮箱 包含*/
	email_Contains?: string;
	/*邮箱 不包含*/
	email_NotContains?: string;
	/*邮箱 开头等于*/
	email_StartsWith?: string;
	/*邮箱 开头不等于*/
	email_NotStartsWith?: string;
	/*邮箱 结尾等于*/
	email_EndsWith?: string;
	/*邮箱 结尾不等于*/
	email_NotEndsWith?: string;
	/*邮箱*/
	email?: string;
	/*头像 不等于*/
	avatar_Not?: string;
	/*头像 在制定内，如[1,2]*/
	avatar_In?: string[];
	/*头像 不在制定内,如[1,2]*/
	avatar_NotIn?: string[];
	/*头像 小于*/
	avatar_Lt?: string;
	/*头像 小于等于*/
	avatar_Lte?: string;
	/*头像 大于*/
	avatar_Gt?: string;
	/*头像 大于等于*/
	avatar_Gte?: string;
	/*头像 包含*/
	avatar_Contains?: string;
	/*头像 不包含*/
	avatar_NotContains?: string;
	/*头像 开头等于*/
	avatar_StartsWith?: string;
	/*头像 开头不等于*/
	avatar_NotStartsWith?: string;
	/*头像 结尾等于*/
	avatar_EndsWith?: string;
	/*头像 结尾不等于*/
	avatar_NotEndsWith?: string;
	/*头像*/
	avatar?: string;
	/*电话号码 不等于*/
	mobile_Not?: string;
	/*电话号码 在制定内，如[1,2]*/
	mobile_In?: string[];
	/*电话号码 不在制定内,如[1,2]*/
	mobile_NotIn?: string[];
	/*电话号码 小于*/
	mobile_Lt?: string;
	/*电话号码 小于等于*/
	mobile_Lte?: string;
	/*电话号码 大于*/
	mobile_Gt?: string;
	/*电话号码 大于等于*/
	mobile_Gte?: string;
	/*电话号码 包含*/
	mobile_Contains?: string;
	/*电话号码 不包含*/
	mobile_NotContains?: string;
	/*电话号码 开头等于*/
	mobile_StartsWith?: string;
	/*电话号码 开头不等于*/
	mobile_NotStartsWith?: string;
	/*电话号码 结尾等于*/
	mobile_EndsWith?: string;
	/*电话号码 结尾不等于*/
	mobile_NotEndsWith?: string;
	/*电话号码*/
	mobile?: string;
	/*密码 不等于*/
	password_Not?: string;
	/*密码 在制定内，如[1,2]*/
	password_In?: string[];
	/*密码 不在制定内,如[1,2]*/
	password_NotIn?: string[];
	/*密码 小于*/
	password_Lt?: string;
	/*密码 小于等于*/
	password_Lte?: string;
	/*密码 大于*/
	password_Gt?: string;
	/*密码 大于等于*/
	password_Gte?: string;
	/*密码 包含*/
	password_Contains?: string;
	/*密码 不包含*/
	password_NotContains?: string;
	/*密码 开头等于*/
	password_StartsWith?: string;
	/*密码 开头不等于*/
	password_NotStartsWith?: string;
	/*密码 结尾等于*/
	password_EndsWith?: string;
	/*密码 结尾不等于*/
	password_NotEndsWith?: string;
	/*密码*/
	password?: string;
	/*1: 账户正常 0:禁用 -1:刚解冻 3: 刚注册 不等于*/
	status_Not?: number;
	/*1: 账户正常 0:禁用 -1:刚解冻 3: 刚注册 在制定内，如[1,2]*/
	status_In?: number[];
	/*1: 账户正常 0:禁用 -1:刚解冻 3: 刚注册 不在制定内,如[1,2]*/
	status_NotIn?: number[];
	/*1: 账户正常 0:禁用 -1:刚解冻 3: 刚注册 小于*/
	status_Lt?: number;
	/*1: 账户正常 0:禁用 -1:刚解冻 3: 刚注册 小于等于*/
	status_Lte?: number;
	/*1: 账户正常 0:禁用 -1:刚解冻 3: 刚注册 大于*/
	status_Gt?: number;
	/*1: 账户正常 0:禁用 -1:刚解冻 3: 刚注册 大于等于*/
	status_Gte?: number;
	/*1: 账户正常 0:禁用 -1:刚解冻 3: 刚注册*/
	status?: number;
	/*随机码 不等于*/
	randomCode_Not?: string;
	/*随机码 在制定内，如[1,2]*/
	randomCode_In?: string[];
	/*随机码 不在制定内,如[1,2]*/
	randomCode_NotIn?: string[];
	/*随机码 小于*/
	randomCode_Lt?: string;
	/*随机码 小于等于*/
	randomCode_Lte?: string;
	/*随机码 大于*/
	randomCode_Gt?: string;
	/*随机码 大于等于*/
	randomCode_Gte?: string;
	/*随机码 包含*/
	randomCode_Contains?: string;
	/*随机码 不包含*/
	randomCode_NotContains?: string;
	/*随机码 开头等于*/
	randomCode_StartsWith?: string;
	/*随机码 开头不等于*/
	randomCode_NotStartsWith?: string;
	/*随机码 结尾等于*/
	randomCode_EndsWith?: string;
	/*随机码 结尾不等于*/
	randomCode_NotEndsWith?: string;
	/*随机码*/
	randomCode?: string;
	/*密码更改时间 不等于*/
	passwordDate_Not?: string;
	/*密码更改时间 在制定内，如[1,2]*/
	passwordDate_In?: string[];
	/*密码更改时间 不在制定内,如[1,2]*/
	passwordDate_NotIn?: string[];
	/*密码更改时间 小于*/
	passwordDate_Lt?: string;
	/*密码更改时间 小于等于*/
	passwordDate_Lte?: string;
	/*密码更改时间 大于*/
	passwordDate_Gt?: string;
	/*密码更改时间 大于等于*/
	passwordDate_Gte?: string;
	/*密码更改时间 包含*/
	passwordDate_Contains?: string;
	/*密码更改时间 不包含*/
	passwordDate_NotContains?: string;
	/*密码更改时间 开头等于*/
	passwordDate_StartsWith?: string;
	/*密码更改时间 开头不等于*/
	passwordDate_NotStartsWith?: string;
	/*密码更改时间 结尾等于*/
	passwordDate_EndsWith?: string;
	/*密码更改时间 结尾不等于*/
	passwordDate_NotEndsWith?: string;
	/*密码更改时间*/
	passwordDate?: string;
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
	/*创建人的uid 不等于*/
	createUserId_Not?: string;
	/*创建人的uid 在制定内，如[1,2]*/
	createUserId_In?: string[];
	/*创建人的uid 不在制定内,如[1,2]*/
	createUserId_NotIn?: string[];
	/*创建人的uid 小于*/
	createUserId_Lt?: string;
	/*创建人的uid 小于等于*/
	createUserId_Lte?: string;
	/*创建人的uid 大于*/
	createUserId_Gt?: string;
	/*创建人的uid 大于等于*/
	createUserId_Gte?: string;
	/*创建人的uid 包含*/
	createUserId_Contains?: string;
	/*创建人的uid 不包含*/
	createUserId_NotContains?: string;
	/*创建人的uid 开头等于*/
	createUserId_StartsWith?: string;
	/*创建人的uid 开头不等于*/
	createUserId_NotStartsWith?: string;
	/*创建人的uid 结尾等于*/
	createUserId_EndsWith?: string;
	/*创建人的uid 结尾不等于*/
	createUserId_NotEndsWith?: string;
	/*创建人的uid*/
	createUserId?: string;
	/*安全分 不等于*/
	safetyScore_Not?: number;
	/*安全分 在制定内，如[1,2]*/
	safetyScore_In?: number[];
	/*安全分 不在制定内,如[1,2]*/
	safetyScore_NotIn?: number[];
	/*安全分 小于*/
	safetyScore_Lt?: number;
	/*安全分 小于等于*/
	safetyScore_Lte?: number;
	/*安全分 大于*/
	safetyScore_Gt?: number;
	/*安全分 大于等于*/
	safetyScore_Gte?: number;
	/*安全分*/
	safetyScore?: number;
	AND?: UserInputWhere[];
	OR?: UserInputWhere[];
	NOT?: UserInputWhere[];
}
export interface UserInputOrder {
	relations?: string;
	/*用户编号
排序可选值为ASC或者DESC*/
	id?: string;
	/*用户名
排序可选值为ASC或者DESC*/
	username?: string;
	/*邮箱
排序可选值为ASC或者DESC*/
	email?: string;
	/*头像
排序可选值为ASC或者DESC*/
	avatar?: string;
	/*电话号码
排序可选值为ASC或者DESC*/
	mobile?: string;
	/*密码
排序可选值为ASC或者DESC*/
	password?: string;
	/*1: 账户正常 0:禁用 -1:刚解冻 3: 刚注册
排序可选值为ASC或者DESC*/
	status?: string;
	/*随机码
排序可选值为ASC或者DESC*/
	randomCode?: string;
	/*密码是否被重置
排序可选值为ASC或者DESC*/
	isRestPassword?: string;
	/*密码更改时间
排序可选值为ASC或者DESC*/
	passwordDate?: string;
	/*创建时间
排序可选值为ASC或者DESC*/
	createDate?: string;
	/*这个用户的创建人是谁
排序可选值为ASC或者DESC*/
	createUser?: string;
	/*创建人的uid
排序可选值为ASC或者DESC*/
	createUserId?: string;
	createUsers?: string;
	/*安全分
排序可选值为ASC或者DESC*/
	safetyScore?: string;
	/*用户的代办事项
排序可选值为ASC或者DESC*/
	toDoItems?: string;
	/*发布者
排序可选值为ASC或者DESC*/
	mineToDoItems?: string;
	/*用户岗位
排序可选值为ASC或者DESC*/
	stations?: string;
	deparents?: string;
	/*用户的登录记录
排序可选值为ASC或者DESC*/
	loginLogs?: string;
	/*用户的安全分扣分记录
排序可选值为ASC或者DESC*/
	safetyScoreLogs?: string;
	createStations?: string;
	departments?: string;
	createDepartments?: string;
	createDomains?: string;
	createRoles?: string;
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
	/**/
	createUserId_Not?: string;
	/**/
	createUserId_In?: string[];
	/**/
	createUserId_NotIn?: string[];
	/**/
	createUserId_Lt?: string;
	/**/
	createUserId_Lte?: string;
	/**/
	createUserId_Gt?: string;
	/**/
	createUserId_Gte?: string;
	/**/
	createUserId_Contains?: string;
	/**/
	createUserId_NotContains?: string;
	/**/
	createUserId_StartsWith?: string;
	/**/
	createUserId_NotStartsWith?: string;
	/**/
	createUserId_EndsWith?: string;
	/**/
	createUserId_NotEndsWith?: string;
	createUserId?: string;
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
	/**/
	departmentId_Not?: number;
	/**/
	departmentId_In?: number[];
	/**/
	departmentId_NotIn?: number[];
	/**/
	departmentId_Lt?: number;
	/**/
	departmentId_Lte?: number;
	/**/
	departmentId_Gt?: number;
	/**/
	departmentId_Gte?: number;
	departmentId?: number;
	/**/
	roleGroupId_Not?: number;
	/**/
	roleGroupId_In?: number[];
	/**/
	roleGroupId_NotIn?: number[];
	/**/
	roleGroupId_Lt?: number;
	/**/
	roleGroupId_Lte?: number;
	/**/
	roleGroupId_Gt?: number;
	/**/
	roleGroupId_Gte?: number;
	roleGroupId?: number;
	AND?: StationInputWhere[];
	OR?: StationInputWhere[];
	NOT?: StationInputWhere[];
}
export interface StationInputOrder {
	relations?: string;
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
	createUserId?: string;
	/*创建日期
排序可选值为ASC或者DESC*/
	createDate?: string;
	/*每个岗位有一个部门
排序可选值为ASC或者DESC*/
	department?: string;
	departmentId?: string;
	/*某个岗位可以被什么角色使用
排序可选值为ASC或者DESC*/
	canUseRoles?: string;
	users?: string;
	/*一个岗位有一个role group
排序可选值为ASC或者DESC*/
	roleGroup?: string;
	roleGroupId?: string;
}
export interface RoleInputWhere {
	/*序号 不等于*/
	id_Not?: number;
	/*序号 在制定内，如[1,2]*/
	id_In?: number[];
	/*序号 不在制定内,如[1,2]*/
	id_NotIn?: number[];
	/*序号 小于*/
	id_Lt?: number;
	/*序号 小于等于*/
	id_Lte?: number;
	/*序号 大于*/
	id_Gt?: number;
	/*序号 大于等于*/
	id_Gte?: number;
	/*序号*/
	id?: number;
	/*角色标识 不等于*/
	code_Not?: string;
	/*角色标识 在制定内，如[1,2]*/
	code_In?: string[];
	/*角色标识 不在制定内,如[1,2]*/
	code_NotIn?: string[];
	/*角色标识 小于*/
	code_Lt?: string;
	/*角色标识 小于等于*/
	code_Lte?: string;
	/*角色标识 大于*/
	code_Gt?: string;
	/*角色标识 大于等于*/
	code_Gte?: string;
	/*角色标识 包含*/
	code_Contains?: string;
	/*角色标识 不包含*/
	code_NotContains?: string;
	/*角色标识 开头等于*/
	code_StartsWith?: string;
	/*角色标识 开头不等于*/
	code_NotStartsWith?: string;
	/*角色标识 结尾等于*/
	code_EndsWith?: string;
	/*角色标识 结尾不等于*/
	code_NotEndsWith?: string;
	/*角色标识*/
	code?: string;
	/*角色名称 不等于*/
	title_Not?: string;
	/*角色名称 在制定内，如[1,2]*/
	title_In?: string[];
	/*角色名称 不在制定内,如[1,2]*/
	title_NotIn?: string[];
	/*角色名称 小于*/
	title_Lt?: string;
	/*角色名称 小于等于*/
	title_Lte?: string;
	/*角色名称 大于*/
	title_Gt?: string;
	/*角色名称 大于等于*/
	title_Gte?: string;
	/*角色名称 包含*/
	title_Contains?: string;
	/*角色名称 不包含*/
	title_NotContains?: string;
	/*角色名称 开头等于*/
	title_StartsWith?: string;
	/*角色名称 开头不等于*/
	title_NotStartsWith?: string;
	/*角色名称 结尾等于*/
	title_EndsWith?: string;
	/*角色名称 结尾不等于*/
	title_NotEndsWith?: string;
	/*角色名称*/
	title?: string;
	/*status 不等于*/
	status_Not?: number;
	/*status 在制定内，如[1,2]*/
	status_In?: number[];
	/*status 不在制定内,如[1,2]*/
	status_NotIn?: number[];
	/*status 小于*/
	status_Lt?: number;
	/*status 小于等于*/
	status_Lte?: number;
	/*status 大于*/
	status_Gt?: number;
	/*status 大于等于*/
	status_Gte?: number;
	/*status*/
	status?: number;
	/*角色描述 不等于*/
	desc_Not?: string;
	/*角色描述 在制定内，如[1,2]*/
	desc_In?: string[];
	/*角色描述 不在制定内,如[1,2]*/
	desc_NotIn?: string[];
	/*角色描述 小于*/
	desc_Lt?: string;
	/*角色描述 小于等于*/
	desc_Lte?: string;
	/*角色描述 大于*/
	desc_Gt?: string;
	/*角色描述 大于等于*/
	desc_Gte?: string;
	/*角色描述 包含*/
	desc_Contains?: string;
	/*角色描述 不包含*/
	desc_NotContains?: string;
	/*角色描述 开头等于*/
	desc_StartsWith?: string;
	/*角色描述 开头不等于*/
	desc_NotStartsWith?: string;
	/*角色描述 结尾等于*/
	desc_EndsWith?: string;
	/*角色描述 结尾不等于*/
	desc_NotEndsWith?: string;
	/*角色描述*/
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
	/*更新时间 不等于*/
	updateDate_Not?: string;
	/*更新时间 在制定内，如[1,2]*/
	updateDate_In?: string[];
	/*更新时间 不在制定内,如[1,2]*/
	updateDate_NotIn?: string[];
	/*更新时间 小于*/
	updateDate_Lt?: string;
	/*更新时间 小于等于*/
	updateDate_Lte?: string;
	/*更新时间 大于*/
	updateDate_Gt?: string;
	/*更新时间 大于等于*/
	updateDate_Gte?: string;
	/*更新时间 包含*/
	updateDate_Contains?: string;
	/*更新时间 不包含*/
	updateDate_NotContains?: string;
	/*更新时间 开头等于*/
	updateDate_StartsWith?: string;
	/*更新时间 开头不等于*/
	updateDate_NotStartsWith?: string;
	/*更新时间 结尾等于*/
	updateDate_EndsWith?: string;
	/*更新时间 结尾不等于*/
	updateDate_NotEndsWith?: string;
	/*更新时间*/
	updateDate?: string;
	/**/
	groupId_Not?: number;
	/**/
	groupId_In?: number[];
	/**/
	groupId_NotIn?: number[];
	/**/
	groupId_Lt?: number;
	/**/
	groupId_Lte?: number;
	/**/
	groupId_Gt?: number;
	/**/
	groupId_Gte?: number;
	groupId?: number;
	/**/
	parentId_Not?: number;
	/**/
	parentId_In?: number[];
	/**/
	parentId_NotIn?: number[];
	/**/
	parentId_Lt?: number;
	/**/
	parentId_Lte?: number;
	/**/
	parentId_Gt?: number;
	/**/
	parentId_Gte?: number;
	parentId?: number;
	/**/
	createUserId_Not?: string;
	/**/
	createUserId_In?: string[];
	/**/
	createUserId_NotIn?: string[];
	/**/
	createUserId_Lt?: string;
	/**/
	createUserId_Lte?: string;
	/**/
	createUserId_Gt?: string;
	/**/
	createUserId_Gte?: string;
	/**/
	createUserId_Contains?: string;
	/**/
	createUserId_NotContains?: string;
	/**/
	createUserId_StartsWith?: string;
	/**/
	createUserId_NotStartsWith?: string;
	/**/
	createUserId_EndsWith?: string;
	/**/
	createUserId_NotEndsWith?: string;
	createUserId?: string;
	AND?: RoleInputWhere[];
	OR?: RoleInputWhere[];
	NOT?: RoleInputWhere[];
}
export interface RoleInputOrder {
	relations?: string;
	/*序号
排序可选值为ASC或者DESC*/
	id?: string;
	/*角色标识
排序可选值为ASC或者DESC*/
	code?: string;
	/*角色名称
排序可选值为ASC或者DESC*/
	title?: string;
	/*status
排序可选值为ASC或者DESC*/
	status?: string;
	/*角色描述
排序可选值为ASC或者DESC*/
	desc?: string;
	/*一个角色可以有多个权限
排序可选值为ASC或者DESC*/
	rights?: string;
	/*一个角色 可以使用某个岗位的职员
排序可选值为ASC或者DESC*/
	canUseStations?: string;
	/*创建时间
排序可选值为ASC或者DESC*/
	createDate?: string;
	/*更新时间
排序可选值为ASC或者DESC*/
	updateDate?: string;
	/*一个角色 被那几个角色组使用
排序可选值为ASC或者DESC*/
	group?: string;
	groupId?: string;
	parent?: string;
	parentId?: string;
	children?: string;
	/*创建人
排序可选值为ASC或者DESC*/
	createUser?: string;
	createUserId?: string;
	mutualRoleIds?: string;
	basicRoleIds?: string;
}
export interface RoleGroup {
	relations?: string[];
	id?: number;
	/*角色组名*/
	title?: string;
	/*角色组简介*/
	desc?: string;
	/*拥有角色*/
	roles?: Role[];
	getRoles(where?: RoleInputWhere, order?: RoleInputOrder, limit?: PageLimitInput, __selection?: string): Role[];
	/*用到此角色组的岗位*/
	stations?: Station[];
	getStations(where?: StationInputWhere, order?: StationInputOrder, limit?: PageLimitInput, __selection?: string): Station[];
}
/*角色表*/
export interface Role {
	relations?: string[];
	/*序号*/
	id?: number;
	/*角色标识*/
	code?: string;
	/*角色名称*/
	title?: string;
	/*status*/
	status?: number;
	/*角色描述*/
	desc?: string;
	/*一个角色可以有多个权限*/
	rights?: SystemRight[];
	addRight(rightId: number, __selection?: string): boolean;
	deleteRight(rightId: number, __selection?: string): boolean;
	/*一个角色 可以使用某个岗位的职员*/
	canUseStations?: Station[];
	/*取的时候必须有id
例子:
```graphql
{
getDepartment(entity: {id: 4}) {
	  id,
	  title,
getAllUsers(where: {}){
	  id,
	  avatar
	  }
  	}
}
```*/
	getCanUseStations(where?: StationInputWhere, order?: StationInputOrder, limit?: PageLimitInput, __selection?: string): Station[];
	/*创建时间*/
	createDate?: string;
	/*更新时间*/
	updateDate?: string;
	/*一个角色 被那几个角色组使用*/
	group?: RoleGroup;
	groupId?: number;
	parent?: Role;
	parentId?: number;
	children?: Role[];
	getChildren(where?: RoleInputWhere, order?: RoleInputOrder, limit?: PageLimitInput, __selection?: string): Role[];
	/*创建人*/
	createUser?: User;
	createUserId?: string;
	getCreateUser(__selection?: string): User;
	mutualRoleIds?: number[];
	/*获取角色的所有互斥角色,取得时候必须有id!!!*/
	getMutualRoles(where?: RoleInputWhere, order?: RoleInputOrder, limit?: PageLimitInput, __selection?: string): Role[];
	basicRoleIds?: number[];
	/*获取角色的所有基础角色,取得时候必须有id!!!*/
	getBasicRoles(where?: RoleInputWhere, order?: RoleInputOrder, limit?: PageLimitInput, __selection?: string): Role[];
	/*添加基础角色*/
	addBasicRole(/*基础角色的id*/ids: number[], __selection?: string): Role;
	/*添加互斥角色*/
	addMutualRole(/*互斥角色的id*/ids: number[], __selection?: string): Role;
}
/*模块来源权限*/
export interface SystemRight {
	relations?: string[];
	id?: number;
	/*子*/
	children?: SystemRight[];
	/*父*/
	parent?: SystemRight;
	/*权限类型
页面权限、数据权限、功能权限*/
	type?: string;
	/*权限名*/
	title?: string;
	/*权限代号*/
	code?: string;
	/*权限链接*/
	link?: string;
	/*来源模块*/
	fromSystem?: System;
	fromSystemId?: number;
	/*可用角色*/
	toRoles?: Role[];
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
	fromUserId_Not?: string;
	/**/
	fromUserId_In?: string[];
	/**/
	fromUserId_NotIn?: string[];
	/**/
	fromUserId_Lt?: string;
	/**/
	fromUserId_Lte?: string;
	/**/
	fromUserId_Gt?: string;
	/**/
	fromUserId_Gte?: string;
	/**/
	fromUserId_Contains?: string;
	/**/
	fromUserId_NotContains?: string;
	/**/
	fromUserId_StartsWith?: string;
	/**/
	fromUserId_NotStartsWith?: string;
	/**/
	fromUserId_EndsWith?: string;
	/**/
	fromUserId_NotEndsWith?: string;
	fromUserId?: string;
	/**/
	toUserId_Not?: string;
	/**/
	toUserId_In?: string[];
	/**/
	toUserId_NotIn?: string[];
	/**/
	toUserId_Lt?: string;
	/**/
	toUserId_Lte?: string;
	/**/
	toUserId_Gt?: string;
	/**/
	toUserId_Gte?: string;
	/**/
	toUserId_Contains?: string;
	/**/
	toUserId_NotContains?: string;
	/**/
	toUserId_StartsWith?: string;
	/**/
	toUserId_NotStartsWith?: string;
	/**/
	toUserId_EndsWith?: string;
	/**/
	toUserId_NotEndsWith?: string;
	toUserId?: string;
	AND?: ToDoItemInputWhere[];
	OR?: ToDoItemInputWhere[];
	NOT?: ToDoItemInputWhere[];
}
export interface ToDoItemInputOrder {
	relations?: string;
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
/*模块事件类型*/
export interface SystemEvent {
	relations?: string[];
	id?: number;
	/*权限名*/
	title?: string;
	/*来源模块*/
	fromSystem?: System;
	/*代办事项*/
	toDoItems?: ToDoItem[];
	getToDoItems(where?: ToDoItemInputWhere, order?: ToDoItemInputOrder, limit?: PageLimitInput, __selection?: string): ToDoItem[];
}
export interface SystemEventInputWhere {
	/**/
	id_Not?: number;
	/**/
	id_In?: number[];
	/**/
	id_NotIn?: number[];
	/**/
	id_Lt?: number;
	/**/
	id_Lte?: number;
	/**/
	id_Gt?: number;
	/**/
	id_Gte?: number;
	id?: number;
	/*权限名 不等于*/
	title_Not?: string;
	/*权限名 在制定内，如[1,2]*/
	title_In?: string[];
	/*权限名 不在制定内,如[1,2]*/
	title_NotIn?: string[];
	/*权限名 小于*/
	title_Lt?: string;
	/*权限名 小于等于*/
	title_Lte?: string;
	/*权限名 大于*/
	title_Gt?: string;
	/*权限名 大于等于*/
	title_Gte?: string;
	/*权限名 包含*/
	title_Contains?: string;
	/*权限名 不包含*/
	title_NotContains?: string;
	/*权限名 开头等于*/
	title_StartsWith?: string;
	/*权限名 开头不等于*/
	title_NotStartsWith?: string;
	/*权限名 结尾等于*/
	title_EndsWith?: string;
	/*权限名 结尾不等于*/
	title_NotEndsWith?: string;
	/*权限名*/
	title?: string;
	AND?: SystemEventInputWhere[];
	OR?: SystemEventInputWhere[];
	NOT?: SystemEventInputWhere[];
}
export interface SystemEventInputOrder {
	relations?: string;
	id?: string;
	/*权限名
排序可选值为ASC或者DESC*/
	title?: string;
	/*来源模块
排序可选值为ASC或者DESC*/
	fromSystem?: string;
	/*代办事项
排序可选值为ASC或者DESC*/
	toDoItems?: string;
}
/*子系统 子模块*/
export interface System {
	relations?: string[];
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
	getRights(__selection?: string): SystemRight[];
	/*模块事件*/
	events?: SystemEvent[];
	getEvents(where?: SystemEventInputWhere, order?: SystemEventInputOrder, limit?: PageLimitInput, __selection?: string): SystemEvent[];
	/*代办事项*/
	toDoItems?: ToDoItem[];
	getToDoItems(where?: ToDoItemInputWhere, order?: ToDoItemInputOrder, limit?: PageLimitInput, __selection?: string): ToDoItem[];
	/*配置时间*/
	createDate?: string;
}
export interface ToDoItem {
	relations?: string[];
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
	fromUserId?: string;
	/*处理人*/
	toUser?: User;
	toUserId?: string;
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
	/**/
	ruleId_Not?: number;
	/**/
	ruleId_In?: number[];
	/**/
	ruleId_NotIn?: number[];
	/**/
	ruleId_Lt?: number;
	/**/
	ruleId_Lte?: number;
	/**/
	ruleId_Gt?: number;
	/**/
	ruleId_Gte?: number;
	ruleId?: number;
	/**/
	userId_Not?: number;
	/**/
	userId_In?: number[];
	/**/
	userId_NotIn?: number[];
	/**/
	userId_Lt?: number;
	/**/
	userId_Lte?: number;
	/**/
	userId_Gt?: number;
	/**/
	userId_Gte?: number;
	userId?: number;
	/*时间 不等于*/
	createDate_Not?: string;
	/*时间 在制定内，如[1,2]*/
	createDate_In?: string[];
	/*时间 不在制定内,如[1,2]*/
	createDate_NotIn?: string[];
	/*时间 小于*/
	createDate_Lt?: string;
	/*时间 小于等于*/
	createDate_Lte?: string;
	/*时间 大于*/
	createDate_Gt?: string;
	/*时间 大于等于*/
	createDate_Gte?: string;
	/*时间 包含*/
	createDate_Contains?: string;
	/*时间 不包含*/
	createDate_NotContains?: string;
	/*时间 开头等于*/
	createDate_StartsWith?: string;
	/*时间 开头不等于*/
	createDate_NotStartsWith?: string;
	/*时间 结尾等于*/
	createDate_EndsWith?: string;
	/*时间 结尾不等于*/
	createDate_NotEndsWith?: string;
	/*时间*/
	createDate?: string;
	AND?: SafetyScoreLogInputWhere[];
	OR?: SafetyScoreLogInputWhere[];
	NOT?: SafetyScoreLogInputWhere[];
}
export interface SafetyScoreLogInputOrder {
	relations?: string;
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
	ruleId?: string;
	/*用户
排序可选值为ASC或者DESC*/
	user?: string;
	userId?: string;
	/*时间
排序可选值为ASC或者DESC*/
	createDate?: string;
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
	getLogs(where?: SafetyScoreLogInputWhere, order?: SafetyScoreLogInputOrder, limit?: PageLimitInput, __selection?: string): SafetyScoreLog[];
	/*时间*/
	createDate?: string;
}
/*用户安全分扣除记录*/
export interface SafetyScoreLog {
	relations?: string[];
	/*编号*/
	id?: number;
	/*扣除分数*/
	score?: number;
	/*一个安全积分记录有一条用户登录日志*/
	loginLog?: UserLoginLog;
	/*对应规则*/
	rule?: SafetyScoreRule;
	ruleId?: number;
	/*用户*/
	user?: User;
	userId?: number;
	/*时间*/
	createDate?: string;
}
/*用户登录日志表*/
export interface UserLoginLog {
	relations?: string[];
	/*日志编号*/
	id?: number;
	user?: User;
	userId?: string;
	/*ip地址编号*/
	ip?: string;
	/*设备编号*/
	deviceId?: string;
	/*创建时间*/
	createDate?: string;
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
	/**/
	userId_Not?: string;
	/**/
	userId_In?: string[];
	/**/
	userId_NotIn?: string[];
	/**/
	userId_Lt?: string;
	/**/
	userId_Lte?: string;
	/**/
	userId_Gt?: string;
	/**/
	userId_Gte?: string;
	/**/
	userId_Contains?: string;
	/**/
	userId_NotContains?: string;
	/**/
	userId_StartsWith?: string;
	/**/
	userId_NotStartsWith?: string;
	/**/
	userId_EndsWith?: string;
	/**/
	userId_NotEndsWith?: string;
	userId?: string;
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
	AND?: UserLoginLogInputWhere[];
	OR?: UserLoginLogInputWhere[];
	NOT?: UserLoginLogInputWhere[];
}
export interface UserLoginLogInputOrder {
	relations?: string;
	/*日志编号
排序可选值为ASC或者DESC*/
	id?: string;
	user?: string;
	userId?: string;
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
/*域*/
export interface Domain {
	relations?: string[];
	id?: number;
	/*域标题*/
	title?: string;
	/*域编号*/
	code?: string;
	/*域状态*/
	status?: number;
	/*域简称*/
	desc?: string;
	/*创建人*/
	createUser?: User;
	getCreateUser(__selection?: string): User;
	createUserId?: string;
	/*创建时间*/
	createDate?: string;
	/*部门*/
	departments?: Department[];
	getDepartments(where?: DepartmentInputWhere, order?: DepartmentInputOrder, limit?: PageLimitInput, __selection?: string): Department[];
}
export interface DomainInputWhere {
	/**/
	id_Not?: number;
	/**/
	id_In?: number[];
	/**/
	id_NotIn?: number[];
	/**/
	id_Lt?: number;
	/**/
	id_Lte?: number;
	/**/
	id_Gt?: number;
	/**/
	id_Gte?: number;
	id?: number;
	/*域标题 不等于*/
	title_Not?: string;
	/*域标题 在制定内，如[1,2]*/
	title_In?: string[];
	/*域标题 不在制定内,如[1,2]*/
	title_NotIn?: string[];
	/*域标题 小于*/
	title_Lt?: string;
	/*域标题 小于等于*/
	title_Lte?: string;
	/*域标题 大于*/
	title_Gt?: string;
	/*域标题 大于等于*/
	title_Gte?: string;
	/*域标题 包含*/
	title_Contains?: string;
	/*域标题 不包含*/
	title_NotContains?: string;
	/*域标题 开头等于*/
	title_StartsWith?: string;
	/*域标题 开头不等于*/
	title_NotStartsWith?: string;
	/*域标题 结尾等于*/
	title_EndsWith?: string;
	/*域标题 结尾不等于*/
	title_NotEndsWith?: string;
	/*域标题*/
	title?: string;
	/*域编号 不等于*/
	code_Not?: string;
	/*域编号 在制定内，如[1,2]*/
	code_In?: string[];
	/*域编号 不在制定内,如[1,2]*/
	code_NotIn?: string[];
	/*域编号 小于*/
	code_Lt?: string;
	/*域编号 小于等于*/
	code_Lte?: string;
	/*域编号 大于*/
	code_Gt?: string;
	/*域编号 大于等于*/
	code_Gte?: string;
	/*域编号 包含*/
	code_Contains?: string;
	/*域编号 不包含*/
	code_NotContains?: string;
	/*域编号 开头等于*/
	code_StartsWith?: string;
	/*域编号 开头不等于*/
	code_NotStartsWith?: string;
	/*域编号 结尾等于*/
	code_EndsWith?: string;
	/*域编号 结尾不等于*/
	code_NotEndsWith?: string;
	/*域编号*/
	code?: string;
	/*域状态 不等于*/
	status_Not?: number;
	/*域状态 在制定内，如[1,2]*/
	status_In?: number[];
	/*域状态 不在制定内,如[1,2]*/
	status_NotIn?: number[];
	/*域状态 小于*/
	status_Lt?: number;
	/*域状态 小于等于*/
	status_Lte?: number;
	/*域状态 大于*/
	status_Gt?: number;
	/*域状态 大于等于*/
	status_Gte?: number;
	/*域状态*/
	status?: number;
	/*域简称 不等于*/
	desc_Not?: string;
	/*域简称 在制定内，如[1,2]*/
	desc_In?: string[];
	/*域简称 不在制定内,如[1,2]*/
	desc_NotIn?: string[];
	/*域简称 小于*/
	desc_Lt?: string;
	/*域简称 小于等于*/
	desc_Lte?: string;
	/*域简称 大于*/
	desc_Gt?: string;
	/*域简称 大于等于*/
	desc_Gte?: string;
	/*域简称 包含*/
	desc_Contains?: string;
	/*域简称 不包含*/
	desc_NotContains?: string;
	/*域简称 开头等于*/
	desc_StartsWith?: string;
	/*域简称 开头不等于*/
	desc_NotStartsWith?: string;
	/*域简称 结尾等于*/
	desc_EndsWith?: string;
	/*域简称 结尾不等于*/
	desc_NotEndsWith?: string;
	/*域简称*/
	desc?: string;
	/**/
	createUserId_Not?: string;
	/**/
	createUserId_In?: string[];
	/**/
	createUserId_NotIn?: string[];
	/**/
	createUserId_Lt?: string;
	/**/
	createUserId_Lte?: string;
	/**/
	createUserId_Gt?: string;
	/**/
	createUserId_Gte?: string;
	/**/
	createUserId_Contains?: string;
	/**/
	createUserId_NotContains?: string;
	/**/
	createUserId_StartsWith?: string;
	/**/
	createUserId_NotStartsWith?: string;
	/**/
	createUserId_EndsWith?: string;
	/**/
	createUserId_NotEndsWith?: string;
	createUserId?: string;
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
	AND?: DomainInputWhere[];
	OR?: DomainInputWhere[];
	NOT?: DomainInputWhere[];
}
export interface DomainInputOrder {
	relations?: string;
	id?: string;
	/*域标题
排序可选值为ASC或者DESC*/
	title?: string;
	/*域编号
排序可选值为ASC或者DESC*/
	code?: string;
	/*域状态
排序可选值为ASC或者DESC*/
	status?: string;
	/*域简称
排序可选值为ASC或者DESC*/
	desc?: string;
	/*创建人
排序可选值为ASC或者DESC*/
	createUser?: string;
	createUserId?: string;
	/*创建时间
排序可选值为ASC或者DESC*/
	createDate?: string;
	/*部门
排序可选值为ASC或者DESC*/
	departments?: string;
}
/*用户表*/
export interface User {
	relations?: string[];
	/*用户编号*/
	id?: string;
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
	/*1: 账户正常 0:禁用 -1:刚解冻 3: 刚注册*/
	status?: number;
	/*随机码*/
	randomCode?: string;
	/*密码是否被重置*/
	isRestPassword?: boolean;
	/*密码更改时间*/
	passwordDate?: string;
	/*创建时间*/
	createDate?: string;
	/*这个用户的创建人是谁*/
	createUser?: User;
	getCreateUser(__selection?: string): User;
	/*创建人的uid*/
	createUserId?: string;
	createUsers?: User[];
	getCreateUsers(where?: UserInputWhere, order?: UserInputOrder, limit?: PageLimitInput, __selection?: string): User[];
	/*安全分*/
	safetyScore?: number;
	/*用户的代办事项*/
	toDoItems?: ToDoItem[];
	getToDoItems(where?: ToDoItemInputWhere, order?: ToDoItemInputOrder, limit?: PageLimitInput, __selection?: string): ToDoItem[];
	/*发布者*/
	mineToDoItems?: ToDoItem[];
	/*用户岗位*/
	stations?: Station[];
	deparents?: Department[];
	/*取的时候必须有id
例子:
```graphql
{
getDepartment(entity: {id: 4}) {
	  id,
	  title,
getAllUsers(where: {}){
	  id,
	  avatar
	  }
  	}
}
```*/
	getStations(where?: StationInputWhere, order?: StationInputOrder, limit?: PageLimitInput, __selection?: string): Station[];
	/*用户的登录记录*/
	loginLogs?: UserLoginLog[];
	getUserLoginLogs(where?: UserLoginLogInputWhere, order?: UserLoginLogInputOrder, limit?: PageLimitInput, __selection?: string): UserLoginLog[];
	/*用户的安全分扣分记录*/
	safetyScoreLogs?: SafetyScoreLog[];
	getSafetyScoreLogs(where?: SafetyScoreLogInputWhere, order?: SafetyScoreLogInputOrder, limit?: PageLimitInput, __selection?: string): SafetyScoreLog[];
	createStations?: Station[];
	getCreateStations(where?: StationInputWhere, order?: StationInputOrder, limit?: PageLimitInput, __selection?: string): Station[];
	departments?: Department[];
	createDepartments?: Department[];
	getCreateDepartments(where?: DepartmentInputWhere, order?: DepartmentInputOrder, limit?: PageLimitInput, __selection?: string): Department[];
	/*取的时候必须有id
例子:
```graphql
{
getDepartment(entity: {id: 4}) {
	  id,
	  title,
getAllUsers(where: {}){
	  id,
	  avatar
	  }
  	}
}
```*/
	getAllDepartments(where?: DepartmentInputWhere, order?: DepartmentInputOrder, limit?: PageLimitInput, __selection?: string): Department[];
	createDomains?: Domain[];
	getCreateDomains(where?: DomainInputWhere, order?: DomainInputOrder, limit?: PageLimitInput, __selection?: string): Domain[];
	createRoles?: Role[];
	getCreateRoles(where?: RoleInputWhere, order?: RoleInputOrder, limit?: PageLimitInput, __selection?: string): Role[];
}
/*岗位表*/
export interface Station {
	relations?: string[];
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
	createUserId?: string;
	/*创建日期*/
	createDate?: string;
	/*每个岗位有一个部门*/
	department?: Department;
	departmentId?: number;
	/*某个岗位可以被什么角色使用*/
	canUseRoles?: Role[];
	/*取的时候必须有id
例子:
```graphql
{
getDepartment(entity: {id: 4}) {
	  id,
	  title,
getAllUsers(where: {}){
	  id,
	  avatar
	  }
  	}
}
```*/
	getCanUseRoles(where?: RoleInputWhere, order?: RoleInputOrder, limit?: PageLimitInput, __selection?: string): Role[];
	users?: User[];
	/*取的时候必须有id
例子:
```graphql
{
getDepartment(entity: {id: 4}) {
	  id,
	  title,
getAllUsers(where: {}){
	  id,
	  avatar
	  }
  	}
}
```*/
	getUsers(where?: UserInputWhere, order?: UserInputOrder, limit?: PageLimitInput, __selection?: string): User[];
	addUser(uid: number, __selection?: string): boolean;
	deleteUser(uid: number, __selection?: string): boolean;
	/*一个岗位有一个role group*/
	roleGroup?: RoleGroup;
	roleGroupId?: number;
}
/*部门表*/
export interface Department {
	relations?: string[];
	/*部门编号*/
	id?: number;
	/*部门名称*/
	title?: string;
	/*部门状态*/
	status?: number;
	/*是否显示*/
	shown?: boolean;
	/*图标*/
	icon?: string;
	/*上级部门*/
	parent?: Department;
	parentId?: number;
	/*创建时间*/
	createDate?: string;
	/*下级部门*/
	children?: Department[];
	getChildren(where?: DepartmentInputWhere, order?: DepartmentInputOrder, limit?: PageLimitInput, __selection?: string): Department[];
	/*一个部门可以有多个岗位*/
	stations?: Station[];
	getStations(where?: StationInputWhere, order?: StationInputOrder, limit?: PageLimitInput, __selection?: string): Station[];
	/*域*/
	domain?: Domain;
	domainId?: number;
	users?: User[];
	createUser?: User;
	createUserId?: string;
	/*取的时候必须有id
例子:
```graphql
{
getDepartment(entity: {id: 4}) {
	  id,
	  title,
getAllUsers(where: {}){
	  id,
	  avatar
	  }
  	}
}
```*/
	getAllUsers(where?: UserInputWhere, order?: UserInputOrder, limit?: PageLimitInput, __selection?: string): User[];
}
export interface Menu {
	relations?: string[];
	id?: number;
	title?: string;
	icon?: string;
	link?: string;
	status?: number;
	createDate?: string;
	parent?: Menu;
	children?: Menu[];
}
export interface RoleGroupInputWhere {
	/**/
	id_Not?: number;
	/**/
	id_In?: number[];
	/**/
	id_NotIn?: number[];
	/**/
	id_Lt?: number;
	/**/
	id_Lte?: number;
	/**/
	id_Gt?: number;
	/**/
	id_Gte?: number;
	id?: number;
	/*角色组名 不等于*/
	title_Not?: string;
	/*角色组名 在制定内，如[1,2]*/
	title_In?: string[];
	/*角色组名 不在制定内,如[1,2]*/
	title_NotIn?: string[];
	/*角色组名 小于*/
	title_Lt?: string;
	/*角色组名 小于等于*/
	title_Lte?: string;
	/*角色组名 大于*/
	title_Gt?: string;
	/*角色组名 大于等于*/
	title_Gte?: string;
	/*角色组名 包含*/
	title_Contains?: string;
	/*角色组名 不包含*/
	title_NotContains?: string;
	/*角色组名 开头等于*/
	title_StartsWith?: string;
	/*角色组名 开头不等于*/
	title_NotStartsWith?: string;
	/*角色组名 结尾等于*/
	title_EndsWith?: string;
	/*角色组名 结尾不等于*/
	title_NotEndsWith?: string;
	/*角色组名*/
	title?: string;
	/*角色组简介 不等于*/
	desc_Not?: string;
	/*角色组简介 在制定内，如[1,2]*/
	desc_In?: string[];
	/*角色组简介 不在制定内,如[1,2]*/
	desc_NotIn?: string[];
	/*角色组简介 小于*/
	desc_Lt?: string;
	/*角色组简介 小于等于*/
	desc_Lte?: string;
	/*角色组简介 大于*/
	desc_Gt?: string;
	/*角色组简介 大于等于*/
	desc_Gte?: string;
	/*角色组简介 包含*/
	desc_Contains?: string;
	/*角色组简介 不包含*/
	desc_NotContains?: string;
	/*角色组简介 开头等于*/
	desc_StartsWith?: string;
	/*角色组简介 开头不等于*/
	desc_NotStartsWith?: string;
	/*角色组简介 结尾等于*/
	desc_EndsWith?: string;
	/*角色组简介 结尾不等于*/
	desc_NotEndsWith?: string;
	/*角色组简介*/
	desc?: string;
	AND?: RoleGroupInputWhere[];
	OR?: RoleGroupInputWhere[];
	NOT?: RoleGroupInputWhere[];
}
export interface SafetyScoreRuleInputWhere {
	/**/
	id_Not?: number;
	/**/
	id_In?: number[];
	/**/
	id_NotIn?: number[];
	/**/
	id_Lt?: number;
	/**/
	id_Lte?: number;
	/**/
	id_Gt?: number;
	/**/
	id_Gte?: number;
	id?: number;
	/*规则名 不等于*/
	title_Not?: string;
	/*规则名 在制定内，如[1,2]*/
	title_In?: string[];
	/*规则名 不在制定内,如[1,2]*/
	title_NotIn?: string[];
	/*规则名 小于*/
	title_Lt?: string;
	/*规则名 小于等于*/
	title_Lte?: string;
	/*规则名 大于*/
	title_Gt?: string;
	/*规则名 大于等于*/
	title_Gte?: string;
	/*规则名 包含*/
	title_Contains?: string;
	/*规则名 不包含*/
	title_NotContains?: string;
	/*规则名 开头等于*/
	title_StartsWith?: string;
	/*规则名 开头不等于*/
	title_NotStartsWith?: string;
	/*规则名 结尾等于*/
	title_EndsWith?: string;
	/*规则名 结尾不等于*/
	title_NotEndsWith?: string;
	/*规则名*/
	title?: string;
	/*代号 不等于*/
	code_Not?: string;
	/*代号 在制定内，如[1,2]*/
	code_In?: string[];
	/*代号 不在制定内,如[1,2]*/
	code_NotIn?: string[];
	/*代号 小于*/
	code_Lt?: string;
	/*代号 小于等于*/
	code_Lte?: string;
	/*代号 大于*/
	code_Gt?: string;
	/*代号 大于等于*/
	code_Gte?: string;
	/*代号 包含*/
	code_Contains?: string;
	/*代号 不包含*/
	code_NotContains?: string;
	/*代号 开头等于*/
	code_StartsWith?: string;
	/*代号 开头不等于*/
	code_NotStartsWith?: string;
	/*代号 结尾等于*/
	code_EndsWith?: string;
	/*代号 结尾不等于*/
	code_NotEndsWith?: string;
	/*代号*/
	code?: string;
	/*分值 不等于*/
	score_Not?: number;
	/*分值 在制定内，如[1,2]*/
	score_In?: number[];
	/*分值 不在制定内,如[1,2]*/
	score_NotIn?: number[];
	/*分值 小于*/
	score_Lt?: number;
	/*分值 小于等于*/
	score_Lte?: number;
	/*分值 大于*/
	score_Gt?: number;
	/*分值 大于等于*/
	score_Gte?: number;
	/*分值*/
	score?: number;
	/*时间 不等于*/
	createDate_Not?: string;
	/*时间 在制定内，如[1,2]*/
	createDate_In?: string[];
	/*时间 不在制定内,如[1,2]*/
	createDate_NotIn?: string[];
	/*时间 小于*/
	createDate_Lt?: string;
	/*时间 小于等于*/
	createDate_Lte?: string;
	/*时间 大于*/
	createDate_Gt?: string;
	/*时间 大于等于*/
	createDate_Gte?: string;
	/*时间 包含*/
	createDate_Contains?: string;
	/*时间 不包含*/
	createDate_NotContains?: string;
	/*时间 开头等于*/
	createDate_StartsWith?: string;
	/*时间 开头不等于*/
	createDate_NotStartsWith?: string;
	/*时间 结尾等于*/
	createDate_EndsWith?: string;
	/*时间 结尾不等于*/
	createDate_NotEndsWith?: string;
	/*时间*/
	createDate?: string;
	AND?: SafetyScoreRuleInputWhere[];
	OR?: SafetyScoreRuleInputWhere[];
	NOT?: SafetyScoreRuleInputWhere[];
}
export interface SystemRightInputWhere {
	/**/
	id_Not?: number;
	/**/
	id_In?: number[];
	/**/
	id_NotIn?: number[];
	/**/
	id_Lt?: number;
	/**/
	id_Lte?: number;
	/**/
	id_Gt?: number;
	/**/
	id_Gte?: number;
	id?: number;
	/*权限类型
页面权限、数据权限、功能权限 不等于*/
	type_Not?: string;
	/*权限类型
页面权限、数据权限、功能权限 在制定内，如[1,2]*/
	type_In?: string[];
	/*权限类型
页面权限、数据权限、功能权限 不在制定内,如[1,2]*/
	type_NotIn?: string[];
	/*权限类型
页面权限、数据权限、功能权限 小于*/
	type_Lt?: string;
	/*权限类型
页面权限、数据权限、功能权限 小于等于*/
	type_Lte?: string;
	/*权限类型
页面权限、数据权限、功能权限 大于*/
	type_Gt?: string;
	/*权限类型
页面权限、数据权限、功能权限 大于等于*/
	type_Gte?: string;
	/*权限类型
页面权限、数据权限、功能权限 包含*/
	type_Contains?: string;
	/*权限类型
页面权限、数据权限、功能权限 不包含*/
	type_NotContains?: string;
	/*权限类型
页面权限、数据权限、功能权限 开头等于*/
	type_StartsWith?: string;
	/*权限类型
页面权限、数据权限、功能权限 开头不等于*/
	type_NotStartsWith?: string;
	/*权限类型
页面权限、数据权限、功能权限 结尾等于*/
	type_EndsWith?: string;
	/*权限类型
页面权限、数据权限、功能权限 结尾不等于*/
	type_NotEndsWith?: string;
	/*权限类型
页面权限、数据权限、功能权限*/
	type?: string;
	/*权限名 不等于*/
	title_Not?: string;
	/*权限名 在制定内，如[1,2]*/
	title_In?: string[];
	/*权限名 不在制定内,如[1,2]*/
	title_NotIn?: string[];
	/*权限名 小于*/
	title_Lt?: string;
	/*权限名 小于等于*/
	title_Lte?: string;
	/*权限名 大于*/
	title_Gt?: string;
	/*权限名 大于等于*/
	title_Gte?: string;
	/*权限名 包含*/
	title_Contains?: string;
	/*权限名 不包含*/
	title_NotContains?: string;
	/*权限名 开头等于*/
	title_StartsWith?: string;
	/*权限名 开头不等于*/
	title_NotStartsWith?: string;
	/*权限名 结尾等于*/
	title_EndsWith?: string;
	/*权限名 结尾不等于*/
	title_NotEndsWith?: string;
	/*权限名*/
	title?: string;
	/*权限代号 不等于*/
	code_Not?: string;
	/*权限代号 在制定内，如[1,2]*/
	code_In?: string[];
	/*权限代号 不在制定内,如[1,2]*/
	code_NotIn?: string[];
	/*权限代号 小于*/
	code_Lt?: string;
	/*权限代号 小于等于*/
	code_Lte?: string;
	/*权限代号 大于*/
	code_Gt?: string;
	/*权限代号 大于等于*/
	code_Gte?: string;
	/*权限代号 包含*/
	code_Contains?: string;
	/*权限代号 不包含*/
	code_NotContains?: string;
	/*权限代号 开头等于*/
	code_StartsWith?: string;
	/*权限代号 开头不等于*/
	code_NotStartsWith?: string;
	/*权限代号 结尾等于*/
	code_EndsWith?: string;
	/*权限代号 结尾不等于*/
	code_NotEndsWith?: string;
	/*权限代号*/
	code?: string;
	/*权限链接 不等于*/
	link_Not?: string;
	/*权限链接 在制定内，如[1,2]*/
	link_In?: string[];
	/*权限链接 不在制定内,如[1,2]*/
	link_NotIn?: string[];
	/*权限链接 小于*/
	link_Lt?: string;
	/*权限链接 小于等于*/
	link_Lte?: string;
	/*权限链接 大于*/
	link_Gt?: string;
	/*权限链接 大于等于*/
	link_Gte?: string;
	/*权限链接 包含*/
	link_Contains?: string;
	/*权限链接 不包含*/
	link_NotContains?: string;
	/*权限链接 开头等于*/
	link_StartsWith?: string;
	/*权限链接 开头不等于*/
	link_NotStartsWith?: string;
	/*权限链接 结尾等于*/
	link_EndsWith?: string;
	/*权限链接 结尾不等于*/
	link_NotEndsWith?: string;
	/*权限链接*/
	link?: string;
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
	AND?: SystemRightInputWhere[];
	OR?: SystemRightInputWhere[];
	NOT?: SystemRightInputWhere[];
}
export interface SystemInputWhere {
	/**/
	id_Not?: number;
	/**/
	id_In?: number[];
	/**/
	id_NotIn?: number[];
	/**/
	id_Lt?: number;
	/**/
	id_Lte?: number;
	/**/
	id_Gt?: number;
	/**/
	id_Gte?: number;
	id?: number;
	/*模块名 不等于*/
	title_Not?: string;
	/*模块名 在制定内，如[1,2]*/
	title_In?: string[];
	/*模块名 不在制定内,如[1,2]*/
	title_NotIn?: string[];
	/*模块名 小于*/
	title_Lt?: string;
	/*模块名 小于等于*/
	title_Lte?: string;
	/*模块名 大于*/
	title_Gt?: string;
	/*模块名 大于等于*/
	title_Gte?: string;
	/*模块名 包含*/
	title_Contains?: string;
	/*模块名 不包含*/
	title_NotContains?: string;
	/*模块名 开头等于*/
	title_StartsWith?: string;
	/*模块名 开头不等于*/
	title_NotStartsWith?: string;
	/*模块名 结尾等于*/
	title_EndsWith?: string;
	/*模块名 结尾不等于*/
	title_NotEndsWith?: string;
	/*模块名*/
	title?: string;
	/*系统缩略图片 不等于*/
	image_Not?: string;
	/*系统缩略图片 在制定内，如[1,2]*/
	image_In?: string[];
	/*系统缩略图片 不在制定内,如[1,2]*/
	image_NotIn?: string[];
	/*系统缩略图片 小于*/
	image_Lt?: string;
	/*系统缩略图片 小于等于*/
	image_Lte?: string;
	/*系统缩略图片 大于*/
	image_Gt?: string;
	/*系统缩略图片 大于等于*/
	image_Gte?: string;
	/*系统缩略图片 包含*/
	image_Contains?: string;
	/*系统缩略图片 不包含*/
	image_NotContains?: string;
	/*系统缩略图片 开头等于*/
	image_StartsWith?: string;
	/*系统缩略图片 开头不等于*/
	image_NotStartsWith?: string;
	/*系统缩略图片 结尾等于*/
	image_EndsWith?: string;
	/*系统缩略图片 结尾不等于*/
	image_NotEndsWith?: string;
	/*系统缩略图片*/
	image?: string;
	/*首页链接 不等于*/
	link_Not?: string;
	/*首页链接 在制定内，如[1,2]*/
	link_In?: string[];
	/*首页链接 不在制定内,如[1,2]*/
	link_NotIn?: string[];
	/*首页链接 小于*/
	link_Lt?: string;
	/*首页链接 小于等于*/
	link_Lte?: string;
	/*首页链接 大于*/
	link_Gt?: string;
	/*首页链接 大于等于*/
	link_Gte?: string;
	/*首页链接 包含*/
	link_Contains?: string;
	/*首页链接 不包含*/
	link_NotContains?: string;
	/*首页链接 开头等于*/
	link_StartsWith?: string;
	/*首页链接 开头不等于*/
	link_NotStartsWith?: string;
	/*首页链接 结尾等于*/
	link_EndsWith?: string;
	/*首页链接 结尾不等于*/
	link_NotEndsWith?: string;
	/*首页链接*/
	link?: string;
	/*模块代号 不等于*/
	code_Not?: string;
	/*模块代号 在制定内，如[1,2]*/
	code_In?: string[];
	/*模块代号 不在制定内,如[1,2]*/
	code_NotIn?: string[];
	/*模块代号 小于*/
	code_Lt?: string;
	/*模块代号 小于等于*/
	code_Lte?: string;
	/*模块代号 大于*/
	code_Gt?: string;
	/*模块代号 大于等于*/
	code_Gte?: string;
	/*模块代号 包含*/
	code_Contains?: string;
	/*模块代号 不包含*/
	code_NotContains?: string;
	/*模块代号 开头等于*/
	code_StartsWith?: string;
	/*模块代号 开头不等于*/
	code_NotStartsWith?: string;
	/*模块代号 结尾等于*/
	code_EndsWith?: string;
	/*模块代号 结尾不等于*/
	code_NotEndsWith?: string;
	/*模块代号*/
	code?: string;
	/*配置时间 不等于*/
	createDate_Not?: string;
	/*配置时间 在制定内，如[1,2]*/
	createDate_In?: string[];
	/*配置时间 不在制定内,如[1,2]*/
	createDate_NotIn?: string[];
	/*配置时间 小于*/
	createDate_Lt?: string;
	/*配置时间 小于等于*/
	createDate_Lte?: string;
	/*配置时间 大于*/
	createDate_Gt?: string;
	/*配置时间 大于等于*/
	createDate_Gte?: string;
	/*配置时间 包含*/
	createDate_Contains?: string;
	/*配置时间 不包含*/
	createDate_NotContains?: string;
	/*配置时间 开头等于*/
	createDate_StartsWith?: string;
	/*配置时间 开头不等于*/
	createDate_NotStartsWith?: string;
	/*配置时间 结尾等于*/
	createDate_EndsWith?: string;
	/*配置时间 结尾不等于*/
	createDate_NotEndsWith?: string;
	/*配置时间*/
	createDate?: string;
	AND?: SystemInputWhere[];
	OR?: SystemInputWhere[];
	NOT?: SystemInputWhere[];
}
export interface MenuInput {
	relations?: string[];
	id?: number;
	title?: string;
	icon?: string;
	link?: string;
	status?: number;
	createDate?: string;
	parent?: MenuInput;
	children?: MenuInput[];
}
export interface MenuInputWhere {
	/**/
	id_Not?: number;
	/**/
	id_In?: number[];
	/**/
	id_NotIn?: number[];
	/**/
	id_Lt?: number;
	/**/
	id_Lte?: number;
	/**/
	id_Gt?: number;
	/**/
	id_Gte?: number;
	id?: number;
	/**/
	title_Not?: string;
	/**/
	title_In?: string[];
	/**/
	title_NotIn?: string[];
	/**/
	title_Lt?: string;
	/**/
	title_Lte?: string;
	/**/
	title_Gt?: string;
	/**/
	title_Gte?: string;
	/**/
	title_Contains?: string;
	/**/
	title_NotContains?: string;
	/**/
	title_StartsWith?: string;
	/**/
	title_NotStartsWith?: string;
	/**/
	title_EndsWith?: string;
	/**/
	title_NotEndsWith?: string;
	title?: string;
	/**/
	icon_Not?: string;
	/**/
	icon_In?: string[];
	/**/
	icon_NotIn?: string[];
	/**/
	icon_Lt?: string;
	/**/
	icon_Lte?: string;
	/**/
	icon_Gt?: string;
	/**/
	icon_Gte?: string;
	/**/
	icon_Contains?: string;
	/**/
	icon_NotContains?: string;
	/**/
	icon_StartsWith?: string;
	/**/
	icon_NotStartsWith?: string;
	/**/
	icon_EndsWith?: string;
	/**/
	icon_NotEndsWith?: string;
	icon?: string;
	/**/
	link_Not?: string;
	/**/
	link_In?: string[];
	/**/
	link_NotIn?: string[];
	/**/
	link_Lt?: string;
	/**/
	link_Lte?: string;
	/**/
	link_Gt?: string;
	/**/
	link_Gte?: string;
	/**/
	link_Contains?: string;
	/**/
	link_NotContains?: string;
	/**/
	link_StartsWith?: string;
	/**/
	link_NotStartsWith?: string;
	/**/
	link_EndsWith?: string;
	/**/
	link_NotEndsWith?: string;
	link?: string;
	/**/
	status_Not?: number;
	/**/
	status_In?: number[];
	/**/
	status_NotIn?: number[];
	/**/
	status_Lt?: number;
	/**/
	status_Lte?: number;
	/**/
	status_Gt?: number;
	/**/
	status_Gte?: number;
	status?: number;
	/**/
	createDate_Not?: string;
	/**/
	createDate_In?: string[];
	/**/
	createDate_NotIn?: string[];
	/**/
	createDate_Lt?: string;
	/**/
	createDate_Lte?: string;
	/**/
	createDate_Gt?: string;
	/**/
	createDate_Gte?: string;
	/**/
	createDate_Contains?: string;
	/**/
	createDate_NotContains?: string;
	/**/
	createDate_StartsWith?: string;
	/**/
	createDate_NotStartsWith?: string;
	/**/
	createDate_EndsWith?: string;
	/**/
	createDate_NotEndsWith?: string;
	createDate?: string;
	AND?: MenuInputWhere[];
	OR?: MenuInputWhere[];
	NOT?: MenuInputWhere[];
}
export interface CasbinRule {
	/*规则编号*/
	id?: number;
	/*类型*/
	ptype?: string;
	/*v0*/
	v0?: string;
	/*v1*/
	v1?: string;
	/*v2*/
	v2?: string;
	/*v3*/
	v3?: string;
	/*v4*/
	v4?: string;
	/*v5*/
	v5?: string;
}
export interface CasbinRuleInput {
	/*规则编号*/
	id?: number;
	/*类型*/
	ptype?: string;
	/*v0*/
	v0?: string;
	/*v1*/
	v1?: string;
	/*v2*/
	v2?: string;
	/*v3*/
	v3?: string;
	/*v4*/
	v4?: string;
	/*v5*/
	v5?: string;
}
export interface CasbinRuleInputWhere {
	/*规则编号 不等于*/
	id_Not?: number;
	/*规则编号 在制定内，如[1,2]*/
	id_In?: number[];
	/*规则编号 不在制定内,如[1,2]*/
	id_NotIn?: number[];
	/*规则编号 小于*/
	id_Lt?: number;
	/*规则编号 小于等于*/
	id_Lte?: number;
	/*规则编号 大于*/
	id_Gt?: number;
	/*规则编号 大于等于*/
	id_Gte?: number;
	/*规则编号*/
	id?: number;
	/*类型 不等于*/
	ptype_Not?: string;
	/*类型 在制定内，如[1,2]*/
	ptype_In?: string[];
	/*类型 不在制定内,如[1,2]*/
	ptype_NotIn?: string[];
	/*类型 小于*/
	ptype_Lt?: string;
	/*类型 小于等于*/
	ptype_Lte?: string;
	/*类型 大于*/
	ptype_Gt?: string;
	/*类型 大于等于*/
	ptype_Gte?: string;
	/*类型 包含*/
	ptype_Contains?: string;
	/*类型 不包含*/
	ptype_NotContains?: string;
	/*类型 开头等于*/
	ptype_StartsWith?: string;
	/*类型 开头不等于*/
	ptype_NotStartsWith?: string;
	/*类型 结尾等于*/
	ptype_EndsWith?: string;
	/*类型 结尾不等于*/
	ptype_NotEndsWith?: string;
	/*类型*/
	ptype?: string;
	/*v0 不等于*/
	v0_Not?: string;
	/*v0 在制定内，如[1,2]*/
	v0_In?: string[];
	/*v0 不在制定内,如[1,2]*/
	v0_NotIn?: string[];
	/*v0 小于*/
	v0_Lt?: string;
	/*v0 小于等于*/
	v0_Lte?: string;
	/*v0 大于*/
	v0_Gt?: string;
	/*v0 大于等于*/
	v0_Gte?: string;
	/*v0 包含*/
	v0_Contains?: string;
	/*v0 不包含*/
	v0_NotContains?: string;
	/*v0 开头等于*/
	v0_StartsWith?: string;
	/*v0 开头不等于*/
	v0_NotStartsWith?: string;
	/*v0 结尾等于*/
	v0_EndsWith?: string;
	/*v0 结尾不等于*/
	v0_NotEndsWith?: string;
	/*v0*/
	v0?: string;
	/*v1 不等于*/
	v1_Not?: string;
	/*v1 在制定内，如[1,2]*/
	v1_In?: string[];
	/*v1 不在制定内,如[1,2]*/
	v1_NotIn?: string[];
	/*v1 小于*/
	v1_Lt?: string;
	/*v1 小于等于*/
	v1_Lte?: string;
	/*v1 大于*/
	v1_Gt?: string;
	/*v1 大于等于*/
	v1_Gte?: string;
	/*v1 包含*/
	v1_Contains?: string;
	/*v1 不包含*/
	v1_NotContains?: string;
	/*v1 开头等于*/
	v1_StartsWith?: string;
	/*v1 开头不等于*/
	v1_NotStartsWith?: string;
	/*v1 结尾等于*/
	v1_EndsWith?: string;
	/*v1 结尾不等于*/
	v1_NotEndsWith?: string;
	/*v1*/
	v1?: string;
	/*v2 不等于*/
	v2_Not?: string;
	/*v2 在制定内，如[1,2]*/
	v2_In?: string[];
	/*v2 不在制定内,如[1,2]*/
	v2_NotIn?: string[];
	/*v2 小于*/
	v2_Lt?: string;
	/*v2 小于等于*/
	v2_Lte?: string;
	/*v2 大于*/
	v2_Gt?: string;
	/*v2 大于等于*/
	v2_Gte?: string;
	/*v2 包含*/
	v2_Contains?: string;
	/*v2 不包含*/
	v2_NotContains?: string;
	/*v2 开头等于*/
	v2_StartsWith?: string;
	/*v2 开头不等于*/
	v2_NotStartsWith?: string;
	/*v2 结尾等于*/
	v2_EndsWith?: string;
	/*v2 结尾不等于*/
	v2_NotEndsWith?: string;
	/*v2*/
	v2?: string;
	/*v3 不等于*/
	v3_Not?: string;
	/*v3 在制定内，如[1,2]*/
	v3_In?: string[];
	/*v3 不在制定内,如[1,2]*/
	v3_NotIn?: string[];
	/*v3 小于*/
	v3_Lt?: string;
	/*v3 小于等于*/
	v3_Lte?: string;
	/*v3 大于*/
	v3_Gt?: string;
	/*v3 大于等于*/
	v3_Gte?: string;
	/*v3 包含*/
	v3_Contains?: string;
	/*v3 不包含*/
	v3_NotContains?: string;
	/*v3 开头等于*/
	v3_StartsWith?: string;
	/*v3 开头不等于*/
	v3_NotStartsWith?: string;
	/*v3 结尾等于*/
	v3_EndsWith?: string;
	/*v3 结尾不等于*/
	v3_NotEndsWith?: string;
	/*v3*/
	v3?: string;
	/*v4 不等于*/
	v4_Not?: string;
	/*v4 在制定内，如[1,2]*/
	v4_In?: string[];
	/*v4 不在制定内,如[1,2]*/
	v4_NotIn?: string[];
	/*v4 小于*/
	v4_Lt?: string;
	/*v4 小于等于*/
	v4_Lte?: string;
	/*v4 大于*/
	v4_Gt?: string;
	/*v4 大于等于*/
	v4_Gte?: string;
	/*v4 包含*/
	v4_Contains?: string;
	/*v4 不包含*/
	v4_NotContains?: string;
	/*v4 开头等于*/
	v4_StartsWith?: string;
	/*v4 开头不等于*/
	v4_NotStartsWith?: string;
	/*v4 结尾等于*/
	v4_EndsWith?: string;
	/*v4 结尾不等于*/
	v4_NotEndsWith?: string;
	/*v4*/
	v4?: string;
	/*v5 不等于*/
	v5_Not?: string;
	/*v5 在制定内，如[1,2]*/
	v5_In?: string[];
	/*v5 不在制定内,如[1,2]*/
	v5_NotIn?: string[];
	/*v5 小于*/
	v5_Lt?: string;
	/*v5 小于等于*/
	v5_Lte?: string;
	/*v5 大于*/
	v5_Gt?: string;
	/*v5 大于等于*/
	v5_Gte?: string;
	/*v5 包含*/
	v5_Contains?: string;
	/*v5 不包含*/
	v5_NotContains?: string;
	/*v5 开头等于*/
	v5_StartsWith?: string;
	/*v5 开头不等于*/
	v5_NotStartsWith?: string;
	/*v5 结尾等于*/
	v5_EndsWith?: string;
	/*v5 结尾不等于*/
	v5_NotEndsWith?: string;
	/*v5*/
	v5?: string;
	AND?: CasbinRuleInputWhere[];
	OR?: CasbinRuleInputWhere[];
	NOT?: CasbinRuleInputWhere[];
}
export interface RoleGroupInputOrder {
	relations?: string;
	id?: string;
	/*角色组名
排序可选值为ASC或者DESC*/
	title?: string;
	/*角色组简介
排序可选值为ASC或者DESC*/
	desc?: string;
	/*拥有角色
排序可选值为ASC或者DESC*/
	roles?: string;
	/*用到此角色组的岗位
排序可选值为ASC或者DESC*/
	stations?: string;
}
export interface SafetyScoreRuleInputOrder {
	id?: string;
	/*规则名
排序可选值为ASC或者DESC*/
	title?: string;
	/*代号
排序可选值为ASC或者DESC*/
	code?: string;
	/*分值
排序可选值为ASC或者DESC*/
	score?: string;
	/*是否替换
排序可选值为ASC或者DESC*/
	isReplace?: string;
	/*记录
排序可选值为ASC或者DESC*/
	logs?: string;
	/*时间
排序可选值为ASC或者DESC*/
	createDate?: string;
}
export interface SystemRightInputOrder {
	relations?: string;
	id?: string;
	/*子
排序可选值为ASC或者DESC*/
	children?: string;
	/*父
排序可选值为ASC或者DESC*/
	parent?: string;
	/*权限类型
页面权限、数据权限、功能权限
排序可选值为ASC或者DESC*/
	type?: string;
	/*权限名
排序可选值为ASC或者DESC*/
	title?: string;
	/*权限代号
排序可选值为ASC或者DESC*/
	code?: string;
	/*权限链接
排序可选值为ASC或者DESC*/
	link?: string;
	/*来源模块
排序可选值为ASC或者DESC*/
	fromSystem?: string;
	fromSystemId?: string;
	/*可用角色
排序可选值为ASC或者DESC*/
	toRoles?: string;
}
export interface SystemInputOrder {
	relations?: string;
	id?: string;
	/*模块名
排序可选值为ASC或者DESC*/
	title?: string;
	/*系统缩略图片
排序可选值为ASC或者DESC*/
	image?: string;
	/*首页链接
排序可选值为ASC或者DESC*/
	link?: string;
	/*模块代号
排序可选值为ASC或者DESC*/
	code?: string;
	/*模块权限
排序可选值为ASC或者DESC*/
	rights?: string;
	/*模块事件
排序可选值为ASC或者DESC*/
	events?: string;
	/*代办事项
排序可选值为ASC或者DESC*/
	toDoItems?: string;
	/*配置时间
排序可选值为ASC或者DESC*/
	createDate?: string;
}
export interface MenuInputOrder {
	relations?: string;
	id?: string;
	title?: string;
	icon?: string;
	link?: string;
	status?: string;
	createDate?: string;
	parent?: string;
	children?: string;
}
export interface CasbinRuleInputOrder {
	/*规则编号
排序可选值为ASC或者DESC*/
	id?: string;
	/*类型
排序可选值为ASC或者DESC*/
	ptype?: string;
	/*v0
排序可选值为ASC或者DESC*/
	v0?: string;
	/*v1
排序可选值为ASC或者DESC*/
	v1?: string;
	/*v2
排序可选值为ASC或者DESC*/
	v2?: string;
	/*v3
排序可选值为ASC或者DESC*/
	v3?: string;
	/*v4
排序可选值为ASC或者DESC*/
	v4?: string;
	/*v5
排序可选值为ASC或者DESC*/
	v5?: string;
}
export interface DepartmentPartial {
	relations?: string[];
	/*部门编号*/
	id?: number;
	/*部门名称*/
	title?: string;
	/*部门状态*/
	status?: number;
	/*是否显示*/
	shown?: boolean;
	/*图标*/
	icon?: string;
	/*上级部门*/
	parent?: DepartmentInput;
	parentId?: number;
	/*创建时间*/
	createDate?: string;
	/*下级部门*/
	children?: DepartmentInput[];
	/*一个部门可以有多个岗位*/
	stations?: StationInput[];
	/*域*/
	domain?: DomainInput;
	domainId?: number;
	users?: UserInput[];
	createUser?: UserInput;
	createUserId?: string;
}
export interface DomainPartial {
	relations?: string[];
	id?: number;
	/*域标题*/
	title?: string;
	/*域编号*/
	code?: string;
	/*域状态*/
	status?: number;
	/*域简称*/
	desc?: string;
	/*创建人*/
	createUser?: UserInput;
	createUserId?: string;
	/*创建时间*/
	createDate?: string;
	/*部门*/
	departments?: DepartmentInput[];
}
export interface RolePartial {
	relations?: string[];
	/*序号*/
	id?: number;
	/*角色标识*/
	code?: string;
	/*角色名称*/
	title?: string;
	/*status*/
	status?: number;
	/*角色描述*/
	desc?: string;
	/*一个角色可以有多个权限*/
	rights?: SystemRightInput[];
	/*一个角色 可以使用某个岗位的职员*/
	canUseStations?: StationInput[];
	/*创建时间*/
	createDate?: string;
	/*更新时间*/
	updateDate?: string;
	/*一个角色 被那几个角色组使用*/
	group?: RoleGroupInput;
	groupId?: number;
	parent?: RoleInput;
	parentId?: number;
	children?: RoleInput[];
	/*创建人*/
	createUser?: UserInput;
	createUserId?: string;
	mutualRoleIds?: number[];
	basicRoleIds?: number[];
}
export interface RoleGroupPartial {
	relations?: string[];
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
export interface SafetyScoreLogPartial {
	relations?: string[];
	/*编号*/
	id?: number;
	/*扣除分数*/
	score?: number;
	/*一个安全积分记录有一条用户登录日志*/
	loginLog?: UserLoginLogInput;
	/*对应规则*/
	rule?: SafetyScoreRuleInput;
	ruleId?: number;
	/*用户*/
	user?: UserInput;
	userId?: number;
	/*时间*/
	createDate?: string;
}
export interface SafetyScoreRulePartial {
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
	createDate?: string;
}
export interface StationPartial {
	relations?: string[];
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
	createUserId?: string;
	/*创建日期*/
	createDate?: string;
	/*每个岗位有一个部门*/
	department?: DepartmentInput;
	departmentId?: number;
	/*某个岗位可以被什么角色使用*/
	canUseRoles?: RoleInput[];
	users?: UserInput[];
	/*一个岗位有一个role group*/
	roleGroup?: RoleGroupInput;
	roleGroupId?: number;
}
export interface ToDoItemPartial {
	relations?: string[];
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
	fromUserId?: string;
	/*处理人*/
	toUser?: UserInput;
	toUserId?: string;
}
export interface SystemEventPartial {
	relations?: string[];
	id?: number;
	/*权限名*/
	title?: string;
	/*来源模块*/
	fromSystem?: SystemInput;
	/*代办事项*/
	toDoItems?: ToDoItemInput[];
}
export interface SystemRightPartial {
	relations?: string[];
	id?: number;
	/*子*/
	children?: SystemRightInput[];
	/*父*/
	parent?: SystemRightInput;
	/*权限类型
页面权限、数据权限、功能权限*/
	type?: string;
	/*权限名*/
	title?: string;
	/*权限代号*/
	code?: string;
	/*权限链接*/
	link?: string;
	/*来源模块*/
	fromSystem?: SystemInput;
	fromSystemId?: number;
	/*可用角色*/
	toRoles?: RoleInput[];
}
export interface SystemPartial {
	relations?: string[];
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
	createDate?: string;
}
export interface UserPartial {
	relations?: string[];
	/*用户编号*/
	id?: string;
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
	/*1: 账户正常 0:禁用 -1:刚解冻 3: 刚注册*/
	status?: number;
	/*随机码*/
	randomCode?: string;
	/*密码是否被重置*/
	isRestPassword?: boolean;
	/*密码更改时间*/
	passwordDate?: string;
	/*创建时间*/
	createDate?: string;
	/*这个用户的创建人是谁*/
	createUser?: UserInput;
	/*创建人的uid*/
	createUserId?: string;
	createUsers?: UserInput[];
	/*安全分*/
	safetyScore?: number;
	/*用户的代办事项*/
	toDoItems?: ToDoItemInput[];
	/*发布者*/
	mineToDoItems?: ToDoItemInput[];
	/*用户岗位*/
	stations?: StationInput[];
	deparents?: DepartmentInput[];
	/*用户的登录记录*/
	loginLogs?: UserLoginLogInput[];
	/*用户的安全分扣分记录*/
	safetyScoreLogs?: SafetyScoreLogInput[];
	createStations?: StationInput[];
	departments?: DepartmentInput[];
	createDepartments?: DepartmentInput[];
	createDomains?: DomainInput[];
	createRoles?: RoleInput[];
}
export interface MenuPartial {
	relations?: string[];
	id?: number;
	title?: string;
	icon?: string;
	link?: string;
	status?: number;
	createDate?: string;
	parent?: MenuInput;
	children?: MenuInput[];
}
export interface CasbinRulePartial {
	/*规则编号*/
	id?: number;
	/*类型*/
	ptype?: string;
	/*v0*/
	v0?: string;
	/*v1*/
	v1?: string;
	/*v2*/
	v2?: string;
	/*v3*/
	v3?: string;
	/*v4*/
	v4?: string;
	/*v5*/
	v5?: string;
}
export interface UserLoginLogPartial {
	relations?: string[];
	/*日志编号*/
	id?: number;
	user?: UserInput;
	userId?: string;
	/*ip地址编号*/
	ip?: string;
	/*设备编号*/
	deviceId?: string;
	/*创建时间*/
	createDate?: string;
	/*一条登录日志有一个扣分日志*/
	scoreLog?: SafetyScoreLogInput;
}
export interface Query {
	/*通过指定条件获取一条数据*/
	getDepartment<T>(/*条件*/entity: DepartmentInputWhere, __selection?: string): Promise<T & Department>;
	/*通过指定条件获取一条数据*/
	getDomain<T>(/*条件*/entity: DomainInputWhere, __selection?: string): Promise<T & Domain>;
	/*通过指定条件获取一条数据*/
	getRole<T>(/*条件*/entity: RoleInputWhere, __selection?: string): Promise<T & Role>;
	/*通过指定条件获取一条数据*/
	getRoleGroup<T>(/*条件*/entity: RoleGroupInputWhere, __selection?: string): Promise<T & RoleGroup>;
	/*通过指定条件获取一条数据*/
	getSafetyScoreLog<T>(/*条件*/entity: SafetyScoreLogInputWhere, __selection?: string): Promise<T & SafetyScoreLog>;
	/*通过指定条件获取一条数据*/
	getSafetyScoreRule<T>(/*条件*/entity: SafetyScoreRuleInputWhere, __selection?: string): Promise<T & SafetyScoreRule>;
	/*通过指定条件获取一条数据*/
	getStation<T>(/*条件*/entity: StationInputWhere, __selection?: string): Promise<T & Station>;
	/*通过指定条件获取一条数据*/
	getToDoItem<T>(/*条件*/entity: ToDoItemInputWhere, __selection?: string): Promise<T & ToDoItem>;
	/*通过指定条件获取一条数据*/
	getSystemEvent<T>(/*条件*/entity: SystemEventInputWhere, __selection?: string): Promise<T & SystemEvent>;
	/*通过指定条件获取一条数据*/
	getSystemRight<T>(/*条件*/entity: SystemRightInputWhere, __selection?: string): Promise<T & SystemRight>;
	/*通过指定条件获取一条数据*/
	getSystem<T>(/*条件*/entity: SystemInputWhere, __selection?: string): Promise<T & System>;
	/*通过指定条件获取一条数据*/
	getUser<T>(/*条件*/entity: UserInputWhere, __selection?: string): Promise<T & User>;
	/*通过指定条件获取一条数据*/
	getMenu<T>(/*条件*/entity: MenuInputWhere, __selection?: string): Promise<T & Menu>;
	/*通过指定条件获取一条数据*/
	getCasbinRule<T>(/*条件*/entity: CasbinRuleInputWhere, __selection?: string): Promise<T & CasbinRule>;
	/*通过指定条件获取一条数据*/
	getUserLoginLog<T>(/*条件*/entity: UserLoginLogInputWhere, __selection?: string): Promise<T & UserLoginLog>;
	/*通过制定条件获取一组数据*/
	findDepartment<T>(/*条件*/entity: DepartmentInputWhere, order: DepartmentInputOrder, limit?: PageLimitInput, __selection?: string): Promise<T & Department[]>;
	/*通过制定条件获取一组数据*/
	findDomain<T>(/*条件*/entity: DomainInputWhere, order: DomainInputOrder, limit?: PageLimitInput, __selection?: string): Promise<T & Domain[]>;
	/*通过制定条件获取一组数据*/
	findRole<T>(/*条件*/entity: RoleInputWhere, order: RoleInputOrder, limit?: PageLimitInput, __selection?: string): Promise<T & Role[]>;
	/*通过制定条件获取一组数据*/
	findRoleGroup<T>(/*条件*/entity: RoleGroupInputWhere, order: RoleGroupInputOrder, limit?: PageLimitInput, __selection?: string): Promise<T & RoleGroup[]>;
	/*通过制定条件获取一组数据*/
	findSafetyScoreLog<T>(/*条件*/entity: SafetyScoreLogInputWhere, order: SafetyScoreLogInputOrder, limit?: PageLimitInput, __selection?: string): Promise<T & SafetyScoreLog[]>;
	/*通过制定条件获取一组数据*/
	findSafetyScoreRule<T>(/*条件*/entity: SafetyScoreRuleInputWhere, order: SafetyScoreRuleInputOrder, limit?: PageLimitInput, __selection?: string): Promise<T & SafetyScoreRule[]>;
	/*通过制定条件获取一组数据*/
	findStation<T>(/*条件*/entity: StationInputWhere, order: StationInputOrder, limit?: PageLimitInput, __selection?: string): Promise<T & Station[]>;
	/*通过制定条件获取一组数据*/
	findToDoItem<T>(/*条件*/entity: ToDoItemInputWhere, order: ToDoItemInputOrder, limit?: PageLimitInput, __selection?: string): Promise<T & ToDoItem[]>;
	/*通过制定条件获取一组数据*/
	findSystemEvent<T>(/*条件*/entity: SystemEventInputWhere, order: SystemEventInputOrder, limit?: PageLimitInput, __selection?: string): Promise<T & SystemEvent[]>;
	findSystemRight<T>(__selection?: string): Promise<T & object[]>;
	/*通过制定条件获取一组数据*/
	findSystem<T>(/*条件*/entity: SystemInputWhere, order: SystemInputOrder, limit?: PageLimitInput, __selection?: string): Promise<T & System[]>;
	/*通过制定条件获取一组数据*/
	findUser<T>(/*条件*/entity: UserInputWhere, order: UserInputOrder, limit?: PageLimitInput, __selection?: string): Promise<T & User[]>;
	findMenu<T>(__selection?: string): Promise<T & object[]>;
	/*通过制定条件获取一组数据*/
	findCasbinRule<T>(/*条件*/entity: CasbinRuleInputWhere, order: CasbinRuleInputOrder, limit?: PageLimitInput, __selection?: string): Promise<T & CasbinRule[]>;
	/*通过制定条件获取一组数据*/
	findUserLoginLog<T>(/*条件*/entity: UserLoginLogInputWhere, order: UserLoginLogInputOrder, limit?: PageLimitInput, __selection?: string): Promise<T & UserLoginLog[]>;
	/*通过制定条件获取一组数据*/
	countDepartment<T>(/*条件*/where: DepartmentInputWhere, __selection?: string): Promise<T & number>;
	/*通过制定条件获取一组数据*/
	countDomain<T>(/*条件*/where: DomainInputWhere, __selection?: string): Promise<T & number>;
	/*通过制定条件获取一组数据*/
	countRole<T>(/*条件*/where: RoleInputWhere, __selection?: string): Promise<T & number>;
	/*通过制定条件获取一组数据*/
	countRoleGroup<T>(/*条件*/where: RoleGroupInputWhere, __selection?: string): Promise<T & number>;
	/*通过制定条件获取一组数据*/
	countSafetyScoreLog<T>(/*条件*/where: SafetyScoreLogInputWhere, __selection?: string): Promise<T & number>;
	/*通过制定条件获取一组数据*/
	countSafetyScoreRule<T>(/*条件*/where: SafetyScoreRuleInputWhere, __selection?: string): Promise<T & number>;
	/*通过制定条件获取一组数据*/
	countStation<T>(/*条件*/where: StationInputWhere, __selection?: string): Promise<T & number>;
	/*通过制定条件获取一组数据*/
	countToDoItem<T>(/*条件*/where: ToDoItemInputWhere, __selection?: string): Promise<T & number>;
	/*通过制定条件获取一组数据*/
	countSystemEvent<T>(/*条件*/where: SystemEventInputWhere, __selection?: string): Promise<T & number>;
	/*通过制定条件获取一组数据*/
	countSystemRight<T>(/*条件*/where: SystemRightInputWhere, __selection?: string): Promise<T & number>;
	/*通过制定条件获取一组数据*/
	countSystem<T>(/*条件*/where: SystemInputWhere, __selection?: string): Promise<T & number>;
	/*通过制定条件获取一组数据*/
	countUser<T>(/*条件*/where: UserInputWhere, __selection?: string): Promise<T & number>;
	/*通过制定条件获取一组数据*/
	countMenu<T>(/*条件*/where: MenuInputWhere, __selection?: string): Promise<T & number>;
	/*通过制定条件获取一组数据*/
	countCasbinRule<T>(/*条件*/where: CasbinRuleInputWhere, __selection?: string): Promise<T & number>;
	/*通过制定条件获取一组数据*/
	countUserLoginLog<T>(/*条件*/where: UserLoginLogInputWhere, __selection?: string): Promise<T & number>;
}
export interface Mutation {
	/*没有就插入，有就更新*/
	saveDepartment<T>(/*要保存的数据*/entity: DepartmentInput, __selection?: string): Promise<T & Department>;
	/*没有就插入，有就更新*/
	saveDomain<T>(/*要保存的数据*/entity: DomainInput, __selection?: string): Promise<T & Domain>;
	/*没有就插入，有就更新*/
	saveRole<T>(/*要保存的数据*/entity: RoleInput, __selection?: string): Promise<T & Role>;
	/*没有就插入，有就更新*/
	saveRoleGroup<T>(/*要保存的数据*/entity: RoleGroupInput, __selection?: string): Promise<T & RoleGroup>;
	/*没有就插入，有就更新*/
	saveSafetyScoreLog<T>(/*要保存的数据*/entity: SafetyScoreLogInput, __selection?: string): Promise<T & SafetyScoreLog>;
	/*没有就插入，有就更新*/
	saveSafetyScoreRule<T>(/*要保存的数据*/entity: SafetyScoreRuleInput, __selection?: string): Promise<T & SafetyScoreRule>;
	/*没有就插入，有就更新*/
	saveStation<T>(/*要保存的数据*/entity: StationInput, __selection?: string): Promise<T & Station>;
	/*没有就插入，有就更新*/
	saveToDoItem<T>(/*要保存的数据*/entity: ToDoItemInput, __selection?: string): Promise<T & ToDoItem>;
	/*没有就插入，有就更新*/
	saveSystemEvent<T>(/*要保存的数据*/entity: SystemEventInput, __selection?: string): Promise<T & SystemEvent>;
	saveSystemRight<T>(entity: SystemRightInput, __selection?: string): Promise<T & SystemRight>;
	/*没有就插入，有就更新*/
	saveSystem<T>(/*要保存的数据*/entity: SystemInput, __selection?: string): Promise<T & System>;
	saveUser<T>(entity: UserInput, __selection?: string): Promise<T & User>;
	saveMenu<T>(entity: MenuInput, __selection?: string): Promise<T & Menu>;
	/*没有就插入，有就更新*/
	saveCasbinRule<T>(/*要保存的数据*/entity: CasbinRuleInput, __selection?: string): Promise<T & CasbinRule>;
	/*没有就插入，有就更新*/
	saveUserLoginLog<T>(/*要保存的数据*/entity: UserLoginLogInput, __selection?: string): Promise<T & UserLoginLog>;
	/*插入数据*/
	insertDepartment<T>(/*要插入的数据*/entity: DepartmentInput, __selection?: string): Promise<T & Department>;
	/*插入数据*/
	insertDomain<T>(/*要插入的数据*/entity: DomainInput, __selection?: string): Promise<T & Domain>;
	/*插入数据*/
	insertRole<T>(/*要插入的数据*/entity: RoleInput, __selection?: string): Promise<T & Role>;
	/*插入数据*/
	insertRoleGroup<T>(/*要插入的数据*/entity: RoleGroupInput, __selection?: string): Promise<T & RoleGroup>;
	/*插入数据*/
	insertSafetyScoreLog<T>(/*要插入的数据*/entity: SafetyScoreLogInput, __selection?: string): Promise<T & SafetyScoreLog>;
	/*插入数据*/
	insertSafetyScoreRule<T>(/*要插入的数据*/entity: SafetyScoreRuleInput, __selection?: string): Promise<T & SafetyScoreRule>;
	/*插入数据*/
	insertStation<T>(/*要插入的数据*/entity: StationInput, __selection?: string): Promise<T & Station>;
	/*插入数据*/
	insertToDoItem<T>(/*要插入的数据*/entity: ToDoItemInput, __selection?: string): Promise<T & ToDoItem>;
	/*插入数据*/
	insertSystemEvent<T>(/*要插入的数据*/entity: SystemEventInput, __selection?: string): Promise<T & SystemEvent>;
	/*插入数据*/
	insertSystemRight<T>(/*要插入的数据*/entity: SystemRightInput, __selection?: string): Promise<T & SystemRight>;
	/*插入数据*/
	insertSystem<T>(/*要插入的数据*/entity: SystemInput, __selection?: string): Promise<T & System>;
	/*插入数据*/
	insertUser<T>(/*要插入的数据*/entity: UserInput, __selection?: string): Promise<T & User>;
	/*插入数据*/
	insertMenu<T>(/*要插入的数据*/entity: MenuInput, __selection?: string): Promise<T & Menu>;
	/*插入数据*/
	insertCasbinRule<T>(/*要插入的数据*/entity: CasbinRuleInput, __selection?: string): Promise<T & CasbinRule>;
	/*插入数据*/
	insertUserLoginLog<T>(/*要插入的数据*/entity: UserLoginLogInput, __selection?: string): Promise<T & UserLoginLog>;
	/*更新数据*/
	updateDepartment<T>(/**/where: DepartmentPartial, entity: DepartmentInput, __selection?: string): Promise<T & Department>;
	/*更新数据*/
	updateDomain<T>(/**/where: DomainPartial, entity: DomainInput, __selection?: string): Promise<T & Domain>;
	/*更新数据*/
	updateRole<T>(/**/where: RolePartial, entity: RoleInput, __selection?: string): Promise<T & Role>;
	/*更新数据*/
	updateRoleGroup<T>(/**/where: RoleGroupPartial, entity: RoleGroupInput, __selection?: string): Promise<T & RoleGroup>;
	/*更新数据*/
	updateSafetyScoreLog<T>(/**/where: SafetyScoreLogPartial, entity: SafetyScoreLogInput, __selection?: string): Promise<T & SafetyScoreLog>;
	/*更新数据*/
	updateSafetyScoreRule<T>(/**/where: SafetyScoreRulePartial, entity: SafetyScoreRuleInput, __selection?: string): Promise<T & SafetyScoreRule>;
	/*更新数据*/
	updateStation<T>(/**/where: StationPartial, entity: StationInput, __selection?: string): Promise<T & Station>;
	/*更新数据*/
	updateToDoItem<T>(/**/where: ToDoItemPartial, entity: ToDoItemInput, __selection?: string): Promise<T & ToDoItem>;
	/*更新数据*/
	updateSystemEvent<T>(/**/where: SystemEventPartial, entity: SystemEventInput, __selection?: string): Promise<T & SystemEvent>;
	/*更新数据*/
	updateSystemRight<T>(/**/where: SystemRightPartial, entity: SystemRightInput, __selection?: string): Promise<T & SystemRight>;
	/*更新数据*/
	updateSystem<T>(/**/where: SystemPartial, entity: SystemInput, __selection?: string): Promise<T & System>;
	/*更新数据*/
	updateUser<T>(/**/where: UserPartial, entity: UserInput, __selection?: string): Promise<T & User>;
	/*更新数据*/
	updateMenu<T>(/**/where: MenuPartial, entity: MenuInput, __selection?: string): Promise<T & Menu>;
	/*更新数据*/
	updateCasbinRule<T>(/**/where: CasbinRulePartial, entity: CasbinRuleInput, __selection?: string): Promise<T & CasbinRule>;
	/*更新数据*/
	updateUserLoginLog<T>(/**/where: UserLoginLogPartial, entity: UserLoginLogInput, __selection?: string): Promise<T & UserLoginLog>;
	/*res
删除*/
	deleteDepartment<T>(/*根据id删除*/id: number, __selection?: string): Promise<T & boolean>;
	/*res
删除*/
	deleteDomain<T>(/*根据id删除*/id: number, __selection?: string): Promise<T & boolean>;
	/*res
删除*/
	deleteRole<T>(/*根据id删除*/id: number, __selection?: string): Promise<T & boolean>;
	/*res
删除*/
	deleteRoleGroup<T>(/*根据id删除*/id: number, __selection?: string): Promise<T & boolean>;
	/*res
删除*/
	deleteSafetyScoreLog<T>(/*根据id删除*/id: number, __selection?: string): Promise<T & boolean>;
	/*res
删除*/
	deleteSafetyScoreRule<T>(/*根据id删除*/id: number, __selection?: string): Promise<T & boolean>;
	/*res
删除*/
	deleteStation<T>(/*根据id删除*/id: number, __selection?: string): Promise<T & boolean>;
	/*res
删除*/
	deleteToDoItem<T>(/*根据id删除*/id: number, __selection?: string): Promise<T & boolean>;
	/*res
删除*/
	deleteSystemEvent<T>(/*根据id删除*/id: number, __selection?: string): Promise<T & boolean>;
	/*res
删除*/
	deleteSystemRight<T>(/*根据id删除*/id: number, __selection?: string): Promise<T & boolean>;
	/*res
删除*/
	deleteSystem<T>(/*根据id删除*/id: number, __selection?: string): Promise<T & boolean>;
	/*res
删除*/
	deleteUser<T>(/*根据id删除*/id: number, __selection?: string): Promise<T & boolean>;
	/*res
删除*/
	deleteMenu<T>(/*根据id删除*/id: number, __selection?: string): Promise<T & boolean>;
	/*res
删除*/
	deleteCasbinRule<T>(/*根据id删除*/id: number, __selection?: string): Promise<T & boolean>;
	/*res
删除*/
	deleteUserLoginLog<T>(/*根据id删除*/id: number, __selection?: string): Promise<T & boolean>;
}