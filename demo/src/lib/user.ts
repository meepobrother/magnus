import {
    Entity,
    OneToMany,
    JoinTable,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    ManyToMany,
    getRepository,
} from 'typeorm';
import { ToDoItem } from './toDoItem';
import { Station } from './station';
import { UserLoginLog } from './userLogin';
import { SafetyScoreLog } from './safetyScoreLog';
import { ResolveProperty, Parent, Selection, Where, Order, Relation } from '@notadd/magnus-core';
import { PageLimit } from './types';
import { createWhere } from './controller';
/**
 * 用户表
 */
@Entity()
export class User {
	/**
	 * 用户编号
	 */
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id?: number;

	/**
	 * 用户名
	 */
    @Column({
        type: 'varchar',
        default: ``,
        unique: true
    })
    username: string;

	/**
	 * 邮箱
	 */
    @Column({
        type: 'varchar',
        default: ``
    })
    email?: string;

	/**
	 * 头像
	 */
    @Column({
        type: 'varchar',
        default: ``
    })
    avatar?: string;

	/**
	 * 电话号码
	 */
    @Column({
        type: 'varchar',
        default: ``
    })
    mobile?: string;

	/**
	 * 密码
	 */
    @Column({
        type: 'varchar',
        default: ``
    })
    password?: string;

	/**
	 *  1: 账户正常 0:未绑定 -1:刚解冻 -2: 已被封
	 */
    @Column({
        type: 'smallint',
        default: 0
    })
    status?: number;

	/**
	 * 随机码
	 */
    @Column({
        type: 'varchar',
        length: 20,
        default: ``
    })
    randomCode?: string;

	/**
	 * 密码是否被重置
	 */
    @Column({
        type: 'smallint',
        default: 0,
        comment: '0正常,1密码已重置'
    })
    isRestPassword?: boolean;

	/**
	 *  密码更改时间
	 */
    @CreateDateColumn({
        type: 'timestamptz',
        transformer: {
            to: (value: number) => {
                let date = new Date();
                if (value) {
                    date = new Date(value);
                }
                return date;
            },
            from: (value: string) => {
                return new Date(value).getTime();
            }
        }
    })
    passwordDate?: number;

	/**
	 * 创建时间
	 */
    @CreateDateColumn({
        type: 'timestamptz',
        transformer: {
            to: (value: number) => {
                let date = new Date();
                if (value) {
                    date = new Date(value);
                }
                return date;
            },
            from: (value: string) => {
                return new Date(value).getTime();
            }
        }
    })
    createDate?: number;
    /**
     * 创建人的uid
     */
    createUserId: number;


	/**
	 * 安全分
	 */
    @Column({
        default: 100
    })
    safetyScore?: number;
}
