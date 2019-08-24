/* tslint:disable */
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Bool: any,
  Bytes: any,
  Date: any,
  Double: any,
  Empty: any,
  Error: any,
  Fixed32: any,
  Fixed64: any,
  Int32: any,
  Int64: any,
  Json: any,
  Sfixed32: any,
  Sfixed64: any,
  Sint32: any,
  Sint64: any,
  Timestamp: any,
  Uint32: any,
  Uint64: any,
};






/** 部门表 */
export type Department = {
  __typename?: 'Department',
  /** 部门编号 */
  id?: Maybe<Scalars['Int']>,
  /** 部门名称 */
  title?: Maybe<Scalars['String']>,
  /** 部门状态 */
  status?: Maybe<Scalars['Int']>,
  /** 是否显示 */
  shown?: Maybe<Scalars['Boolean']>,
  /** 创建时间 */
  createDate?: Maybe<Scalars['Int']>,
  domainId?: Maybe<Scalars['Int']>,
};

/** 部门表 */
export type DepartmentInput = {
  /** 部门编号 */
  id?: Maybe<Scalars['Int']>,
  /** 部门名称 */
  title?: Maybe<Scalars['String']>,
  /** 部门状态 */
  status?: Maybe<Scalars['Int']>,
  /** 是否显示 */
  shown?: Maybe<Scalars['Boolean']>,
  /** 创建时间 */
  createDate?: Maybe<Scalars['Int']>,
  domainId?: Maybe<Scalars['Int']>,
};

/** 部门表 */
export type DepartmentInputOrder = {
  /** 
 * 部门编号
   * 排序可选值为ASC或者DESC
 **/
  id?: Maybe<Scalars['String']>,
  /** 
 * 部门名称
   * 排序可选值为ASC或者DESC
 **/
  title?: Maybe<Scalars['String']>,
  /** 
 * 部门状态
   * 排序可选值为ASC或者DESC
 **/
  status?: Maybe<Scalars['String']>,
  /** 
 * 是否显示
   * 排序可选值为ASC或者DESC
 **/
  shown?: Maybe<Scalars['String']>,
  /** 
 * 创建时间
   * 排序可选值为ASC或者DESC
 **/
  createDate?: Maybe<Scalars['String']>,
  domainId?: Maybe<Scalars['String']>,
};

/** 部门表 */
export type DepartmentInputWhere = {
  /** 部门编号 不等于 */
  id_Not?: Maybe<Scalars['Int']>,
  /** 部门编号 在制定内，如[1,2] */
  id_In?: Maybe<Array<Scalars['Int']>>,
  /** 部门编号 不在制定内,如[1,2] */
  id_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 部门编号 小于 */
  id_Lt?: Maybe<Scalars['Int']>,
  /** 部门编号 小于等于 */
  id_Lte?: Maybe<Scalars['Int']>,
  /** 部门编号 大于 */
  id_Gt?: Maybe<Scalars['Int']>,
  /** 部门编号 大于等于 */
  id_Gte?: Maybe<Scalars['Int']>,
  /** 部门编号 */
  id?: Maybe<Scalars['Int']>,
  /** 部门名称 不等于 */
  title_Not?: Maybe<Scalars['String']>,
  /** 部门名称 在制定内，如[1,2] */
  title_In?: Maybe<Array<Scalars['String']>>,
  /** 部门名称 不在制定内,如[1,2] */
  title_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 部门名称 小于 */
  title_Lt?: Maybe<Scalars['String']>,
  /** 部门名称 小于等于 */
  title_Lte?: Maybe<Scalars['String']>,
  /** 部门名称 大于 */
  title_Gt?: Maybe<Scalars['String']>,
  /** 部门名称 大于等于 */
  title_Gte?: Maybe<Scalars['String']>,
  /** 部门名称 包含 */
  title_Contains?: Maybe<Scalars['String']>,
  /** 部门名称 不包含 */
  title_NotContains?: Maybe<Scalars['String']>,
  /** 部门名称 开头等于 */
  title_StartsWith?: Maybe<Scalars['String']>,
  /** 部门名称 开头不等于 */
  title_NotStartsWith?: Maybe<Scalars['String']>,
  /** 部门名称 结尾等于 */
  title_EndsWith?: Maybe<Scalars['String']>,
  /** 部门名称 结尾不等于 */
  title_NotEndsWith?: Maybe<Scalars['String']>,
  /** 部门名称 */
  title?: Maybe<Scalars['String']>,
  /** 部门状态 不等于 */
  status_Not?: Maybe<Scalars['Int']>,
  /** 部门状态 在制定内，如[1,2] */
  status_In?: Maybe<Array<Scalars['Int']>>,
  /** 部门状态 不在制定内,如[1,2] */
  status_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 部门状态 小于 */
  status_Lt?: Maybe<Scalars['Int']>,
  /** 部门状态 小于等于 */
  status_Lte?: Maybe<Scalars['Int']>,
  /** 部门状态 大于 */
  status_Gt?: Maybe<Scalars['Int']>,
  /** 部门状态 大于等于 */
  status_Gte?: Maybe<Scalars['Int']>,
  /** 部门状态 */
  status?: Maybe<Scalars['Int']>,
  /** 创建时间 不等于 */
  createDate_Not?: Maybe<Scalars['Int']>,
  /** 创建时间 在制定内，如[1,2] */
  createDate_In?: Maybe<Array<Scalars['Int']>>,
  /** 创建时间 不在制定内,如[1,2] */
  createDate_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 创建时间 小于 */
  createDate_Lt?: Maybe<Scalars['Int']>,
  /** 创建时间 小于等于 */
  createDate_Lte?: Maybe<Scalars['Int']>,
  /** 创建时间 大于 */
  createDate_Gt?: Maybe<Scalars['Int']>,
  /** 创建时间 大于等于 */
  createDate_Gte?: Maybe<Scalars['Int']>,
  /** 创建时间 */
  createDate?: Maybe<Scalars['Int']>,
  domainId_Not?: Maybe<Scalars['Int']>,
  domainId_In?: Maybe<Array<Scalars['Int']>>,
  domainId_NotIn?: Maybe<Array<Scalars['Int']>>,
  domainId_Lt?: Maybe<Scalars['Int']>,
  domainId_Lte?: Maybe<Scalars['Int']>,
  domainId_Gt?: Maybe<Scalars['Int']>,
  domainId_Gte?: Maybe<Scalars['Int']>,
  domainId?: Maybe<Scalars['Int']>,
  AND?: Maybe<Array<DepartmentInputWhere>>,
  OR?: Maybe<Array<DepartmentInputWhere>>,
  NOT?: Maybe<Array<DepartmentInputWhere>>,
};









export type Mutation = {
  __typename?: 'Mutation',
  /** 没有就插入，有就更新 */
  userSave?: Maybe<User>,
  /** 没有就插入，有就更新 */
  systemSave?: Maybe<System>,
  /** 没有就插入，有就更新 */
  systemEventSave?: Maybe<SystemEvent>,
  /** 没有就插入，有就更新 */
  systemRightSave?: Maybe<SystemRight>,
  /** 没有就插入，有就更新 */
  departmentSave?: Maybe<Department>,
  /** 没有就插入，有就更新 */
  roleSave?: Maybe<Role>,
  /** 没有就插入，有就更新 */
  stationSave?: Maybe<Station>,
  /** 没有就插入，有就更新 */
  toDoItemSave?: Maybe<ToDoItem>,
  /** 没有就插入，有就更新 */
  roleGroupSave?: Maybe<RoleGroup>,
  /** 没有就插入，有就更新 */
  userLoginLogSave?: Maybe<UserLoginLog>,
  /** 没有就插入，有就更新 */
  safetyScoreLogSave?: Maybe<SafetyScoreLog>,
  /** 没有就插入，有就更新 */
  safetyScoreRuleSave?: Maybe<SafetyScoreRule>,
  /** 插入数据 */
  userInsert?: Maybe<User>,
  /** 插入数据 */
  systemInsert?: Maybe<System>,
  /** 插入数据 */
  systemEventInsert?: Maybe<SystemEvent>,
  /** 插入数据 */
  systemRightInsert?: Maybe<SystemRight>,
  /** 插入数据 */
  departmentInsert?: Maybe<Department>,
  /** 插入数据 */
  roleInsert?: Maybe<Role>,
  /** 插入数据 */
  stationInsert?: Maybe<Station>,
  /** 插入数据 */
  toDoItemInsert?: Maybe<ToDoItem>,
  /** 插入数据 */
  roleGroupInsert?: Maybe<RoleGroup>,
  /** 插入数据 */
  userLoginLogInsert?: Maybe<UserLoginLog>,
  /** 插入数据 */
  safetyScoreLogInsert?: Maybe<SafetyScoreLog>,
  /** 插入数据 */
  safetyScoreRuleInsert?: Maybe<SafetyScoreRule>,
};


export type MutationUserSaveArgs = {
  entity: UserInput
};


export type MutationSystemSaveArgs = {
  entity: SystemInput
};


export type MutationSystemEventSaveArgs = {
  entity: SystemEventInput
};


export type MutationSystemRightSaveArgs = {
  entity: SystemRightInput
};


export type MutationDepartmentSaveArgs = {
  entity: DepartmentInput
};


export type MutationRoleSaveArgs = {
  entity: RoleInput
};


export type MutationStationSaveArgs = {
  entity: StationInput
};


export type MutationToDoItemSaveArgs = {
  entity: ToDoItemInput
};


export type MutationRoleGroupSaveArgs = {
  entity: RoleGroupInput
};


export type MutationUserLoginLogSaveArgs = {
  entity: UserLoginLogInput
};


export type MutationSafetyScoreLogSaveArgs = {
  entity: SafetyScoreLogInput
};


export type MutationSafetyScoreRuleSaveArgs = {
  entity: SafetyScoreRuleInput
};


export type MutationUserInsertArgs = {
  entity: UserInput
};


export type MutationSystemInsertArgs = {
  entity: SystemInput
};


export type MutationSystemEventInsertArgs = {
  entity: SystemEventInput
};


export type MutationSystemRightInsertArgs = {
  entity: SystemRightInput
};


export type MutationDepartmentInsertArgs = {
  entity: DepartmentInput
};


export type MutationRoleInsertArgs = {
  entity: RoleInput
};


export type MutationStationInsertArgs = {
  entity: StationInput
};


export type MutationToDoItemInsertArgs = {
  entity: ToDoItemInput
};


export type MutationRoleGroupInsertArgs = {
  entity: RoleGroupInput
};


export type MutationUserLoginLogInsertArgs = {
  entity: UserLoginLogInput
};


export type MutationSafetyScoreLogInsertArgs = {
  entity: SafetyScoreLogInput
};


export type MutationSafetyScoreRuleInsertArgs = {
  entity: SafetyScoreRuleInput
};

export type PageLimitInput = {
  /** 页码 */
  page: Scalars['Int'],
  /** 每页数量 */
  psize: Scalars['Int'],
};

export type Query = {
  __typename?: 'Query',
  /** 通过指定条件获取一条数据 */
  userGet?: Maybe<User>,
  /** 通过指定条件获取一条数据 */
  systemGet?: Maybe<System>,
  /** 通过指定条件获取一条数据 */
  systemEventGet?: Maybe<SystemEvent>,
  /** 通过指定条件获取一条数据 */
  systemRightGet?: Maybe<SystemRight>,
  /** 通过指定条件获取一条数据 */
  departmentGet?: Maybe<Department>,
  /** 通过指定条件获取一条数据 */
  roleGet?: Maybe<Role>,
  /** 通过指定条件获取一条数据 */
  stationGet?: Maybe<Station>,
  /** 通过指定条件获取一条数据 */
  toDoItemGet?: Maybe<ToDoItem>,
  /** 通过指定条件获取一条数据 */
  roleGroupGet?: Maybe<RoleGroup>,
  /** 通过指定条件获取一条数据 */
  userLoginLogGet?: Maybe<UserLoginLog>,
  /** 通过指定条件获取一条数据 */
  safetyScoreLogGet?: Maybe<SafetyScoreLog>,
  /** 通过指定条件获取一条数据 */
  safetyScoreRuleGet?: Maybe<SafetyScoreRule>,
  /** 通过制定条件获取一组数据 */
  userFind?: Maybe<Array<Maybe<User>>>,
  /** 通过制定条件获取一组数据 */
  systemFind?: Maybe<Array<Maybe<System>>>,
  /** 通过制定条件获取一组数据 */
  systemEventFind?: Maybe<Array<Maybe<SystemEvent>>>,
  /** 通过制定条件获取一组数据 */
  systemRightFind?: Maybe<Array<Maybe<SystemRight>>>,
  /** 通过制定条件获取一组数据 */
  departmentFind?: Maybe<Array<Maybe<Department>>>,
  /** 通过制定条件获取一组数据 */
  roleFind?: Maybe<Array<Maybe<Role>>>,
  /** 通过制定条件获取一组数据 */
  stationFind?: Maybe<Array<Maybe<Station>>>,
  /** 通过制定条件获取一组数据 */
  toDoItemFind?: Maybe<Array<Maybe<ToDoItem>>>,
  /** 通过制定条件获取一组数据 */
  roleGroupFind?: Maybe<Array<Maybe<RoleGroup>>>,
  /** 通过制定条件获取一组数据 */
  userLoginLogFind?: Maybe<Array<Maybe<UserLoginLog>>>,
  /** 通过制定条件获取一组数据 */
  safetyScoreLogFind?: Maybe<Array<Maybe<SafetyScoreLog>>>,
  /** 通过制定条件获取一组数据 */
  safetyScoreRuleFind?: Maybe<Array<Maybe<SafetyScoreRule>>>,
  /** 删除 */
  userDelete?: Maybe<Scalars['Boolean']>,
  /** 删除 */
  systemDelete?: Maybe<Scalars['Boolean']>,
  /** 删除 */
  systemEventDelete?: Maybe<Scalars['Boolean']>,
  /** 删除 */
  systemRightDelete?: Maybe<Scalars['Boolean']>,
  /** 删除 */
  departmentDelete?: Maybe<Scalars['Boolean']>,
  /** 删除 */
  roleDelete?: Maybe<Scalars['Boolean']>,
  /** 删除 */
  stationDelete?: Maybe<Scalars['Boolean']>,
  /** 删除 */
  toDoItemDelete?: Maybe<Scalars['Boolean']>,
  /** 删除 */
  roleGroupDelete?: Maybe<Scalars['Boolean']>,
  /** 删除 */
  userLoginLogDelete?: Maybe<Scalars['Boolean']>,
  /** 删除 */
  safetyScoreLogDelete?: Maybe<Scalars['Boolean']>,
  /** 删除 */
  safetyScoreRuleDelete?: Maybe<Scalars['Boolean']>,
};


export type QueryUserGetArgs = {
  entity: UserInputWhere
};


export type QuerySystemGetArgs = {
  entity: SystemInputWhere
};


export type QuerySystemEventGetArgs = {
  entity: SystemEventInputWhere
};


export type QuerySystemRightGetArgs = {
  entity: SystemRightInputWhere
};


export type QueryDepartmentGetArgs = {
  entity: DepartmentInputWhere
};


export type QueryRoleGetArgs = {
  entity: RoleInputWhere
};


export type QueryStationGetArgs = {
  entity: StationInputWhere
};


export type QueryToDoItemGetArgs = {
  entity: ToDoItemInputWhere
};


export type QueryRoleGroupGetArgs = {
  entity: RoleGroupInputWhere
};


export type QueryUserLoginLogGetArgs = {
  entity: UserLoginLogInputWhere
};


export type QuerySafetyScoreLogGetArgs = {
  entity: SafetyScoreLogInputWhere
};


export type QuerySafetyScoreRuleGetArgs = {
  entity: SafetyScoreRuleInputWhere
};


