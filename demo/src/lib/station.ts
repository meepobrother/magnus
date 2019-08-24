import {
    Entity,
    PrimaryGeneratedColumn,
    JoinTable,
    Column,
    CreateDateColumn,
    ManyToOne,
    ManyToMany
} from 'typeorm';
import { Department } from './department';
import { Role } from './role';
import { User } from './user';
import { RoleGroup } from './roleGroup';
import { ResolveProperty } from '@notadd/magnus-core';
/**
 * 岗位表
 */
@Entity()
export class Station {
	/**
	 * 岗位序号
	 */
    @PrimaryGeneratedColumn()
    id?: number;

	/**
	 * 岗位标题
	 */
    @Column()
    title?: string;

	/**
	 * 岗位描述
	 */
    @Column({
        default: ``
    })
    desc?: string;

	/**
	 * 岗位标识码
	 */
    @Column()
    code?: string;

	/**
	 * 岗位责任
	 */
    @Column({
        default: ''
    })
    responsibilities?: string;

	/**
	 * 岗位要求
	 */
    @Column({
        default: ''
    })
    requirements?: string;

	/**
	 * 岗位状态
	 */
    @Column({
        default: 0
    })
    status: number;

	/**
	 * 创建日期
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
                return new Date(value).getTime().toString();
            }
        }
    })
    createDate?: string;
}
