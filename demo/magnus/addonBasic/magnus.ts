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

/*欢迎页信息*/
export interface WelcomeInfo {
	/*头部图片*/
	image: string;
	/*标题*/
	title: string;
	/*二级标题*/
	secondTitle: string;
	/*简介*/
	desc: string;
}
/*事件*/
export interface Event {
	/*时间类型id,可以根据时间类型进行路由跳转到事件列表页*/
	id: number;
	/*时间名称*/
	title: string;
	/*时间简介*/
	desc: string;
	/*待处理消息个数*/
	count: number;
}
/*模块*/
export interface Module {
	title: string;
	events: Event[];
}
/*着陆页代办事项*/
export interface ToDoItems {
	/*今天的待办事项*/
	today: Module[];
	/*昨天的代办事项*/
	yestoday: Module[];
	/*本周的代办事项*/
	thisweek: Module[];
	/*上周的代办事项*/
	lastweek: Module[];
	/*30天内代办事项*/
	within30Days: Module[];
	/*30天前代办事项*/
	thirtyDaysAgo: Module[];
}
/*子系统*/
export interface System {
	/*图片*/
	image: string;
	/*标题*/
	title: string;
	/*连接*/
	link: string;
}
/*绑定页面数据*/
export interface BindTokenData {
	/*没有格式化的uid*/
	id: string;
	/*格式化后的用户uid*/
	uid: string;
	/*随机码*/
	randomCode: string;
}
export interface CheckUserStateResult {
	/*状态码
200 可登录
100 您需要绑定令牌
101 需要修改密码
102 需要输入token码*/
	code: number;
	/*附加消息*/
	message: string;
	/*附加数据*/
	data: BindTokenData;
}
/*登录结果*/
export interface LoginOutput {
	/*返回码
大于0成功
小于0失败*/
	code: number;
	/*返回码消息*/
	message: string;
	/*token
code >0 时携带*/
	token?: string;
}
/*绑定结果数据*/
export interface BindUserTokenResult {
	/*200 绑定成功
-100 token不匹配*/
	code: number;
	/*消息*/
	message: string;
}
export interface BindUserTokenInput {
/*用户uid*/	uid: number;
/*随机码*/	randomCode: string;
/*token值*/	token: string;
}
export interface DeleteDomainResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface DomainData {
	/*域简称*/
	desc?: string;
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
	count?: number;
	list?: DomainData[];
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
export interface ForbidDomainResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface ForbidDomainInput {
/*域id*/	id: number;
/*状态*/	status: number;
}
export interface DoaminData {
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
	status?: number;
}
export interface GetDomainResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: DoaminData;
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
}
export interface AddAlarmPlanResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface DeleteAlarmPlanResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface FindAlarmPlanData {
	/*预案序号*/
	id: number;
	/*预案名称*/
	title: string;
	/*优先级*/
	priority: string;
	/*预案描述*/
	desc: string;
	/*创建时间*/
	createDate?: string;
	/*创建人*/
	createUser?: string;
}
export interface FindAlarmPlanResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: FindAlarmPlanData;
}
export interface CreateDateInput {
/*new Date(`年-月-日 时-分-秒`).toISOString()*/	start?: string;
/*new Date().toISOString()*/	end?: string;
}
export interface CreateUserInput {
/*创建人名字*/	createUserName?: string;
/*创建人id*/	createUserId?: number;
}
export interface FindAlarmPlanInput {
/*页码*/	page?: number;
/*每页数量*/	psize?: number;
/*预案名称*/	title: string;
/*创建时间 开始and结束*/	createDate?: CreateDateInput;
/*创建人*/	createUser?: CreateUserInput;
}
export interface forbidAlarmPlanResult {
	/*返回码*/
	code: number;
	/*返回数据*/
	message: string;
}
export interface ForbidAlarmPlanInput {
/*预案id*/	id: number;
/*状态*/	status: number;
}
export interface GetAlarmPlanData {
	id: number;
}
export interface GetAlarmPlanResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: GetAlarmPlanData;
}
export interface SaveAlarmPlanResult {
	code: number;
	message: string;
}
export interface FindMenuResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据
id
title
icon
status
children*/
	data?: object[];
}
export interface SaveMenuData {
	/*菜单id*/
	menuId?: number;
	/*状态*/
	status?: number;
	/*图标*/
	icon?: string;
	/*标题*/
	title?: string;
	children: SaveMenuData[];
}
export interface SaveMenuRsesult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: SaveMenuData;
}
export interface SaveMenuInput {
/*菜单id*/	menuId?: number;
/*状态*/	status?: number;
/*图标*/	icon?: string;
/*标题*/	title?: string;
}
export interface DeleteModuleResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface FindModuleData {
	/*数据源id*/
	id: number;
	/*模块名称*/
	name: string;
	/*链接*/
	link: string;
	/*状态*/
	status: number;
	/*数据协议*/
	dataProtocol: string;
}
export interface FindModuleResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: FindModuleData[];
}
export interface FindModuleInput {
/*页码*/	page: number;
/*每页数量*/	psize: number;
/*模块名称*/	name: string;
/*模块链接*/	link: string;
}
export interface ForbidModuleResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface ForbidModuleInput {
/*菜单id*/	id: number;
/*状态*/	status: number;
}
export interface GetModuleData {
	/*数据id*/
	id: number;
	/*模块名称*/
	name: string;
	/*数据链接*/
	link: string;
	/*状态*/
	status: number;
	/*数据协议*/
	dataProtocol: string;
}
export interface GetModuleResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: GetModuleData;
}
export interface DeleteCaptureResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface FindCaptureData {
	/*设备序号*/
	id: number;
	/*设备名称*/
	title?: string;
	/*通道*/
	aisle?: string;
	/*抓图原因*/
	reason?: string;
	/*备注*/
	remarks?: string;
	/*创建日期*/
	createDate?: string;
	/*创建人*/
	createUserName?: string;
}
export interface FindCaptureResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: FindCaptureData;
}
export interface FindCaptureInput {
/*页码*/	page?: number;
/*每页数量*/	psize?: number;
/*设备id*/	deviceId: string;
/*设备名称*/	title?: string;
/*抓图原因*/	reason?: string;
/*创建时间*/	createDate?: CreateDateInput;
/*创建人*/	createUser?: CreateUserInput;
}
export interface SaveCaptureResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface SaveCaptureInput {
/*抓图原因*/	reason?: string;
/*备注*/	remarks?: string;
}
export interface FindPagePermissionData {
	/*权限类型*/
	type: string;
	/*角色id*/
	roleId: number;
	/*基础平台id*/
	fromSystemId?: number;
}
export interface FindPagePermissionResult {
	/*状态码*/
	code: number;
	/*消息*/
	message: string;
	/*数据*/
	data?: FindPagePermissionData;
}
export interface GetActionPermissionData {
	id: number;
	type: string;
	title: string;
	code: string;
	children: GetActionPermissionData[];
}
export interface GetPermissionResult {
	data?: GetActionPermissionData;
	code: number;
	message: string;
}
export interface FindRoleDate {
	/*序号*/
	id: number;
	/*角色名称*/
	roleName: string;
	/*角色标识*/
	roleIdentification: string;
	/*角色描述*/
	roleDesc: string;
	/*数据权限*/
	dataPermission: string;
	/*创建人*/
	createUserName: string;
	/*父级角色*/
	parentRole: string;
	/*创建时间*/
	createDate: number;
}
export interface FindRoleResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: FindRoleDate[];
}
export interface FindRoleInput {
/*页码*/	page?: number;
/*每页数量*/	psize?: number;
/*角色名*/	roleName?: string;
/*创建人*/	createUserId?: number;
/*创建时间 开始and结束*/	createDate?: CreateDateInput;
}
export interface Right {
	/*权限id*/
	id?: number;
	/*权限名字*/
	title?: string;
}
export interface GetRoleData {
	/*1选中
0未选中*/
	status?: number;
	/*角色id*/
	id?: number;
	/*角色名字*/
	title?: string;
	/*角色标识*/
	code?: string;
	/*角色描述*/
	desc?: string;
	/*数据权限*/
	rights?: Right[];
	/*创建人*/
	createDate?: string;
}
export interface GetRoleResult {
	/*角色的返回码*/
	code: number;
	/*角色的返回信息*/
	message: string;
	/*角色的返回数据*/
	date?: GetRoleData[];
}
export interface GetRoleGroupInput {
/*角色组id*/	groupId: number;
/*角色名称*/	roleTitle?: string;
/*角色标识*/	roleCode?: string;
/*创建人id*/	createUserId?: number;
/*开始时间*/	startDate?: string;
/*结束时间*/	endDate?: string;
/*页码*/	page?: number;
/*每页数量*/	psize?: number;
}
export interface SaveRoleRightResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface RoleInput {
/*角色名称*/	title: string;
/*角色id*/	id: number;
}
export interface SaveRoleRightInput {
/*角色id*/	id: number;
/*角色组拥有的角色*/	ownRoles: RoleInput[];
}
export interface DeleteRoleRightResult {
	/**/
	code: number;
	/**/
	message: string;
}
export interface DeleteRoleRightInput {
/*角色id*/	id: number;
/*角色组拥有的角色*/	ownRoles: RoleInput[];
}
export interface Role {
	/*角色名称*/
	title: string;
	/*角色id*/
	id: number;
}
export interface SaveResultData {
	/*角色id*/
	id: number;
	/*角色名称*/
	roleName: string;
	/*角色标识*/
	roleIdentification: string;
	/*角色描述*/
	roleDescription: string;
	/*基础角色*/
	basicRole: Role[];
	/*互斥角色*/
	mutexRole: Role[];
	/*状态*/
	status: number;
	/*创建日期*/
	createDate: string;
	/*创建人*/
	createUserName: string;
}
export interface SaveRoleResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: SaveResultData;
}
export interface SaveRoleInput {
/*角色id*/	id?: number;
/*角色名称*/	roleName?: string;
/*角色标识*/	roleIdentification?: string;
/*角色描述*/	roleDescription?: string;
/*基础角色*/	basicRole?: number[];
/*互斥角色*/	mutexRole?: number[];
}
export interface DeleteRoundPatrolResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface FinRoundPatrolData {
	/*任务序号*/
	id?: number;
	/*任务名称*/
	title?: string;
	/*窗口数*/
	windows?: number;
	/*任务描述*/
	desc?: string;
	/*创建日期*/
	createDate?: string;
	/*创建人*/
	createUserName?: string;
}
export interface FinRoundPatrolResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: FinRoundPatrolData;
}
export interface FindRoundPatrolInput {
/*页码*/	page?: number;
/*每页数量*/	psize?: number;
/*任务名称*/	title?: string;
/*创建时间*/	createDate?: CreateDateInput;
/*创建人*/	createUser?: CreateUserInput;
}
export interface box {
	/*窗口id*/
	id: number;
	/*组织*/
	organiztion: string;
	/*设备名称*/
	title: string;
	/*码流*/
	codeStream: string;
	/*时长*/
	duration: number;
}
export interface GetRoundPatrolData {
	/*任务id*/
	id: number;
	/*任务名称*/
	title: string;
	/*分屏样式*/
	screenStyle: string;
	/*任务描述*/
	desc: string;
	/*创建人*/
	createUserName: string;
	/*创建人id*/
	createUserId: number;
	/*创建日期*/
	createDate: string;
	/*窗口配置*/
	windowConfig: box[];
}
export interface GetRoundPatrolResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: GetRoundPatrolData;
}
export interface SaveRoundPatrolResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface boxInput {
/*窗口id*/	id: number;
/*组织*/	organiztion: string;
/*设备名称*/	title: string;
/*码流*/	codeStream: string;
/*时长*/	duration: number;
}
export interface SaveRoundPatrolInput {
/*任务id*/	id?: number;
/*任务名称*/	title?: string;
/*分屏样式*/	screenStyle?: string;
/*任务描述*/	desc?: string;
/*当前窗口*/	windowConfig: boxInput[];
}
export interface DeleteStationResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface FindStationData {
	/*序号*/
	id: number;
	/*岗位名称*/
	positionTitle: string;
	/*岗位编号*/
	jobNumber: string;
	/*岗位描述*/
	jobDescription: string;
	/*拥有角色*/
	haveRole: string[];
	/*创建人*/
	createUserName: string;
	/*创建时间*/
	createDate: string;
}
export interface FindStationResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: FindStationData[];
}
export interface FindStationInput {
/*页码*/	page?: number;
/*每页数量*/	psize?: number;
/*岗位名称*/	positionTitle?: string;
/*创建人*/	createUserUsername?: string;
/*创建时间 开始and结束*/	createDate?: Empty;
}
export interface ForbidStationResult {
	/*返回码*/
	code: number;
	/*返回数据*/
	message: string;
}
export interface ForbidStationInput {
/*id*/	id: number;
/*状态*/	status: number;
}
export interface GetStationDepartment {
	id: number;
	title: string;
}
export interface GetStationRoleGroup {
	id: number;
	title: string;
}
/*GetStation的岗位信息*/
export interface GetStationData {
	/*部门*/
	department: GetStationDepartment;
	/*岗位编号*/
	jobNumber: string;
	/*岗位名称*/
	positionTitle: string;
	/*岗位描述*/
	jobDescription: string;
	/*/
岗位职责*/
	jobResponsibilities: string;
	/*岗位要求*/
	jobRequirements: string;
	/*角色组*/
	roleGroup: GetStationRoleGroup;
	/*状态*/
	status: number;
}
export interface GetStationResult {
	code: number;
	message: string;
	data?: GetStationData;
}
export interface SaveDepartmentResult {
	code: number;
	message: string;
	/*返回数据
id
title
children*/
	data?: object[];
}
export interface SaveDepartmentInput {
	id?: number;
	title?: string;
	icon?: string;
	status?: number;
	children?: object[];
}
export interface SaveStationResult {
	code: number;
	message: string;
}
export interface SaveStationInput {
	id: number;
	departmentId?: number;
	jobNumber?: string;
	positionTitle?: string;
	jobDescription?: string;
	jobResponsibilities?: string;
	jobRequirements?: string;
	roleGroupId?: number;
}
export interface GetAllDepartmentResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*部门id
id: number;
部门下面的子部门
children: GetAllDepartmentData[];
部门名称
title: string;*/
	data?: object[];
}
export interface GetAllDepartmentInput {
	title?: string;
}
export interface DeleteDepartmentResult {
	code: number;
	message: string;
}
export interface DeleteDepartmentInput {
/*部门id*/	id: number;
}
export interface GetAllStationData {
	/*岗位id*/
	id: number;
	/*岗位名称*/
	title: string;
}
export interface GetAllStationByDepartmentResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: GetAllStationData[];
}
export interface GetAllStationByDepartmentInput {
/*部门id*/	departmentId: number;
}
export interface GetAllUSerData {
	/*用户名称*/
	title: string;
	/*用户id*/
	id: string;
}
export interface GetAllUserByStationResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: GetAllUSerData[];
}
export interface GetAllUserByStationInput {
/*岗位id*/	stationId: number;
}
export interface DeleteStationUserResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface DeleteStationUserInput {
/*用户id*/	uid: number;
/*岗位id*/	stationId: number;
}
export interface AddStationUserResult {
	/*返回码*/
	code: number;
	/*返回结果*/
	message: string;
}
export interface AddStationUserInput {
/*岗位id*/	stationId: number;
/*用户id*/	uid: number;
}
export interface FindSummaryData {
	/*设备名称*/
	title?: string;
	/*视频链接*/
	link?: string;
	/*视频日期*/
	date?: string;
}
export interface FindSummaryResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: FindSummaryData;
}
export interface TimeInput {
/*开始时间-结束时间*/	start?: string;
	end?: string;
}
export interface FindSummaryInput {
/*undefined 代表全选
string[] 标识设备id数组*/	deviceIds?: string[];
/*目标类型*/	type?: string;
/*目标大小*/	size?: string;
/*目标速度*/	speed?: string;
/*目标颜色*/	color?: string;
/*时间*/	time?: TimeInput;
/*运动方向*/	direction?: string;
/*车牌号*/	numberPlate?: string;
}
export interface SaveSummaryResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface dateInput {
/*开始时间-结束时间*/	start?: string;
	end?: string;
}
export interface SaveSummaryInput {
/*设备*/	deviceId?: string;
/*位置*/	position?: string;
/*时间*/	time?: dateInput;
/*车牌号*/	numberPlate?: string;
/*目标类型*/	type?: string;
/*目标大小*/	size?: string;
/*目标速度*/	speed?: string;
/*目标颜色*/	color?: string;
/*运动方向*/	direction?: string;
}
export interface FindSystemRight {
	/*权限id*/
	id: number;
	/*权限名称*/
	title: string;
	/*权限类型*/
	type: number;
}
export interface FindSystemResult {
	/*系统编号*/
	id: number;
	/*系统名称*/
	title: string;
	/*首页地址*/
	link: string;
	/*拥有权限*/
	rights: FindSystemRight;
}
export interface FindSystemInput {
/*页码*/	page?: number;
/*每页数量*/	psize?: number;
/*模块名称*/	title?: string;
/*模块启动ip*/	ip?: string;
/*端口号*/	port?: number;
}
export interface GetSystemRight {
	/*权限编号*/
	id: number;
	/*权限名称*/
	title: string;
}
export interface GetSystemData {
	/*系统、模块Id*/
	id: number;
	/*模块、系统标题*/
	title: string;
	/*模块、系统连接*/
	link: string;
	/*模块、系统权限*/
	rights: GetSystemRight[];
}
export interface GetSystemResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: GetSystemData;
}
export interface ConfirmUserPasswordResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface ConfirmUserPasswordInput {
/*密码*/	password?: string;
}
export interface DeleteUserResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface FindUserData {
	/*序号*/
	id?: number;
	/*用户名*/
	username?: string;
	/*手机号*/
	mobile?: string;
	/*部门名称*/
	departmentTitle?: string;
	/*角色*/
	roles?: string[];
	/*状态 0:禁用状态;1:启用状态;-1:禁用后被启用*/
	status?: number;
	/*创建时间*/
	createDate?: string;
	/*创建人*/
	createUserName?: string;
}
export interface FindUserResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: FindUserData[];
}
export interface FindUserDateInput {
/*new Date(`年-月-日 时-分-秒`).toISOString()*/	start?: string;
/*new Date().toISOString()*/	end?: string;
}
export interface DepartmentOrStationInput {
/*type = 'department' 部门, id是部门的id
type = 'station' id是岗位的id*/	type: string;
	id: number;
}
export interface FindUserInput {
/*页码*/	page?: number;
/*每页数量*/	psize?: number;
/*名称*/	username?: string;
/*手机号*/	mobile?: string;
/*状态
状态码:0:禁用状态;1:启用状态;-1:禁用后被启用*/	status?: number;
/*创建时间  开始and结束*/	createDate?: FindUserDateInput;
	createUserId?: number;
	departmentOrStation?: DepartmentOrStationInput;
}
export interface ForbidUserResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface ForbidUserInput {
/*用户id*/	uid: number;
/*状态:0:禁用状态 1:启用状态 -1: 禁用后启用*/	status: number;
}
export interface GetUsertations {
	id: number;
	title: string;
}
export interface GetUserResultData {
	/*用户id*/
	id?: string;
	/*用户名称*/
	username: string;
	/*电话号码*/
	mobile?: string;
	/*电子邮箱*/
	email?: string;
	/*任岗的id和title*/
	stations?: GetUsertations[];
	/*绑定人员的id*/
	bindingStaff?: GetUsertations;
	/*状态*/
	status?: number;
	/*创建时间*/
	createDate?: string;
	/*创建人*/
	createUserName?: string;
}
export interface GetUserResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: GetUserResultData;
}
export interface SaveUserData {
	/*用户ID*/
	id?: string;
	/*用户名*/
	username?: string;
	/*电话号码*/
	mobile?: string;
	/*电子邮箱*/
	email?: string;
	/*岗位*/
	renGang?: string[];
	/*绑定人员*/
	bindingStaff?: string;
}
export interface SaveUserResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: SaveUserData;
}
export interface SaveUserInput {
/*用户id*/	id?: number;
/*用户名称*/	username?: string;
/*电话号码*/	mobile?: string;
/*电子邮箱*/	email?: string;
/*任岗的id*/	renGang?: number[];
/*绑定人员的id*/	bindingStaff?: number;
}
export interface UpdateUserPasswordResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface UpdateUserPasswordInput {
/*新密码*/	newPassword: string;
/*密码确认*/	passwordConfirmation: string;
/*用户Id*/	uid: number;
}
export interface DeleteWallPlanResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface FindWallPlanData {
	/*预案名称*/
	title: string;
	/*描述*/
	desc: string;
	/*创建人*/
	cearteUserName: string;
	/*日期时间*/
	cearteDate: string;
}
export interface FindWallPlanResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
	/*返回数据*/
	data?: FindWallPlanData;
}
export interface FindWallPlanInput {
/*预案id*/	id: number;
/*预案名称*/	title: string;
/*创建时间*/	createDate?: CreateDateInput;
/*创建人*/	createUser?: CreateUserInput;
}
export interface saveWallPlanResult {
	/*返回码*/
	code: number;
	/*返回信息*/
	message: string;
}
export interface saveWallPlanInput {
/*预案名称*/	title: string;
/*预案描述*/	desc: string;
/*设备id*/	deviceId: string;
}
export interface Query {
	/*欢迎页信息*/
	getWelcomeInfo<T>(__selection?: string): Promise<T & WelcomeInfo>;
	/*获取欢迎页代办事项*/
	getWelcomeToDoItems<T>(__selection?: string): Promise<T & ToDoItems>;
	/*获取欢迎页展示子系统*/
	getWelcomeSystems<T>(__selection?: string): Promise<T & System[]>;
	/*重新获取随机码*/
	createRandomCode<T>(__selection?: string): Promise<T & string>;
	/*检查用户状态*/
	checkUserState<T>(username: string, __selection?: string): Promise<T & CheckUserStateResult>;
	/*用户登录*/
	login<T>(username: string, password: string, __selection?: string): Promise<T & LoginOutput>;
	/*查找域*/
	findDomain<T>(/*查找条件*/entity: FindDomainInput, __selection?: string): Promise<T & FindDomainResult>;
	/*获取域详情*/
	getDomain<T>(/*域id*/id: number, __selection?: string): Promise<T & GetDomainResult>;
	/*获取所有的报警预案*/
	findAlarmPlan<T>(/*查询条件*/entity: FindAlarmPlanInput, __selection?: string): Promise<T & FindAlarmPlanResult>;
	getAlarmPlan<T>(__selection?: string): Promise<T & FindPagePermissionResult>;
	findmenu<T>(__selection?: string): Promise<T & FindMenuResult>;
	findModule<T>(entity: FindModuleInput, __selection?: string): Promise<T & FindModuleResult>;
	getModule<T>(id: number, __selection?: string): Promise<T & GetModuleResult>;
	/*查抓图*/
	findCapture<T>(/*查找条件*/entity: FindCaptureInput, __selection?: string): Promise<T & FindCaptureResult>;
	getPermission<T>(__selection?: string): Promise<T & GetPermissionResult>;
	findRole<T>(entity: FindRoleInput, __selection?: string): Promise<T & FindRoleResult>;
	getRole<T>(entity: GetRoleGroupInput, __selection?: string): Promise<T & GetRoleResult>;
	/*轮巡任务-通过条件查询轮巡任务列表*/
	findRoundPatrol<T>(entity: FindRoundPatrolInput, __selection?: string): Promise<T & FinRoundPatrolResult>;
	/*获取任务详情*/
	getRoundPatrol<T>(/*任务id*/id: number, __selection?: string): Promise<T & GetRoundPatrolResult>;
	/*根据指定条件查询批量的岗位*/
	findStation<T>(/*查询条件*/entity: FindStationInput, __selection?: string): Promise<T & FindStationResult>;
	/*根据岗位id获取岗位的信息*/
	getStation<T>(/*岗位id*/id: number, __selection?: string): Promise<T & GetStationResult>;
	getAllDepartment<T>(entity: GetAllDepartmentInput, __selection?: string): Promise<T & GetAllDepartmentResult>;
	/*通过部门获取所有岗位*/
	getAllStationByDepartment<T>(/*查询条件,部门id*/entity: GetAllStationByDepartmentInput, __selection?: string): Promise<T & GetAllStationByDepartmentResult>;
	/*通过岗位获取所有用户*/
	getAllUserByStation<T>(/*查询条件,岗位id*/entity: GetAllUserByStationInput, __selection?: string): Promise<T & GetAllUserByStationResult>;
	findSummary<T>(entity: FindSummaryInput, __selection?: string): Promise<T & FindSummaryResult>;
	/*模块管理-根据条件获取模块列表*/
	findSystem<T>(entity?: FindSystemInput, __selection?: string): Promise<T & FindSystemResult[]>;
	/*获取系统详情*/
	getSystem<T>(/*系统id*/id: number, __selection?: string): Promise<T & GetSystemResult>;
	confirmUserPassword<T>(entity: ConfirmUserPasswordInput, __selection?: string): Promise<T & ConfirmUserPasswordResult>;
	findUser<T>(entity: FindUserInput, user: Empty, __selection?: string): Promise<T & FindUserResult>;
	getUser<T>(uid: number, __selection?: string): Promise<T & GetUserResult>;
	findWallPlan<T>(entity: FindWallPlanInput, __selection?: string): Promise<T & FindWallPlanResult>;
}
export interface Mutation {
	verifyUserToken<T>(token: string, uid: number, __selection?: string): Promise<T & boolean>;
	/*绑定随机码*/
	bindUserToken<T>(entity: BindUserTokenInput, __selection?: string): Promise<T & BindUserTokenResult>;
	/*伪删除域管理
status -1 删除成功!*/
	deleteDomain<T>(/*根据id,状态删除*/id: number, __selection?: string): Promise<T & DeleteDomainResult>;
	/*域禁用
status 0为禁用 1启用成功*/
	forbidDomain<T>(/**/entity: ForbidDomainInput, __selection?: string): Promise<T & ForbidDomainResult>;
	/*保存域 编辑域*/
	saveDomain<T>(/**/entity: SaveDomainInput, __selection?: string): Promise<T & SaveDomainResult>;
	/*新增报警预案*/
	AddAlarmPlan<T>(/*预案id*/id: number, __selection?: string): Promise<T & AddAlarmPlanResult>;
	/*删除报警预案*/
	deleteAlarmPlan<T>(/*预案id*/id: number, __selection?: string): Promise<T & DeleteAlarmPlanResult>;
	/*报警预案禁用
status 0为禁用 1启用成功*/
	forbidAlarmPlan<T>(/**/entity: ForbidAlarmPlanInput, __selection?: string): Promise<T & forbidAlarmPlanResult>;
	saveAlarmPlan<T>(__selection?: string): Promise<T & SaveAlarmPlanResult>;
	saveMenu<T>(entity: SaveMenuInput, __selection?: string): Promise<T & SaveMenuRsesult>;
	deleteModule<T>(id: number, __selection?: string): Promise<T & DeleteModuleResult>;
	forbidModule<T>(entity: ForbidModuleInput, __selection?: string): Promise<T & ForbidModuleResult>;
	/*根据设备id删除抓拍图片*/
	deleteCapture<T>(/*设备id*/id: number, __selection?: string): Promise<T & DeleteCaptureResult>;
	saveCapture<T>(entity: SaveCaptureInput, __selection?: string): Promise<T & SaveCaptureResult>;
	saveRoleRight<T>(entity: SaveRoleRightInput, __selection?: string): Promise<T & SaveRoleRightResult>;
	deleteRoleRight<T>(entity: DeleteRoleRightInput, __selection?: string): Promise<T & DeleteRoleRightResult>;
	savaRole<T>(entity: SaveRoleInput, __selection?: string): Promise<T & SaveRoleResult>;
	/*通过任务id删除任务详情*/
	deleteRoundPatrol<T>(id: number, __selection?: string): Promise<T & DeleteRoundPatrolResult>;
	/*轮巡编辑-保存*/
	saveRoundPatrol<T>(/**/entity: SaveRoundPatrolInput, __selection?: string): Promise<T & SaveRoundPatrolResult>;
	deleteStation<T>(id: number, __selection?: string): Promise<T & DeleteStationResult>;
	/*禁用岗位*/
	forbidStation<T>(entity: ForbidStationInput, __selection?: string): Promise<T & ForbidStationResult>;
	/*保存部门 编辑部门 删除部门*/
	saveDepartment<T>(/**/entity: SaveDepartmentInput, __selection?: string): Promise<T & SaveDepartmentResult>;
	saveStation<T>(entity: SaveStationInput, __selection?: string): Promise<T & SaveStationResult>;
	deleteDepartment<T>(entity: DeleteDepartmentInput, __selection?: string): Promise<T & DeleteDepartmentResult>;
	/*删除岗位的用户*/
	deleteStationUser<T>(/*删除条件,岗位id和用户id*/entity: DeleteStationUserInput, __selection?: string): Promise<T & DeleteStationUserResult>;
	/*添加岗位的用户*/
	addStationUser<T>(/*添加条件,岗位id和用户id*/entity: AddStationUserInput, __selection?: string): Promise<T & AddStationUserResult>;
	saveSummary<T>(entity: SaveSummaryInput, __selection?: string): Promise<T & SaveSummaryResult>;
	deleteUser<T>(uid: number, __selection?: string): Promise<T & DeleteUserResult>;
	forbidUser<T>(entity: ForbidUserInput, __selection?: string): Promise<T & ForbidUserResult>;
	saveUser<T>(entity: SaveUserInput, __selection?: string): Promise<T & SaveUserResult>;
	updateUserPassword<T>(entity: UpdateUserPasswordInput, __selection?: string): Promise<T & UpdateUserPasswordResult>;
	/*根据预案id 删除上墙预案*/
	deleteWallPlan<T>(/*预案id*/id: number, __selection?: string): Promise<T & DeleteWallPlanResult>;
	saveWallPlan<T>(entity: saveWallPlanInput, __selection?: string): Promise<T & saveWallPlanResult>;
}