export type QueryUserFindArgs = {
  entity: UserInputWhere,
  order: UserInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type QuerySystemFindArgs = {
  entity: SystemInputWhere,
  order: SystemInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type QuerySystemEventFindArgs = {
  entity: SystemEventInputWhere,
  order: SystemEventInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type QuerySystemRightFindArgs = {
  entity: SystemRightInputWhere,
  order: SystemRightInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type QueryDepartmentFindArgs = {
  entity: DepartmentInputWhere,
  order: DepartmentInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type QueryRoleFindArgs = {
  entity: RoleInputWhere,
  order: RoleInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type QueryStationFindArgs = {
  entity: StationInputWhere,
  order: StationInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type QueryToDoItemFindArgs = {
  entity: ToDoItemInputWhere,
  order: ToDoItemInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type QueryRoleGroupFindArgs = {
  entity: RoleGroupInputWhere,
  order: RoleGroupInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type QueryUserLoginLogFindArgs = {
  entity: UserLoginLogInputWhere,
  order: UserLoginLogInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type QuerySafetyScoreLogFindArgs = {
  entity: SafetyScoreLogInputWhere,
  order: SafetyScoreLogInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type QuerySafetyScoreRuleFindArgs = {
  entity: SafetyScoreRuleInputWhere,
  order: SafetyScoreRuleInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type QueryUserDeleteArgs = {
  id: Scalars['Int']
};


export type QuerySystemDeleteArgs = {
  id: Scalars['Int']
};


export type QuerySystemEventDeleteArgs = {
  id: Scalars['Int']
};


export type QuerySystemRightDeleteArgs = {
  id: Scalars['Int']
};


export type QueryDepartmentDeleteArgs = {
  id: Scalars['Int']
};


export type QueryRoleDeleteArgs = {
  id: Scalars['Int']
};


export type QueryStationDeleteArgs = {
  id: Scalars['Int']
};


export type QueryToDoItemDeleteArgs = {
  id: Scalars['Int']
};


export type QueryRoleGroupDeleteArgs = {
  id: Scalars['Int']
};


export type QueryUserLoginLogDeleteArgs = {
  id: Scalars['Int']
};


export type QuerySafetyScoreLogDeleteArgs = {
  id: Scalars['Int']
};


export type QuerySafetyScoreRuleDeleteArgs = {
  id: Scalars['Int']
};

/** 角色表 */
export type Role = {
  __typename?: 'Role',
  /** 序号 */
  id?: Maybe<Scalars['Int']>,
  /** 角色标识 */
  code?: Maybe<Scalars['String']>,
  /** 角色名称 */
  title?: Maybe<Scalars['String']>,
  /** 角色描述 */
  desc?: Maybe<Scalars['String']>,
  /** 创建时间 */
  createDate?: Maybe<Scalars['Int']>,
  /** 更新时间 */
  updateDate?: Maybe<Scalars['Int']>,
};

export type RoleGroup = {
  __typename?: 'RoleGroup',
  id?: Maybe<Scalars['Int']>,
  /** 角色组名 */
  title?: Maybe<Scalars['String']>,
  /** 角色组简介 */
  desc?: Maybe<Scalars['String']>,
};

export type RoleGroupInput = {
  id?: Maybe<Scalars['Int']>,
  /** 角色组名 */
  title?: Maybe<Scalars['String']>,
  /** 角色组简介 */
  desc?: Maybe<Scalars['String']>,
};

export type RoleGroupInputOrder = {
  id?: Maybe<Scalars['String']>,
  /** 
 * 角色组名
   * 排序可选值为ASC或者DESC
 **/
  title?: Maybe<Scalars['String']>,
  /** 
 * 角色组简介
   * 排序可选值为ASC或者DESC
 **/
  desc?: Maybe<Scalars['String']>,
};

export type RoleGroupInputWhere = {
  id_Not?: Maybe<Scalars['Int']>,
  id_In?: Maybe<Array<Scalars['Int']>>,
  id_NotIn?: Maybe<Array<Scalars['Int']>>,
  id_Lt?: Maybe<Scalars['Int']>,
  id_Lte?: Maybe<Scalars['Int']>,
  id_Gt?: Maybe<Scalars['Int']>,
  id_Gte?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>,
  /** 角色组名 不等于 */
  title_Not?: Maybe<Scalars['String']>,
  /** 角色组名 在制定内，如[1,2] */
  title_In?: Maybe<Array<Scalars['String']>>,
  /** 角色组名 不在制定内,如[1,2] */
  title_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 角色组名 小于 */
  title_Lt?: Maybe<Scalars['String']>,
  /** 角色组名 小于等于 */
  title_Lte?: Maybe<Scalars['String']>,
  /** 角色组名 大于 */
  title_Gt?: Maybe<Scalars['String']>,
  /** 角色组名 大于等于 */
  title_Gte?: Maybe<Scalars['String']>,
  /** 角色组名 包含 */
  title_Contains?: Maybe<Scalars['String']>,
  /** 角色组名 不包含 */
  title_NotContains?: Maybe<Scalars['String']>,
  /** 角色组名 开头等于 */
  title_StartsWith?: Maybe<Scalars['String']>,
  /** 角色组名 开头不等于 */
  title_NotStartsWith?: Maybe<Scalars['String']>,
  /** 角色组名 结尾等于 */
  title_EndsWith?: Maybe<Scalars['String']>,
  /** 角色组名 结尾不等于 */
  title_NotEndsWith?: Maybe<Scalars['String']>,
  /** 角色组名 */
  title?: Maybe<Scalars['String']>,
  /** 角色组简介 不等于 */
  desc_Not?: Maybe<Scalars['String']>,
  /** 角色组简介 在制定内，如[1,2] */
  desc_In?: Maybe<Array<Scalars['String']>>,
  /** 角色组简介 不在制定内,如[1,2] */
  desc_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 角色组简介 小于 */
  desc_Lt?: Maybe<Scalars['String']>,
  /** 角色组简介 小于等于 */
  desc_Lte?: Maybe<Scalars['String']>,
  /** 角色组简介 大于 */
  desc_Gt?: Maybe<Scalars['String']>,
  /** 角色组简介 大于等于 */
  desc_Gte?: Maybe<Scalars['String']>,
  /** 角色组简介 包含 */
  desc_Contains?: Maybe<Scalars['String']>,
  /** 角色组简介 不包含 */
  desc_NotContains?: Maybe<Scalars['String']>,
  /** 角色组简介 开头等于 */
  desc_StartsWith?: Maybe<Scalars['String']>,
  /** 角色组简介 开头不等于 */
  desc_NotStartsWith?: Maybe<Scalars['String']>,
  /** 角色组简介 结尾等于 */
  desc_EndsWith?: Maybe<Scalars['String']>,
  /** 角色组简介 结尾不等于 */
  desc_NotEndsWith?: Maybe<Scalars['String']>,
  /** 角色组简介 */
  desc?: Maybe<Scalars['String']>,
  AND?: Maybe<Array<RoleGroupInputWhere>>,
  OR?: Maybe<Array<RoleGroupInputWhere>>,
  NOT?: Maybe<Array<RoleGroupInputWhere>>,
};

/** 角色表 */
export type RoleInput = {
  /** 序号 */
  id?: Maybe<Scalars['Int']>,
  /** 角色标识 */
  code?: Maybe<Scalars['String']>,
  /** 角色名称 */
  title?: Maybe<Scalars['String']>,
  /** 角色描述 */
  desc?: Maybe<Scalars['String']>,
  /** 创建时间 */
  createDate?: Maybe<Scalars['Int']>,
  /** 更新时间 */
  updateDate?: Maybe<Scalars['Int']>,
};

/** 角色表 */
export type RoleInputOrder = {
  /** 
 * 序号
   * 排序可选值为ASC或者DESC
 **/
  id?: Maybe<Scalars['String']>,
  /** 
 * 角色标识
   * 排序可选值为ASC或者DESC
 **/
  code?: Maybe<Scalars['String']>,
  /** 
 * 角色名称
   * 排序可选值为ASC或者DESC
 **/
  title?: Maybe<Scalars['String']>,
  /** 
 * 角色描述
   * 排序可选值为ASC或者DESC
 **/
  desc?: Maybe<Scalars['String']>,
  /** 
 * 创建时间
   * 排序可选值为ASC或者DESC
 **/
  createDate?: Maybe<Scalars['String']>,
  /** 
 * 更新时间
   * 排序可选值为ASC或者DESC
 **/
  updateDate?: Maybe<Scalars['String']>,
};

/** 角色表 */
export type RoleInputWhere = {
  /** 序号 不等于 */
  id_Not?: Maybe<Scalars['Int']>,
  /** 序号 在制定内，如[1,2] */
  id_In?: Maybe<Array<Scalars['Int']>>,
  /** 序号 不在制定内,如[1,2] */
  id_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 序号 小于 */
  id_Lt?: Maybe<Scalars['Int']>,
  /** 序号 小于等于 */
  id_Lte?: Maybe<Scalars['Int']>,
  /** 序号 大于 */
  id_Gt?: Maybe<Scalars['Int']>,
  /** 序号 大于等于 */
  id_Gte?: Maybe<Scalars['Int']>,
  /** 序号 */
  id?: Maybe<Scalars['Int']>,
  /** 角色标识 不等于 */
  code_Not?: Maybe<Scalars['String']>,
  /** 角色标识 在制定内，如[1,2] */
  code_In?: Maybe<Array<Scalars['String']>>,
  /** 角色标识 不在制定内,如[1,2] */
  code_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 角色标识 小于 */
  code_Lt?: Maybe<Scalars['String']>,
  /** 角色标识 小于等于 */
  code_Lte?: Maybe<Scalars['String']>,
  /** 角色标识 大于 */
  code_Gt?: Maybe<Scalars['String']>,
  /** 角色标识 大于等于 */
  code_Gte?: Maybe<Scalars['String']>,
  /** 角色标识 包含 */
  code_Contains?: Maybe<Scalars['String']>,
  /** 角色标识 不包含 */
  code_NotContains?: Maybe<Scalars['String']>,
  /** 角色标识 开头等于 */
  code_StartsWith?: Maybe<Scalars['String']>,
  /** 角色标识 开头不等于 */
  code_NotStartsWith?: Maybe<Scalars['String']>,
  /** 角色标识 结尾等于 */
  code_EndsWith?: Maybe<Scalars['String']>,
  /** 角色标识 结尾不等于 */
  code_NotEndsWith?: Maybe<Scalars['String']>,
  /** 角色标识 */
  code?: Maybe<Scalars['String']>,
  /** 角色名称 不等于 */
  title_Not?: Maybe<Scalars['String']>,
  /** 角色名称 在制定内，如[1,2] */
  title_In?: Maybe<Array<Scalars['String']>>,
  /** 角色名称 不在制定内,如[1,2] */
  title_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 角色名称 小于 */
  title_Lt?: Maybe<Scalars['String']>,
  /** 角色名称 小于等于 */
  title_Lte?: Maybe<Scalars['String']>,
  /** 角色名称 大于 */
  title_Gt?: Maybe<Scalars['String']>,
  /** 角色名称 大于等于 */
  title_Gte?: Maybe<Scalars['String']>,
  /** 角色名称 包含 */
  title_Contains?: Maybe<Scalars['String']>,
  /** 角色名称 不包含 */
  title_NotContains?: Maybe<Scalars['String']>,
  /** 角色名称 开头等于 */
  title_StartsWith?: Maybe<Scalars['String']>,
  /** 角色名称 开头不等于 */
  title_NotStartsWith?: Maybe<Scalars['String']>,
  /** 角色名称 结尾等于 */
  title_EndsWith?: Maybe<Scalars['String']>,
  /** 角色名称 结尾不等于 */
  title_NotEndsWith?: Maybe<Scalars['String']>,
  /** 角色名称 */
  title?: Maybe<Scalars['String']>,
  /** 角色描述 不等于 */
  desc_Not?: Maybe<Scalars['String']>,
  /** 角色描述 在制定内，如[1,2] */
  desc_In?: Maybe<Array<Scalars['String']>>,
  /** 角色描述 不在制定内,如[1,2] */
  desc_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 角色描述 小于 */
  desc_Lt?: Maybe<Scalars['String']>,
  /** 角色描述 小于等于 */
  desc_Lte?: Maybe<Scalars['String']>,
  /** 角色描述 大于 */
  desc_Gt?: Maybe<Scalars['String']>,
  /** 角色描述 大于等于 */
  desc_Gte?: Maybe<Scalars['String']>,
  /** 角色描述 包含 */
  desc_Contains?: Maybe<Scalars['String']>,
  /** 角色描述 不包含 */
  desc_NotContains?: Maybe<Scalars['String']>,
  /** 角色描述 开头等于 */
  desc_StartsWith?: Maybe<Scalars['String']>,
  /** 角色描述 开头不等于 */
  desc_NotStartsWith?: Maybe<Scalars['String']>,
  /** 角色描述 结尾等于 */
  desc_EndsWith?: Maybe<Scalars['String']>,
  /** 角色描述 结尾不等于 */
  desc_NotEndsWith?: Maybe<Scalars['String']>,
  /** 角色描述 */
  desc?: Maybe<Scalars['String']>,
  /** 创建时间 不等于 */
  createDate_Not?: Maybe<Scalars['Int']>,
  /** 创建时间 在制定内，如[1,2] */
  createDate_In?: Maybe<Array<Scalars['Int']>>,
  /** 创建时间 不在制定内,如[1,2] */
  createDate_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 创建时间 小于 */
  createDate_Lt?: Maybe<Scalars['Int']>,
  /** 创建时间 小于等于 */
  createDate_Lte?: Maybe<Scalars['Int']>,
  /** 创建时间 大于 */
  createDate_Gt?: Maybe<Scalars['Int']>,
  /** 创建时间 大于等于 */
  createDate_Gte?: Maybe<Scalars['Int']>,
  /** 创建时间 */
  createDate?: Maybe<Scalars['Int']>,
  /** 更新时间 不等于 */
  updateDate_Not?: Maybe<Scalars['Int']>,
  /** 更新时间 在制定内，如[1,2] */
  updateDate_In?: Maybe<Array<Scalars['Int']>>,
  /** 更新时间 不在制定内,如[1,2] */
  updateDate_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 更新时间 小于 */
  updateDate_Lt?: Maybe<Scalars['Int']>,
  /** 更新时间 小于等于 */
  updateDate_Lte?: Maybe<Scalars['Int']>,
  /** 更新时间 大于 */
  updateDate_Gt?: Maybe<Scalars['Int']>,
  /** 更新时间 大于等于 */
  updateDate_Gte?: Maybe<Scalars['Int']>,
  /** 更新时间 */
  updateDate?: Maybe<Scalars['Int']>,
  AND?: Maybe<Array<RoleInputWhere>>,
  OR?: Maybe<Array<RoleInputWhere>>,
  NOT?: Maybe<Array<RoleInputWhere>>,
};

/** 用户安全分扣除记录 */
export type SafetyScoreLog = {
  __typename?: 'SafetyScoreLog',
  /** 编号 */
  id?: Maybe<Scalars['Int']>,
  /** 扣除分数 */
  score?: Maybe<Scalars['Int']>,
  /** 时间 */
  createDate?: Maybe<Scalars['Int']>,
};

/** 用户安全分扣除记录 */
export type SafetyScoreLogInput = {
  /** 编号 */
  id?: Maybe<Scalars['Int']>,
  /** 扣除分数 */
  score?: Maybe<Scalars['Int']>,
  /** 时间 */
  createDate?: Maybe<Scalars['Int']>,
};

/** 用户安全分扣除记录 */
export type SafetyScoreLogInputOrder = {
  /** 
 * 编号
   * 排序可选值为ASC或者DESC
 **/
  id?: Maybe<Scalars['String']>,
  /** 
 * 扣除分数
   * 排序可选值为ASC或者DESC
 **/
  score?: Maybe<Scalars['String']>,
  /** 
 * 时间
   * 排序可选值为ASC或者DESC
 **/
  createDate?: Maybe<Scalars['String']>,
};

/** 用户安全分扣除记录 */
export type SafetyScoreLogInputWhere = {
  /** 编号 不等于 */
  id_Not?: Maybe<Scalars['Int']>,
  /** 编号 在制定内，如[1,2] */
  id_In?: Maybe<Array<Scalars['Int']>>,
  /** 编号 不在制定内,如[1,2] */
  id_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 编号 小于 */
  id_Lt?: Maybe<Scalars['Int']>,
  /** 编号 小于等于 */
  id_Lte?: Maybe<Scalars['Int']>,
  /** 编号 大于 */
  id_Gt?: Maybe<Scalars['Int']>,
  /** 编号 大于等于 */
  id_Gte?: Maybe<Scalars['Int']>,
  /** 编号 */
  id?: Maybe<Scalars['Int']>,
  /** 扣除分数 不等于 */
  score_Not?: Maybe<Scalars['Int']>,
  /** 扣除分数 在制定内，如[1,2] */
  score_In?: Maybe<Array<Scalars['Int']>>,
  /** 扣除分数 不在制定内,如[1,2] */
  score_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 扣除分数 小于 */
  score_Lt?: Maybe<Scalars['Int']>,
  /** 扣除分数 小于等于 */
  score_Lte?: Maybe<Scalars['Int']>,
  /** 扣除分数 大于 */
  score_Gt?: Maybe<Scalars['Int']>,
  /** 扣除分数 大于等于 */
  score_Gte?: Maybe<Scalars['Int']>,
  /** 扣除分数 */
  score?: Maybe<Scalars['Int']>,
  /** 时间 不等于 */
  createDate_Not?: Maybe<Scalars['Int']>,
  /** 时间 在制定内，如[1,2] */
  createDate_In?: Maybe<Array<Scalars['Int']>>,
  /** 时间 不在制定内,如[1,2] */
  createDate_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 时间 小于 */
  createDate_Lt?: Maybe<Scalars['Int']>,
  /** 时间 小于等于 */
  createDate_Lte?: Maybe<Scalars['Int']>,
  /** 时间 大于 */
  createDate_Gt?: Maybe<Scalars['Int']>,
  /** 时间 大于等于 */
  createDate_Gte?: Maybe<Scalars['Int']>,
  /** 时间 */
  createDate?: Maybe<Scalars['Int']>,
  AND?: Maybe<Array<SafetyScoreLogInputWhere>>,
  OR?: Maybe<Array<SafetyScoreLogInputWhere>>,
  NOT?: Maybe<Array<SafetyScoreLogInputWhere>>,
};

export type SafetyScoreRule = {
  __typename?: 'SafetyScoreRule',
  id?: Maybe<Scalars['Int']>,
  /** 规则名 */
  title?: Maybe<Scalars['String']>,
  /** 代号 */
  code?: Maybe<Scalars['String']>,
  /** 分值 */
  score?: Maybe<Scalars['Int']>,
  /** 是否替换 */
  isReplace?: Maybe<Scalars['Boolean']>,
  /** 时间 */
  createDate?: Maybe<Scalars['Int']>,
};

export type SafetyScoreRuleInput = {
  id?: Maybe<Scalars['Int']>,
  /** 规则名 */
  title?: Maybe<Scalars['String']>,
  /** 代号 */
  code?: Maybe<Scalars['String']>,
  /** 分值 */
  score?: Maybe<Scalars['Int']>,
  /** 是否替换 */
  isReplace?: Maybe<Scalars['Boolean']>,
  /** 时间 */
  createDate?: Maybe<Scalars['Int']>,
};

export type SafetyScoreRuleInputOrder = {
  id?: Maybe<Scalars['String']>,
  /** 
 * 规则名
   * 排序可选值为ASC或者DESC
 **/
  title?: Maybe<Scalars['String']>,
  /** 
 * 代号
   * 排序可选值为ASC或者DESC
 **/
  code?: Maybe<Scalars['String']>,
  /** 
 * 分值
   * 排序可选值为ASC或者DESC
 **/
  score?: Maybe<Scalars['String']>,
  /** 
 * 是否替换
   * 排序可选值为ASC或者DESC
 **/
  isReplace?: Maybe<Scalars['String']>,
  /** 
 * 时间
   * 排序可选值为ASC或者DESC
 **/
  createDate?: Maybe<Scalars['String']>,
};

export type SafetyScoreRuleInputWhere = {
  id_Not?: Maybe<Scalars['Int']>,
  id_In?: Maybe<Array<Scalars['Int']>>,
  id_NotIn?: Maybe<Array<Scalars['Int']>>,
  id_Lt?: Maybe<Scalars['Int']>,
  id_Lte?: Maybe<Scalars['Int']>,
  id_Gt?: Maybe<Scalars['Int']>,
  id_Gte?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>,
  /** 规则名 不等于 */
  title_Not?: Maybe<Scalars['String']>,
  /** 规则名 在制定内，如[1,2] */
  title_In?: Maybe<Array<Scalars['String']>>,
  /** 规则名 不在制定内,如[1,2] */
  title_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 规则名 小于 */
  title_Lt?: Maybe<Scalars['String']>,
  /** 规则名 小于等于 */
  title_Lte?: Maybe<Scalars['String']>,
  /** 规则名 大于 */
  title_Gt?: Maybe<Scalars['String']>,
  /** 规则名 大于等于 */
  title_Gte?: Maybe<Scalars['String']>,
  /** 规则名 包含 */
  title_Contains?: Maybe<Scalars['String']>,
  /** 规则名 不包含 */
  title_NotContains?: Maybe<Scalars['String']>,
  /** 规则名 开头等于 */
  title_StartsWith?: Maybe<Scalars['String']>,
  /** 规则名 开头不等于 */
  title_NotStartsWith?: Maybe<Scalars['String']>,
  /** 规则名 结尾等于 */
  title_EndsWith?: Maybe<Scalars['String']>,
  /** 规则名 结尾不等于 */
  title_NotEndsWith?: Maybe<Scalars['String']>,
  /** 规则名 */
  title?: Maybe<Scalars['String']>,
  /** 代号 不等于 */
  code_Not?: Maybe<Scalars['String']>,
  /** 代号 在制定内，如[1,2] */
  code_In?: Maybe<Array<Scalars['String']>>,
  /** 代号 不在制定内,如[1,2] */
  code_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 代号 小于 */
  code_Lt?: Maybe<Scalars['String']>,
  /** 代号 小于等于 */
  code_Lte?: Maybe<Scalars['String']>,
  /** 代号 大于 */
  code_Gt?: Maybe<Scalars['String']>,
  /** 代号 大于等于 */
  code_Gte?: Maybe<Scalars['String']>,
  /** 代号 包含 */
  code_Contains?: Maybe<Scalars['String']>,
  /** 代号 不包含 */
  code_NotContains?: Maybe<Scalars['String']>,
  /** 代号 开头等于 */
  code_StartsWith?: Maybe<Scalars['String']>,
  /** 代号 开头不等于 */
  code_NotStartsWith?: Maybe<Scalars['String']>,
  /** 代号 结尾等于 */
  code_EndsWith?: Maybe<Scalars['String']>,
  /** 代号 结尾不等于 */
  code_NotEndsWith?: Maybe<Scalars['String']>,
  /** 代号 */
  code?: Maybe<Scalars['String']>,
  /** 分值 不等于 */
  score_Not?: Maybe<Scalars['Int']>,
  /** 分值 在制定内，如[1,2] */
  score_In?: Maybe<Array<Scalars['Int']>>,
  /** 分值 不在制定内,如[1,2] */
  score_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 分值 小于 */
  score_Lt?: Maybe<Scalars['Int']>,
  /** 分值 小于等于 */
  score_Lte?: Maybe<Scalars['Int']>,
  /** 分值 大于 */
  score_Gt?: Maybe<Scalars['Int']>,
  /** 分值 大于等于 */
  score_Gte?: Maybe<Scalars['Int']>,
  /** 分值 */
  score?: Maybe<Scalars['Int']>,
  /** 时间 不等于 */
  createDate_Not?: Maybe<Scalars['Int']>,
  /** 时间 在制定内，如[1,2] */
  createDate_In?: Maybe<Array<Scalars['Int']>>,
  /** 时间 不在制定内,如[1,2] */
  createDate_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 时间 小于 */
  createDate_Lt?: Maybe<Scalars['Int']>,
  /** 时间 小于等于 */
  createDate_Lte?: Maybe<Scalars['Int']>,
  /** 时间 大于 */
  createDate_Gt?: Maybe<Scalars['Int']>,
  /** 时间 大于等于 */
  createDate_Gte?: Maybe<Scalars['Int']>,
  /** 时间 */
  createDate?: Maybe<Scalars['Int']>,
  AND?: Maybe<Array<SafetyScoreRuleInputWhere>>,
  OR?: Maybe<Array<SafetyScoreRuleInputWhere>>,
  NOT?: Maybe<Array<SafetyScoreRuleInputWhere>>,
};





/** 岗位表 */
export type Station = {
  __typename?: 'Station',
  /** 岗位序号 */
  id?: Maybe<Scalars['Int']>,
  /** 岗位标题 */
  title?: Maybe<Scalars['String']>,
  /** 岗位描述 */
  desc?: Maybe<Scalars['String']>,
  /** 岗位标识码 */
  code?: Maybe<Scalars['String']>,
  /** 岗位责任 */
  responsibilities?: Maybe<Scalars['String']>,
  /** 岗位要求 */
  requirements?: Maybe<Scalars['String']>,
  /** 岗位状态 */
  status?: Maybe<Scalars['Int']>,
  /** 创建日期 */
  createDate?: Maybe<Scalars['String']>,
};

/** 岗位表 */
export type StationInput = {
  /** 岗位序号 */
  id?: Maybe<Scalars['Int']>,
  /** 岗位标题 */
  title?: Maybe<Scalars['String']>,
  /** 岗位描述 */
  desc?: Maybe<Scalars['String']>,
  /** 岗位标识码 */
  code?: Maybe<Scalars['String']>,
  /** 岗位责任 */
  responsibilities?: Maybe<Scalars['String']>,
  /** 岗位要求 */
  requirements?: Maybe<Scalars['String']>,
  /** 岗位状态 */
  status?: Maybe<Scalars['Int']>,
  /** 创建日期 */
  createDate?: Maybe<Scalars['String']>,
};

/** 岗位表 */
export type StationInputOrder = {
  /** 
 * 岗位序号
   * 排序可选值为ASC或者DESC
 **/
  id?: Maybe<Scalars['String']>,
  /** 
 * 岗位标题
   * 排序可选值为ASC或者DESC
 **/
  title?: Maybe<Scalars['String']>,
  /** 
 * 岗位描述
   * 排序可选值为ASC或者DESC
 **/
  desc?: Maybe<Scalars['String']>,
  /** 
 * 岗位标识码
   * 排序可选值为ASC或者DESC
 **/
  code?: Maybe<Scalars['String']>,
  /** 
 * 岗位责任
   * 排序可选值为ASC或者DESC
 **/
  responsibilities?: Maybe<Scalars['String']>,
  /** 
 * 岗位要求
   * 排序可选值为ASC或者DESC
 **/
  requirements?: Maybe<Scalars['String']>,
  /** 
 * 岗位状态
   * 排序可选值为ASC或者DESC
 **/
  status?: Maybe<Scalars['String']>,
  /** 
 * 创建日期
   * 排序可选值为ASC或者DESC
 **/
  createDate?: Maybe<Scalars['String']>,
};

/** 岗位表 */
export type StationInputWhere = {
  /** 岗位序号 不等于 */
  id_Not?: Maybe<Scalars['Int']>,
  /** 岗位序号 在制定内，如[1,2] */
  id_In?: Maybe<Array<Scalars['Int']>>,
  /** 岗位序号 不在制定内,如[1,2] */
  id_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 岗位序号 小于 */
  id_Lt?: Maybe<Scalars['Int']>,
  /** 岗位序号 小于等于 */
  id_Lte?: Maybe<Scalars['Int']>,
  /** 岗位序号 大于 */
  id_Gt?: Maybe<Scalars['Int']>,
  /** 岗位序号 大于等于 */
  id_Gte?: Maybe<Scalars['Int']>,
  /** 岗位序号 */
  id?: Maybe<Scalars['Int']>,
  /** 岗位标题 不等于 */
  title_Not?: Maybe<Scalars['String']>,
  /** 岗位标题 在制定内，如[1,2] */
  title_In?: Maybe<Array<Scalars['String']>>,
  /** 岗位标题 不在制定内,如[1,2] */
  title_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 岗位标题 小于 */
  title_Lt?: Maybe<Scalars['String']>,
  /** 岗位标题 小于等于 */
  title_Lte?: Maybe<Scalars['String']>,
  /** 岗位标题 大于 */
  title_Gt?: Maybe<Scalars['String']>,
  /** 岗位标题 大于等于 */
  title_Gte?: Maybe<Scalars['String']>,
  /** 岗位标题 包含 */
  title_Contains?: Maybe<Scalars['String']>,
  /** 岗位标题 不包含 */
  title_NotContains?: Maybe<Scalars['String']>,
  /** 岗位标题 开头等于 */
  title_StartsWith?: Maybe<Scalars['String']>,
  /** 岗位标题 开头不等于 */
  title_NotStartsWith?: Maybe<Scalars['String']>,
  /** 岗位标题 结尾等于 */
  title_EndsWith?: Maybe<Scalars['String']>,
  /** 岗位标题 结尾不等于 */
  title_NotEndsWith?: Maybe<Scalars['String']>,
  /** 岗位标题 */
  title?: Maybe<Scalars['String']>,
  /** 岗位描述 不等于 */
  desc_Not?: Maybe<Scalars['String']>,
  /** 岗位描述 在制定内，如[1,2] */
  desc_In?: Maybe<Array<Scalars['String']>>,
  /** 岗位描述 不在制定内,如[1,2] */
  desc_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 岗位描述 小于 */
  desc_Lt?: Maybe<Scalars['String']>,
  /** 岗位描述 小于等于 */
  desc_Lte?: Maybe<Scalars['String']>,
  /** 岗位描述 大于 */
  desc_Gt?: Maybe<Scalars['String']>,
  /** 岗位描述 大于等于 */
  desc_Gte?: Maybe<Scalars['String']>,
  /** 岗位描述 包含 */
  desc_Contains?: Maybe<Scalars['String']>,
  /** 岗位描述 不包含 */
  desc_NotContains?: Maybe<Scalars['String']>,
  /** 岗位描述 开头等于 */
  desc_StartsWith?: Maybe<Scalars['String']>,
  /** 岗位描述 开头不等于 */
  desc_NotStartsWith?: Maybe<Scalars['String']>,
  /** 岗位描述 结尾等于 */
  desc_EndsWith?: Maybe<Scalars['String']>,
  /** 岗位描述 结尾不等于 */
  desc_NotEndsWith?: Maybe<Scalars['String']>,
  /** 岗位描述 */
  desc?: Maybe<Scalars['String']>,
  /** 岗位标识码 不等于 */
  code_Not?: Maybe<Scalars['String']>,
  /** 岗位标识码 在制定内，如[1,2] */
  code_In?: Maybe<Array<Scalars['String']>>,
  /** 岗位标识码 不在制定内,如[1,2] */
  code_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 岗位标识码 小于 */
  code_Lt?: Maybe<Scalars['String']>,
  /** 岗位标识码 小于等于 */
  code_Lte?: Maybe<Scalars['String']>,
  /** 岗位标识码 大于 */
  code_Gt?: Maybe<Scalars['String']>,
  /** 岗位标识码 大于等于 */
  code_Gte?: Maybe<Scalars['String']>,
  /** 岗位标识码 包含 */
  code_Contains?: Maybe<Scalars['String']>,
  /** 岗位标识码 不包含 */
  code_NotContains?: Maybe<Scalars['String']>,
  /** 岗位标识码 开头等于 */
  code_StartsWith?: Maybe<Scalars['String']>,
  /** 岗位标识码 开头不等于 */
  code_NotStartsWith?: Maybe<Scalars['String']>,
  /** 岗位标识码 结尾等于 */
  code_EndsWith?: Maybe<Scalars['String']>,
  /** 岗位标识码 结尾不等于 */
  code_NotEndsWith?: Maybe<Scalars['String']>,
  /** 岗位标识码 */
  code?: Maybe<Scalars['String']>,
  /** 岗位责任 不等于 */
  responsibilities_Not?: Maybe<Scalars['String']>,
  /** 岗位责任 在制定内，如[1,2] */
  responsibilities_In?: Maybe<Array<Scalars['String']>>,
  /** 岗位责任 不在制定内,如[1,2] */
  responsibilities_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 岗位责任 小于 */
  responsibilities_Lt?: Maybe<Scalars['String']>,
  /** 岗位责任 小于等于 */
  responsibilities_Lte?: Maybe<Scalars['String']>,
  /** 岗位责任 大于 */
  responsibilities_Gt?: Maybe<Scalars['String']>,
  /** 岗位责任 大于等于 */
  responsibilities_Gte?: Maybe<Scalars['String']>,
  /** 岗位责任 包含 */
  responsibilities_Contains?: Maybe<Scalars['String']>,
  /** 岗位责任 不包含 */
  responsibilities_NotContains?: Maybe<Scalars['String']>,
  /** 岗位责任 开头等于 */
  responsibilities_StartsWith?: Maybe<Scalars['String']>,
  /** 岗位责任 开头不等于 */
  responsibilities_NotStartsWith?: Maybe<Scalars['String']>,
  /** 岗位责任 结尾等于 */
  responsibilities_EndsWith?: Maybe<Scalars['String']>,
  /** 岗位责任 结尾不等于 */
  responsibilities_NotEndsWith?: Maybe<Scalars['String']>,
  /** 岗位责任 */
  responsibilities?: Maybe<Scalars['String']>,
  /** 岗位要求 不等于 */
  requirements_Not?: Maybe<Scalars['String']>,
  /** 岗位要求 在制定内，如[1,2] */
  requirements_In?: Maybe<Array<Scalars['String']>>,
  /** 岗位要求 不在制定内,如[1,2] */
  requirements_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 岗位要求 小于 */
  requirements_Lt?: Maybe<Scalars['String']>,
  /** 岗位要求 小于等于 */
  requirements_Lte?: Maybe<Scalars['String']>,
  /** 岗位要求 大于 */
  requirements_Gt?: Maybe<Scalars['String']>,
  /** 岗位要求 大于等于 */
  requirements_Gte?: Maybe<Scalars['String']>,
  /** 岗位要求 包含 */
  requirements_Contains?: Maybe<Scalars['String']>,
  /** 岗位要求 不包含 */
  requirements_NotContains?: Maybe<Scalars['String']>,
  /** 岗位要求 开头等于 */
  requirements_StartsWith?: Maybe<Scalars['String']>,
  /** 岗位要求 开头不等于 */
  requirements_NotStartsWith?: Maybe<Scalars['String']>,
  /** 岗位要求 结尾等于 */
  requirements_EndsWith?: Maybe<Scalars['String']>,
  /** 岗位要求 结尾不等于 */
  requirements_NotEndsWith?: Maybe<Scalars['String']>,
  /** 岗位要求 */
  requirements?: Maybe<Scalars['String']>,
  /** 岗位状态 不等于 */
  status_Not?: Maybe<Scalars['Int']>,
  /** 岗位状态 在制定内，如[1,2] */
  status_In?: Maybe<Array<Scalars['Int']>>,
  /** 岗位状态 不在制定内,如[1,2] */
  status_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 岗位状态 小于 */
  status_Lt?: Maybe<Scalars['Int']>,
  /** 岗位状态 小于等于 */
  status_Lte?: Maybe<Scalars['Int']>,
  /** 岗位状态 大于 */
  status_Gt?: Maybe<Scalars['Int']>,
  /** 岗位状态 大于等于 */
  status_Gte?: Maybe<Scalars['Int']>,
  /** 岗位状态 */
  status?: Maybe<Scalars['Int']>,
  /** 创建日期 不等于 */
  createDate_Not?: Maybe<Scalars['String']>,
  /** 创建日期 在制定内，如[1,2] */
  createDate_In?: Maybe<Array<Scalars['String']>>,
  /** 创建日期 不在制定内,如[1,2] */
  createDate_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 创建日期 小于 */
  createDate_Lt?: Maybe<Scalars['String']>,
  /** 创建日期 小于等于 */
  createDate_Lte?: Maybe<Scalars['String']>,
  /** 创建日期 大于 */
  createDate_Gt?: Maybe<Scalars['String']>,
  /** 创建日期 大于等于 */
  createDate_Gte?: Maybe<Scalars['String']>,
  /** 创建日期 包含 */
  createDate_Contains?: Maybe<Scalars['String']>,
  /** 创建日期 不包含 */
  createDate_NotContains?: Maybe<Scalars['String']>,
  /** 创建日期 开头等于 */
  createDate_StartsWith?: Maybe<Scalars['String']>,
  /** 创建日期 开头不等于 */
  createDate_NotStartsWith?: Maybe<Scalars['String']>,
  /** 创建日期 结尾等于 */
  createDate_EndsWith?: Maybe<Scalars['String']>,
  /** 创建日期 结尾不等于 */
  createDate_NotEndsWith?: Maybe<Scalars['String']>,
  /** 创建日期 */
  createDate?: Maybe<Scalars['String']>,
  AND?: Maybe<Array<StationInputWhere>>,
  OR?: Maybe<Array<StationInputWhere>>,
  NOT?: Maybe<Array<StationInputWhere>>,
};

/** 子系统 子模块 */
export type System = {
  __typename?: 'System',
  id?: Maybe<Scalars['Int']>,
  /** 模块名 */
  title?: Maybe<Scalars['String']>,
  /** 系统缩略图片 */
  image?: Maybe<Scalars['String']>,
  /** 首页链接 */
  link?: Maybe<Scalars['String']>,
  /** 模块代号 */
  code?: Maybe<Scalars['String']>,
  /** 配置时间 */
  createDate?: Maybe<Scalars['Int']>,
};

/** 模块事件类型 */
export type SystemEvent = {
  __typename?: 'SystemEvent',
  id?: Maybe<Scalars['Int']>,
  /** 权限名 */
  title?: Maybe<Scalars['String']>,
};

/** 模块事件类型 */
export type SystemEventInput = {
  id?: Maybe<Scalars['Int']>,
  /** 权限名 */
  title?: Maybe<Scalars['String']>,
};

/** 模块事件类型 */
export type SystemEventInputOrder = {
  id?: Maybe<Scalars['String']>,
  /** 
 * 权限名
   * 排序可选值为ASC或者DESC
 **/
  title?: Maybe<Scalars['String']>,
};

/** 模块事件类型 */
export type SystemEventInputWhere = {
  id_Not?: Maybe<Scalars['Int']>,
  id_In?: Maybe<Array<Scalars['Int']>>,
  id_NotIn?: Maybe<Array<Scalars['Int']>>,
  id_Lt?: Maybe<Scalars['Int']>,
  id_Lte?: Maybe<Scalars['Int']>,
  id_Gt?: Maybe<Scalars['Int']>,
  id_Gte?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>,
  /** 权限名 不等于 */
  title_Not?: Maybe<Scalars['String']>,
  /** 权限名 在制定内，如[1,2] */
  title_In?: Maybe<Array<Scalars['String']>>,
  /** 权限名 不在制定内,如[1,2] */
  title_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 权限名 小于 */
  title_Lt?: Maybe<Scalars['String']>,
  /** 权限名 小于等于 */
  title_Lte?: Maybe<Scalars['String']>,
  /** 权限名 大于 */
  title_Gt?: Maybe<Scalars['String']>,
  /** 权限名 大于等于 */
  title_Gte?: Maybe<Scalars['String']>,
  /** 权限名 包含 */
  title_Contains?: Maybe<Scalars['String']>,
  /** 权限名 不包含 */
  title_NotContains?: Maybe<Scalars['String']>,
  /** 权限名 开头等于 */
  title_StartsWith?: Maybe<Scalars['String']>,
  /** 权限名 开头不等于 */
  title_NotStartsWith?: Maybe<Scalars['String']>,
  /** 权限名 结尾等于 */
  title_EndsWith?: Maybe<Scalars['String']>,
  /** 权限名 结尾不等于 */
  title_NotEndsWith?: Maybe<Scalars['String']>,
  /** 权限名 */
  title?: Maybe<Scalars['String']>,
  AND?: Maybe<Array<SystemEventInputWhere>>,
  OR?: Maybe<Array<SystemEventInputWhere>>,
  NOT?: Maybe<Array<SystemEventInputWhere>>,
};

/** 子系统 子模块 */
export type SystemInput = {
  id?: Maybe<Scalars['Int']>,
  /** 模块名 */
  title?: Maybe<Scalars['String']>,
  /** 系统缩略图片 */
  image?: Maybe<Scalars['String']>,
  /** 首页链接 */
  link?: Maybe<Scalars['String']>,
  /** 模块代号 */
  code?: Maybe<Scalars['String']>,
  /** 配置时间 */
  createDate?: Maybe<Scalars['Int']>,
};

/** 子系统 子模块 */
export type SystemInputOrder = {
  id?: Maybe<Scalars['String']>,
  /** 
 * 模块名
   * 排序可选值为ASC或者DESC
 **/
  title?: Maybe<Scalars['String']>,
  /** 
 * 系统缩略图片
   * 排序可选值为ASC或者DESC
 **/
  image?: Maybe<Scalars['String']>,
  /** 
 * 首页链接
   * 排序可选值为ASC或者DESC
 **/
  link?: Maybe<Scalars['String']>,
  /** 
 * 模块代号
   * 排序可选值为ASC或者DESC
 **/
  code?: Maybe<Scalars['String']>,
  /** 
 * 配置时间
   * 排序可选值为ASC或者DESC
 **/
  createDate?: Maybe<Scalars['String']>,
};

/** 子系统 子模块 */
export type SystemInputWhere = {
  id_Not?: Maybe<Scalars['Int']>,
  id_In?: Maybe<Array<Scalars['Int']>>,
  id_NotIn?: Maybe<Array<Scalars['Int']>>,
  id_Lt?: Maybe<Scalars['Int']>,
  id_Lte?: Maybe<Scalars['Int']>,
  id_Gt?: Maybe<Scalars['Int']>,
  id_Gte?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>,
  /** 模块名 不等于 */
  title_Not?: Maybe<Scalars['String']>,
  /** 模块名 在制定内，如[1,2] */
  title_In?: Maybe<Array<Scalars['String']>>,
  /** 模块名 不在制定内,如[1,2] */
  title_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 模块名 小于 */
  title_Lt?: Maybe<Scalars['String']>,
  /** 模块名 小于等于 */
  title_Lte?: Maybe<Scalars['String']>,
  /** 模块名 大于 */
  title_Gt?: Maybe<Scalars['String']>,
  /** 模块名 大于等于 */
  title_Gte?: Maybe<Scalars['String']>,
  /** 模块名 包含 */
  title_Contains?: Maybe<Scalars['String']>,
  /** 模块名 不包含 */
  title_NotContains?: Maybe<Scalars['String']>,
  /** 模块名 开头等于 */
  title_StartsWith?: Maybe<Scalars['String']>,
  /** 模块名 开头不等于 */
  title_NotStartsWith?: Maybe<Scalars['String']>,
  /** 模块名 结尾等于 */
  title_EndsWith?: Maybe<Scalars['String']>,
  /** 模块名 结尾不等于 */
  title_NotEndsWith?: Maybe<Scalars['String']>,
  /** 模块名 */
  title?: Maybe<Scalars['String']>,
  /** 系统缩略图片 不等于 */
  image_Not?: Maybe<Scalars['String']>,
  /** 系统缩略图片 在制定内，如[1,2] */
  image_In?: Maybe<Array<Scalars['String']>>,
  /** 系统缩略图片 不在制定内,如[1,2] */
  image_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 系统缩略图片 小于 */
  image_Lt?: Maybe<Scalars['String']>,
  /** 系统缩略图片 小于等于 */
  image_Lte?: Maybe<Scalars['String']>,
  /** 系统缩略图片 大于 */
  image_Gt?: Maybe<Scalars['String']>,
  /** 系统缩略图片 大于等于 */
  image_Gte?: Maybe<Scalars['String']>,
  /** 系统缩略图片 包含 */
  image_Contains?: Maybe<Scalars['String']>,
  /** 系统缩略图片 不包含 */
  image_NotContains?: Maybe<Scalars['String']>,
  /** 系统缩略图片 开头等于 */
  image_StartsWith?: Maybe<Scalars['String']>,
  /** 系统缩略图片 开头不等于 */
  image_NotStartsWith?: Maybe<Scalars['String']>,
  /** 系统缩略图片 结尾等于 */
  image_EndsWith?: Maybe<Scalars['String']>,
  /** 系统缩略图片 结尾不等于 */
  image_NotEndsWith?: Maybe<Scalars['String']>,
  /** 系统缩略图片 */
  image?: Maybe<Scalars['String']>,
  /** 首页链接 不等于 */
  link_Not?: Maybe<Scalars['String']>,
  /** 首页链接 在制定内，如[1,2] */
  link_In?: Maybe<Array<Scalars['String']>>,
  /** 首页链接 不在制定内,如[1,2] */
  link_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 首页链接 小于 */
  link_Lt?: Maybe<Scalars['String']>,
  /** 首页链接 小于等于 */
  link_Lte?: Maybe<Scalars['String']>,
  /** 首页链接 大于 */
  link_Gt?: Maybe<Scalars['String']>,
  /** 首页链接 大于等于 */
  link_Gte?: Maybe<Scalars['String']>,
  /** 首页链接 包含 */
  link_Contains?: Maybe<Scalars['String']>,
  /** 首页链接 不包含 */
  link_NotContains?: Maybe<Scalars['String']>,
  /** 首页链接 开头等于 */
  link_StartsWith?: Maybe<Scalars['String']>,
  /** 首页链接 开头不等于 */
  link_NotStartsWith?: Maybe<Scalars['String']>,
  /** 首页链接 结尾等于 */
  link_EndsWith?: Maybe<Scalars['String']>,
  /** 首页链接 结尾不等于 */
  link_NotEndsWith?: Maybe<Scalars['String']>,
  /** 首页链接 */
  link?: Maybe<Scalars['String']>,
  /** 模块代号 不等于 */
  code_Not?: Maybe<Scalars['String']>,
  /** 模块代号 在制定内，如[1,2] */
  code_In?: Maybe<Array<Scalars['String']>>,
  /** 模块代号 不在制定内,如[1,2] */
  code_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 模块代号 小于 */
  code_Lt?: Maybe<Scalars['String']>,
  /** 模块代号 小于等于 */
  code_Lte?: Maybe<Scalars['String']>,
  /** 模块代号 大于 */
  code_Gt?: Maybe<Scalars['String']>,
  /** 模块代号 大于等于 */
  code_Gte?: Maybe<Scalars['String']>,
  /** 模块代号 包含 */
  code_Contains?: Maybe<Scalars['String']>,
  /** 模块代号 不包含 */
  code_NotContains?: Maybe<Scalars['String']>,
  /** 模块代号 开头等于 */
  code_StartsWith?: Maybe<Scalars['String']>,
  /** 模块代号 开头不等于 */
  code_NotStartsWith?: Maybe<Scalars['String']>,
  /** 模块代号 结尾等于 */
  code_EndsWith?: Maybe<Scalars['String']>,
  /** 模块代号 结尾不等于 */
  code_NotEndsWith?: Maybe<Scalars['String']>,
  /** 模块代号 */
  code?: Maybe<Scalars['String']>,
  /** 配置时间 不等于 */
  createDate_Not?: Maybe<Scalars['Int']>,
  /** 配置时间 在制定内，如[1,2] */
  createDate_In?: Maybe<Array<Scalars['Int']>>,
  /** 配置时间 不在制定内,如[1,2] */
  createDate_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 配置时间 小于 */
  createDate_Lt?: Maybe<Scalars['Int']>,
  /** 配置时间 小于等于 */
  createDate_Lte?: Maybe<Scalars['Int']>,
  /** 配置时间 大于 */
  createDate_Gt?: Maybe<Scalars['Int']>,
  /** 配置时间 大于等于 */
  createDate_Gte?: Maybe<Scalars['Int']>,
  /** 配置时间 */
  createDate?: Maybe<Scalars['Int']>,
  AND?: Maybe<Array<SystemInputWhere>>,
  OR?: Maybe<Array<SystemInputWhere>>,
  NOT?: Maybe<Array<SystemInputWhere>>,
};

/** 模块来源权限 */
export type SystemRight = {
  __typename?: 'SystemRight',
  id?: Maybe<Scalars['Int']>,
  /** 
 * 权限类型
   * 页面权限、数据权限、功能权限
 **/
  type?: Maybe<Scalars['String']>,
  /** 权限名 */
  title?: Maybe<Scalars['String']>,
  /** 命名空间 */
  namespace?: Maybe<Scalars['String']>,
  /** 权限代号 */
  code?: Maybe<Scalars['String']>,
  /** 权限链接 */
  link?: Maybe<Scalars['String']>,
};

/** 模块来源权限 */
export type SystemRightInput = {
  id?: Maybe<Scalars['Int']>,
  /** 
 * 权限类型
   * 页面权限、数据权限、功能权限
 **/
  type?: Maybe<Scalars['String']>,
  /** 权限名 */
  title?: Maybe<Scalars['String']>,
  /** 命名空间 */
  namespace?: Maybe<Scalars['String']>,
  /** 权限代号 */
  code?: Maybe<Scalars['String']>,
  /** 权限链接 */
  link?: Maybe<Scalars['String']>,
};

/** 模块来源权限 */
export type SystemRightInputOrder = {
  id?: Maybe<Scalars['String']>,
  /** 
 * 权限类型
   * 页面权限、数据权限、功能权限
   * 排序可选值为ASC或者DESC
 **/
  type?: Maybe<Scalars['String']>,
  /** 
 * 权限名
   * 排序可选值为ASC或者DESC
 **/
  title?: Maybe<Scalars['String']>,
  /** 
 * 命名空间
   * 排序可选值为ASC或者DESC
 **/
  namespace?: Maybe<Scalars['String']>,
  /** 
 * 权限代号
   * 排序可选值为ASC或者DESC
 **/
  code?: Maybe<Scalars['String']>,
  /** 
 * 权限链接
   * 排序可选值为ASC或者DESC
 **/
  link?: Maybe<Scalars['String']>,
};

/** 模块来源权限 */
export type SystemRightInputWhere = {
  id_Not?: Maybe<Scalars['Int']>,
  id_In?: Maybe<Array<Scalars['Int']>>,
  id_NotIn?: Maybe<Array<Scalars['Int']>>,
  id_Lt?: Maybe<Scalars['Int']>,
  id_Lte?: Maybe<Scalars['Int']>,
  id_Gt?: Maybe<Scalars['Int']>,
  id_Gte?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>,
  /** 
 * 权限类型
   * 页面权限、数据权限、功能权限 不等于
 **/
  type_Not?: Maybe<Scalars['String']>,
  /** 
 * 权限类型
   * 页面权限、数据权限、功能权限 在制定内，如[1,2]
 **/
  type_In?: Maybe<Array<Scalars['String']>>,
  /** 
 * 权限类型
   * 页面权限、数据权限、功能权限 不在制定内,如[1,2]
 **/
  type_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 
 * 权限类型
   * 页面权限、数据权限、功能权限 小于
 **/
  type_Lt?: Maybe<Scalars['String']>,
  /** 
 * 权限类型
   * 页面权限、数据权限、功能权限 小于等于
 **/
  type_Lte?: Maybe<Scalars['String']>,
  /** 
 * 权限类型
   * 页面权限、数据权限、功能权限 大于
 **/
  type_Gt?: Maybe<Scalars['String']>,
  /** 
 * 权限类型
   * 页面权限、数据权限、功能权限 大于等于
 **/
  type_Gte?: Maybe<Scalars['String']>,
  /** 
 * 权限类型
   * 页面权限、数据权限、功能权限 包含
 **/
  type_Contains?: Maybe<Scalars['String']>,
  /** 
 * 权限类型
   * 页面权限、数据权限、功能权限 不包含
 **/
  type_NotContains?: Maybe<Scalars['String']>,
  /** 
 * 权限类型
   * 页面权限、数据权限、功能权限 开头等于
 **/
  type_StartsWith?: Maybe<Scalars['String']>,
  /** 
 * 权限类型
   * 页面权限、数据权限、功能权限 开头不等于
 **/
  type_NotStartsWith?: Maybe<Scalars['String']>,
  /** 
 * 权限类型
   * 页面权限、数据权限、功能权限 结尾等于
 **/
  type_EndsWith?: Maybe<Scalars['String']>,
  /** 
 * 权限类型
   * 页面权限、数据权限、功能权限 结尾不等于
 **/
  type_NotEndsWith?: Maybe<Scalars['String']>,
  /** 
 * 权限类型
   * 页面权限、数据权限、功能权限
 **/
  type?: Maybe<Scalars['String']>,
  /** 权限名 不等于 */
  title_Not?: Maybe<Scalars['String']>,
  /** 权限名 在制定内，如[1,2] */
  title_In?: Maybe<Array<Scalars['String']>>,
  /** 权限名 不在制定内,如[1,2] */
  title_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 权限名 小于 */
  title_Lt?: Maybe<Scalars['String']>,
  /** 权限名 小于等于 */
  title_Lte?: Maybe<Scalars['String']>,
  /** 权限名 大于 */
  title_Gt?: Maybe<Scalars['String']>,
  /** 权限名 大于等于 */
  title_Gte?: Maybe<Scalars['String']>,
  /** 权限名 包含 */
  title_Contains?: Maybe<Scalars['String']>,
  /** 权限名 不包含 */
  title_NotContains?: Maybe<Scalars['String']>,
  /** 权限名 开头等于 */
  title_StartsWith?: Maybe<Scalars['String']>,
  /** 权限名 开头不等于 */
  title_NotStartsWith?: Maybe<Scalars['String']>,
  /** 权限名 结尾等于 */
  title_EndsWith?: Maybe<Scalars['String']>,
  /** 权限名 结尾不等于 */
  title_NotEndsWith?: Maybe<Scalars['String']>,
  /** 权限名 */
  title?: Maybe<Scalars['String']>,
  /** 命名空间 不等于 */
  namespace_Not?: Maybe<Scalars['String']>,
  /** 命名空间 在制定内，如[1,2] */
  namespace_In?: Maybe<Array<Scalars['String']>>,
  /** 命名空间 不在制定内,如[1,2] */
  namespace_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 命名空间 小于 */
  namespace_Lt?: Maybe<Scalars['String']>,
  /** 命名空间 小于等于 */
  namespace_Lte?: Maybe<Scalars['String']>,
  /** 命名空间 大于 */
  namespace_Gt?: Maybe<Scalars['String']>,
  /** 命名空间 大于等于 */
  namespace_Gte?: Maybe<Scalars['String']>,
  /** 命名空间 包含 */
  namespace_Contains?: Maybe<Scalars['String']>,
  /** 命名空间 不包含 */
  namespace_NotContains?: Maybe<Scalars['String']>,
  /** 命名空间 开头等于 */
  namespace_StartsWith?: Maybe<Scalars['String']>,
  /** 命名空间 开头不等于 */
  namespace_NotStartsWith?: Maybe<Scalars['String']>,
  /** 命名空间 结尾等于 */
  namespace_EndsWith?: Maybe<Scalars['String']>,
  /** 命名空间 结尾不等于 */
  namespace_NotEndsWith?: Maybe<Scalars['String']>,
  /** 命名空间 */
  namespace?: Maybe<Scalars['String']>,
  /** 权限代号 不等于 */
  code_Not?: Maybe<Scalars['String']>,
  /** 权限代号 在制定内，如[1,2] */
  code_In?: Maybe<Array<Scalars['String']>>,
  /** 权限代号 不在制定内,如[1,2] */
  code_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 权限代号 小于 */
  code_Lt?: Maybe<Scalars['String']>,
  /** 权限代号 小于等于 */
  code_Lte?: Maybe<Scalars['String']>,
  /** 权限代号 大于 */
  code_Gt?: Maybe<Scalars['String']>,
  /** 权限代号 大于等于 */
  code_Gte?: Maybe<Scalars['String']>,
  /** 权限代号 包含 */
  code_Contains?: Maybe<Scalars['String']>,
  /** 权限代号 不包含 */
  code_NotContains?: Maybe<Scalars['String']>,
  /** 权限代号 开头等于 */
  code_StartsWith?: Maybe<Scalars['String']>,
  /** 权限代号 开头不等于 */
  code_NotStartsWith?: Maybe<Scalars['String']>,
  /** 权限代号 结尾等于 */
  code_EndsWith?: Maybe<Scalars['String']>,
  /** 权限代号 结尾不等于 */
  code_NotEndsWith?: Maybe<Scalars['String']>,
  /** 权限代号 */
  code?: Maybe<Scalars['String']>,
  /** 权限链接 不等于 */
  link_Not?: Maybe<Scalars['String']>,
  /** 权限链接 在制定内，如[1,2] */
  link_In?: Maybe<Array<Scalars['String']>>,
  /** 权限链接 不在制定内,如[1,2] */
  link_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 权限链接 小于 */
  link_Lt?: Maybe<Scalars['String']>,
  /** 权限链接 小于等于 */
  link_Lte?: Maybe<Scalars['String']>,
  /** 权限链接 大于 */
  link_Gt?: Maybe<Scalars['String']>,
  /** 权限链接 大于等于 */
  link_Gte?: Maybe<Scalars['String']>,
  /** 权限链接 包含 */
  link_Contains?: Maybe<Scalars['String']>,
  /** 权限链接 不包含 */
  link_NotContains?: Maybe<Scalars['String']>,
  /** 权限链接 开头等于 */
  link_StartsWith?: Maybe<Scalars['String']>,
  /** 权限链接 开头不等于 */
  link_NotStartsWith?: Maybe<Scalars['String']>,
  /** 权限链接 结尾等于 */
  link_EndsWith?: Maybe<Scalars['String']>,
  /** 权限链接 结尾不等于 */
  link_NotEndsWith?: Maybe<Scalars['String']>,
  /** 权限链接 */
  link?: Maybe<Scalars['String']>,
  AND?: Maybe<Array<SystemRightInputWhere>>,
  OR?: Maybe<Array<SystemRightInputWhere>>,
  NOT?: Maybe<Array<SystemRightInputWhere>>,
};


export type ToDoItem = {
  __typename?: 'ToDoItem',
  /** 编号 */
  id?: Maybe<Scalars['Int']>,
  /** 标题 */
  title?: Maybe<Scalars['String']>,
  /** 简介 */
  desc?: Maybe<Scalars['String']>,
  /** 创建时间 */
  createDate?: Maybe<Scalars['String']>,
  fromSystemId?: Maybe<Scalars['Int']>,
  fromEventId?: Maybe<Scalars['Int']>,
  fromUserId?: Maybe<Scalars['Int']>,
  toUserId?: Maybe<Scalars['Int']>,
};

export type ToDoItemInput = {
  /** 编号 */
  id?: Maybe<Scalars['Int']>,
  /** 标题 */
  title?: Maybe<Scalars['String']>,
  /** 简介 */
  desc?: Maybe<Scalars['String']>,
  /** 创建时间 */
  createDate?: Maybe<Scalars['String']>,
  fromSystemId?: Maybe<Scalars['Int']>,
  fromEventId?: Maybe<Scalars['Int']>,
  fromUserId?: Maybe<Scalars['Int']>,
  toUserId?: Maybe<Scalars['Int']>,
};

export type ToDoItemInputOrder = {
  /** 
 * 编号
   * 排序可选值为ASC或者DESC
 **/
  id?: Maybe<Scalars['String']>,
  /** 
 * 标题
   * 排序可选值为ASC或者DESC
 **/
  title?: Maybe<Scalars['String']>,
  /** 
 * 简介
   * 排序可选值为ASC或者DESC
 **/
  desc?: Maybe<Scalars['String']>,
  /** 
 * 创建时间
   * 排序可选值为ASC或者DESC
 **/
  createDate?: Maybe<Scalars['String']>,
  fromSystemId?: Maybe<Scalars['String']>,
  fromEventId?: Maybe<Scalars['String']>,
  fromUserId?: Maybe<Scalars['String']>,
  toUserId?: Maybe<Scalars['String']>,
};

export type ToDoItemInputWhere = {
  /** 编号 不等于 */
  id_Not?: Maybe<Scalars['Int']>,
  /** 编号 在制定内，如[1,2] */
  id_In?: Maybe<Array<Scalars['Int']>>,
  /** 编号 不在制定内,如[1,2] */
  id_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 编号 小于 */
  id_Lt?: Maybe<Scalars['Int']>,
  /** 编号 小于等于 */
  id_Lte?: Maybe<Scalars['Int']>,
  /** 编号 大于 */
  id_Gt?: Maybe<Scalars['Int']>,
  /** 编号 大于等于 */
  id_Gte?: Maybe<Scalars['Int']>,
  /** 编号 */
  id?: Maybe<Scalars['Int']>,
  /** 标题 不等于 */
  title_Not?: Maybe<Scalars['String']>,
  /** 标题 在制定内，如[1,2] */
  title_In?: Maybe<Array<Scalars['String']>>,
  /** 标题 不在制定内,如[1,2] */
  title_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 标题 小于 */
  title_Lt?: Maybe<Scalars['String']>,
  /** 标题 小于等于 */
  title_Lte?: Maybe<Scalars['String']>,
  /** 标题 大于 */
  title_Gt?: Maybe<Scalars['String']>,
  /** 标题 大于等于 */
  title_Gte?: Maybe<Scalars['String']>,
  /** 标题 包含 */
  title_Contains?: Maybe<Scalars['String']>,
  /** 标题 不包含 */
  title_NotContains?: Maybe<Scalars['String']>,
  /** 标题 开头等于 */
  title_StartsWith?: Maybe<Scalars['String']>,
  /** 标题 开头不等于 */
  title_NotStartsWith?: Maybe<Scalars['String']>,
  /** 标题 结尾等于 */
  title_EndsWith?: Maybe<Scalars['String']>,
  /** 标题 结尾不等于 */
  title_NotEndsWith?: Maybe<Scalars['String']>,
  /** 标题 */
  title?: Maybe<Scalars['String']>,
  /** 简介 不等于 */
  desc_Not?: Maybe<Scalars['String']>,
  /** 简介 在制定内，如[1,2] */
  desc_In?: Maybe<Array<Scalars['String']>>,
  /** 简介 不在制定内,如[1,2] */
  desc_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 简介 小于 */
  desc_Lt?: Maybe<Scalars['String']>,
  /** 简介 小于等于 */
  desc_Lte?: Maybe<Scalars['String']>,
  /** 简介 大于 */
  desc_Gt?: Maybe<Scalars['String']>,
  /** 简介 大于等于 */
  desc_Gte?: Maybe<Scalars['String']>,
  /** 简介 包含 */
  desc_Contains?: Maybe<Scalars['String']>,
  /** 简介 不包含 */
  desc_NotContains?: Maybe<Scalars['String']>,
  /** 简介 开头等于 */
  desc_StartsWith?: Maybe<Scalars['String']>,
  /** 简介 开头不等于 */
  desc_NotStartsWith?: Maybe<Scalars['String']>,
  /** 简介 结尾等于 */
  desc_EndsWith?: Maybe<Scalars['String']>,
  /** 简介 结尾不等于 */
  desc_NotEndsWith?: Maybe<Scalars['String']>,
  /** 简介 */
  desc?: Maybe<Scalars['String']>,
  /** 创建时间 不等于 */
  createDate_Not?: Maybe<Scalars['String']>,
  /** 创建时间 在制定内，如[1,2] */
  createDate_In?: Maybe<Array<Scalars['String']>>,
  /** 创建时间 不在制定内,如[1,2] */
  createDate_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 创建时间 小于 */
  createDate_Lt?: Maybe<Scalars['String']>,
  /** 创建时间 小于等于 */
  createDate_Lte?: Maybe<Scalars['String']>,
  /** 创建时间 大于 */
  createDate_Gt?: Maybe<Scalars['String']>,
  /** 创建时间 大于等于 */
  createDate_Gte?: Maybe<Scalars['String']>,
  /** 创建时间 包含 */
  createDate_Contains?: Maybe<Scalars['String']>,
  /** 创建时间 不包含 */
  createDate_NotContains?: Maybe<Scalars['String']>,
  /** 创建时间 开头等于 */
  createDate_StartsWith?: Maybe<Scalars['String']>,
  /** 创建时间 开头不等于 */
  createDate_NotStartsWith?: Maybe<Scalars['String']>,
  /** 创建时间 结尾等于 */
  createDate_EndsWith?: Maybe<Scalars['String']>,
  /** 创建时间 结尾不等于 */
  createDate_NotEndsWith?: Maybe<Scalars['String']>,
  /** 创建时间 */
  createDate?: Maybe<Scalars['String']>,
  fromSystemId_Not?: Maybe<Scalars['Int']>,
  fromSystemId_In?: Maybe<Array<Scalars['Int']>>,
  fromSystemId_NotIn?: Maybe<Array<Scalars['Int']>>,
  fromSystemId_Lt?: Maybe<Scalars['Int']>,
  fromSystemId_Lte?: Maybe<Scalars['Int']>,
  fromSystemId_Gt?: Maybe<Scalars['Int']>,
  fromSystemId_Gte?: Maybe<Scalars['Int']>,
  fromSystemId?: Maybe<Scalars['Int']>,
  fromEventId_Not?: Maybe<Scalars['Int']>,
  fromEventId_In?: Maybe<Array<Scalars['Int']>>,
  fromEventId_NotIn?: Maybe<Array<Scalars['Int']>>,
  fromEventId_Lt?: Maybe<Scalars['Int']>,
  fromEventId_Lte?: Maybe<Scalars['Int']>,
  fromEventId_Gt?: Maybe<Scalars['Int']>,
  fromEventId_Gte?: Maybe<Scalars['Int']>,
  fromEventId?: Maybe<Scalars['Int']>,
  fromUserId_Not?: Maybe<Scalars['Int']>,
  fromUserId_In?: Maybe<Array<Scalars['Int']>>,
  fromUserId_NotIn?: Maybe<Array<Scalars['Int']>>,
  fromUserId_Lt?: Maybe<Scalars['Int']>,
  fromUserId_Lte?: Maybe<Scalars['Int']>,
  fromUserId_Gt?: Maybe<Scalars['Int']>,
  fromUserId_Gte?: Maybe<Scalars['Int']>,
  fromUserId?: Maybe<Scalars['Int']>,
  toUserId_Not?: Maybe<Scalars['Int']>,
  toUserId_In?: Maybe<Array<Scalars['Int']>>,
  toUserId_NotIn?: Maybe<Array<Scalars['Int']>>,
  toUserId_Lt?: Maybe<Scalars['Int']>,
  toUserId_Lte?: Maybe<Scalars['Int']>,
  toUserId_Gt?: Maybe<Scalars['Int']>,
  toUserId_Gte?: Maybe<Scalars['Int']>,
  toUserId?: Maybe<Scalars['Int']>,
  AND?: Maybe<Array<ToDoItemInputWhere>>,
  OR?: Maybe<Array<ToDoItemInputWhere>>,
  NOT?: Maybe<Array<ToDoItemInputWhere>>,
};



/** 用户表 */
export type User = {
  __typename?: 'User',
  /** 用户编号 */
  id?: Maybe<Scalars['Int']>,
  /** 用户名 */
  username?: Maybe<Scalars['String']>,
  /** 邮箱 */
  email?: Maybe<Scalars['String']>,
  /** 头像 */
  avatar?: Maybe<Scalars['String']>,
  /** 电话号码 */
  mobile?: Maybe<Scalars['String']>,
  /** 密码 */
  password?: Maybe<Scalars['String']>,
  /** 1: 账户正常 0:未绑定 -1:刚解冻 -2: 已被封 */
  status?: Maybe<Scalars['Int']>,
  /** 随机码 */
  randomCode?: Maybe<Scalars['String']>,
  /** 密码是否被重置 */
  isRestPassword?: Maybe<Scalars['Boolean']>,
  /** 密码更改时间 */
  passwordDate?: Maybe<Scalars['Int']>,
  /** 创建时间 */
  createDate?: Maybe<Scalars['Int']>,
  /** 创建人的uid */
  createUserId?: Maybe<Scalars['Int']>,
  /** 安全分 */
  safetyScore?: Maybe<Scalars['Int']>,
};

/** 用户表 */
export type UserInput = {
  /** 用户编号 */
  id?: Maybe<Scalars['Int']>,
  /** 用户名 */
  username?: Maybe<Scalars['String']>,
  /** 邮箱 */
  email?: Maybe<Scalars['String']>,
  /** 头像 */
  avatar?: Maybe<Scalars['String']>,
  /** 电话号码 */
  mobile?: Maybe<Scalars['String']>,
  /** 密码 */
  password?: Maybe<Scalars['String']>,
  /** 1: 账户正常 0:未绑定 -1:刚解冻 -2: 已被封 */
  status?: Maybe<Scalars['Int']>,
  /** 随机码 */
  randomCode?: Maybe<Scalars['String']>,
  /** 密码是否被重置 */
  isRestPassword?: Maybe<Scalars['Boolean']>,
  /** 密码更改时间 */
  passwordDate?: Maybe<Scalars['Int']>,
  /** 创建时间 */
  createDate?: Maybe<Scalars['Int']>,
  /** 创建人的uid */
  createUserId?: Maybe<Scalars['Int']>,
  /** 安全分 */
  safetyScore?: Maybe<Scalars['Int']>,
};

/** 用户表 */
export type UserInputOrder = {
  /** 
 * 用户编号
   * 排序可选值为ASC或者DESC
 **/
  id?: Maybe<Scalars['String']>,
  /** 
 * 用户名
   * 排序可选值为ASC或者DESC
 **/
  username?: Maybe<Scalars['String']>,
  /** 
 * 邮箱
   * 排序可选值为ASC或者DESC
 **/
  email?: Maybe<Scalars['String']>,
  /** 
 * 头像
   * 排序可选值为ASC或者DESC
 **/
  avatar?: Maybe<Scalars['String']>,
  /** 
 * 电话号码
   * 排序可选值为ASC或者DESC
 **/
  mobile?: Maybe<Scalars['String']>,
  /** 
 * 密码
   * 排序可选值为ASC或者DESC
 **/
  password?: Maybe<Scalars['String']>,
  /** 
 * 1: 账户正常 0:未绑定 -1:刚解冻 -2: 已被封
   * 排序可选值为ASC或者DESC
 **/
  status?: Maybe<Scalars['String']>,
  /** 
 * 随机码
   * 排序可选值为ASC或者DESC
 **/
  randomCode?: Maybe<Scalars['String']>,
  /** 
 * 密码是否被重置
   * 排序可选值为ASC或者DESC
 **/
  isRestPassword?: Maybe<Scalars['String']>,
  /** 
 * 密码更改时间
   * 排序可选值为ASC或者DESC
 **/
  passwordDate?: Maybe<Scalars['String']>,
  /** 
 * 创建时间
   * 排序可选值为ASC或者DESC
 **/
  createDate?: Maybe<Scalars['String']>,
  /** 
 * 创建人的uid
   * 排序可选值为ASC或者DESC
 **/
  createUserId?: Maybe<Scalars['String']>,
  /** 
 * 安全分
   * 排序可选值为ASC或者DESC
 **/
  safetyScore?: Maybe<Scalars['String']>,
};

/** 用户表 */
export type UserInputWhere = {
  /** 用户编号 不等于 */
  id_Not?: Maybe<Scalars['Int']>,
  /** 用户编号 在制定内，如[1,2] */
  id_In?: Maybe<Array<Scalars['Int']>>,
  /** 用户编号 不在制定内,如[1,2] */
  id_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 用户编号 小于 */
  id_Lt?: Maybe<Scalars['Int']>,
  /** 用户编号 小于等于 */
  id_Lte?: Maybe<Scalars['Int']>,
  /** 用户编号 大于 */
  id_Gt?: Maybe<Scalars['Int']>,
  /** 用户编号 大于等于 */
  id_Gte?: Maybe<Scalars['Int']>,
  /** 用户编号 */
  id?: Maybe<Scalars['Int']>,
  /** 用户名 不等于 */
  username_Not?: Maybe<Scalars['String']>,
  /** 用户名 在制定内，如[1,2] */
  username_In?: Maybe<Array<Scalars['String']>>,
  /** 用户名 不在制定内,如[1,2] */
  username_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 用户名 小于 */
  username_Lt?: Maybe<Scalars['String']>,
  /** 用户名 小于等于 */
  username_Lte?: Maybe<Scalars['String']>,
  /** 用户名 大于 */
  username_Gt?: Maybe<Scalars['String']>,
  /** 用户名 大于等于 */
  username_Gte?: Maybe<Scalars['String']>,
  /** 用户名 包含 */
  username_Contains?: Maybe<Scalars['String']>,
  /** 用户名 不包含 */
  username_NotContains?: Maybe<Scalars['String']>,
  /** 用户名 开头等于 */
  username_StartsWith?: Maybe<Scalars['String']>,
  /** 用户名 开头不等于 */
  username_NotStartsWith?: Maybe<Scalars['String']>,
  /** 用户名 结尾等于 */
  username_EndsWith?: Maybe<Scalars['String']>,
  /** 用户名 结尾不等于 */
  username_NotEndsWith?: Maybe<Scalars['String']>,
  /** 用户名 */
  username?: Maybe<Scalars['String']>,
  /** 邮箱 不等于 */
  email_Not?: Maybe<Scalars['String']>,
  /** 邮箱 在制定内，如[1,2] */
  email_In?: Maybe<Array<Scalars['String']>>,
  /** 邮箱 不在制定内,如[1,2] */
  email_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 邮箱 小于 */
  email_Lt?: Maybe<Scalars['String']>,
  /** 邮箱 小于等于 */
  email_Lte?: Maybe<Scalars['String']>,
  /** 邮箱 大于 */
  email_Gt?: Maybe<Scalars['String']>,
  /** 邮箱 大于等于 */
  email_Gte?: Maybe<Scalars['String']>,
  /** 邮箱 包含 */
  email_Contains?: Maybe<Scalars['String']>,
  /** 邮箱 不包含 */
  email_NotContains?: Maybe<Scalars['String']>,
  /** 邮箱 开头等于 */
  email_StartsWith?: Maybe<Scalars['String']>,
  /** 邮箱 开头不等于 */
  email_NotStartsWith?: Maybe<Scalars['String']>,
  /** 邮箱 结尾等于 */
  email_EndsWith?: Maybe<Scalars['String']>,
  /** 邮箱 结尾不等于 */
  email_NotEndsWith?: Maybe<Scalars['String']>,
  /** 邮箱 */
  email?: Maybe<Scalars['String']>,
  /** 头像 不等于 */
  avatar_Not?: Maybe<Scalars['String']>,
  /** 头像 在制定内，如[1,2] */
  avatar_In?: Maybe<Array<Scalars['String']>>,
  /** 头像 不在制定内,如[1,2] */
  avatar_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 头像 小于 */
  avatar_Lt?: Maybe<Scalars['String']>,
  /** 头像 小于等于 */
  avatar_Lte?: Maybe<Scalars['String']>,
  /** 头像 大于 */
  avatar_Gt?: Maybe<Scalars['String']>,
  /** 头像 大于等于 */
  avatar_Gte?: Maybe<Scalars['String']>,
  /** 头像 包含 */
  avatar_Contains?: Maybe<Scalars['String']>,
  /** 头像 不包含 */
  avatar_NotContains?: Maybe<Scalars['String']>,
  /** 头像 开头等于 */
  avatar_StartsWith?: Maybe<Scalars['String']>,
  /** 头像 开头不等于 */
  avatar_NotStartsWith?: Maybe<Scalars['String']>,
  /** 头像 结尾等于 */
  avatar_EndsWith?: Maybe<Scalars['String']>,
  /** 头像 结尾不等于 */
  avatar_NotEndsWith?: Maybe<Scalars['String']>,
  /** 头像 */
  avatar?: Maybe<Scalars['String']>,
  /** 电话号码 不等于 */
  mobile_Not?: Maybe<Scalars['String']>,
  /** 电话号码 在制定内，如[1,2] */
  mobile_In?: Maybe<Array<Scalars['String']>>,
  /** 电话号码 不在制定内,如[1,2] */
  mobile_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 电话号码 小于 */
  mobile_Lt?: Maybe<Scalars['String']>,
  /** 电话号码 小于等于 */
  mobile_Lte?: Maybe<Scalars['String']>,
  /** 电话号码 大于 */
  mobile_Gt?: Maybe<Scalars['String']>,
  /** 电话号码 大于等于 */
  mobile_Gte?: Maybe<Scalars['String']>,
  /** 电话号码 包含 */
  mobile_Contains?: Maybe<Scalars['String']>,
  /** 电话号码 不包含 */
  mobile_NotContains?: Maybe<Scalars['String']>,
  /** 电话号码 开头等于 */
  mobile_StartsWith?: Maybe<Scalars['String']>,
  /** 电话号码 开头不等于 */
  mobile_NotStartsWith?: Maybe<Scalars['String']>,
  /** 电话号码 结尾等于 */
  mobile_EndsWith?: Maybe<Scalars['String']>,
  /** 电话号码 结尾不等于 */
  mobile_NotEndsWith?: Maybe<Scalars['String']>,
  /** 电话号码 */
  mobile?: Maybe<Scalars['String']>,
  /** 密码 不等于 */
  password_Not?: Maybe<Scalars['String']>,
  /** 密码 在制定内，如[1,2] */
  password_In?: Maybe<Array<Scalars['String']>>,
  /** 密码 不在制定内,如[1,2] */
  password_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 密码 小于 */
  password_Lt?: Maybe<Scalars['String']>,
  /** 密码 小于等于 */
  password_Lte?: Maybe<Scalars['String']>,
  /** 密码 大于 */
  password_Gt?: Maybe<Scalars['String']>,
  /** 密码 大于等于 */
  password_Gte?: Maybe<Scalars['String']>,
  /** 密码 包含 */
  password_Contains?: Maybe<Scalars['String']>,
  /** 密码 不包含 */
  password_NotContains?: Maybe<Scalars['String']>,
  /** 密码 开头等于 */
  password_StartsWith?: Maybe<Scalars['String']>,
  /** 密码 开头不等于 */
  password_NotStartsWith?: Maybe<Scalars['String']>,
  /** 密码 结尾等于 */
  password_EndsWith?: Maybe<Scalars['String']>,
  /** 密码 结尾不等于 */
  password_NotEndsWith?: Maybe<Scalars['String']>,
  /** 密码 */
  password?: Maybe<Scalars['String']>,
  /** 1: 账户正常 0:未绑定 -1:刚解冻 -2: 已被封 不等于 */
  status_Not?: Maybe<Scalars['Int']>,
  /** 1: 账户正常 0:未绑定 -1:刚解冻 -2: 已被封 在制定内，如[1,2] */
  status_In?: Maybe<Array<Scalars['Int']>>,
  /** 1: 账户正常 0:未绑定 -1:刚解冻 -2: 已被封 不在制定内,如[1,2] */
  status_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 1: 账户正常 0:未绑定 -1:刚解冻 -2: 已被封 小于 */
  status_Lt?: Maybe<Scalars['Int']>,
  /** 1: 账户正常 0:未绑定 -1:刚解冻 -2: 已被封 小于等于 */
  status_Lte?: Maybe<Scalars['Int']>,
  /** 1: 账户正常 0:未绑定 -1:刚解冻 -2: 已被封 大于 */
  status_Gt?: Maybe<Scalars['Int']>,
  /** 1: 账户正常 0:未绑定 -1:刚解冻 -2: 已被封 大于等于 */
  status_Gte?: Maybe<Scalars['Int']>,
  /** 1: 账户正常 0:未绑定 -1:刚解冻 -2: 已被封 */
  status?: Maybe<Scalars['Int']>,
  /** 随机码 不等于 */
  randomCode_Not?: Maybe<Scalars['String']>,
  /** 随机码 在制定内，如[1,2] */
  randomCode_In?: Maybe<Array<Scalars['String']>>,
  /** 随机码 不在制定内,如[1,2] */
  randomCode_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 随机码 小于 */
  randomCode_Lt?: Maybe<Scalars['String']>,
  /** 随机码 小于等于 */
  randomCode_Lte?: Maybe<Scalars['String']>,
  /** 随机码 大于 */
  randomCode_Gt?: Maybe<Scalars['String']>,
  /** 随机码 大于等于 */
  randomCode_Gte?: Maybe<Scalars['String']>,
  /** 随机码 包含 */
  randomCode_Contains?: Maybe<Scalars['String']>,
  /** 随机码 不包含 */
  randomCode_NotContains?: Maybe<Scalars['String']>,
  /** 随机码 开头等于 */
  randomCode_StartsWith?: Maybe<Scalars['String']>,
  /** 随机码 开头不等于 */
  randomCode_NotStartsWith?: Maybe<Scalars['String']>,
  /** 随机码 结尾等于 */
  randomCode_EndsWith?: Maybe<Scalars['String']>,
  /** 随机码 结尾不等于 */
  randomCode_NotEndsWith?: Maybe<Scalars['String']>,
  /** 随机码 */
  randomCode?: Maybe<Scalars['String']>,
  /** 密码更改时间 不等于 */
  passwordDate_Not?: Maybe<Scalars['Int']>,
  /** 密码更改时间 在制定内，如[1,2] */
  passwordDate_In?: Maybe<Array<Scalars['Int']>>,
  /** 密码更改时间 不在制定内,如[1,2] */
  passwordDate_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 密码更改时间 小于 */
  passwordDate_Lt?: Maybe<Scalars['Int']>,
  /** 密码更改时间 小于等于 */
  passwordDate_Lte?: Maybe<Scalars['Int']>,
  /** 密码更改时间 大于 */
  passwordDate_Gt?: Maybe<Scalars['Int']>,
  /** 密码更改时间 大于等于 */
  passwordDate_Gte?: Maybe<Scalars['Int']>,
  /** 密码更改时间 */
  passwordDate?: Maybe<Scalars['Int']>,
  /** 创建时间 不等于 */
  createDate_Not?: Maybe<Scalars['Int']>,
  /** 创建时间 在制定内，如[1,2] */
  createDate_In?: Maybe<Array<Scalars['Int']>>,
  /** 创建时间 不在制定内,如[1,2] */
  createDate_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 创建时间 小于 */
  createDate_Lt?: Maybe<Scalars['Int']>,
  /** 创建时间 小于等于 */
  createDate_Lte?: Maybe<Scalars['Int']>,
  /** 创建时间 大于 */
  createDate_Gt?: Maybe<Scalars['Int']>,
  /** 创建时间 大于等于 */
  createDate_Gte?: Maybe<Scalars['Int']>,
  /** 创建时间 */
  createDate?: Maybe<Scalars['Int']>,
  /** 创建人的uid 不等于 */
  createUserId_Not?: Maybe<Scalars['Int']>,
  /** 创建人的uid 在制定内，如[1,2] */
  createUserId_In?: Maybe<Array<Scalars['Int']>>,
  /** 创建人的uid 不在制定内,如[1,2] */
  createUserId_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 创建人的uid 小于 */
  createUserId_Lt?: Maybe<Scalars['Int']>,
  /** 创建人的uid 小于等于 */
  createUserId_Lte?: Maybe<Scalars['Int']>,
  /** 创建人的uid 大于 */
  createUserId_Gt?: Maybe<Scalars['Int']>,
  /** 创建人的uid 大于等于 */
  createUserId_Gte?: Maybe<Scalars['Int']>,
  /** 创建人的uid */
  createUserId?: Maybe<Scalars['Int']>,
  /** 安全分 不等于 */
  safetyScore_Not?: Maybe<Scalars['Int']>,
  /** 安全分 在制定内，如[1,2] */
  safetyScore_In?: Maybe<Array<Scalars['Int']>>,
  /** 安全分 不在制定内,如[1,2] */
  safetyScore_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 安全分 小于 */
  safetyScore_Lt?: Maybe<Scalars['Int']>,
  /** 安全分 小于等于 */
  safetyScore_Lte?: Maybe<Scalars['Int']>,
  /** 安全分 大于 */
  safetyScore_Gt?: Maybe<Scalars['Int']>,
  /** 安全分 大于等于 */
  safetyScore_Gte?: Maybe<Scalars['Int']>,
  /** 安全分 */
  safetyScore?: Maybe<Scalars['Int']>,
  AND?: Maybe<Array<UserInputWhere>>,
  OR?: Maybe<Array<UserInputWhere>>,
  NOT?: Maybe<Array<UserInputWhere>>,
};

/** 用户登录日志表 */
export type UserLoginLog = {
  __typename?: 'UserLoginLog',
  /** 日志编号 */
  id?: Maybe<Scalars['Int']>,
  /** ip地址编号 */
  ip?: Maybe<Scalars['String']>,
  /** 设备编号 */
  deviceId?: Maybe<Scalars['String']>,
  /** 创建时间 */
  createDate?: Maybe<Scalars['Int']>,
};

/** 用户登录日志表 */
export type UserLoginLogInput = {
  /** 日志编号 */
  id?: Maybe<Scalars['Int']>,
  /** ip地址编号 */
  ip?: Maybe<Scalars['String']>,
  /** 设备编号 */
  deviceId?: Maybe<Scalars['String']>,
  /** 创建时间 */
  createDate?: Maybe<Scalars['Int']>,
};

/** 用户登录日志表 */
export type UserLoginLogInputOrder = {
  /** 
 * 日志编号
   * 排序可选值为ASC或者DESC
 **/
  id?: Maybe<Scalars['String']>,
  /** 
 * ip地址编号
   * 排序可选值为ASC或者DESC
 **/
  ip?: Maybe<Scalars['String']>,
  /** 
 * 设备编号
   * 排序可选值为ASC或者DESC
 **/
  deviceId?: Maybe<Scalars['String']>,
  /** 
 * 创建时间
   * 排序可选值为ASC或者DESC
 **/
  createDate?: Maybe<Scalars['String']>,
};

/** 用户登录日志表 */
export type UserLoginLogInputWhere = {
  /** 日志编号 不等于 */
  id_Not?: Maybe<Scalars['Int']>,
  /** 日志编号 在制定内，如[1,2] */
  id_In?: Maybe<Array<Scalars['Int']>>,
  /** 日志编号 不在制定内,如[1,2] */
  id_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 日志编号 小于 */
  id_Lt?: Maybe<Scalars['Int']>,
  /** 日志编号 小于等于 */
  id_Lte?: Maybe<Scalars['Int']>,
  /** 日志编号 大于 */
  id_Gt?: Maybe<Scalars['Int']>,
  /** 日志编号 大于等于 */
  id_Gte?: Maybe<Scalars['Int']>,
  /** 日志编号 */
  id?: Maybe<Scalars['Int']>,
  /** ip地址编号 不等于 */
  ip_Not?: Maybe<Scalars['String']>,
  /** ip地址编号 在制定内，如[1,2] */
  ip_In?: Maybe<Array<Scalars['String']>>,
  /** ip地址编号 不在制定内,如[1,2] */
  ip_NotIn?: Maybe<Array<Scalars['String']>>,
  /** ip地址编号 小于 */
  ip_Lt?: Maybe<Scalars['String']>,
  /** ip地址编号 小于等于 */
  ip_Lte?: Maybe<Scalars['String']>,
  /** ip地址编号 大于 */
  ip_Gt?: Maybe<Scalars['String']>,
  /** ip地址编号 大于等于 */
  ip_Gte?: Maybe<Scalars['String']>,
  /** ip地址编号 包含 */
  ip_Contains?: Maybe<Scalars['String']>,
  /** ip地址编号 不包含 */
  ip_NotContains?: Maybe<Scalars['String']>,
  /** ip地址编号 开头等于 */
  ip_StartsWith?: Maybe<Scalars['String']>,
  /** ip地址编号 开头不等于 */
  ip_NotStartsWith?: Maybe<Scalars['String']>,
  /** ip地址编号 结尾等于 */
  ip_EndsWith?: Maybe<Scalars['String']>,
  /** ip地址编号 结尾不等于 */
  ip_NotEndsWith?: Maybe<Scalars['String']>,
  /** ip地址编号 */
  ip?: Maybe<Scalars['String']>,
  /** 设备编号 不等于 */
  deviceId_Not?: Maybe<Scalars['String']>,
  /** 设备编号 在制定内，如[1,2] */
  deviceId_In?: Maybe<Array<Scalars['String']>>,
  /** 设备编号 不在制定内,如[1,2] */
  deviceId_NotIn?: Maybe<Array<Scalars['String']>>,
  /** 设备编号 小于 */
  deviceId_Lt?: Maybe<Scalars['String']>,
  /** 设备编号 小于等于 */
  deviceId_Lte?: Maybe<Scalars['String']>,
  /** 设备编号 大于 */
  deviceId_Gt?: Maybe<Scalars['String']>,
  /** 设备编号 大于等于 */
  deviceId_Gte?: Maybe<Scalars['String']>,
  /** 设备编号 包含 */
  deviceId_Contains?: Maybe<Scalars['String']>,
  /** 设备编号 不包含 */
  deviceId_NotContains?: Maybe<Scalars['String']>,
  /** 设备编号 开头等于 */
  deviceId_StartsWith?: Maybe<Scalars['String']>,
  /** 设备编号 开头不等于 */
  deviceId_NotStartsWith?: Maybe<Scalars['String']>,
  /** 设备编号 结尾等于 */
  deviceId_EndsWith?: Maybe<Scalars['String']>,
  /** 设备编号 结尾不等于 */
  deviceId_NotEndsWith?: Maybe<Scalars['String']>,
  /** 设备编号 */
  deviceId?: Maybe<Scalars['String']>,
  /** 创建时间 不等于 */
  createDate_Not?: Maybe<Scalars['Int']>,
  /** 创建时间 在制定内，如[1,2] */
  createDate_In?: Maybe<Array<Scalars['Int']>>,
  /** 创建时间 不在制定内,如[1,2] */
  createDate_NotIn?: Maybe<Array<Scalars['Int']>>,
  /** 创建时间 小于 */
  createDate_Lt?: Maybe<Scalars['Int']>,
  /** 创建时间 小于等于 */
  createDate_Lte?: Maybe<Scalars['Int']>,
  /** 创建时间 大于 */
  createDate_Gt?: Maybe<Scalars['Int']>,
  /** 创建时间 大于等于 */
  createDate_Gte?: Maybe<Scalars['Int']>,
  /** 创建时间 */
  createDate?: Maybe<Scalars['Int']>,
  AND?: Maybe<Array<UserLoginLogInputWhere>>,
  OR?: Maybe<Array<UserLoginLogInputWhere>>,
  NOT?: Maybe<Array<UserLoginLogInputWhere>>,
};
export type UserGetQueryVariables = {
  entity: UserInputWhere
};


export type UserGetQuery = (
  { __typename?: 'Query' }
  & { userGet: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'avatar' | 'mobile' | 'password' | 'status' | 'randomCode' | 'isRestPassword' | 'passwordDate' | 'createDate' | 'createUserId' | 'safetyScore'>
  )> }
);

export type SystemGetQueryVariables = {
  entity: SystemInputWhere
};


export type SystemGetQuery = (
  { __typename?: 'Query' }
  & { systemGet: Maybe<(
    { __typename?: 'System' }
    & Pick<System, 'id' | 'title' | 'image' | 'link' | 'code' | 'createDate'>
  )> }
);

export type SystemEventGetQueryVariables = {
  entity: SystemEventInputWhere
};


export type SystemEventGetQuery = (
  { __typename?: 'Query' }
  & { systemEventGet: Maybe<(
    { __typename?: 'SystemEvent' }
    & Pick<SystemEvent, 'id' | 'title'>
  )> }
);

export type SystemRightGetQueryVariables = {
  entity: SystemRightInputWhere
};


export type SystemRightGetQuery = (
  { __typename?: 'Query' }
  & { systemRightGet: Maybe<(
    { __typename?: 'SystemRight' }
    & Pick<SystemRight, 'id' | 'type' | 'title' | 'namespace' | 'code' | 'link'>
  )> }
);

export type DepartmentGetQueryVariables = {
  entity: DepartmentInputWhere
};


export type DepartmentGetQuery = (
  { __typename?: 'Query' }
  & { departmentGet: Maybe<(
    { __typename?: 'Department' }
    & Pick<Department, 'id' | 'title' | 'status' | 'shown' | 'createDate' | 'domainId'>
  )> }
);

export type RoleGetQueryVariables = {
  entity: RoleInputWhere
};


export type RoleGetQuery = (
  { __typename?: 'Query' }
  & { roleGet: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id' | 'code' | 'title' | 'desc' | 'createDate' | 'updateDate'>
  )> }
);

export type StationGetQueryVariables = {
  entity: StationInputWhere
};


export type StationGetQuery = (
  { __typename?: 'Query' }
  & { stationGet: Maybe<(
    { __typename?: 'Station' }
    & Pick<Station, 'id' | 'title' | 'desc' | 'code' | 'responsibilities' | 'requirements' | 'status' | 'createDate'>
  )> }
);

export type ToDoItemGetQueryVariables = {
  entity: ToDoItemInputWhere
};


export type ToDoItemGetQuery = (
  { __typename?: 'Query' }
  & { toDoItemGet: Maybe<(
    { __typename?: 'ToDoItem' }
    & Pick<ToDoItem, 'id' | 'title' | 'desc' | 'createDate' | 'fromSystemId' | 'fromEventId' | 'fromUserId' | 'toUserId'>
  )> }
);

export type RoleGroupGetQueryVariables = {
  entity: RoleGroupInputWhere
};


export type RoleGroupGetQuery = (
  { __typename?: 'Query' }
  & { roleGroupGet: Maybe<(
    { __typename?: 'RoleGroup' }
    & Pick<RoleGroup, 'id' | 'title' | 'desc'>
  )> }
);

export type UserLoginLogGetQueryVariables = {
  entity: UserLoginLogInputWhere
};


export type UserLoginLogGetQuery = (
  { __typename?: 'Query' }
  & { userLoginLogGet: Maybe<(
    { __typename?: 'UserLoginLog' }
    & Pick<UserLoginLog, 'id' | 'ip' | 'deviceId' | 'createDate'>
  )> }
);

export type SafetyScoreLogGetQueryVariables = {
  entity: SafetyScoreLogInputWhere
};


export type SafetyScoreLogGetQuery = (
  { __typename?: 'Query' }
  & { safetyScoreLogGet: Maybe<(
    { __typename?: 'SafetyScoreLog' }
    & Pick<SafetyScoreLog, 'id' | 'score' | 'createDate'>
  )> }
);

export type SafetyScoreRuleGetQueryVariables = {
  entity: SafetyScoreRuleInputWhere
};


export type SafetyScoreRuleGetQuery = (
  { __typename?: 'Query' }
  & { safetyScoreRuleGet: Maybe<(
    { __typename?: 'SafetyScoreRule' }
    & Pick<SafetyScoreRule, 'id' | 'title' | 'code' | 'score' | 'isReplace' | 'createDate'>
  )> }
);

export type UserFindQueryVariables = {
  entity: UserInputWhere,
  order: UserInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type UserFindQuery = (
  { __typename?: 'Query' }
  & { userFind: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'avatar' | 'mobile' | 'password' | 'status' | 'randomCode' | 'isRestPassword' | 'passwordDate' | 'createDate' | 'createUserId' | 'safetyScore'>
  )>>> }
);

export type SystemFindQueryVariables = {
  entity: SystemInputWhere,
  order: SystemInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type SystemFindQuery = (
  { __typename?: 'Query' }
  & { systemFind: Maybe<Array<Maybe<(
    { __typename?: 'System' }
    & Pick<System, 'id' | 'title' | 'image' | 'link' | 'code' | 'createDate'>
  )>>> }
);

export type SystemEventFindQueryVariables = {
  entity: SystemEventInputWhere,
  order: SystemEventInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type SystemEventFindQuery = (
  { __typename?: 'Query' }
  & { systemEventFind: Maybe<Array<Maybe<(
    { __typename?: 'SystemEvent' }
    & Pick<SystemEvent, 'id' | 'title'>
  )>>> }
);

export type SystemRightFindQueryVariables = {
  entity: SystemRightInputWhere,
  order: SystemRightInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type SystemRightFindQuery = (
  { __typename?: 'Query' }
  & { systemRightFind: Maybe<Array<Maybe<(
    { __typename?: 'SystemRight' }
    & Pick<SystemRight, 'id' | 'type' | 'title' | 'namespace' | 'code' | 'link'>
  )>>> }
);

export type DepartmentFindQueryVariables = {
  entity: DepartmentInputWhere,
  order: DepartmentInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type DepartmentFindQuery = (
  { __typename?: 'Query' }
  & { departmentFind: Maybe<Array<Maybe<(
    { __typename?: 'Department' }
    & Pick<Department, 'id' | 'title' | 'status' | 'shown' | 'createDate' | 'domainId'>
  )>>> }
);

export type RoleFindQueryVariables = {
  entity: RoleInputWhere,
  order: RoleInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type RoleFindQuery = (
  { __typename?: 'Query' }
  & { roleFind: Maybe<Array<Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id' | 'code' | 'title' | 'desc' | 'createDate' | 'updateDate'>
  )>>> }
);

export type StationFindQueryVariables = {
  entity: StationInputWhere,
  order: StationInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type StationFindQuery = (
  { __typename?: 'Query' }
  & { stationFind: Maybe<Array<Maybe<(
    { __typename?: 'Station' }
    & Pick<Station, 'id' | 'title' | 'desc' | 'code' | 'responsibilities' | 'requirements' | 'status' | 'createDate'>
  )>>> }
);

export type ToDoItemFindQueryVariables = {
  entity: ToDoItemInputWhere,
  order: ToDoItemInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type ToDoItemFindQuery = (
  { __typename?: 'Query' }
  & { toDoItemFind: Maybe<Array<Maybe<(
    { __typename?: 'ToDoItem' }
    & Pick<ToDoItem, 'id' | 'title' | 'desc' | 'createDate' | 'fromSystemId' | 'fromEventId' | 'fromUserId' | 'toUserId'>
  )>>> }
);

export type RoleGroupFindQueryVariables = {
  entity: RoleGroupInputWhere,
  order: RoleGroupInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type RoleGroupFindQuery = (
  { __typename?: 'Query' }
  & { roleGroupFind: Maybe<Array<Maybe<(
    { __typename?: 'RoleGroup' }
    & Pick<RoleGroup, 'id' | 'title' | 'desc'>
  )>>> }
);

export type UserLoginLogFindQueryVariables = {
  entity: UserLoginLogInputWhere,
  order: UserLoginLogInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type UserLoginLogFindQuery = (
  { __typename?: 'Query' }
  & { userLoginLogFind: Maybe<Array<Maybe<(
    { __typename?: 'UserLoginLog' }
    & Pick<UserLoginLog, 'id' | 'ip' | 'deviceId' | 'createDate'>
  )>>> }
);

export type SafetyScoreLogFindQueryVariables = {
  entity: SafetyScoreLogInputWhere,
  order: SafetyScoreLogInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type SafetyScoreLogFindQuery = (
  { __typename?: 'Query' }
  & { safetyScoreLogFind: Maybe<Array<Maybe<(
    { __typename?: 'SafetyScoreLog' }
    & Pick<SafetyScoreLog, 'id' | 'score' | 'createDate'>
  )>>> }
);

export type SafetyScoreRuleFindQueryVariables = {
  entity: SafetyScoreRuleInputWhere,
  order: SafetyScoreRuleInputOrder,
  limit?: Maybe<PageLimitInput>
};


export type SafetyScoreRuleFindQuery = (
  { __typename?: 'Query' }
  & { safetyScoreRuleFind: Maybe<Array<Maybe<(
    { __typename?: 'SafetyScoreRule' }
    & Pick<SafetyScoreRule, 'id' | 'title' | 'code' | 'score' | 'isReplace' | 'createDate'>
  )>>> }
);

export type UserDeleteQueryVariables = {
  id: Scalars['Int']
};


export type UserDeleteQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'userDelete'>
);

export type SystemDeleteQueryVariables = {
  id: Scalars['Int']
};


export type SystemDeleteQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'systemDelete'>
);

export type SystemEventDeleteQueryVariables = {
  id: Scalars['Int']
};


export type SystemEventDeleteQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'systemEventDelete'>
);

export type SystemRightDeleteQueryVariables = {
  id: Scalars['Int']
};


export type SystemRightDeleteQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'systemRightDelete'>
);

export type DepartmentDeleteQueryVariables = {
  id: Scalars['Int']
};


export type DepartmentDeleteQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'departmentDelete'>
);

export type RoleDeleteQueryVariables = {
  id: Scalars['Int']
};


export type RoleDeleteQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'roleDelete'>
);

export type StationDeleteQueryVariables = {
  id: Scalars['Int']
};


export type StationDeleteQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'stationDelete'>
);

export type ToDoItemDeleteQueryVariables = {
  id: Scalars['Int']
};


export type ToDoItemDeleteQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'toDoItemDelete'>
);

export type RoleGroupDeleteQueryVariables = {
  id: Scalars['Int']
};


export type RoleGroupDeleteQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'roleGroupDelete'>
);

export type UserLoginLogDeleteQueryVariables = {
  id: Scalars['Int']
};


export type UserLoginLogDeleteQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'userLoginLogDelete'>
);

export type SafetyScoreLogDeleteQueryVariables = {
  id: Scalars['Int']
};


export type SafetyScoreLogDeleteQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'safetyScoreLogDelete'>
);

export type SafetyScoreRuleDeleteQueryVariables = {
  id: Scalars['Int']
};


export type SafetyScoreRuleDeleteQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'safetyScoreRuleDelete'>
);

export type UserSaveMutationVariables = {
  entity: UserInput
};


export type UserSaveMutation = (
  { __typename?: 'Mutation' }
  & { userSave: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'avatar' | 'mobile' | 'password' | 'status' | 'randomCode' | 'isRestPassword' | 'passwordDate' | 'createDate' | 'createUserId' | 'safetyScore'>
  )> }
);

export type SystemSaveMutationVariables = {
  entity: SystemInput
};


export type SystemSaveMutation = (
  { __typename?: 'Mutation' }
  & { systemSave: Maybe<(
    { __typename?: 'System' }
    & Pick<System, 'id' | 'title' | 'image' | 'link' | 'code' | 'createDate'>
  )> }
);

export type SystemEventSaveMutationVariables = {
  entity: SystemEventInput
};


export type SystemEventSaveMutation = (
  { __typename?: 'Mutation' }
  & { systemEventSave: Maybe<(
    { __typename?: 'SystemEvent' }
    & Pick<SystemEvent, 'id' | 'title'>
  )> }
);

export type SystemRightSaveMutationVariables = {
  entity: SystemRightInput
};


export type SystemRightSaveMutation = (
  { __typename?: 'Mutation' }
  & { systemRightSave: Maybe<(
    { __typename?: 'SystemRight' }
    & Pick<SystemRight, 'id' | 'type' | 'title' | 'namespace' | 'code' | 'link'>
  )> }
);

export type DepartmentSaveMutationVariables = {
  entity: DepartmentInput
};


export type DepartmentSaveMutation = (
  { __typename?: 'Mutation' }
  & { departmentSave: Maybe<(
    { __typename?: 'Department' }
    & Pick<Department, 'id' | 'title' | 'status' | 'shown' | 'createDate' | 'domainId'>
  )> }
);

export type RoleSaveMutationVariables = {
  entity: RoleInput
};


export type RoleSaveMutation = (
  { __typename?: 'Mutation' }
  & { roleSave: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id' | 'code' | 'title' | 'desc' | 'createDate' | 'updateDate'>
  )> }
);

export type StationSaveMutationVariables = {
  entity: StationInput
};


export type StationSaveMutation = (
  { __typename?: 'Mutation' }
  & { stationSave: Maybe<(
    { __typename?: 'Station' }
    & Pick<Station, 'id' | 'title' | 'desc' | 'code' | 'responsibilities' | 'requirements' | 'status' | 'createDate'>
  )> }
);

export type ToDoItemSaveMutationVariables = {
  entity: ToDoItemInput
};


export type ToDoItemSaveMutation = (
  { __typename?: 'Mutation' }
  & { toDoItemSave: Maybe<(
    { __typename?: 'ToDoItem' }
    & Pick<ToDoItem, 'id' | 'title' | 'desc' | 'createDate' | 'fromSystemId' | 'fromEventId' | 'fromUserId' | 'toUserId'>
  )> }
);

export type RoleGroupSaveMutationVariables = {
  entity: RoleGroupInput
};


export type RoleGroupSaveMutation = (
  { __typename?: 'Mutation' }
  & { roleGroupSave: Maybe<(
    { __typename?: 'RoleGroup' }
    & Pick<RoleGroup, 'id' | 'title' | 'desc'>
  )> }
);

export type UserLoginLogSaveMutationVariables = {
  entity: UserLoginLogInput
};


export type UserLoginLogSaveMutation = (
  { __typename?: 'Mutation' }
  & { userLoginLogSave: Maybe<(
    { __typename?: 'UserLoginLog' }
    & Pick<UserLoginLog, 'id' | 'ip' | 'deviceId' | 'createDate'>
  )> }
);

export type SafetyScoreLogSaveMutationVariables = {
  entity: SafetyScoreLogInput
};


export type SafetyScoreLogSaveMutation = (
  { __typename?: 'Mutation' }
  & { safetyScoreLogSave: Maybe<(
    { __typename?: 'SafetyScoreLog' }
    & Pick<SafetyScoreLog, 'id' | 'score' | 'createDate'>
  )> }
);

export type SafetyScoreRuleSaveMutationVariables = {
  entity: SafetyScoreRuleInput
};


export type SafetyScoreRuleSaveMutation = (
  { __typename?: 'Mutation' }
  & { safetyScoreRuleSave: Maybe<(
    { __typename?: 'SafetyScoreRule' }
    & Pick<SafetyScoreRule, 'id' | 'title' | 'code' | 'score' | 'isReplace' | 'createDate'>
  )> }
);

export type UserInsertMutationVariables = {
  entity: UserInput
};


export type UserInsertMutation = (
  { __typename?: 'Mutation' }
  & { userInsert: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'avatar' | 'mobile' | 'password' | 'status' | 'randomCode' | 'isRestPassword' | 'passwordDate' | 'createDate' | 'createUserId' | 'safetyScore'>
  )> }
);

export type SystemInsertMutationVariables = {
  entity: SystemInput
};


export type SystemInsertMutation = (
  { __typename?: 'Mutation' }
  & { systemInsert: Maybe<(
    { __typename?: 'System' }
    & Pick<System, 'id' | 'title' | 'image' | 'link' | 'code' | 'createDate'>
  )> }
);

export type SystemEventInsertMutationVariables = {
  entity: SystemEventInput
};


export type SystemEventInsertMutation = (
  { __typename?: 'Mutation' }
  & { systemEventInsert: Maybe<(
    { __typename?: 'SystemEvent' }
    & Pick<SystemEvent, 'id' | 'title'>
  )> }
);

export type SystemRightInsertMutationVariables = {
  entity: SystemRightInput
};


export type SystemRightInsertMutation = (
  { __typename?: 'Mutation' }
  & { systemRightInsert: Maybe<(
    { __typename?: 'SystemRight' }
    & Pick<SystemRight, 'id' | 'type' | 'title' | 'namespace' | 'code' | 'link'>
  )> }
);

export type DepartmentInsertMutationVariables = {
  entity: DepartmentInput
};


export type DepartmentInsertMutation = (
  { __typename?: 'Mutation' }
  & { departmentInsert: Maybe<(
    { __typename?: 'Department' }
    & Pick<Department, 'id' | 'title' | 'status' | 'shown' | 'createDate' | 'domainId'>
  )> }
);

export type RoleInsertMutationVariables = {
  entity: RoleInput
};


export type RoleInsertMutation = (
  { __typename?: 'Mutation' }
  & { roleInsert: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id' | 'code' | 'title' | 'desc' | 'createDate' | 'updateDate'>
  )> }
);

export type StationInsertMutationVariables = {
  entity: StationInput
};


export type StationInsertMutation = (
  { __typename?: 'Mutation' }
  & { stationInsert: Maybe<(
    { __typename?: 'Station' }
    & Pick<Station, 'id' | 'title' | 'desc' | 'code' | 'responsibilities' | 'requirements' | 'status' | 'createDate'>
  )> }
);

export type ToDoItemInsertMutationVariables = {
  entity: ToDoItemInput
};


export type ToDoItemInsertMutation = (
  { __typename?: 'Mutation' }
  & { toDoItemInsert: Maybe<(
    { __typename?: 'ToDoItem' }
    & Pick<ToDoItem, 'id' | 'title' | 'desc' | 'createDate' | 'fromSystemId' | 'fromEventId' | 'fromUserId' | 'toUserId'>
  )> }
);

export type RoleGroupInsertMutationVariables = {
  entity: RoleGroupInput
};


export type RoleGroupInsertMutation = (
  { __typename?: 'Mutation' }
  & { roleGroupInsert: Maybe<(
    { __typename?: 'RoleGroup' }
    & Pick<RoleGroup, 'id' | 'title' | 'desc'>
  )> }
);

export type UserLoginLogInsertMutationVariables = {
  entity: UserLoginLogInput
};


export type UserLoginLogInsertMutation = (
  { __typename?: 'Mutation' }
  & { userLoginLogInsert: Maybe<(
    { __typename?: 'UserLoginLog' }
    & Pick<UserLoginLog, 'id' | 'ip' | 'deviceId' | 'createDate'>
  )> }
);

export type SafetyScoreLogInsertMutationVariables = {
  entity: SafetyScoreLogInput
};


export type SafetyScoreLogInsertMutation = (
  { __typename?: 'Mutation' }
  & { safetyScoreLogInsert: Maybe<(
    { __typename?: 'SafetyScoreLog' }
    & Pick<SafetyScoreLog, 'id' | 'score' | 'createDate'>
  )> }
);

export type SafetyScoreRuleInsertMutationVariables = {
  entity: SafetyScoreRuleInput
};


export type SafetyScoreRuleInsertMutation = (
  { __typename?: 'Mutation' }
  & { safetyScoreRuleInsert: Maybe<(
    { __typename?: 'SafetyScoreRule' }
    & Pick<SafetyScoreRule, 'id' | 'title' | 'code' | 'score' | 'isReplace' | 'createDate'>
  )> }
);

export const UserGetDocument = gql`
    query userGet($entity: UserInputWhere!) {
  userGet(entity: $entity) {
    id
    username
    email
    avatar
    mobile
    password
    status
    randomCode
    isRestPassword
    passwordDate
    createDate
    createUserId
    safetyScore
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserGetGQL extends Apollo.Query<UserGetQuery, UserGetQueryVariables> {
    document = UserGetDocument;
    client = 'demo';
  }
export const SystemGetDocument = gql`
    query systemGet($entity: SystemInputWhere!) {
  systemGet(entity: $entity) {
    id
    title
    image
    link
    code
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SystemGetGQL extends Apollo.Query<SystemGetQuery, SystemGetQueryVariables> {
    document = SystemGetDocument;
    client = 'demo';
  }
export const SystemEventGetDocument = gql`
    query systemEventGet($entity: SystemEventInputWhere!) {
  systemEventGet(entity: $entity) {
    id
    title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SystemEventGetGQL extends Apollo.Query<SystemEventGetQuery, SystemEventGetQueryVariables> {
    document = SystemEventGetDocument;
    client = 'demo';
  }
export const SystemRightGetDocument = gql`
    query systemRightGet($entity: SystemRightInputWhere!) {
  systemRightGet(entity: $entity) {
    id
    type
    title
    namespace
    code
    link
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SystemRightGetGQL extends Apollo.Query<SystemRightGetQuery, SystemRightGetQueryVariables> {
    document = SystemRightGetDocument;
    client = 'demo';
  }
export const DepartmentGetDocument = gql`
    query departmentGet($entity: DepartmentInputWhere!) {
  departmentGet(entity: $entity) {
    id
    title
    status
    shown
    createDate
    domainId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DepartmentGetGQL extends Apollo.Query<DepartmentGetQuery, DepartmentGetQueryVariables> {
    document = DepartmentGetDocument;
    client = 'demo';
  }
export const RoleGetDocument = gql`
    query roleGet($entity: RoleInputWhere!) {
  roleGet(entity: $entity) {
    id
    code
    title
    desc
    createDate
    updateDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RoleGetGQL extends Apollo.Query<RoleGetQuery, RoleGetQueryVariables> {
    document = RoleGetDocument;
    client = 'demo';
  }
export const StationGetDocument = gql`
    query stationGet($entity: StationInputWhere!) {
  stationGet(entity: $entity) {
    id
    title
    desc
    code
    responsibilities
    requirements
    status
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class StationGetGQL extends Apollo.Query<StationGetQuery, StationGetQueryVariables> {
    document = StationGetDocument;
    client = 'demo';
  }
export const ToDoItemGetDocument = gql`
    query toDoItemGet($entity: ToDoItemInputWhere!) {
  toDoItemGet(entity: $entity) {
    id
    title
    desc
    createDate
    fromSystemId
    fromEventId
    fromUserId
    toUserId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ToDoItemGetGQL extends Apollo.Query<ToDoItemGetQuery, ToDoItemGetQueryVariables> {
    document = ToDoItemGetDocument;
    client = 'demo';
  }
export const RoleGroupGetDocument = gql`
    query roleGroupGet($entity: RoleGroupInputWhere!) {
  roleGroupGet(entity: $entity) {
    id
    title
    desc
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RoleGroupGetGQL extends Apollo.Query<RoleGroupGetQuery, RoleGroupGetQueryVariables> {
    document = RoleGroupGetDocument;
    client = 'demo';
  }
export const UserLoginLogGetDocument = gql`
    query userLoginLogGet($entity: UserLoginLogInputWhere!) {
  userLoginLogGet(entity: $entity) {
    id
    ip
    deviceId
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserLoginLogGetGQL extends Apollo.Query<UserLoginLogGetQuery, UserLoginLogGetQueryVariables> {
    document = UserLoginLogGetDocument;
    client = 'demo';
  }
export const SafetyScoreLogGetDocument = gql`
    query safetyScoreLogGet($entity: SafetyScoreLogInputWhere!) {
  safetyScoreLogGet(entity: $entity) {
    id
    score
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SafetyScoreLogGetGQL extends Apollo.Query<SafetyScoreLogGetQuery, SafetyScoreLogGetQueryVariables> {
    document = SafetyScoreLogGetDocument;
    client = 'demo';
  }
export const SafetyScoreRuleGetDocument = gql`
    query safetyScoreRuleGet($entity: SafetyScoreRuleInputWhere!) {
  safetyScoreRuleGet(entity: $entity) {
    id
    title
    code
    score
    isReplace
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SafetyScoreRuleGetGQL extends Apollo.Query<SafetyScoreRuleGetQuery, SafetyScoreRuleGetQueryVariables> {
    document = SafetyScoreRuleGetDocument;
    client = 'demo';
  }
export const UserFindDocument = gql`
    query userFind($entity: UserInputWhere!, $order: UserInputOrder!, $limit: PageLimitInput) {
  userFind(entity: $entity, order: $order, limit: $limit) {
    id
    username
    email
    avatar
    mobile
    password
    status
    randomCode
    isRestPassword
    passwordDate
    createDate
    createUserId
    safetyScore
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserFindGQL extends Apollo.Query<UserFindQuery, UserFindQueryVariables> {
    document = UserFindDocument;
    client = 'demo';
  }
export const SystemFindDocument = gql`
    query systemFind($entity: SystemInputWhere!, $order: SystemInputOrder!, $limit: PageLimitInput) {
  systemFind(entity: $entity, order: $order, limit: $limit) {
    id
    title
    image
    link
    code
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SystemFindGQL extends Apollo.Query<SystemFindQuery, SystemFindQueryVariables> {
    document = SystemFindDocument;
    client = 'demo';
  }
export const SystemEventFindDocument = gql`
    query systemEventFind($entity: SystemEventInputWhere!, $order: SystemEventInputOrder!, $limit: PageLimitInput) {
  systemEventFind(entity: $entity, order: $order, limit: $limit) {
    id
    title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SystemEventFindGQL extends Apollo.Query<SystemEventFindQuery, SystemEventFindQueryVariables> {
    document = SystemEventFindDocument;
    client = 'demo';
  }
export const SystemRightFindDocument = gql`
    query systemRightFind($entity: SystemRightInputWhere!, $order: SystemRightInputOrder!, $limit: PageLimitInput) {
  systemRightFind(entity: $entity, order: $order, limit: $limit) {
    id
    type
    title
    namespace
    code
    link
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SystemRightFindGQL extends Apollo.Query<SystemRightFindQuery, SystemRightFindQueryVariables> {
    document = SystemRightFindDocument;
    client = 'demo';
  }
export const DepartmentFindDocument = gql`
    query departmentFind($entity: DepartmentInputWhere!, $order: DepartmentInputOrder!, $limit: PageLimitInput) {
  departmentFind(entity: $entity, order: $order, limit: $limit) {
    id
    title
    status
    shown
    createDate
    domainId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DepartmentFindGQL extends Apollo.Query<DepartmentFindQuery, DepartmentFindQueryVariables> {
    document = DepartmentFindDocument;
    client = 'demo';
  }
export const RoleFindDocument = gql`
    query roleFind($entity: RoleInputWhere!, $order: RoleInputOrder!, $limit: PageLimitInput) {
  roleFind(entity: $entity, order: $order, limit: $limit) {
    id
    code
    title
    desc
    createDate
    updateDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RoleFindGQL extends Apollo.Query<RoleFindQuery, RoleFindQueryVariables> {
    document = RoleFindDocument;
    client = 'demo';
  }
export const StationFindDocument = gql`
    query stationFind($entity: StationInputWhere!, $order: StationInputOrder!, $limit: PageLimitInput) {
  stationFind(entity: $entity, order: $order, limit: $limit) {
    id
    title
    desc
    code
    responsibilities
    requirements
    status
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class StationFindGQL extends Apollo.Query<StationFindQuery, StationFindQueryVariables> {
    document = StationFindDocument;
    client = 'demo';
  }
export const ToDoItemFindDocument = gql`
    query toDoItemFind($entity: ToDoItemInputWhere!, $order: ToDoItemInputOrder!, $limit: PageLimitInput) {
  toDoItemFind(entity: $entity, order: $order, limit: $limit) {
    id
    title
    desc
    createDate
    fromSystemId
    fromEventId
    fromUserId
    toUserId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ToDoItemFindGQL extends Apollo.Query<ToDoItemFindQuery, ToDoItemFindQueryVariables> {
    document = ToDoItemFindDocument;
    client = 'demo';
  }
export const RoleGroupFindDocument = gql`
    query roleGroupFind($entity: RoleGroupInputWhere!, $order: RoleGroupInputOrder!, $limit: PageLimitInput) {
  roleGroupFind(entity: $entity, order: $order, limit: $limit) {
    id
    title
    desc
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RoleGroupFindGQL extends Apollo.Query<RoleGroupFindQuery, RoleGroupFindQueryVariables> {
    document = RoleGroupFindDocument;
    client = 'demo';
  }
export const UserLoginLogFindDocument = gql`
    query userLoginLogFind($entity: UserLoginLogInputWhere!, $order: UserLoginLogInputOrder!, $limit: PageLimitInput) {
  userLoginLogFind(entity: $entity, order: $order, limit: $limit) {
    id
    ip
    deviceId
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserLoginLogFindGQL extends Apollo.Query<UserLoginLogFindQuery, UserLoginLogFindQueryVariables> {
    document = UserLoginLogFindDocument;
    client = 'demo';
  }
export const SafetyScoreLogFindDocument = gql`
    query safetyScoreLogFind($entity: SafetyScoreLogInputWhere!, $order: SafetyScoreLogInputOrder!, $limit: PageLimitInput) {
  safetyScoreLogFind(entity: $entity, order: $order, limit: $limit) {
    id
    score
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SafetyScoreLogFindGQL extends Apollo.Query<SafetyScoreLogFindQuery, SafetyScoreLogFindQueryVariables> {
    document = SafetyScoreLogFindDocument;
    client = 'demo';
  }
export const SafetyScoreRuleFindDocument = gql`
    query safetyScoreRuleFind($entity: SafetyScoreRuleInputWhere!, $order: SafetyScoreRuleInputOrder!, $limit: PageLimitInput) {
  safetyScoreRuleFind(entity: $entity, order: $order, limit: $limit) {
    id
    title
    code
    score
    isReplace
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SafetyScoreRuleFindGQL extends Apollo.Query<SafetyScoreRuleFindQuery, SafetyScoreRuleFindQueryVariables> {
    document = SafetyScoreRuleFindDocument;
    client = 'demo';
  }
export const UserDeleteDocument = gql`
    query userDelete($id: Int!) {
  userDelete(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserDeleteGQL extends Apollo.Query<UserDeleteQuery, UserDeleteQueryVariables> {
    document = UserDeleteDocument;
    client = 'demo';
  }
export const SystemDeleteDocument = gql`
    query systemDelete($id: Int!) {
  systemDelete(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SystemDeleteGQL extends Apollo.Query<SystemDeleteQuery, SystemDeleteQueryVariables> {
    document = SystemDeleteDocument;
    client = 'demo';
  }
export const SystemEventDeleteDocument = gql`
    query systemEventDelete($id: Int!) {
  systemEventDelete(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SystemEventDeleteGQL extends Apollo.Query<SystemEventDeleteQuery, SystemEventDeleteQueryVariables> {
    document = SystemEventDeleteDocument;
    client = 'demo';
  }
export const SystemRightDeleteDocument = gql`
    query systemRightDelete($id: Int!) {
  systemRightDelete(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SystemRightDeleteGQL extends Apollo.Query<SystemRightDeleteQuery, SystemRightDeleteQueryVariables> {
    document = SystemRightDeleteDocument;
    client = 'demo';
  }
export const DepartmentDeleteDocument = gql`
    query departmentDelete($id: Int!) {
  departmentDelete(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DepartmentDeleteGQL extends Apollo.Query<DepartmentDeleteQuery, DepartmentDeleteQueryVariables> {
    document = DepartmentDeleteDocument;
    client = 'demo';
  }
export const RoleDeleteDocument = gql`
    query roleDelete($id: Int!) {
  roleDelete(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RoleDeleteGQL extends Apollo.Query<RoleDeleteQuery, RoleDeleteQueryVariables> {
    document = RoleDeleteDocument;
    client = 'demo';
  }
export const StationDeleteDocument = gql`
    query stationDelete($id: Int!) {
  stationDelete(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class StationDeleteGQL extends Apollo.Query<StationDeleteQuery, StationDeleteQueryVariables> {
    document = StationDeleteDocument;
    client = 'demo';
  }
export const ToDoItemDeleteDocument = gql`
    query toDoItemDelete($id: Int!) {
  toDoItemDelete(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ToDoItemDeleteGQL extends Apollo.Query<ToDoItemDeleteQuery, ToDoItemDeleteQueryVariables> {
    document = ToDoItemDeleteDocument;
    client = 'demo';
  }
export const RoleGroupDeleteDocument = gql`
    query roleGroupDelete($id: Int!) {
  roleGroupDelete(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RoleGroupDeleteGQL extends Apollo.Query<RoleGroupDeleteQuery, RoleGroupDeleteQueryVariables> {
    document = RoleGroupDeleteDocument;
    client = 'demo';
  }
export const UserLoginLogDeleteDocument = gql`
    query userLoginLogDelete($id: Int!) {
  userLoginLogDelete(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserLoginLogDeleteGQL extends Apollo.Query<UserLoginLogDeleteQuery, UserLoginLogDeleteQueryVariables> {
    document = UserLoginLogDeleteDocument;
    client = 'demo';
  }
export const SafetyScoreLogDeleteDocument = gql`
    query safetyScoreLogDelete($id: Int!) {
  safetyScoreLogDelete(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SafetyScoreLogDeleteGQL extends Apollo.Query<SafetyScoreLogDeleteQuery, SafetyScoreLogDeleteQueryVariables> {
    document = SafetyScoreLogDeleteDocument;
    client = 'demo';
  }
export const SafetyScoreRuleDeleteDocument = gql`
    query safetyScoreRuleDelete($id: Int!) {
  safetyScoreRuleDelete(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SafetyScoreRuleDeleteGQL extends Apollo.Query<SafetyScoreRuleDeleteQuery, SafetyScoreRuleDeleteQueryVariables> {
    document = SafetyScoreRuleDeleteDocument;
    client = 'demo';
  }
export const UserSaveDocument = gql`
    mutation userSave($entity: UserInput!) {
  userSave(entity: $entity) {
    id
    username
    email
    avatar
    mobile
    password
    status
    randomCode
    isRestPassword
    passwordDate
    createDate
    createUserId
    safetyScore
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserSaveGQL extends Apollo.Mutation<UserSaveMutation, UserSaveMutationVariables> {
    document = UserSaveDocument;
    client = 'demo';
  }
export const SystemSaveDocument = gql`
    mutation systemSave($entity: SystemInput!) {
  systemSave(entity: $entity) {
    id
    title
    image
    link
    code
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SystemSaveGQL extends Apollo.Mutation<SystemSaveMutation, SystemSaveMutationVariables> {
    document = SystemSaveDocument;
    client = 'demo';
  }
export const SystemEventSaveDocument = gql`
    mutation systemEventSave($entity: SystemEventInput!) {
  systemEventSave(entity: $entity) {
    id
    title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SystemEventSaveGQL extends Apollo.Mutation<SystemEventSaveMutation, SystemEventSaveMutationVariables> {
    document = SystemEventSaveDocument;
    client = 'demo';
  }
export const SystemRightSaveDocument = gql`
    mutation systemRightSave($entity: SystemRightInput!) {
  systemRightSave(entity: $entity) {
    id
    type
    title
    namespace
    code
    link
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SystemRightSaveGQL extends Apollo.Mutation<SystemRightSaveMutation, SystemRightSaveMutationVariables> {
    document = SystemRightSaveDocument;
    client = 'demo';
  }
export const DepartmentSaveDocument = gql`
    mutation departmentSave($entity: DepartmentInput!) {
  departmentSave(entity: $entity) {
    id
    title
    status
    shown
    createDate
    domainId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DepartmentSaveGQL extends Apollo.Mutation<DepartmentSaveMutation, DepartmentSaveMutationVariables> {
    document = DepartmentSaveDocument;
    client = 'demo';
  }
export const RoleSaveDocument = gql`
    mutation roleSave($entity: RoleInput!) {
  roleSave(entity: $entity) {
    id
    code
    title
    desc
    createDate
    updateDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RoleSaveGQL extends Apollo.Mutation<RoleSaveMutation, RoleSaveMutationVariables> {
    document = RoleSaveDocument;
    client = 'demo';
  }
export const StationSaveDocument = gql`
    mutation stationSave($entity: StationInput!) {
  stationSave(entity: $entity) {
    id
    title
    desc
    code
    responsibilities
    requirements
    status
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class StationSaveGQL extends Apollo.Mutation<StationSaveMutation, StationSaveMutationVariables> {
    document = StationSaveDocument;
    client = 'demo';
  }
export const ToDoItemSaveDocument = gql`
    mutation toDoItemSave($entity: ToDoItemInput!) {
  toDoItemSave(entity: $entity) {
    id
    title
    desc
    createDate
    fromSystemId
    fromEventId
    fromUserId
    toUserId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ToDoItemSaveGQL extends Apollo.Mutation<ToDoItemSaveMutation, ToDoItemSaveMutationVariables> {
    document = ToDoItemSaveDocument;
    client = 'demo';
  }
export const RoleGroupSaveDocument = gql`
    mutation roleGroupSave($entity: RoleGroupInput!) {
  roleGroupSave(entity: $entity) {
    id
    title
    desc
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RoleGroupSaveGQL extends Apollo.Mutation<RoleGroupSaveMutation, RoleGroupSaveMutationVariables> {
    document = RoleGroupSaveDocument;
    client = 'demo';
  }
export const UserLoginLogSaveDocument = gql`
    mutation userLoginLogSave($entity: UserLoginLogInput!) {
  userLoginLogSave(entity: $entity) {
    id
    ip
    deviceId
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserLoginLogSaveGQL extends Apollo.Mutation<UserLoginLogSaveMutation, UserLoginLogSaveMutationVariables> {
    document = UserLoginLogSaveDocument;
    client = 'demo';
  }
export const SafetyScoreLogSaveDocument = gql`
    mutation safetyScoreLogSave($entity: SafetyScoreLogInput!) {
  safetyScoreLogSave(entity: $entity) {
    id
    score
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SafetyScoreLogSaveGQL extends Apollo.Mutation<SafetyScoreLogSaveMutation, SafetyScoreLogSaveMutationVariables> {
    document = SafetyScoreLogSaveDocument;
    client = 'demo';
  }
export const SafetyScoreRuleSaveDocument = gql`
    mutation safetyScoreRuleSave($entity: SafetyScoreRuleInput!) {
  safetyScoreRuleSave(entity: $entity) {
    id
    title
    code
    score
    isReplace
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SafetyScoreRuleSaveGQL extends Apollo.Mutation<SafetyScoreRuleSaveMutation, SafetyScoreRuleSaveMutationVariables> {
    document = SafetyScoreRuleSaveDocument;
    client = 'demo';
  }
export const UserInsertDocument = gql`
    mutation userInsert($entity: UserInput!) {
  userInsert(entity: $entity) {
    id
    username
    email
    avatar
    mobile
    password
    status
    randomCode
    isRestPassword
    passwordDate
    createDate
    createUserId
    safetyScore
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserInsertGQL extends Apollo.Mutation<UserInsertMutation, UserInsertMutationVariables> {
    document = UserInsertDocument;
    client = 'demo';
  }
export const SystemInsertDocument = gql`
    mutation systemInsert($entity: SystemInput!) {
  systemInsert(entity: $entity) {
    id
    title
    image
    link
    code
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SystemInsertGQL extends Apollo.Mutation<SystemInsertMutation, SystemInsertMutationVariables> {
    document = SystemInsertDocument;
    client = 'demo';
  }
export const SystemEventInsertDocument = gql`
    mutation systemEventInsert($entity: SystemEventInput!) {
  systemEventInsert(entity: $entity) {
    id
    title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SystemEventInsertGQL extends Apollo.Mutation<SystemEventInsertMutation, SystemEventInsertMutationVariables> {
    document = SystemEventInsertDocument;
    client = 'demo';
  }
export const SystemRightInsertDocument = gql`
    mutation systemRightInsert($entity: SystemRightInput!) {
  systemRightInsert(entity: $entity) {
    id
    type
    title
    namespace
    code
    link
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SystemRightInsertGQL extends Apollo.Mutation<SystemRightInsertMutation, SystemRightInsertMutationVariables> {
    document = SystemRightInsertDocument;
    client = 'demo';
  }
export const DepartmentInsertDocument = gql`
    mutation departmentInsert($entity: DepartmentInput!) {
  departmentInsert(entity: $entity) {
    id
    title
    status
    shown
    createDate
    domainId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DepartmentInsertGQL extends Apollo.Mutation<DepartmentInsertMutation, DepartmentInsertMutationVariables> {
    document = DepartmentInsertDocument;
    client = 'demo';
  }
export const RoleInsertDocument = gql`
    mutation roleInsert($entity: RoleInput!) {
  roleInsert(entity: $entity) {
    id
    code
    title
    desc
    createDate
    updateDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RoleInsertGQL extends Apollo.Mutation<RoleInsertMutation, RoleInsertMutationVariables> {
    document = RoleInsertDocument;
    client = 'demo';
  }
export const StationInsertDocument = gql`
    mutation stationInsert($entity: StationInput!) {
  stationInsert(entity: $entity) {
    id
    title
    desc
    code
    responsibilities
    requirements
    status
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class StationInsertGQL extends Apollo.Mutation<StationInsertMutation, StationInsertMutationVariables> {
    document = StationInsertDocument;
    client = 'demo';
  }
export const ToDoItemInsertDocument = gql`
    mutation toDoItemInsert($entity: ToDoItemInput!) {
  toDoItemInsert(entity: $entity) {
    id
    title
    desc
    createDate
    fromSystemId
    fromEventId
    fromUserId
    toUserId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ToDoItemInsertGQL extends Apollo.Mutation<ToDoItemInsertMutation, ToDoItemInsertMutationVariables> {
    document = ToDoItemInsertDocument;
    client = 'demo';
  }
export const RoleGroupInsertDocument = gql`
    mutation roleGroupInsert($entity: RoleGroupInput!) {
  roleGroupInsert(entity: $entity) {
    id
    title
    desc
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RoleGroupInsertGQL extends Apollo.Mutation<RoleGroupInsertMutation, RoleGroupInsertMutationVariables> {
    document = RoleGroupInsertDocument;
    client = 'demo';
  }
export const UserLoginLogInsertDocument = gql`
    mutation userLoginLogInsert($entity: UserLoginLogInput!) {
  userLoginLogInsert(entity: $entity) {
    id
    ip
    deviceId
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserLoginLogInsertGQL extends Apollo.Mutation<UserLoginLogInsertMutation, UserLoginLogInsertMutationVariables> {
    document = UserLoginLogInsertDocument;
    client = 'demo';
  }
export const SafetyScoreLogInsertDocument = gql`
    mutation safetyScoreLogInsert($entity: SafetyScoreLogInput!) {
  safetyScoreLogInsert(entity: $entity) {
    id
    score
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SafetyScoreLogInsertGQL extends Apollo.Mutation<SafetyScoreLogInsertMutation, SafetyScoreLogInsertMutationVariables> {
    document = SafetyScoreLogInsertDocument;
    client = 'demo';
  }
export const SafetyScoreRuleInsertDocument = gql`
    mutation safetyScoreRuleInsert($entity: SafetyScoreRuleInput!) {
  safetyScoreRuleInsert(entity: $entity) {
    id
    title
    code
    score
    isReplace
    createDate
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SafetyScoreRuleInsertGQL extends Apollo.Mutation<SafetyScoreRuleInsertMutation, SafetyScoreRuleInsertMutationVariables> {
    document = SafetyScoreRuleInsertDocument;
    client = 'demo';
  }
      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }

      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};

      export default result;
    